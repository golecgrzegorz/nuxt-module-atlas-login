<template>
  <form
    class="reset-form"
    :class="{ error: !!errorMessage }"
    @submit.prevent="onSubmit"
  >
    <div class="input-container">
      <label for="username">Email</label>
      <input
        id="username"
        v-model="state.email"
        :disabled="isSetNew"
        autocomplete="email"
        name="username"
        placeholder="ex. mary.jane@example.com"
        required
        type="email"
      >
    </div>
    <div
      v-if="isSetNew"
      class="input-container"
    >
      <label for="password">New password</label>
      <input
        id="password"
        v-model="state.password"
        autocomplete="off"
        name="password"
        minlength="6"
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
      :disabled="state.disabled"
      :error-message="errorMessage"
      :loading="state.loading"
    >
      <span v-if="isSetNew && !isExpiredLink">Set New Password</span><span v-else>Reset Password</span>
    </submit-button>
  </form>
</template>

<script setup lang="ts">
import SubmitButton from './SubmitButton.vue';

const route = useRoute();
const isSetNew = computed(() => route.query.view === 'reset-set-new');
const isExpiredLink = ref(false);

const errorMessage = ref('');
const successMessage = ref('');
const state = reactive({
  disabled: false,
  email: isSetNew.value ? route.query.email : '',
  loading: false,
  password: '',
});

async function sendEmail() {
  const { resetEmailPassword } = useAtlas();

  const resetResponse = await resetEmailPassword(state.email);

  if (resetResponse.status === 200 || resetResponse.status === 204) {
    successMessage.value = 'An email with reset password link has been sent to provided email address';
  } else if (resetResponse.status === 404) {
    if (resetResponse._data.error_code === 'UserNotFound') {
      errorMessage.value = 'There are no users with provided email address, please correct your email and try again';
    }
  } else {
    errorMessage.value = 'Unknown error, please try again later or contact with technical support';
  }
}

async function setNewPassword() {
  const { resetFinish } = useAtlas();
  const { token, tokenId } = route.query;

  if (!state.password) {
    return;
  }

  if (token && tokenId) {
    const resetResponse = await resetFinish(token, tokenId, state.password);

    if (resetResponse.status === 200) {
      successMessage.value = 'Password has been updated, You can login with new credentials';
    } else if (resetResponse.status === 404) {
      isExpiredLink.value = true;
      errorMessage.value = 'Password reset link nas expired. Please generate a new one by clicking button below!';
    } else {
      errorMessage.value = 'Unknown error, please try again later or contact with technical support';
    }
  } else {
    errorMessage.value = 'Unknown error, please try again later or contact with technical support';
  }
}

async function onSubmit() {
  if (isExpiredLink.value) {
    await navigateTo({ path: '/login', query: { view: 'reset' } });
    isExpiredLink.value = false;
    errorMessage.value = '';
    return;
  }

  if (!state.email) {
    return;
  }

  state.loading = true;
  state.disabled = true;

  if (isSetNew.value) {
    await setNewPassword();
  } else {
    await sendEmail();
  }

  state.loading = false;
  state.disabled = false;
}
</script>