<script lang="ts" setup>
import { computed, ref } from "vue";
import { useAuthStore } from "../../store/useAuthStore";
import Button from "../common/Button.vue";
import Select from "../common/Select.vue";
import { PRE_SEEDED_USERS } from "../../constants/user";

const { handleLogin } = useAuthStore();

const userId = ref<number | null>(null);

const userOptions = computed(() => {
  return PRE_SEEDED_USERS.map((user) => ({
    label: `${user.name}`,
    value: user.id,
  }));
});

const handleSubmit = () => {
  if (typeof userId.value !== "number") {
    return;
  }

  handleLogin(userId.value);
};
</script>

<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <div class="login-form__field">
      <label class="login-form__label" for="userId">Select user</label>
      <Select
        id="userId"
        v-model="userId"
        :options="userOptions"
        placeholder="Select a user"
      />
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
}
</style>
