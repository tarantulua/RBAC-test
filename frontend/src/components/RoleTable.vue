<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { useRolesApi } from "../api/useRolesApi";
import Table from "./Table/Table.vue";
import Button from "./Button.vue";
import { RoleName } from "../types/user";
import { useAuthStore } from "../store/useAuthStore";

const authStore = useAuthStore();
const { fetchAllRoles } = useRolesApi();

const roles = ref<any[]>([]);

const columns = computed(() => [
  { label: "Name", key: "name" },
  { label: "Permissions", key: "permissions[].slug" },
  {
    label: "",
    key: "actions",
  },
]);

const handleEditRole = (role: any) => {
  if (!authStore.can(RoleName.ADMIN)) {
    return;
  }

  console.log("Edit role:", role);
};

onBeforeMount(async () => {
  roles.value = (await fetchAllRoles()) ?? [];
});
</script>

<template>
  <Table :data="roles" :columns="columns">
    <template #actions="{ value }">
      <Button
        variant="ghost"
        size="sm"
        :disabled="!$can(RoleName.ADMIN)"
        @click="handleEditRole(value)"
      >
        Edit
      </Button>
    </template>
  </Table>
</template>
