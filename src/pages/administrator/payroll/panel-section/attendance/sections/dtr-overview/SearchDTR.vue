<template>
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
</template>

<script setup>
import { useDTRStore } from "stores/dtr";
import { ref } from "vue";

const dtrStore = useDTRStore();
const searchKeyword = ref("");
const loading = ref(false);

const search = async () => {
  loading.value = true;
  await dtrStore.searchDTR(searchKeyword.value);
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
