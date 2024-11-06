<template>
  <div>
    <q-input
      v-model="searchKeyword"
      @update:model-value="search"
      outlined
      dense
      flat
      label="Search"
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
import { useEmployeeBenefitStore } from "stores/benefit";

const employeeBenefitStore = useEmployeeBenefitStore();
const searchKeyword = ref("");
const loading = ref(false);

const search = async () => {
  loading.value = true;
  await employeeBenefitStore.searchBenefit(searchKeyword.value);
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
