import { Config } from "~~/config"
import { UniversalResponse, UserMe } from "~~/models"
import CustomReturn from "~~/server/utils/CustomReturn"

export default defineEventHandler(async (event) => {
  const getAccessTokenCookie = useCookie(Config.COOKIE.ACCESS_TOKEN)

  try {
    const resp = await $fetch<UniversalResponse<UserMe>>(`${Config.BASE_URL}${Config.URL.USER.ME}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getAccessTokenCookie}`,
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