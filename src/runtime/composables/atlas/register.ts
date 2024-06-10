import { $fetch } from 'ofetch'

export const registerEmailPassword = async (email: string, password: string) => {
  const url = new URL(
    '/api/client/v2.0/app/application-0-vcbyu/auth/providers/local-userpass/register',
    'https://westeurope.azure.services.cloud.mongodb.com',
  )

  return $fetch.raw(url, {
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    ignoreResponseError: true,
  })
}
