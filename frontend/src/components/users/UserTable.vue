<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import Table from "../common/Table/Table.vue";
import Button from "../common/Button.vue";
import { RoleName, type User, type UserFormValue } from "../../types/user";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserStore } from "../../store/useUserStore";
import UserModal from "./UserModal.vue";

const authStore = useAuthStore();
const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const selectedUser = ref<User | null>(null);

const isUserModalOpen = ref<boolean>(false);

const columns = computed(() => {
  return [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role.name", can: [RoleName.ADMIN, RoleName.EDITOR] },
    { label: "Status", key: "status" },
    {
      label: "",
      key: "actions",
      can: [RoleName.ADMIN, RoleName.EDITOR],
    },
  ];
});

const toggleUserModal = () => {
  isUserModalOpen.value = !isUserModalOpen.value;

  if (!isUserModalOpen.value) {
    selectedUser.value = null;
  }
};

const handleEditUser = (user: User) => {
  selectedUser.value = user;
  isUserModalOpen.value = true;
};

const handleDeleteUser = async (user: User) => {
  if (authStore.user?.id === user.id) {
    return;
  }

  const result = await userStore.deleteUser(user.id);

  if (!result) {
    return;
  }
};

const handleSaveUser = async (userData: UserFormValue) => {
  if (!selectedUser.value) {
    return;
  }

  const updatedUser = await userStore.updateUser(selectedUser.value.id, userData);

  if (!updatedUser) {
    return;
  }

  toggleUserModal();
};

onBeforeMount(async () => {
  await userStore.fetchUsers();
});
</script>

<template>
  <div>
    <Table :data="users" :columns="columns">
      <template #actions="{ value }: { value: User }">
        <Button variant="ghost" size="sm" @click="handleEditUser(value)">
          Edit
        </Button>

        <Button
          v-if="$can(RoleName.ADMIN)"
          variant="danger"
          size="sm"
          :disabled="authStore.user?.id === value.id"
          @click="handleDeleteUser(value)"
        >
          Delete
        </Button>
      </template>
    </Table>

    <UserModal
      v-if="selectedUser"
      :open="isUserModalOpen"
      :user-to-edit="selectedUser"
      edit-mode
      @close="toggleUserModal"
      @save="handleSaveUser"
    />
  </div>
</template>
