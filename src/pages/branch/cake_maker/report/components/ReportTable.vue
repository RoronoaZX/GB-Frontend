<template>
  <div class="q-mt-sm q-gutter-md">
    <div>
      <q-input
        rounded
        outlined
        dense
        debounce="300"
        placeholder="Search"
        style="width: 500px; max-width: 1500px; min-width: 100px"
      >
        <!-- v-model="filter" -->
        <!-- <template v-slot:append>
          <q-icon v-if="!loadingSearchIcon" name="search" />
          <q-spinner v-else />
        </template> -->
      </q-input>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
