import { $fetch } from 'ofetch';

export const invalidateToken = (token: string) => {
  const url = new URL(
    '/api/client/v2.0/auth/session',
    'https://eu-central-1.aws.services.cloud.mongodb.com',
  )

  return $fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'delete',
  })
}
