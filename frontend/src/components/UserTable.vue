<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { useUsersApi } from "../api/useUsersApi";
import Table from "./Table/Table.vue";
import Button from "./Button.vue";
import { RoleName, type User } from "../types/user";
import { useAuthStore } from "../store/useAuthStore";

const { fetchUsers, deleteUser } = useUsersApi();
const authStore = useAuthStore();

const users = ref<User[]>([]);

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

const handleDeleteUser = async (user: User) => {
  if (authStore.user?.id === user.id) {
    return;
  }

  const result = await deleteUser(user.id);

  if (!result) {
    return;
  }

  users.value = users.value.filter((value) => value.id !== user.id);
};

onBeforeMount(async () => {
  users.value = (await fetchUsers()) ?? [];
});
</script>

<template>
  <Table :data="users" :columns="columns">
    <template #actions="{ value }: { value: User }">
      <Button
        variant="ghost"
        size="sm"
        @click="() => console.log('Edit', value)"
      >
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
</template>
