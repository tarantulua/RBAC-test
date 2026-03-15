<script lang="ts" setup>
import LoginForm from "../components/LoginForm.vue";
</script>

<template>
  <div class="login-page">
    <div class="login-page__box">
      <h1 class="login-page__title">Login</h1>
      <LoginForm />
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--page-bg, #f4f7fb);
  padding: 1.25rem;
}

.login-page__box {
  width: min(100%, 380px);
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--border, #dbe2ef);
  border-radius: 0.75rem;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  padding: 1.4rem;
}

.login-page__title {
  margin: 0 0 1.1rem;
  text-align: center;
  font-size: 1.8rem;
  color: var(--title-color, #1e293b);
}
</style>
