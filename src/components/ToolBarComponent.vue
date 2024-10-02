<template>
  <q-btn
    color="red-6"
    flat
    @click="adminDrawer = !adminDrawer"
    round
    dense
    icon="menu"
  />
  <q-toolbar-title class="text-red-6 text-weight-bold"
    >GB Bakeshop</q-toolbar-title
  >

  <div class="q-gutter-sm row items-center no-wrap">
    <q-btn round dense flat icon="message">
      <q-tooltip>Messages</q-tooltip>
    </q-btn>
    <q-btn round dense flat color="grey-10" icon="notifications">
      <q-badge color="red" class="text-white" floating> 2 </q-badge>
      <q-tooltip>Notifications</q-tooltip>
    </q-btn>
    <ProfileAvatarComponent />
  </div>
</template>

<script setup>
import ProfileAvatarComponent from "./ProfileAvatarComponent.vue";
</script>

<style lang="scss" scoped></style>
