<template>
  <div class="login-container">
    <atlas-login-component
      :jwt-firebase-middleware="customJWTMiddleware"
      @signed-in="onSignedIn"
      @signed-up="onSignedUp"
      @reset="onReset"
    >
      <!-- slot logo -->
      <template #logo>
        <nuxt-img src="https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" />
      </template>
      <!-- slot title -->
      <template #title>
        <h3 class="title">
          Welcome!
        </h3>
        <p>To log in to your account, enter your email and password</p>
      </template>
    </atlas-login-component>
    <p>This example demonstrate get how to get <nuxt-link href="https://www.mongodb.com/atlas">Atlas</nuxt-link> authorization token with JWT obtained form 3rd party system (ex. firebase).</p>
  </div>
</template>

<script setup lang="ts">
import type { AtlasSession } from '../src/runtime/composables/atlas/types';

async function onSignedIn(_session: AtlasSession) {
  navigateTo('/user-profile');
}

async function onSignedUp(_status: boolean) {
  // navigateTo('/welcome-page');
}

async function onReset(_status: boolean) {
  // navigateTo('/login');
}

async function customJWTMiddleware(email: string, password: string) {
  const { data, error } = await useFetch('/api/atlas_firebase', {
    body: { email, password },
    method: 'post',
  })

  return { data, error }
}
</script>
