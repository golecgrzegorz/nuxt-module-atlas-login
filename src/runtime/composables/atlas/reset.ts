import { $fetch } from 'ofetch';

export const resetEmailPassword = async (email: string) => {
  const url = new URL(
    '/api/client/v2.0/app/application-0-vcbyu/auth/providers/local-userpass/reset/call',
    'https://westeurope.azure.services.cloud.mongodb.com',
  )

  return $fetch.raw(url, {
    body: JSON.stringify({
      email,
      password: `${Date.now()}`,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    ignoreResponseError: true,
  })
}
