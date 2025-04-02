<template>
  <div>
    <q-btn
      padding="xs md"
      label="Add Recipe"
      icon="add"
      outline
      class="user-button"
      @click="openDialog"
    />
  </div>
  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="background-color: #f7f8fc">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #9c27b0"
      >
        <div class="text-h6">Add Recipe To Report</div>
        <q-space />
        <div class="row q-gutter-x-md">
          <div>
            <q-btn icon="close" flat dense round v-close-popup>
              <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1 text-weight-medium">
          Baker:
          {{ formatFullname(reportsData[0]?.user?.employee) || "Undefined" }}
        </div>
      </q-card-section>
      <q-card-section>
        <RecipeSearch />
      </q-card-section>
      <q-card-section>
        <RecipeInput />
      </q-card-section>
      <q-card-section>
        <ReportList />
      </q-card-section>
      <q-card-section>
        <div align="right">
          <q-btn
            color="red-6"
            icon="edit"
            label="Create"
            @click="saveReports"
          />
          <!-- @click="saveReports"
            :loading="loading" -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import RecipeSearch from "./adding-recipe-report/RecipeSearch.vue";
import RecipeInput from "./adding-recipe-report/RecipeInput.vue";
import ReportList from "./adding-recipe-report/ReportList.vue";
import { useBakerReportsStore } from "src/stores/baker-report";

const bakerReportStore = useBakerReportsStore();
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
const loading = ref(false);
const maximizedToggle = ref(true);
const props = defineProps(["reportsData"]);
console.log("reportsDatasssss", props.reportsData);

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString().slice(0, 19).replace("T", " ");
};

const saveReports = async () => {
  const branch_id = props.reportsData[0]?.branch_id || "";
  const created_at = formatDate(props.reportsData[0]?.created_at) || "";
  const user_id = props.reportsData[0]?.user_id || "";
  console.log("branch_id", branch_id);
  console.log("created_at", created_at);
  console.log("user_id", user_id);

  try {
    loading.value = true;
    const addingRecipeReport = bakerReportStore.reports.map((report) => ({
      ...report,
      created_at: created_at,
      branch_id: branch_id,
      user_id: user_id,
    }));
    console.log("addingRecipeReportssss", addingRecipeReport);
    await bakerReportStore.adminAddRecipebakerReport(addingRecipeReport);
  } catch (error) {
    console.error("Error saving reports:", error);
  }
};
</script>

<style lang="scss" scoped>
.user-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}
</style>
