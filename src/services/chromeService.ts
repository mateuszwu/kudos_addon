import { Contractor, FETCH_CONTRACTORS, Kudo, MessageWithPayload, SEND_KUDOS } from '../types';

const fetchContractors = (sendResponse: (response: Contractor[]) => void): void => {
  const currentContractorId = parseInt(JSON.parse(localStorage.getItem('ember_simple_auth-session') || '{}').contractor_id)
  const contractors = Array
    .from(document.querySelectorAll('img.contractor-avatar'))
    .map(item => (
      {
        name: item.getAttribute('title'),
        id: parseInt(item.getAttribute('data-contractor-id') || ''),
        avatarUrl: item.getAttribute('src'),
      } as Contractor
    ))
    .filter((contractor: Contractor): boolean => contractor.id !== currentContractorId)
    .sort((a: Contractor, b: Contractor) => a.name.localeCompare(b.name))

  sendResponse(contractors);
}

const sendKudos = (kudos: Kudo[], sendResponse: () => void): void => {
  const requests = kudos.map(sendKudo)
  Promise.all<Response | void>(requests).then(() => {
    sendResponse()
    window.location.reload()
  })
}


chrome.runtime.onMessage.addListener((
  message: MessageWithPayload,
  sender: chrome.runtime.MessageSender,
  sendResponse: () => void
): void => {
  switch (message.type) {
    case FETCH_CONTRACTORS:
      fetchContractors(sendResponse)
      break
    case SEND_KUDOS:
      sendKudos(message.payload, sendResponse)
      break
  }
});

const sendKudo = (kudo: Kudo): Promise<Response> | Promise<void> => {
  const authToken = JSON.parse(localStorage.getItem('ember_simple_auth-session') || '{}').authenticated.accessToken
  if (authToken !== undefined) {
    return fetch(
      'https://dm3.selleo.com/api/v2/merit_money/kudos',
      {
        method: 'POST',
        headers: {
          "content-type": "application/vnd.api+json",
          "accept": "application/vnd.api+json",
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          data: {
            attributes: {
              value: kudo.amount,
              comment: kudo.message,
              tags: [kudo.type],
            },
            relationships: {
              receiver: {
                data: {
                  type: 'contractors',
                  id: kudo.contractor.id.toString(),
                }
              },
            },
            type: 'merit_money_kudos'
          }
        })
      }
    )
  }

  return new Promise<void>((res, _) => {
    res();
  })
}

