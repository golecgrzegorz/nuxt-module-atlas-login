import { $fetch } from 'ofetch';

export const loginEmailPassword = (username: string, password: string) => {
  const url = new URL(
    '/api/client/v2.0/app/application-0-vcbyu/auth/providers/local-userpass/login',
    'https://westeurope.azure.services.cloud.mongodb.com',
  )

  return $fetch(url, {
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
  })
}
