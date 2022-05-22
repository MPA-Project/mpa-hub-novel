export interface AuthPayload {
  refresh_token: string
}

export interface AuthResponse {
  acces_token_expired: string
  access_token: string
  refresh_token: string
  refresh_token_expired: string
}