import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useSupervisorStore = defineStore("supervisors", {
  state: () => ({
    supervisors: [],
    user: {},
  }),

  actions: {
    setUser(user) {
      this.user = user;
    },

    async fetchSupervisorUnderBranch(employee_id) {
      const response = await api.get(
        `/api/fetchSupervisorUnderBranch/${employee_id}`
      );
      this.supervisors = response.data;
    },
  },
});
// const supervisor = ref(null);
// const supervisors = ref([]);
// const user = ref({});

// const fetchSupervisorUnderBranch = async (employee_id) => {
//   const response = await api.get(
//     `/api/fetchSupervisorUnderBranch/${employee_id}`
//   );
//   supervisors.value = response.data;
// };

//   return {
//     supervisor,
//     supervisors,
//     fetchSupervisorUnderBranch,
//   };
// });
