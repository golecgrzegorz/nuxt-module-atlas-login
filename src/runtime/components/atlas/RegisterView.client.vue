<template>
  <form
    class="register-form"
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
      <label for="password">Repeat Password</label>
      <input
        id="password-repeat"
        v-model="state.passwordRepeat"
        autocomplete="off"
        name="password"
        placeholder="********"
        required
        type="password"
      >
    </div>
    <p
      v-if="successMessage"
      class="success-message"
      v-html="successMessage"
    />
    <submit-button
      v-else
      :loading="state.loading"
      :disabled="state.disabled"
      :error-message="errorMessage"
    >
      Create Account
    </submit-button>
  </form>
</template>

<script setup lang="ts">
import SubmitButton from './SubmitButton.vue';
import type { EmittedEventStatus } from '~/src/types';

const instance = getCurrentInstance();
const errorMessage = ref('');
const successMessage = ref('');
const state = reactive({
  disabled: false,
  email: '',
  loading: false,
  password: '',
  passwordRepeat: '',
});

function onSignedUp(status: EmittedEventStatus) {
  instance.parent.emit('signedUp', status);
}

async function onSubmit() {
  if (state.email) {
    if (state.password !== state.passwordRepeat) {
      errorMessage.value = 'Provided passwords are different.';
      return;
    }

    state.loading = true;
    state.disabled = true;

    const { registerEmailPassword } = useAtlas();
    try {
      const registerResponse = await registerEmailPassword(state.email, state.password);

      if (registerResponse?.status === 201) {
        successMessage.value = 'Account has been created, please check your email and activate account by clicking confirmation link';
        onSignedUp({ status: true });
      } else {
        const errorCode = registerResponse._data.error ? registerResponse._data.error_code : 'UnexpectedError';
        if (errorCode === 'AccountNameInUse') {
          errorMessage.value = 'Customer with this email address already exist!';
        } else {
          errorMessage.value = 'Unknown error, please try again later or contact with technical support';
        }

        onSignedUp({ status: false, error: errorCode });
      }
    } catch (error) {
      errorMessage.value = 'Unknown error, please try again later or contact with technical support';
      onSignedUp({ status: false, error: 'UnexpectedError' });
    }

    state.loading = false;
    state.disabled = false;
  }
}
</script>