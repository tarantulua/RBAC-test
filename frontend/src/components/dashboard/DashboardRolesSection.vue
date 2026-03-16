<script setup lang="ts">
import RoleTable from "../roles/RoleTable.vue";
import { RoleName } from "../../types/user";
</script>

<template>
  <section
    class="dashboard-section"
    v-if="$can([RoleName.ADMIN, RoleName.EDITOR])"
  >
    <div class="dashboard-section__header">
      <h2 class="dashboard-section__title">Roles</h2>
    </div>

    <RoleTable />
  </section>
</template>

<style scoped>
.dashboard-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--panel-bg, #fff);
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 0.7rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);

  .dashboard-section__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dashboard-section__title {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    font-weight: 650;
    color: var(--subtitle-color, #334155);
  }
}
</style>
