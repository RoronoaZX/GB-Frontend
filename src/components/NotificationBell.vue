<template>
  <q-btn round dense flat color="grey-10" icon="notifications">
    <q-menu>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md" align="center">Notifications</div>
          <q-list>
            <q-separator />
            <q-item clickable>
              <q-item-section>Account</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Help &amp; Feedback</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script setup></script>
