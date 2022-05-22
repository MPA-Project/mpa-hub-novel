import { Config } from "~~/config"
import { AuthPayload, AuthResponse, UniversalResponse } from "~~/models"
import CustomReturn from "../utils/CustomReturn"



export default defineEventHandler(async (event) => {
  const body: AuthPayload = await useBody(event)

  try {
    const resp = await $fetch<UniversalResponse<AuthResponse>>(`${Config.BASE_URL}${Config.URL.AUTH.REFRESH_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${body.refresh_token}`,
      }
    })

    return resp
  } catch (error) {
    return CustomReturn(event.res, 401, {
      message: 'Unauthorized',
      error: true,
      data: null,
      dbg: error
    })
  }
})
