// src/stores/loadingBar.js
import { defineStore } from "pinia";

export const useLoadingBarStore = defineStore("loadingBar", {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    start() {
      this.isLoading = true;
    },
    stop() {
      this.isLoading = false;
    },
  },
});
