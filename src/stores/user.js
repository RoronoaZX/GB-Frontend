import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useUsersStore = defineStore("users", () => {
  const users = ref([]);
  const user = ref([]);
  const userData = ref({});

  const setUser = (newUser) => {
    userData.value = newUser;
    console.log("userData.valuessssssss", userData.value);
  };

  const fetchUsers = async () => {
    // if (users.value.length) return;
    try {
      const response = await api.get("/api/users");
      users.value = response.data;

      console.log("userdataCard", response.data);
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to fetch users",
      });
    }
  };

  const verifyUserPassword = async (userId, password) => {
    try {
      console.log("Verifying password for user ID:", userId);
      console.log("Password to verify:", password);
      const response = await api.post(`/api/verify-password`, {
        user_id: userId,
        password: password,
      });
      console.log("Password verification response:", response.data);
      return response.data.isValid; // Assuming the backend returns { isValid: true/false }
    } catch (error) {
      console.error("Error verifying password:", error);
      Notify.create({
        type: "negative",
        message: "Failed to verify password",
      });
      return false;
    }
  };

  const fetchUserById = async (userId) => {
    try {
      const response = await api.get(`/api/user/${userId}`);
      user.value = response.data;
      console.log("user dat response", response.data);
    } catch (error) {
      console.error("Error fetching user:", error);

      Notify.create({
        type: "negative",
        message: "Failed to fetch users",
      });
    }
  };

  const registerUser = async (data) => {
    console.log("userdata", data);
    try {
      Loading.show();
      const response = await api.post("/api/register", data);
      console.log("response user data", response.data);
      const newUser = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        birthdate: response.data.user.birthdate,
        address: response.data.user.address,
        sex: response.data.user.sex,
        status: response.data.user.status,
        phone: response.data.user.phone,
        role: response.data.user.role,
        employee_id: response.data.user.employee_id,
        firstname: response.data.user.firstname,
        middlename: response.data.user.middlename,
        lastname: response.data.user.lastname,
        position: response.data.user.position,
      };

      users.value.unshift(newUser);
      Notify.create({
        type: "positive",
        message: "User created successfully",
        // position: "top",
      });
      console.log("response", response.data);
    } catch (error) {
      console.error("User Error message: ", error);
      Notify.create({
        type: "negative",
        message: "Failed to create user",
        // position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  const updateUser = async (userId, data) => {
    try {
      console.log("Updating user with ID:", userId);
      console.log("Data to be sent:", data);

      Loading.show();
      const response = await api.put(
        `/api/update-user-profile/${userId}`,
        data
      );
      console.log("user edited response", response.data);
      const newUser = {
        ...response.data,
        name: data.name,
        email: data.email,
        birthdate: data.birthdate,
        address: data.address,
        sex: data.sex,
        status: data.status,
        phone: data.phone,
        role: data.role,
      };

      console.log("newUser", newUser.data);

      const index = users.value.findIndex((user) => user.id === userId);
      if (index !== -1) {
        users.value[index] = newUser.data;
      }

      // Update the specific user if it's being viewed
      if (user.value.id === userId) {
        user.value = newUser.data;
      }

      Notify.create({
        type: "positive",
        message: "User updated successfully",
      });
      console.log("Updated user response", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
      Notify.create({
        type: "negative",
        message: "Failed to update user",
      });
    } finally {
      Loading.hide();
    }
  };

  const searchUser = async (searchQuery) => {
    try {
      const response = await api.post(`/api/search`, {
        keyword: searchQuery,
      });
      users.value = response.data;
      console.log("Search user", response.data);
    } catch (error) {
      console.error("Error searching user:", error);
      Notify.create({
        type: "negative",
        message: "Failed to search user",
      });
    }
  };

  const searchUserWithID = async (searchQuery, branchId) => {
    try {
      const response = await api.post(`/api/search-user-with-branchID`, {
        keyword: searchQuery,
        branch_id: branchId,
      });
      users.value = response.data;
      console.log("Search user with ID", response.data);
    } catch (error) {
      console.error("Error searching user with ID:", error);
      Notify.create({
        type: "negative",
        message: "Failed to search user with ID",
      });
    }
  };

  const updateEmail = async (id, email) => {
    console.log("====================================");
    console.log("id", id);
    console.log("====================================");
    console.log("====================================");
    console.log("email", email);
    console.log("====================================");

    try {
      const response = await api.put(`/api/user-email/${id}`, {
        email: email,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const updatePassword = async (data) => {
    console.log("Data received for password update:", data);
    try {
      console.log("data", data);
      const response = await api.post(`/api/user-password`, {
        user_id: data.user_id,
        password: data.new_password,
        new_password: data.new_password,
        new_password_confirmation: data.new_password_confirmation,
      });
      console.log("Password update response:", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    user,
    users,
    userData,
    setUser,
    fetchUsers,
    verifyUserPassword,
    registerUser,
    searchUser,
    searchUserWithID,
    fetchUserById,
    updateUser,
    updateEmail,
    updatePassword,
  };
});
