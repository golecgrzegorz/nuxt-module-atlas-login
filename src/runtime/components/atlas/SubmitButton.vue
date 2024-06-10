<template>
  <div class="button-container">
    <p
      v-show="errorMessage"
      class="error-message"
    >
      {{ errorMessage }}
    </p>
    <button
      class="button button-primary button-login"
      type="submit"
      :disabled="disabled"
    >
      <svg
        v-if="loading"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="spinner"
      >
        <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" />
      </svg>
      <span v-else>
        <slot />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: Boolean,
  errorMessage: String,
  loading: Boolean,
  title: String,
})
</script>
