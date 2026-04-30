import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useBreadOutStore = defineStore("breadOut", {
  state: () => ({
    breadOuts: [],
    loading: false,
  }),
  actions: {
    async fetchBreadOuts(params = {}) {
      this.loading = true;
      try {
        const response = await api.get("/api/bread-outs", { params });
        this.breadOuts = response.data;
        return response.data;
      } catch (error) {
        console.error("Error fetching bread outs", error);
      } finally {
        this.loading = false;
      }
    },
    async sendForRepurposing(payload) {
      this.loading = true;
      try {
        const response = await api.post("/api/bread-outs", payload);
        Notify.create({
          type: "positive",
          message: "Bread successfully sent for repurposing",
        });
        return { success: true, data: response.data };
      } catch (error) {
        console.error("Error sending bread out", error);
        Notify.create({
          type: "negative",
          message: error.response?.data?.message || "Failed to send bread",
        });
        return { success: false, error: error.response?.data };
      } finally {
        this.loading = false;
      }
    },
    async processConversion(payload) {
      this.loading = true;
      try {
        const response = await api.post("/api/repurpose/conversion", payload);
        Notify.create({
          type: "positive",
          message: "Bread successfully converted",
        });
        return { success: true, data: response.data };
      } catch (error) {
        console.error("Error processing conversion", error);
        Notify.create({
          type: "negative",
          message: error.response?.data?.message || "Failed to convert bread",
        });
        return { success: false, error: error.response?.data };
      } finally {
        this.loading = false;
      }
    },
    async processSpoilage(payload) {
      this.loading = true;
      try {
        const response = await api.post("/api/repurpose/spoilage", payload);
        Notify.create({
          type: "positive",
          message: "Spoilage logged successfully",
        });
        return { success: true, data: response.data };
      } catch (error) {
        console.error("Error processing spoilage", error);
        Notify.create({
          type: "negative",
          message: error.response?.data?.message || "Failed to log spoilage",
        });
        return { success: false, error: error.response?.data };
      } finally {
        this.loading = false;
      }
    },
  },
});
