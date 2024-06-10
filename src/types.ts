import type { FetchError } from 'ofetch';
import type { Ref } from 'vue';
import type { AtlasSession } from './runtime/composables/atlas/types';

export interface ModuleOptions {
  appId: string;
  firebaseConfig: {
    apiKey: string;
    authDomain?: string;
    projectId: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
    measurementId?: string;
  }
}

export interface LoginProps {
  email?: string;
  jwtFirebaseMiddleware?: (email: string, password: string) => Promise<{ data: Ref<unknown>, error: Ref<FetchError | null> }>;
  password?: string;
}

export interface AuthEventStatus {
  error?: string;
  status: boolean;
}

export interface AuthEvents {
  reset: [status: AuthEventStatus];
  signedIn: [session: AtlasSession];
  signedUp: [status: AuthEventStatus];
}
