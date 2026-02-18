<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="fa-solid fa-store" />
        Store Branches
      </div>
    </q-card-section>

    <div class="q-mt-md">
      <q-scroll-area style="height: 700px; max-width: 1500px">
        <div
          v-if="!branchList || branchList.length === 0"
          class="text-center q-pa-md"
        >
          No data available
        </div>

        <div v-else class="row q-pa-lg q-gutter-y-lg">
          <q-intersection
            v-for="(item, index) in branchList"
            :key="index"
            once
            transition="scale"
            class="example-item q-gutter-sm"
          >
            <q-card class="q-ma-sm my-card" @click="goToBranch(item)">
              <img src="https://cdn.quasar.dev/img/parallax1.jpg" />

              <div
                class="q-pa-sm"
                :class="{
                  'text-subtitle2': item.name.length <= 5,
                  'text-caption text-weight-medium':
                    item.name.length > 10 && item.name.length <= 20,
                  'text-caption': item.name.length > 20,
                }"
              >
                {{ capitalizeFirstLetter(item.name || "N/A") }}
              </div>
              <q-separator />
              <q-card-section class="text-subtitle2 text-weight-regular">
                <div class="q-pa-xm row q-gutter-x-sm justify-between">
                  <div>Warehouse:</div>
                  <div>{{ item.warehouse.name }}</div>
                </div>
                <div class="q-pa-xm row q-gutter-x-sm justify-between">
                  <div>Address:</div>
                  <div>
                    {{ item.location }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-intersection>
        </div>
      </q-scroll-area>
    </div>
  </q-card>
</template>

<script setup>
import { Loading, QSpinnerGears } from "quasar";
import { route } from "quasar/wrappers";
import { useSupervisorStore } from "src/stores/supervisor";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatFullname } = typographyFormat();

const supervisorStore = useSupervisorStore();

const userData = supervisorStore.user;

console.log("userDatasss", userData);

const employeeId =
  userData?.data?.employee_id || userData?.data?.employee?.id || "";

const branchList = computed(() => supervisorStore.supervisorBranch);

console.log("branchList", branchList.value);

const router = useRouter();

const fetchBranch = async () => {
  await supervisorStore.fetchSupervisorBranch(employeeId);
  console.log("branchList", branchList.value);
};

onMounted(fetchBranch);

const goToBranch = async (branch) => {
  console.log("branch", branch);
  Loading.show({
    spinner: QSpinnerGears,
    message: "Please wait...",
  });

  try {
    await router.push({
      name: "BranchDetails",
      params: { branch_id: branch.id },
    });
  } finally {
    Loading.hide();
  }
};
</script>

<style lang="scss" scoped>
.example-item {
  width: 190px;
  height: 300px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  .my-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    img {
      height: 150px;
      width: 100%;
      object-fit: cover;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .product-name {
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      padding: 6px 8px;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .q-card-section {
      padding: 6px 12px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
  }
}
</style>
