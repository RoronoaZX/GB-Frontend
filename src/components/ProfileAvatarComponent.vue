<template>
  <q-btn round flat>
    <q-avatar size="26px">
      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
    </q-avatar>
    <q-menu
      transition-show="scale"
      transition-hide="scale"
      anchor="bottom left"
      self="top left"
    >
      <q-list style="min-width: 100px">
        <q-item clickable>
          <q-item-section avatar>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="q-text-truncate text-primary">
              {{ formattedUserName }}
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-avatar icon="settings" size="xl" />
          </q-item-section>
          <q-item-section>Setting</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable @click="signOut">
          <q-item-section avatar>
            <q-avatar icon="logout" size="xl" />
          </q-item-section>
          <q-item-section>Sign Out</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <q-dialog v-model="loading">
      <q-card>
        <q-card-section class="row items-center q-gutter-md">
          <span class="q-ml-md">Signing out</span>
          <q-spinner-dots size="50px" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-btn>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const user = ref({});
const loading = ref(false);
const router = useRouter();
// onMounted(async () => {
//   try {
//     const response = await api.get("/api/profile");
//     user.value = response.data;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }
// });

const signOut = () => {
  loading.value = true;
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("activeMenuItem");
    loading.value = false;
    router.push("/");
  }, 1000);
};

const formattedUserName = computed(() => {
  const { firstname, middlename, lastname } = user.value.data.employee;

  // Split first name if it has multiple words
  const formattedFirstName = firstname
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");

  const middleInitial = middlename
    ? `${middlename.charAt(0).toUpperCase()}.`
    : "";
  const lastInitial = lastname.charAt(0).toUpperCase();

  return `${formattedFirstName} ${middleInitial} ${lastInitial}${lastname.slice(
    1
  )}`;
});
</script>

<style lang="scss" scoped></style>
