export type Contractor = {
  name: string
  id: number
  avatarUrl: string
}

export type Kudo = {
  id: number
  contractor: Contractor
  message: string
  amount: number
  type: string
}

export type MessageWithoutPayload = {
  type: string
}

export type MessageWithPayload = {
  type: string
  payload: any
}

export const FETCH_CONTRACTORS = 'FETCH_CONTRACTORS'

export const SEND_KUDOS = 'SEND_KUDOS'
