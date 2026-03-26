<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref, watch } from "vue";
import Modal from "../common/Modal.vue";
import { usePermissionStore } from "../../store/usePermissionStore";
import type { Role } from "../../types/user";

interface RoleEditModalProps {
  open: boolean;
  roleToEdit?: Role;
}

const { open, roleToEdit } = defineProps<RoleEditModalProps>();

const emit = defineEmits(["close", "save"]);

const permissionStore = usePermissionStore();
const { permissions } = storeToRefs(permissionStore);
const selectedPermissionIds = ref<number[]>([]);

const title = computed(() => {
  if (!roleToEdit) {
    return "Edit Role";
  }

  return `Edit ${roleToEdit.name} permissions`;
});

const mapRolePermissions = (role?: Role): number[] => {
  if (!role) {
    return [];
  }

  return role.permissions.map((permission) =>
    typeof permission === "number" ? permission : permission.id,
  );
};

watch(
  () => roleToEdit,
  (value) => {
    selectedPermissionIds.value = mapRolePermissions(value);
  },
  { immediate: true },
);

const togglePermission = (permissionId: number, checked: boolean) => {
  if (!checked) {
    selectedPermissionIds.value = selectedPermissionIds.value.filter(
      (id) => id !== permissionId,
    );

    return;
  }

  if (selectedPermissionIds.value.includes(permissionId)) {
    return;
  }

  selectedPermissionIds.value.push(permissionId);
};

onBeforeMount(async () => {
  if (permissions.value.length > 0) {
    return;
  }

  await permissionStore.fetchPermissions();
});

const onClose = () => {
  emit("close");
};

const onSave = () => {
  emit("save", selectedPermissionIds.value);
};
</script>

<template>
  <Modal
    :open="open"
    save-text="Update"
    close-text="Cancel"
    @close="onClose"
    @save="onSave"
  >
    <div class="edit-role-modal">
      <h3 class="edit-role-modal__title">{{ title }}</h3>

      <div class="edit-role-modal__permissions">
        <label
          v-for="permission in permissions"
          :key="permission.id"
          class="edit-role-modal__permission"
        >
          <input
            type="checkbox"
            :checked="selectedPermissionIds.includes(permission.id)"
            @change="
              togglePermission(
                permission.id,
                ($event.target as HTMLInputElement).checked,
              )
            "
          />
          <span>{{ permission.slug }}</span>
        </label>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.edit-role-modal {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .edit-role-modal__title {
    margin: 0;
    font-size: 1rem;
    color: var(--text-color, #1f2a44);
  }

  .edit-role-modal__permissions {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    max-height: 280px;
    overflow: auto;
  }

  .edit-role-modal__permission {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color, #1f2a44);
  }
}
</style>
