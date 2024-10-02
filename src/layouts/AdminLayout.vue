<template>
  <q-layout view="hHh Lpr lff">
    <div>
      <HeaderComponent />
    </div>
    <q-page-container style="background: #f7f8fc">
      <router-view />
    </q-page-container>
    <div>
      <!-- <ChatComponent /> -->
    </div>
  </q-layout>
</template>

<script setup>
// import ChatComponent from "../components/ChatComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
</script>

<style scoped>
.my-menu-link {
  color: white;
  background: #ef4444;
}
.account-card {
  position: absolute;
  z-index: 999; /* Ensure the card is above other elements */
}
.chat-card {
  position: absolute;
  bottom: 90px; /* Adjust this value based on your layout */
  right: 18px;
  width: 300px; /* Adjust the width as needed */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.elegant-container {
  background: #f7f8fc;
  padding: 1rem;
  border-radius: 8px;
}

.chat-header {
  padding: 12px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.chat-body {
  padding: 12px;
  height: 200px; /* Adjust the height as needed */
  overflow-y: auto;
}

.chat-footer {
  padding: 12px;
  border-top: 1px solid #ccc;
}

.chat-footer input[type="text"] {
  width: calc(100% - 60px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.chat-footer button {
  width: 50px;
  padding: 8px;
  margin-left: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.q-chat-message {
  width: calc(100% - 24px); /* Adjust the width to fit within the chat card */
  max-width: calc(
    100% - 24px
  ); /* Ensure the message does not exceed the chat card width */
  margin-bottom: 8px; /* Add some margin between messages */
}

.q-chat-message .q-chat-message-content {
  max-width: calc(100% - 48px); /* Adjust the width of the message content */
}

.q-chat-message .q-chat-message-bubble {
  max-width: calc(100% - 48px); /* Adjust the width of the message bubble */
}

.q-chat-message .q-chat-message-bubble:before {
  border-width: 8px 8px 8px 0; /* Adjust the size of the arrow */
}
</style>
