import { $fetch } from 'ofetch';

export const loginCustomJwt = (token: string) => {
  const url = new URL(
    '/api/client/v2.0/app/application-0-vcbyu/auth/providers/custom-token/login',
    'https://westeurope.azure.services.cloud.mongodb.com',
  )

  return $fetch(url, {
    body: JSON.stringify({
      token,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
  })
}
