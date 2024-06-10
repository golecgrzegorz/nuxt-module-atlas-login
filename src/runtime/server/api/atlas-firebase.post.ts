import type { H3Event } from 'h3';
import { initializeApp} from '@firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);

  if (!body?.email || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'INVALID_REQUEST_BODY',
    })
  }

  try {
    const config = useRuntimeConfig(event);
    const app = initializeApp(config.firebaseConfig);
    const auth = getAuth(app);

    const firebaseAuthResponse = await signInWithEmailAndPassword(auth, body.email, body.password);
    return {
      idToken: await firebaseAuthResponse.user.getIdToken(),
      status: true,
    };
  } catch (error) {
    const isCredentialsError = error.message.includes('auth/invalid-credential');
    throw createError({
      statusCode: isCredentialsError ? 401 : 500,
      statusMessage: isCredentialsError ? 'INVALID_CREDENTIALS' : 'INTERNAL_ERROR',
    });
  }
})
