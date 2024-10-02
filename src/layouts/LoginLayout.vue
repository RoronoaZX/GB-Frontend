<template>
  <q-layout view="hHh Lpr lff">
    <q-page-container>
      <q-page padding class="flex flex-center login-page">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup></script>

<style scoped>
.login-page {
  /* linear-gradient(135deg, #fecece, #fb7575) */
  background: #f7f8fc;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.login-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-image: url("https://www.transparenttextures.com/patterns/food.png"); */
  opacity: 0.5;
}
</style>
