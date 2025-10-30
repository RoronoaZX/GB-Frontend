<template>
  <q-card class="elegant-container" flat>
    <q-card-section>
      <div align="right">
        <UsersCreate />
      </div>
    </q-card-section>
    <q-card-section>
      <UsersCard />
    </q-card-section>
  </q-card>
</template>

<script setup>
import UsersSearch from "./components/UsersSearch.vue";
import UsersCreate from "./components/UsersCreate.vue";
import UsersCard from "./components/UsersCard.vue";
import UsersTable from "./components/UsersTable.vue";
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
</style>
