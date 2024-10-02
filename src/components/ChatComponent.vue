<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <div v-if="showChat" class="chat-card">
      <!-- Chat card content -->
      <div class="chat-header">Chat</div>
      <div class="chat-body">
        <q-chat-message
          name="me"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          stamp="7 minutes ago"
          sent
          text-color="white"
          bg-color="primary"
        >
          <div>Hey there!</div>

          <div>Have you seen Quasar?</div>
        </q-chat-message>

        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          bg-color="amber"
        >
          <q-spinner-dots size="2rem" />
        </q-chat-message>
      </div>
      <div class="chat-footer">
        <!-- Chat input field and send button -->
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  </q-page-sticky>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="red-5" icon="message" size="xl" @click="toggleChat">
      <q-badge color="teal" class="text-white" floating> 2 </q-badge>
    </q-btn>
  </q-page-sticky>
</template>

<script setup>
import { ref } from "vue";

const showChat = ref(false);

const toggleChat = () => {
  showChat.value = !showChat.value;
};
</script>

<style lang="scss" scoped>
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
