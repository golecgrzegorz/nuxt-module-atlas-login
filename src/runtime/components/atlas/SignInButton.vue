<template>
  <div class="single-input">
    Already a member?  <nuxt-link :to="{ path: route.path }">Sign in</nuxt-link>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
