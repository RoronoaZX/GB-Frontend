<template>
  <div>
    <q-input
      outlined
      rounded
      dense
      placeholder="Search..."
      style="width: 500px; max-width: 1500px; min-width: 100px"
    >
      <template v-slot:prepend>
        <div>
          <q-icon name="search" />
        </div>
      </template>
    </q-input>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
