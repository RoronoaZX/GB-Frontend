import { ref } from "vue";
import { Notify } from "quasar";
import { useUsersStore } from "src/stores/user";

export function usePasswordConfirm() {
  const userStore = useUsersStore();
  const passwordConfirmDialog = ref(false);
  const passwordConfirmInput = ref("");
  const passwordConfirmShow = ref(false);
  const passwordConfirmLoading = ref(false);
  const passwordConfirmTarget = ref(null);

  /**
   * Open password confirmation modal before executing a sensitive action.
   * @param {Object} options
   * @param {string} options.label - The name of the item or action (e.g. "Analytics Report PDF")
   * @param {string} [options.description] - Custom explanation text
   * @param {Function} options.onConfirm - Async callback to execute upon valid password verification
   */
  const promptPasswordConfirm = ({ label = "Document", description = "", onConfirm }) => {
    passwordConfirmInput.value = "";
    passwordConfirmShow.value = false;
    passwordConfirmTarget.value = {
      label,
      description,
      onConfirm,
    };
    passwordConfirmDialog.value = true;
  };

  const handlePasswordConfirmSubmit = async () => {
    if (!passwordConfirmInput.value) {
      Notify.create({
        message: "Password is required",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
      return;
    }

    passwordConfirmLoading.value = true;
    try {
      const userId = userStore.userData?.data?.id || userStore.userData?.id;
      const isValid = await userStore.verifyUserPassword(userId, passwordConfirmInput.value);

      if (!isValid) {
        Notify.create({
          message: "Incorrect password. Action aborted.",
          color: "negative",
          position: "top",
          timeout: 2500,
        });
        return;
      }

      passwordConfirmDialog.value = false;
      if (passwordConfirmTarget.value && typeof passwordConfirmTarget.value.onConfirm === "function") {
        await passwordConfirmTarget.value.onConfirm();
      }
    } catch (err) {
      console.error("Password confirmation error:", err);
      Notify.create({
        message: "Authentication verification failed",
        color: "negative",
        position: "top",
        timeout: 2500,
      });
    } finally {
      passwordConfirmLoading.value = false;
    }
  };

  return {
    passwordConfirmDialog,
    passwordConfirmInput,
    passwordConfirmShow,
    passwordConfirmLoading,
    passwordConfirmTarget,
    promptPasswordConfirm,
    handlePasswordConfirmSubmit,
  };
}
