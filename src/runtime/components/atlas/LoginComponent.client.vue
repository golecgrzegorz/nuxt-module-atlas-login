<template>
  <div class="atlas-login-container">
    <div class="logo">
      <slot name="logo" />
    </div>
    <!-- login existing user -->
    <div v-if="currentView === 'login'">
      <slot name="title" />
      <login-view
        :email="email"
        :jwt-firebase-middleware="jwtFirebaseMiddleware"
        :password="password"
      />
      <div>
        <span>New to PSG Fans 🎉 ? <nuxt-link :to="{ path: route.path, query: { view: 'register' } }"> Create an account</nuxt-link></span>
      </div>
    </div>
    <!-- register new user -->
    <div v-else-if="currentView === 'register'">
      <h3 class="title">
        New Customer
      </h3>
      <p>Provide email and password to create an account</p>
      <register-view />
      <signIn-button />
    </div>
    <!-- reset password -->
    <div v-else-if="currentView === 'reset' || currentView === 'reset-set-new'">
      <h3 class="title">
        Reset Password
      </h3>
      <p>Provide email address used during account creation</p>
      <reset-view />
      <signIn-button />
    </div>
  </div>
</template>

<script setup lang="ts">
import SignInButton from './SignInButton.vue';
import LoginView from './LoginView.client.vue';
import RegisterView from './RegisterView.client.vue';
import ResetView from './ResetView.client.vue';
import type { AuthEvents } from '~/src/types';

defineProps({
  email: String,
  jwtFirebaseMiddleware: Function,
  password: String,
});

defineEmits<AuthEvents>();

const currentView = ref('login');
const route = useRoute();

onBeforeMount(() => {
  currentView.value = (route.query?.view || 'login');
});

watch(() => route.query, () => {
  currentView.value = (route.query?.view || 'login');
});
</script>

<style src="./LoginComponent.css"></style>
