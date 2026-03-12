export interface Attachment {
  id: number,
  name: string,
  path_id: string,
  size: number,
  create_time: number,
  messages: {
    date_sent: number,
    id: number
  }
}
