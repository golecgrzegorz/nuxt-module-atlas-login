<template>
  <div>
    <div class="login-container">
      <atlas-login-component
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AuthEventStatus } from '../../src/types';
import type { AtlasSession } from '../../src/runtime/composables/atlas/types';

async function onSignedIn(_session: AtlasSession) {
  // navigateTo('/user-profile');
}

async function onSignedUp(_status: AuthEventStatus) {
  // navigateTo('/welcome-page');
}

async function onReset(_status: AuthEventStatus) {
  // navigateTo('/login');
}
</script>
