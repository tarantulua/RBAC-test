<script setup lang="ts">
import TableColumn from "./TableColumn.vue";

interface TableRowProps<T> {
  row: T;
  columns: { label: string; key: keyof T | string }[];
}

const { row, columns } = defineProps<TableRowProps<any>>();

const getColumnValue = <T,>(row: T, columnKey: keyof T | string) => {
  if (columnKey === "actions") {
    return row;
  }

  if (
    typeof columnKey !== "string" ||
    (!columnKey.includes("[].") && !columnKey.includes("."))
  ) {
    return row[columnKey as keyof T];
  }

  const keys = columnKey.split(".");
  let value: any = row;

  for (const key of keys) {
    if (key.endsWith("[]")) {
      const arrayKey = key.slice(0, -2);
      return value[arrayKey];
    }

    value = value[key];

    if (value == null) {
      return "";
    }
  }

  return value;
};
</script>

<template>
  <tr class="table__row">
    <template v-for="column in columns" :key="column.key">
      <TableColumn
        class="table__cell"
        :column="column"
        :column-value="getColumnValue(row, column.key)"
      >
        <template #actions="{ value }">
          <slot name="actions" :value="value" />
        </template>
      </TableColumn>
    </template>
  </tr>
</template>

<style scoped>
.table__row {
  transition: background 0.2s ease;
}

.table__row:nth-child(even) {
  background: var(--row-alternate-bg, #fbfbfd);
}

.table__row:hover {
  background: var(--row-hover-bg, #f1f3f8);
}
</style>
