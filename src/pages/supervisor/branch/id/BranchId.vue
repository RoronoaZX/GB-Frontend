<template>
  <q-page flat>
    <div class="text-h6 row justify-between">
      <div>
        <q-btn outline flat icon="arrow_back" @click="navigateBack" />
      </div>
      <div>
        <q-icon name="fa-solid fa-store" color="red-6" />
        {{ capitalizeFirstLetter(branchName) }}
      </div>
    </div>

    <q-tabs
      v-model="tab"
      dense
      outline
      flat
      class="bg-grey-2 text-grey-7 tabs-as-cards"
      inline-label
      align="justify"
      active-color="red-6"
      indicator-color="transparent"
    >
      <!-- indicator-color="red-6" -->
      <!-- class="user-tab justify-center q-ma-md" -->
      <q-route-tab
        :to="{
          name: 'branch-product',
          params: { branch_id: $route.params.branch_id },
        }"
        exact
      >
        <div>Product</div>
      </q-route-tab>

      <q-route-tab :to="{ name: 'branch-raw-materials' }" exact>
        <div>Raw Materials</div>
      </q-route-tab>

      <q-route-tab :to="{ name: 'branch-premix' }" exact>
        <div>Premix</div>
      </q-route-tab>

      <q-route-tab :to="{ name: 'branch-recipe' }" exact>
        <div>Recipe</div>
      </q-route-tab>

      <q-route-tab :to="{ name: 'branch-production' }" exact>
        <div>Production</div>
      </q-route-tab>

      <q-route-tab :to="{ name: 'branch-transactions' }" exact>
        <div>Transactions</div>
      </q-route-tab>

      <q-route-tab :to="{ name: 'branch-employees' }" exact>
        <div>Employees</div>
      </q-route-tab>
    </q-tabs>

    <div style="background-color: #f7f8fc">
      <router-view />
    </div>
  </q-page>
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

const tab = ref("products");

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

<style scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}

.q-tabs--not-scrollable .q-tabs__content,
body.mobile .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__content {
  overflow: visible;
}

.tabs-as-cards {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
}

.tabs-as-cards .q-tab {
  background-color: white;
  color: #333;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin: 0 8px;
  padding: 10px 20px;
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.tabs-as-cards .q-tab:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.tabs-as-cards .q-tab--active {
  background-color: #e0e0e0;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.tab-content {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
