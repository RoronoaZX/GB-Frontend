<template>
  <div>
    <q-input
      v-model="searchKeyword"
      @update:model-value="onInput"
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
import { ref } from "vue";

// emits search keyword to parent
const emit = defineEmits(["search"]);

const searchKeyword = ref("");
const loading = ref(false);

// emit value to parent when input updates
const onInput = (val) => {
  loading.value = true;

  emit("search", val); // emit value

  // optional fake delay to show spinner
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
</script>
