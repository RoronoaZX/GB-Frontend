import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useSupervisorStore = defineStore("supervisors", () => {
  const supervisor = ref(null);
  const supervisors = ref([]);
  const supervisorBranch = ref([]);
  const user = ref({});

  const setUser = (newUser) => {
    user.value = newUser;
  };

  const fetchSupervisorBranch = async (employee_id) => {
    console.log("fetchSupervisorBranch", employee_id);
    try {
      const response = await api.get(
        `/api/fetchSupervisorUnderBranch/${employee_id}`
      );
      supervisorBranch.value = response.data;

      console.log("supervisor branch", response.data);
    } catch (error) {
      console.log("supervisor branch error", error);
    }
  };

  return {
    user,
    supervisor,
    supervisors,
    supervisorBranch,
    setUser,
    fetchSupervisorBranch,
  };
});
