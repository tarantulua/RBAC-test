<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import Table from "../common/Table/Table.vue";
import Button from "../common/Button.vue";
import RoleEditModal from "./RoleEditModal.vue";
import { RoleName } from "../../types/user";
import { useAuthStore } from "../../store/useAuthStore";
import { useRoleStore } from "../../store/useRoleStore";
import type { Role } from "../../types/user";

const authStore = useAuthStore();
const roleStore = useRoleStore();
const { roles } = storeToRefs(roleStore);

const selectedRole = ref<Role | null>(null);
const isEditRoleModalOpen = ref<boolean>(false);

const columns = computed(() => [
  { label: "Name", key: "name" },
  { label: "Permissions", key: "permissions[].slug" },
  {
    label: "",
    key: "actions",
  },
]);

const handleEditRole = (role: Role) => {
  if (!authStore.can(RoleName.ADMIN)) {
    return;
  }

  selectedRole.value = role;
  isEditRoleModalOpen.value = true;
};

const closeEditRoleModal = () => {
  isEditRoleModalOpen.value = false;
  selectedRole.value = null;
};

const handleSaveRole = async (permissionIds: number[]) => {
  if (!selectedRole.value) {
    return;
  }

  const isUpdated = await roleStore.updateRolePermissions(
    selectedRole.value.id,
    permissionIds,
  );

  if (!isUpdated) {
    return;
  }

  closeEditRoleModal();
};

onBeforeMount(async () => {
  await roleStore.fetchRoles();
});
</script>

<template>
  <div>
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

    <RoleEditModal
      v-if="selectedRole"
      :open="isEditRoleModalOpen"
      :role-to-edit="selectedRole"
      @close="closeEditRoleModal"
      @save="handleSaveRole"
    />
  </div>
</template>
