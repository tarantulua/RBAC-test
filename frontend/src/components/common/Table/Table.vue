<script setup lang="ts">
import { computed } from "vue";
import TableHeader from "./TableHeader.vue";
import TableRow from "./TableRow.vue";
import { useAuthStore } from "../../../store/useAuthStore";
import type { TableColumn } from "../../../types/table";

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

const authStore = useAuthStore();
const { data, columns } = defineProps<TableProps<any>>();

const visibleColumns = computed(() => {
  return columns.filter((column) => {
    if (!column.can || column.can.length === 0) return true;
    return authStore.can(column.can);
  });
});
</script>

<template>
  <div class="table-wrapper">
    <table v-if="data?.length" class="table">
      <TableHeader :columns="visibleColumns" />

      <tbody class="table__body">
        <TableRow
          v-for="row in data"
          :key="row.id"
          :row="row"
          :columns="visibleColumns"
        >
          <template #actions="{ value }">
            <slot name="actions" :value="value" />
          </template>
        </TableRow>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow: auto;

  .table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-family, Inter, Arial, sans-serif);
    color: var(--text-color, #222);
    background: var(--bg, #fff);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.07);
    overflow: auto;

    .table__body {
      background: var(--table-body-bg, #fff);
    }
  }
}
</style>
