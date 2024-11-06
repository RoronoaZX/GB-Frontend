import { d as defineStore, n as ref, N as Notify, P as Plugin } from "./index.9b9dbcba.js";
import { api } from "./axios.91431b0b.js";
const useUsersStore = defineStore("users", () => {
  const users = ref([]);
  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users");
      users.value = response.data;
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
      users.value = response.data;
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
    try {
      Plugin.show();
      const response = await api.post("/api/register", data);
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
  const searchUser = async (searchQuery) => {
    try {
      const response = await api.post(`/api/search-user`, {
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
  return {
    users,
    fetchUsers,
    registerUser,
    searchUser,
    searchUserWithID,
    fetchUserById
  };
});
export { useUsersStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci45ZDhiZmYxNC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0b3Jlcy91c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyBMb2FkaW5nLCBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGNvbnN0IHVzZVVzZXJzU3RvcmUgPSBkZWZpbmVTdG9yZShcInVzZXJzXCIsICgpID0+IHtcbiAgY29uc3QgdXNlcnMgPSByZWYoW10pO1xuXG4gIGNvbnN0IGZldGNoVXNlcnMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcIi9hcGkvdXNlcnNcIik7XG4gICAgICB1c2Vycy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGZldGNoIHVzZXJzXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGZldGNoVXNlckJ5SWQgPSBhc3luYyAodXNlcklkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChgL2FwaS91c2VyLyR7dXNlcklkfWApO1xuICAgICAgdXNlcnMudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGRhdCByZXNwb25zZVwiLCByZXNwb25zZS5kYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHVzZXI6XCIsIGVycm9yKTtcblxuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gZmV0Y2ggdXNlcnNcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWdpc3RlclVzZXIgPSBhc3luYyAoZGF0YSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBMb2FkaW5nLnNob3coKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL3JlZ2lzdGVyXCIsIGRhdGEpO1xuXG4gICAgICBjb25zdCBuZXdVc2VyID0ge1xuICAgICAgICAuLi5yZXNwb25zZS5kYXRhLFxuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIGVtYWlsOiBkYXRhLmVtYWlsLFxuICAgICAgICBiaXJ0aGRhdGU6IGRhdGEuYmlydGhkYXRlLFxuICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MsXG4gICAgICAgIHNleDogZGF0YS5zZXgsXG4gICAgICAgIHN0YXR1czogZGF0YS5zdGF0dXMsXG4gICAgICAgIHBob25lOiBkYXRhLnBob25lLFxuICAgICAgICByb2xlOiBkYXRhLnJvbGUsXG4gICAgICB9O1xuICAgICAgdXNlcnMudmFsdWUudW5zaGlmdChuZXdVc2VyKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiVXNlciBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVXNlciBFcnJvciBtZXNzYWdlOiBcIiwgZXJyb3IpO1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gY3JlYXRlIHVzZXJcIixcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2VhcmNoVXNlciA9IGFzeW5jIChzZWFyY2hRdWVyeSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KGAvYXBpL3NlYXJjaC11c2VyYCwge1xuICAgICAgICBrZXl3b3JkOiBzZWFyY2hRdWVyeSxcbiAgICAgIH0pO1xuICAgICAgdXNlcnMudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICAgICAgY29uc29sZS5sb2coXCJTZWFyY2ggdXNlclwiLCByZXNwb25zZS5kYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyB1c2VyOlwiLCBlcnJvcik7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byBzZWFyY2ggdXNlclwiLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNlYXJjaFVzZXJXaXRoSUQgPSBhc3luYyAoc2VhcmNoUXVlcnksIGJyYW5jaElkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoYC9hcGkvc2VhcmNoLXVzZXItd2l0aC1icmFuY2hJRGAsIHtcbiAgICAgICAga2V5d29yZDogc2VhcmNoUXVlcnksXG4gICAgICAgIGJyYW5jaF9pZDogYnJhbmNoSWQsXG4gICAgICB9KTtcbiAgICAgIHVzZXJzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIHVzZXIgd2l0aCBJRFwiLCByZXNwb25zZS5kYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyB1c2VyIHdpdGggSUQ6XCIsIGVycm9yKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHNlYXJjaCB1c2VyIHdpdGggSURcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHVzZXJzLFxuICAgIGZldGNoVXNlcnMsXG4gICAgcmVnaXN0ZXJVc2VyLFxuICAgIHNlYXJjaFVzZXIsXG4gICAgc2VhcmNoVXNlcldpdGhJRCxcbiAgICBmZXRjaFVzZXJCeUlkLFxuICB9O1xufSk7XG4iXSwibmFtZXMiOlsiTG9hZGluZyJdLCJtYXBwaW5ncyI6Ijs7QUFLWSxNQUFDLGdCQUFnQixZQUFZLFNBQVMsTUFBTTtBQUN0RCxRQUFNLFFBQVEsSUFBSSxDQUFBLENBQUU7QUFFcEIsUUFBTSxhQUFhLFlBQVk7QUFDN0IsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLElBQUksSUFBSSxZQUFZO0FBQzNDLFlBQU0sUUFBUSxTQUFTO0FBQUEsSUFDeEIsU0FBUSxPQUFQO0FBQ0EsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDakIsQ0FBTztBQUFBLElBQ0Y7QUFBQSxFQUNMO0FBQ0UsUUFBTSxnQkFBZ0IsT0FBTyxXQUFXO0FBQ3RDLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksYUFBYSxRQUFRO0FBQ3BELFlBQU0sUUFBUSxTQUFTO0FBQ3ZCLGNBQVEsSUFBSSxxQkFBcUIsU0FBUyxJQUFJO0FBQUEsSUFDL0MsU0FBUSxPQUFQO0FBQ0EsY0FBUSxNQUFNLHdCQUF3QixLQUFLO0FBRTNDLGFBQU8sT0FBTztBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ2pCLENBQU87QUFBQSxJQUNGO0FBQUEsRUFDTDtBQUVFLFFBQU0sZUFBZSxPQUFPLFNBQVM7QUFDbkMsUUFBSTtBQUNGQSxhQUFRLEtBQUk7QUFDWixZQUFNLFdBQVcsTUFBTSxJQUFJLEtBQUssaUJBQWlCLElBQUk7QUFFckQsWUFBTSxVQUFVO0FBQUEsUUFDZCxHQUFHLFNBQVM7QUFBQSxRQUNaLE1BQU0sS0FBSztBQUFBLFFBQ1gsT0FBTyxLQUFLO0FBQUEsUUFDWixXQUFXLEtBQUs7QUFBQSxRQUNoQixTQUFTLEtBQUs7QUFBQSxRQUNkLEtBQUssS0FBSztBQUFBLFFBQ1YsUUFBUSxLQUFLO0FBQUEsUUFDYixPQUFPLEtBQUs7QUFBQSxRQUNaLE1BQU0sS0FBSztBQUFBLE1BQ25CO0FBQ00sWUFBTSxNQUFNLFFBQVEsT0FBTztBQUMzQixhQUFPLE9BQU87QUFBQSxRQUNaLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNqQixDQUFPO0FBQ0QsY0FBUSxJQUFJLFlBQVksU0FBUyxJQUFJO0FBQUEsSUFDdEMsU0FBUSxPQUFQO0FBQ0EsY0FBUSxNQUFNLHdCQUF3QixLQUFLO0FBQzNDLGFBQU8sT0FBTztBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ2pCLENBQU87QUFBQSxJQUNQLFVBQWM7QUFDUkEsYUFBUSxLQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0w7QUFFRSxRQUFNLGFBQWEsT0FBTyxnQkFBZ0I7QUFDeEMsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLElBQUksS0FBSyxvQkFBb0I7QUFBQSxRQUNsRCxTQUFTO0FBQUEsTUFDakIsQ0FBTztBQUNELFlBQU0sUUFBUSxTQUFTO0FBQ3ZCLGNBQVEsSUFBSSxlQUFlLFNBQVMsSUFBSTtBQUFBLElBQ3pDLFNBQVEsT0FBUDtBQUNBLGNBQVEsTUFBTSx5QkFBeUIsS0FBSztBQUM1QyxhQUFPLE9BQU87QUFBQSxRQUNaLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNqQixDQUFPO0FBQUEsSUFDRjtBQUFBLEVBQ0w7QUFFRSxRQUFNLG1CQUFtQixPQUFPLGFBQWEsYUFBYTtBQUN4RCxRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU0sSUFBSSxLQUFLLGtDQUFrQztBQUFBLFFBQ2hFLFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxNQUNuQixDQUFPO0FBQ0QsWUFBTSxRQUFRLFNBQVM7QUFDdkIsY0FBUSxJQUFJLHVCQUF1QixTQUFTLElBQUk7QUFBQSxJQUNqRCxTQUFRLE9BQVA7QUFDQSxjQUFRLE1BQU0saUNBQWlDLEtBQUs7QUFDcEQsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDakIsQ0FBTztBQUFBLElBQ0Y7QUFBQSxFQUNMO0FBRUUsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFDQSxDQUFDOzsifQ==
