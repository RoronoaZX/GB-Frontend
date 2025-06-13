// stores/dtr.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useDTRStore = defineStore("dtrs", () => {
  const dtr = ref(null);
  const dtrs = ref([]);
  const dtrCutOffData = ref([]);
  const user = ref({});

  const setUser = (newUser) => {
    console.log("Setting user in DTR store:", newUser.data);
    user.value = newUser.data;
  };

  const fetchDTR = async (page, rowsPerPage, search) => {
    try {
      const response = await api.get("/api/dtr", {
        params: { page: page, per_page: rowsPerPage, search },
      });
      if (response && response.data) {
        dtrs.value = response.data; // Assign the fetched data to the store
        return response.data; // Return the fetched data
      } else {
        console.warn("No data returned from API.");
        dtrs.value = [];
        return [];
      }
    } catch (error) {
      console.error("Error fetching DTR data:", error);
      dtrs.value = [];
      return [];
    }
  };

  const fetchDTRRange = async (data) => {
    // Send a POST request to fetch DTR data
    console.log("Fetching DTR Range with data:", data);
    const response = await api.post("/api/dtr-data", data);
    console.log("DTR Range response:", response);

    // Assuming your DTR store has a method to set the fetched data
    dtrCutOffData.value = response.data;
  };

  const searchDTR = async (keyword) => {
    try {
      console.log("Searching for DTR with keyword:", keyword);
      const response = await api.post(`/api/search-drt?keyword=${keyword}`);
      console.log("DTR response:", response);
      dtrs.value = response.data;
    } catch (error) {
      console.error("Error searching DTR:", error);
    }
  };

  const saveOvertime = async (data) => {
    const response = await api.post("/api/saveOvertime", data);
    dtrs.value = response.data;
    fetchDTR();
    Notify.create({
      type: "positive",
      message: "Over Time Save",
    });
  };

  const approveOvertime = async (data) => {
    console.log("Approving overtime with data:", data);
    try {
      const response = await api.post("/api/approveOvertime", data);
      Notify.create({
        type: "positive",
        message: "Over Time Approved",
      });
      return response.data;
    } catch (error) {
      console.error("Error approving overtime:", error);
    }
    // Return the response data for further processing if needed
  };

  const declineOvertime = async (data) => {
    const response = await api.post("/api/declineOvertime", data);

    Notify.create({
      type: "negative",
      message: "Over Time Declined",
    });
    return response.data;
  };

  return {
    dtr,
    dtrs,
    dtrCutOffData,
    user,
    setUser,
    fetchDTR,
    fetchDTRRange,
    saveOvertime,
    searchDTR,
    approveOvertime,
    declineOvertime,
  };
});
