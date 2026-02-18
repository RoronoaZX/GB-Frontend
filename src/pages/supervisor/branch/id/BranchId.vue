<template>
  <q-page padding>
    <div class="elegant-container q-gutter-md">
      <div class="text-h6 row justify-between">
        <div>
          <q-btn outline flat icon="arrow_back" @click="navigateBack" />
        </div>
        <div>
          <q-icon name="fa-solid fa-store" color="red-6" />
          {{ capitalizeFirstLetter(branchName) }}
        </div>
      </div>
    </div>
  </q-page>
  <div>This is the ID</div>
</template>

<script setup>
import { Loading, QSpinnerGears } from "quasar";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { typographyFormat } from "src/composables/typography/typography-format";

import { api } from "src/boot/axios";

const { capitalizeFirstLetter } = typographyFormat();

const route = useRoute();
const router = useRouter();

const branchId = route.params.branch_id;

const branchName = ref("");

console.log("branchId", branchId);

const getBranchById = async (branchId) => {
  const res = await api.get(`/api/branches/${branchId}`);
  return res.data;
};

const getBranch = async () => {
  const branchId = route.params.branch_id;
  const branch = await getBranchById(branchId);

  if (branch && branch.name) {
    branchName.value = branch.name;
  } else {
    console.error("Branch data is missing 'name' property or invalid:", branch);
  }
};

onMounted(() => {
  getBranch();
});

const navigateBack = () => {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Please wait...",
  });
  router.push("/supervisor").finally(() => {
    Loading.hide();
  });
};
</script>
