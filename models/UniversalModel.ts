export interface UniversalResponse<T> {
  message: string
  error: boolean
  data?: T
}
