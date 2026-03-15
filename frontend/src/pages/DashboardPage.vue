<script setup lang="ts">
import RoleTable from "../components/RoleTable.vue";
import UserTable from "../components/UserTable.vue";
import Button from "../components/Button.vue";
import { useAuthStore } from "../store/useAuthStore";
import { RoleName } from "../types/user";

const authStore = useAuthStore();

const onAddUser = () => {
  console.log("Add user clicked");
  // TODO: Open add user modal or navigate to add user form
};
</script>

<template>
  <section class="dashboard">
    <header class="dashboard__header">
      <h1 class="dashboard__title">Dashboard</h1>

      <div class="dashboard__user-actions">
        <span class="dashboard__username">
          Hello, {{ authStore.user?.name || "Guest" }}
        </span>

        <Button variant="ghost" @click="authStore.handleLogout()">
          Logout
        </Button>
      </div>
    </header>

    <div class="dashboard__content">
      <section class="dashboard__block">
        <div class="dashboard__block-header">
          <h2 class="dashboard__block-title">Users</h2>

          <Button
            v-if="$can(RoleName.ADMIN)"
            variant="secondary"
            @click="onAddUser"
            >Add user</Button
          >
        </div>

        <UserTable />
      </section>

      <section
        class="dashboard__block"
        v-if="$can([RoleName.ADMIN, RoleName.EDITOR])"
      >
        <div class="dashboard__block-header">
          <h2 class="dashboard__block-title">Roles</h2>
        </div>

        <RoleTable />
      </section>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  padding: 1.25rem;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--text-color, #1f2a44);

  .dashboard__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .dashboard__title {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
  }

  .dashboard__user-actions {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  .dashboard__username {
    font-size: 0.95rem;
    color: var(--accent-text, #334155);
    font-weight: 600;
    white-space: nowrap;
  }

  .dashboard__logout-button {
    border: 1px solid var(--primary, #3b82f6);
    background: var(--primary, #3b82f6);
    color: #fff;
    padding: 0.5rem 0.9rem;
    border-radius: 0.45rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 0.2s ease,
      transform 0.15s ease;
  }

  .dashboard__logout-button:hover {
    background: var(--primary-dark, #2563eb);
    transform: translateY(-1px);
  }

  .dashboard__content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .dashboard__block {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: var(--panel-bg, #fff);
    border: 1px solid var(--border, #e5e7eb);
    border-radius: 0.7rem;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);

    .dashboard__block-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .dashboard__block-title {
      margin: 0 0 0.75rem;
      font-size: 1.1rem;
      font-weight: 650;
      color: var(--subtitle-color, #334155);
    }
  }
}
</style>
