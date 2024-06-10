<template>
  <div class="text-center">
    <h1>TA DA 🎉</h1>
    <h1>This my user profile</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
</script>
