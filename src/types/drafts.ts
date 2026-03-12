export interface Draft {
  id: number,
  type: '' | 'stream' | 'private',
  to: number[],
  topic: string,
  content: string,
  timestamp: number
}
