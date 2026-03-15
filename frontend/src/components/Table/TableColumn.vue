<script setup lang="ts">
import { computed } from "vue";

interface TableColumnProps<T> {
  column: T;
  columnValue: any;
}

const { column, columnValue } = defineProps<TableColumnProps<any>>();

const isArray = computed(() => Array.isArray(columnValue));

const getArrayItemValue = (item: any, key: string) => {
  const keys = key.split("[].");

  return item[keys[1]];
};
</script>

<template>
  <td v-if="column.key === 'actions'" class="table__cell table__cell--actions">
    <slot name="actions" :value="columnValue" />
  </td>

  <td v-else-if="isArray" class="table__cell table__cell--multi">
    <ul class="table__list">
      <li
        class="table__list-item"
        v-for="(item, index) in columnValue"
        :key="item.id || index"
      >
        {{ getArrayItemValue(item, column.key) }}
      </li>
    </ul>
  </td>

  <td v-else class="table__cell">{{ columnValue }}</td>
</template>

<style scoped>
.table__cell {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--table-divider, #ebedf2);
  font-size: 0.88rem;
  vertical-align: top;
  color: var(--cell-text-color, #333);

  &.table__cell--multi {
    .table__list {
      margin: 0;
      padding-left: 1.1rem;
      color: var(--chip-color, #555);

      .table__list-item {
        margin: 0.15rem 0;
      }
    }
  }
}
</style>
