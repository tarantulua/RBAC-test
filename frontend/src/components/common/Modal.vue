<script setup lang="ts">
import { nextTick, useTemplateRef, watch } from "vue";
import Button from "./Button.vue";

interface ModalProps {
  open: boolean;
  saveText?: string;
  closeText?: string;
}

const {
  open,
  saveText = "Save",
  closeText = "Close",
} = defineProps<ModalProps>();

const emit = defineEmits(["close", "save"]);
const dialog = useTemplateRef<HTMLDialogElement>("dialog-modal");

watch(
  () => open,
  async (value) => {
    await nextTick();

    if (!dialog.value || dialog.value.open === open) {
      return;
    }

    if (value) {
      dialog.value.showModal();
      return;
    }

    dialog.value.close();
  },
  { immediate: true },
);

const handleClose = () => {
  if (!dialog.value) {
    return;
  }

  dialog.value.close();
};

const handleDialogClose = () => {
  emit("close");
};

const handleSave = () => {
  emit("save");
};
</script>

<template>
  <dialog class="modal" ref="dialog-modal" @close="handleDialogClose">
    <div class="modal__content">
      <slot />

      <div class="modal__actions">
        <Button
          class="modal__button modal__button--save"
          variant="primary"
          @click="handleSave"
        >
          {{ saveText }}
        </Button>

        <Button
          class="modal__button modal__button--close"
          variant="danger"
          @click="handleClose"
        >
          {{ closeText }}
        </Button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);

  .modal__content {
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .modal__actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
}
</style>
