<script lang="ts" setup>
import { computed, ref } from "vue";
import { useAuthStore } from "../store/useAuthStore";
import Button from "./Button.vue";
import { PRE_SEEDED_USERS } from "../constants/user";

const { handleLogin } = useAuthStore();

const userId = ref<string>("");

const userOptions = computed(() => {
  return PRE_SEEDED_USERS.map((user) => ({
    label: `${user.name}`,
    value: user.id,
  }));
});
</script>

<template>
  <form class="login-form" @submit.prevent="handleLogin(userId)">
    <div class="login-form__field">
      <label class="login-form__label" for="userId">Select user</label>
      <select id="userId" class="login-form__select" v-model="userId">
        <option value="" disabled>Select a user</option>
        <option
          v-for="option in userOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <Button type="submit" :disabled="!userId">Login</Button>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  .login-form__field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .login-form__label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--label-color, #334155);
  }

  .login-form__select {
    border: 1px solid var(--input-border, #cbd5e1);
    border-radius: 0.47rem;
    padding: 0.62rem 0.7rem;
    background: #fff;
    font-size: 1rem;
  }
}
</style>
