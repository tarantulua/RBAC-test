<script setup lang="ts">
import { ref } from "vue";
import Button from "../common/Button.vue";
import UserModal from "../users/UserModal.vue";
import UserTable from "../users/UserTable.vue";
import { RoleName, type UserFormValue } from "../../types/user";
import { useUserStore } from "../../store/useUserStore";

const isUserModalOpen = ref<boolean>(false);
const userStore = useUserStore();

const openUserModal = (): void => {
  isUserModalOpen.value = true;
};

const closeUserModal = (): void => {
  isUserModalOpen.value = false;
};

const handleSaveUser = async (userData: UserFormValue) => {
  const isCreated = await userStore.createUser(userData);

  if (!isCreated) {
    return;
  }

  closeUserModal();
};
</script>

<template>
  <section class="dashboard-section">
    <div class="dashboard-section__header">
      <h2 class="dashboard-section__title">Users</h2>

      <Button
        v-if="$can(RoleName.ADMIN)"
        variant="secondary"
        @click="openUserModal"
      >
        Add user
      </Button>
    </div>

    <UserTable />

    <UserModal
      v-if="$can([RoleName.ADMIN, RoleName.EDITOR])"
      :open="isUserModalOpen"
      @close="closeUserModal"
      @save="handleSaveUser"
    />
  </section>
</template>

<style scoped>
.dashboard-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--panel-bg, #fff);
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 0.7rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);

  .dashboard-section__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dashboard-section__title {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    font-weight: 650;
    color: var(--subtitle-color, #334155);
  }
}
</style>
