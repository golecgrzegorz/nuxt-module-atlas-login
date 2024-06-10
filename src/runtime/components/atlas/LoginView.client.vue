<template>
  <form
    class="login-form"
    :class="{ error: !!errorMessage }"
    @submit.prevent="onSubmit"
  >
    <div class="input-container">
      <label for="username">Email</label>
      <input
        id="username"
        v-model="state.email"
        autocomplete="email"
        name="username"
        placeholder="mary.jane@example.com"
        required
        type="email"
      >
    </div>
    <div class="input-container">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="state.password"
        autocomplete="off"
        name="password"
        placeholder="********"
        required
        type="password"
      >
    </div>

    <div class="input-container">
      <div class="remember-me-container">
        <div class="remember-me-wrap">
          <div class="checkbox-input">
            <input
              id="remember"
              v-model="state.remember"
              name="login-form-remember"
              type="checkbox"
              :true-value="true"
              :false-value="false"
            >
            <label for="remember">&nbsp;Remember me</label>
          </div>
        </div>
        <nuxt-link :to="{ path: route.path, query: { view: 'reset' } }">
          Forgot your password?
        </nuxt-link>
      </div>
    </div>
    <submit-button
      :disabled="state.disabled"
      :error-message="errorMessage"
      :loading="state.loading"
    >
      Login
    </submit-button>
  </form>
</template>

<script setup lang="ts">
import SubmitButton from './SubmitButton.vue';
import type { AtlasSession } from '~/src/runtime/composables/atlas/types';

const props = defineProps({
  email: String,
  jwtFirebaseMiddleware: Function,
  password: String,
});

const SESSION_REMEMBER_KEY = 'atlas_session_remember';
const route = useRoute();

const instance = getCurrentInstance();
const errorMessage = ref('');
const state = reactive({
  disabled: false,
  email: props.email,
  loading: false,
  password: props.password,
  remember: false,
});

onBeforeMount(() => {
  const rememberSession = window?.localStorage.getItem(SESSION_REMEMBER_KEY);
  state.remember = (rememberSession === 'true');
});

function onSignedIn(session: AtlasSession) {
  const atlasSession = useAtlasSession();
  atlasSession.setSession(session);
  instance.parent.emit('signedIn', session);
}

async function onSubmit() {
  state.loading = true
  state.disabled = true

  if (typeof props.jwtFirebaseMiddleware === 'function') {
    errorMessage.value = ''
    // step one use middleware function to get custom jwt (in our case firebase)
    const { data, error } = await props.jwtFirebaseMiddleware.call(this, state.email, state.password)

    if (error?.value) {
      if (error?.value?.statusMessage === 'INVALID_CREDENTIALS') {
        errorMessage.value = 'Invalid login or password'
      }
      else {
        errorMessage.value = 'Unknown error, please try again later or contact with technical support'
      }
    }

    if (data?.value?.idToken.length > 0) {
      // step two login to atlas using custom jwt (in our case firebase)
      const { loginCustomJwt } = useAtlas();
      const session: AtlasSession = await loginCustomJwt(data.value.idToken)

      if (session.access_token) {
        onSignedIn(session)
      }
    }
  } else {
    const { loginEmailPassword } = useAtlas();

    try {
      errorMessage.value = ''
      const session: AtlasSession = await loginEmailPassword(state.email, state.password)

      if (session.access_token) {
        onSignedIn(session)
      }
    } catch (error) {
      if (error.data && error.data.error_code === 'InvalidPassword') {
        errorMessage.value = 'Invalid login or password';
      }
      else if (error.message === 'NO_ADMIN_PRIVILAGES') {
        errorMessage.value = 'You have no privileges to access this area';
      }
    }
  }

  //
  state.loading = false
  state.disabled = false
}

watch(() => state.remember, (newVal: boolean) => {
  window?.localStorage.setItem(SESSION_REMEMBER_KEY, `${newVal}`)
});

watch(() => state.email, () => {
  if (errorMessage.value) {
    errorMessage.value = '';
  }
});

watch(() => state.password, () => {
  if (errorMessage.value) {
    errorMessage.value = '';
  }
});
</script>

<style scoped>

</style>./SubmitButton.vue
