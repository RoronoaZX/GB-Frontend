import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthUsersStore = defineStore("authUsers", async () => {
  const user = ref(null);

  const setUser = async (newUser) => {
    user.value = newUser;
  };
});
