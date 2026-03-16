<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref, watch } from "vue";
import Modal from "../common/Modal.vue";
import Input from "../common/Input.vue";
import Select from "../common/Select.vue";
import type { User, UserFormValue } from "../../types/user";
import { useAuthStore } from "../../store/useAuthStore";
import { useRoleStore } from "../../store/useRoleStore";

interface AddUserModalProps {
  open: boolean;
  editMode?: boolean;
  userToEdit?: User;
}

const { open, editMode, userToEdit } = defineProps<AddUserModalProps>();

const authStore = useAuthStore();
const roleStore = useRoleStore();
const { roles } = storeToRefs(roleStore);

const emit = defineEmits(["close", "save"]);

const user = ref<UserFormValue>({
  name: "",
  email: "",
  role: 2,
  status: "active",
});

const roleOptions = computed(() => {
  return roles.value.map((role) => ({
    label: role.name,
    value: role.id,
  }));
});

const isSameUser = computed(() => {
  return (
    authStore.user?.id && userToEdit?.id && authStore.user.id === userToEdit.id
  );
});

watch(
  () => editMode,
  (value) => {
    if (!value || !userToEdit) {
      return;
    }

    const { role, ...other } = userToEdit;

    user.value = { ...other, role: typeof role === "number" ? role : role.id };
  },
  { immediate: true },
);

watch(
  roleOptions,
  (value) => {
    if (editMode || value.length === 0) {
      return;
    }

    const hasSelectedRole = value.some(
      (role) => role.value === user.value.role,
    );

    if (hasSelectedRole) {
      return;
    }

    user.value.role = value[0].value;
  },
  { immediate: true },
);

onBeforeMount(async () => {
  if (roles.value.length > 0) {
    return;
  }

  await roleStore.fetchRoles();
});

const onClose = () => {
  emit("close");
};

const onSave = () => {
  emit("save", user.value);
};
</script>

<template>
  <Modal :open="open" @close="onClose" @save="onSave">
    <form class="add-user-modal__form" @submit.prevent="onSave">
      <div class="add-user-modal__field">
        <label for="name" class="add-user-modal__label">Name</label>

        <Input id="name" v-model="user.name" type="text" required />
      </div>

      <div class="add-user-modal__field">
        <label for="email" class="add-user-modal__label">Email</label>

        <Input id="email" v-model="user.email" type="email" required />
      </div>

      <div class="add-user-modal__field">
        <label for="role" class="add-user-modal__label">Role</label>

        <Select
          id="role"
          v-model="user.role"
          :options="roleOptions"
          :disabled="!!isSameUser"
          required
        />
      </div>
    </form>
  </Modal>
</template>

<style scoped>
.add-user-modal__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.add-user-modal__field {
  display: flex;
  flex-direction: column;
}
.add-user-modal__label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}
</style>
