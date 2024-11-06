<template>
  <div>
    <q-input
      v-model="searchKeyword"
      @update:model-value="search"
      outlined
      dense
      flat
      label="Search"
      debounce="1000"
      style="width: 300px"
    >
      <template v-slot:append>
        <div>
          <q-icon v-if="!loading" name="search" />
          <q-spinner v-else color="grey" size="sm" />
        </div>
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { useEmployeeStore } from "stores/employee";
import { computed, ref } from "vue";

const employeeStore = useEmployeeStore();
const searchKeyword = ref("");
const loading = ref(false);

const search = async () => {
  loading.value = true;
  await employeeStore.searchEmployee(searchKeyword.value);
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
