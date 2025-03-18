<template>
  <div class="q-mt-lg">
    <div class="q-gutter-x-md" align="center">
      <q-btn
        label="Credit"
        rounded
        style="width: 150px"
        color="light-blue-6"
        class="user-button"
      />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.user-card {
  height: 100%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}
</style>
