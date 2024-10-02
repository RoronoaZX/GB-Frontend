<template>
  <q-input
    v-model="searchEngine"
    @update:mmodel-value="onSearch"
    rounded
    outlined
    dense
    flat
    placeholder="Search..."
    style="width: 500px; max-width: 1500px; min-width: 100px"
  >
    <template v-slot:append>
      <div>
        <q-icon name="search" />
      </div>
    </template>
  </q-input>
</template>

<script setup>
import { ref } from "vue";

const searchEngine = ref("");

const onSearch = () => {
  defineEmits("searchEngine", searchEngine.value);
};
</script>
