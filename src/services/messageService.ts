export const sendMessage = <T, S>(message: T, responseHandler: Function): void => {
  chrome.tabs && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id || 0,
      message,
      (response: S) => {
        responseHandler(response)
      }
    )
  })
}

