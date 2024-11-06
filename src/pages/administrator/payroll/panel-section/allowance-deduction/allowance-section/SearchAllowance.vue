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
import { computed, ref } from "vue";
import { useEmployeeAllowance } from "stores/allowance";

const employeeAllowanceStore = useEmployeeAllowance();
const employeeAllowanceData = computed(() => employeeAllowanceStore.allowances);
const searchKeyword = ref("");
const loading = ref(false);

const search = async () => {
  loading.value = true;
  await employeeAllowanceStore.searchAllowance(searchKeyword.value);
  // if (searchKeyword.value) {
  //   await employeeAllowanceStore.searchAllowance(searchKeyword.value);
  // }
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
