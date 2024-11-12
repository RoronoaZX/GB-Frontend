import { d as defineStore, n as ref, N as Notify, P as Plugin } from "./index.c8e2405b.js";
import { api } from "./axios.aa1bce92.js";
const useUsersStore = defineStore("users", () => {
  const users = ref([]);
  const user = ref([]);
  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users");
      users.value = response.data;
      console.log("userdataCard", response.data);
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to fetch users"
      });
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
        message: "Failed to fetch users"
      });
    }
  };
  const registerUser = async (data) => {
    console.log("userdata", data);
    try {
      Plugin.show();
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
        position: response.data.user.position
      };
      users.value.unshift(newUser);
      Notify.create({
        type: "positive",
        message: "User created successfully"
      });
      console.log("response", response.data);
    } catch (error) {
      console.error("User Error message: ", error);
      Notify.create({
        type: "negative",
        message: "Failed to create user"
      });
    } finally {
      Plugin.hide();
    }
  };
  const updateUser = async (userId, data) => {
    try {
      console.log("Updating user with ID:", userId);
      console.log("Data to be sent:", data);
      Plugin.show();
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
        role: data.role
      };
      console.log("newUser", newUser.data);
      const index = users.value.findIndex((user2) => user2.id === userId);
      if (index !== -1) {
        users.value[index] = newUser.data;
      }
      if (user.value.id === userId) {
        user.value = newUser.data;
      }
      Notify.create({
        type: "positive",
        message: "User updated successfully"
      });
      console.log("Updated user response", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
      Notify.create({
        type: "negative",
        message: "Failed to update user"
      });
    } finally {
      Plugin.hide();
    }
  };
  const searchUser = async (searchQuery) => {
    try {
      const response = await api.post(`/api/search`, {
        keyword: searchQuery
      });
      users.value = response.data;
      console.log("Search user", response.data);
    } catch (error) {
      console.error("Error searching user:", error);
      Notify.create({
        type: "negative",
        message: "Failed to search user"
      });
    }
  };
  const searchUserWithID = async (searchQuery, branchId) => {
    try {
      const response = await api.post(`/api/search-user-with-branchID`, {
        keyword: searchQuery,
        branch_id: branchId
      });
      users.value = response.data;
      console.log("Search user with ID", response.data);
    } catch (error) {
      console.error("Error searching user with ID:", error);
      Notify.create({
        type: "negative",
        message: "Failed to search user with ID"
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
        email
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return {
    user,
    users,
    fetchUsers,
    registerUser,
    searchUser,
    searchUserWithID,
    fetchUserById,
    updateUser,
    updateEmail
  };
});
export { useUsersStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci45ZDI4YTQ0MS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0b3Jlcy91c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyBMb2FkaW5nLCBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGNvbnN0IHVzZVVzZXJzU3RvcmUgPSBkZWZpbmVTdG9yZShcInVzZXJzXCIsICgpID0+IHtcbiAgY29uc3QgdXNlcnMgPSByZWYoW10pO1xuICBjb25zdCB1c2VyID0gcmVmKFtdKTtcblxuICBjb25zdCBmZXRjaFVzZXJzID0gYXN5bmMgKCkgPT4ge1xuICAgIC8vIGlmICh1c2Vycy52YWx1ZS5sZW5ndGgpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS91c2Vyc1wiKTtcbiAgICAgIHVzZXJzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgY29uc29sZS5sb2coXCJ1c2VyZGF0YUNhcmRcIiwgcmVzcG9uc2UuZGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGZldGNoIHVzZXJzXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGZldGNoVXNlckJ5SWQgPSBhc3luYyAodXNlcklkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChgL2FwaS91c2VyLyR7dXNlcklkfWApO1xuICAgICAgdXNlci52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBjb25zb2xlLmxvZyhcInVzZXIgZGF0IHJlc3BvbnNlXCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgdXNlcjpcIiwgZXJyb3IpO1xuXG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byBmZXRjaCB1c2Vyc1wiLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlZ2lzdGVyVXNlciA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJ1c2VyZGF0YVwiLCBkYXRhKTtcbiAgICB0cnkge1xuICAgICAgTG9hZGluZy5zaG93KCk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFwiL2FwaS9yZWdpc3RlclwiLCBkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2UgdXNlciBkYXRhXCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgY29uc3QgbmV3VXNlciA9IHtcbiAgICAgICAgaWQ6IHJlc3BvbnNlLmRhdGEudXNlci5pZCxcbiAgICAgICAgbmFtZTogcmVzcG9uc2UuZGF0YS51c2VyLm5hbWUsXG4gICAgICAgIGVtYWlsOiByZXNwb25zZS5kYXRhLnVzZXIuZW1haWwsXG4gICAgICAgIGJpcnRoZGF0ZTogcmVzcG9uc2UuZGF0YS51c2VyLmJpcnRoZGF0ZSxcbiAgICAgICAgYWRkcmVzczogcmVzcG9uc2UuZGF0YS51c2VyLmFkZHJlc3MsXG4gICAgICAgIHNleDogcmVzcG9uc2UuZGF0YS51c2VyLnNleCxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5kYXRhLnVzZXIuc3RhdHVzLFxuICAgICAgICBwaG9uZTogcmVzcG9uc2UuZGF0YS51c2VyLnBob25lLFxuICAgICAgICByb2xlOiByZXNwb25zZS5kYXRhLnVzZXIucm9sZSxcbiAgICAgICAgZW1wbG95ZWVfaWQ6IHJlc3BvbnNlLmRhdGEudXNlci5lbXBsb3llZV9pZCxcbiAgICAgICAgZmlyc3RuYW1lOiByZXNwb25zZS5kYXRhLnVzZXIuZmlyc3RuYW1lLFxuICAgICAgICBtaWRkbGVuYW1lOiByZXNwb25zZS5kYXRhLnVzZXIubWlkZGxlbmFtZSxcbiAgICAgICAgbGFzdG5hbWU6IHJlc3BvbnNlLmRhdGEudXNlci5sYXN0bmFtZSxcbiAgICAgICAgcG9zaXRpb246IHJlc3BvbnNlLmRhdGEudXNlci5wb3NpdGlvbixcbiAgICAgIH07XG5cbiAgICAgIHVzZXJzLnZhbHVlLnVuc2hpZnQobmV3VXNlcik7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIlVzZXIgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2VcIiwgcmVzcG9uc2UuZGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVc2VyIEVycm9yIG1lc3NhZ2U6IFwiLCBlcnJvcik7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byBjcmVhdGUgdXNlclwiLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlVXNlciA9IGFzeW5jICh1c2VySWQsIGRhdGEpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coXCJVcGRhdGluZyB1c2VyIHdpdGggSUQ6XCIsIHVzZXJJZCk7XG4gICAgICBjb25zb2xlLmxvZyhcIkRhdGEgdG8gYmUgc2VudDpcIiwgZGF0YSk7XG5cbiAgICAgIExvYWRpbmcuc2hvdygpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KFxuICAgICAgICBgL2FwaS91cGRhdGUtdXNlci1wcm9maWxlLyR7dXNlcklkfWAsXG4gICAgICAgIGRhdGFcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhcInVzZXIgZWRpdGVkIHJlc3BvbnNlXCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgY29uc3QgbmV3VXNlciA9IHtcbiAgICAgICAgLi4ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICBlbWFpbDogZGF0YS5lbWFpbCxcbiAgICAgICAgYmlydGhkYXRlOiBkYXRhLmJpcnRoZGF0ZSxcbiAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLFxuICAgICAgICBzZXg6IGRhdGEuc2V4LFxuICAgICAgICBzdGF0dXM6IGRhdGEuc3RhdHVzLFxuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSxcbiAgICAgICAgcm9sZTogZGF0YS5yb2xlLFxuICAgICAgfTtcblxuICAgICAgY29uc29sZS5sb2coXCJuZXdVc2VyXCIsIG5ld1VzZXIuZGF0YSk7XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gdXNlcnMudmFsdWUuZmluZEluZGV4KCh1c2VyKSA9PiB1c2VyLmlkID09PSB1c2VySWQpO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB1c2Vycy52YWx1ZVtpbmRleF0gPSBuZXdVc2VyLmRhdGE7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgc3BlY2lmaWMgdXNlciBpZiBpdCdzIGJlaW5nIHZpZXdlZFxuICAgICAgaWYgKHVzZXIudmFsdWUuaWQgPT09IHVzZXJJZCkge1xuICAgICAgICB1c2VyLnZhbHVlID0gbmV3VXNlci5kYXRhO1xuICAgICAgfVxuXG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIlVzZXIgdXBkYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coXCJVcGRhdGVkIHVzZXIgcmVzcG9uc2VcIiwgcmVzcG9uc2UuZGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyB1c2VyOlwiLCBlcnJvcik7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byB1cGRhdGUgdXNlclwiLFxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIExvYWRpbmcuaGlkZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZWFyY2hVc2VyID0gYXN5bmMgKHNlYXJjaFF1ZXJ5KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoYC9hcGkvc2VhcmNoYCwge1xuICAgICAgICBrZXl3b3JkOiBzZWFyY2hRdWVyeSxcbiAgICAgIH0pO1xuICAgICAgdXNlcnMudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICAgICAgY29uc29sZS5sb2coXCJTZWFyY2ggdXNlclwiLCByZXNwb25zZS5kYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyB1c2VyOlwiLCBlcnJvcik7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byBzZWFyY2ggdXNlclwiLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNlYXJjaFVzZXJXaXRoSUQgPSBhc3luYyAoc2VhcmNoUXVlcnksIGJyYW5jaElkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoYC9hcGkvc2VhcmNoLXVzZXItd2l0aC1icmFuY2hJRGAsIHtcbiAgICAgICAga2V5d29yZDogc2VhcmNoUXVlcnksXG4gICAgICAgIGJyYW5jaF9pZDogYnJhbmNoSWQsXG4gICAgICB9KTtcbiAgICAgIHVzZXJzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIHVzZXIgd2l0aCBJRFwiLCByZXNwb25zZS5kYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyB1c2VyIHdpdGggSUQ6XCIsIGVycm9yKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHNlYXJjaCB1c2VyIHdpdGggSURcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB1cGRhdGVFbWFpbCA9IGFzeW5jIChpZCwgZW1haWwpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbiAgICBjb25zb2xlLmxvZyhcImlkXCIsIGlkKTtcbiAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbiAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbiAgICBjb25zb2xlLmxvZyhcImVtYWlsXCIsIGVtYWlsKTtcbiAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoYC9hcGkvdXNlci1lbWFpbC8ke2lkfWAsIHtcbiAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIiwgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHVzZXIsXG4gICAgdXNlcnMsXG4gICAgZmV0Y2hVc2VycyxcbiAgICByZWdpc3RlclVzZXIsXG4gICAgc2VhcmNoVXNlcixcbiAgICBzZWFyY2hVc2VyV2l0aElELFxuICAgIGZldGNoVXNlckJ5SWQsXG4gICAgdXBkYXRlVXNlcixcbiAgICB1cGRhdGVFbWFpbCxcbiAgfTtcbn0pO1xuIl0sIm5hbWVzIjpbIkxvYWRpbmciLCJ1c2VyIl0sIm1hcHBpbmdzIjoiOztBQUtZLE1BQUMsZ0JBQWdCLFlBQVksU0FBUyxNQUFNO0FBQ3RELFFBQU0sUUFBUSxJQUFJLENBQUEsQ0FBRTtBQUNwQixRQUFNLE9BQU8sSUFBSSxDQUFBLENBQUU7QUFFbkIsUUFBTSxhQUFhLFlBQVk7QUFFN0IsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLElBQUksSUFBSSxZQUFZO0FBQzNDLFlBQU0sUUFBUSxTQUFTO0FBRXZCLGNBQVEsSUFBSSxnQkFBZ0IsU0FBUyxJQUFJO0FBQUEsSUFDMUMsU0FBUSxPQUFQO0FBQ0EsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDakIsQ0FBTztBQUFBLElBQ0Y7QUFBQSxFQUNMO0FBQ0UsUUFBTSxnQkFBZ0IsT0FBTyxXQUFXO0FBQ3RDLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksYUFBYSxRQUFRO0FBQ3BELFdBQUssUUFBUSxTQUFTO0FBQ3RCLGNBQVEsSUFBSSxxQkFBcUIsU0FBUyxJQUFJO0FBQUEsSUFDL0MsU0FBUSxPQUFQO0FBQ0EsY0FBUSxNQUFNLHdCQUF3QixLQUFLO0FBRTNDLGFBQU8sT0FBTztBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ2pCLENBQU87QUFBQSxJQUNGO0FBQUEs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
