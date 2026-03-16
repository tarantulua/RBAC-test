<script setup lang="ts">
interface TableHeaderProps<T> {
  columns: { label: string; key: keyof T | string }[];
}

const { columns } = defineProps<TableHeaderProps<any>>();
</script>

<template>
  <thead class="table__head">
    <tr class="table__row table__row--head">
      <th
        v-for="column in columns"
        :key="column.key"
        class="table__cell table__cell--head"
      >
        {{ column.label }}
      </th>
    </tr>
  </thead>
</template>

<style scoped>
.table__head {
  background: var(--table-head-bg, #f5f6fa);
}

.table__row--head {
  border-bottom: 2px solid var(--table-divider, #e9ebf2);
}

.table__cell--head {
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--head-text-color, #4a4f60);
}
</style>
