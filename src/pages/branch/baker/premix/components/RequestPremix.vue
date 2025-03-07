<template>
  <div align="right">
    <q-btn
      class="bg-gradient q-pa-sm text-white"
      dense
      elevated
      icon="shopping_cart"
      label="Request Premix"
      @click="openDialog"
    />
  </div>

  <q-dialog
    v-model="dialog"
    backdrop-filter="blur(4px) saturate(150%)"
    position="right"
  >
    <q-card style="width: 800px; max-width: 100vw">
      <q-card-section
        class="row items-center q-px-md q-py-sm bg-gradient text-white"
      >
        <div class="text-h5 q-mr-md">🛒 Request Premixss</div>
        <q-space />
        <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
      </q-card-section>
      <div class="q-ma-md">
        <q-input
          v-model="searchQuery"
          @update:model-value="search"
          rounded
          outlined
          dense
          debounce="300"
          placeholder="Search"
          style="width: 500px; max-width: 1500px; min-width: 100px"
        >
          <template v-slot:append>
            <div>
              <q-icon name="search" />
            </div>
            <div v-if="searchQuery" class="custom-list z-top">
              <q-card>
                <q-list separator>
                  <q-item v-if="!premixDatas?.length">
                    No record found.
                  </q-item>
                  <template v-else>
                    <q-item
                      v-for="premixData in premixDatas"
                      :key="premixData.id"
                      @click="autofillPremix(premixData)"
                      clickable
                    >
                      <q-item-section>
                        <q-item-label>{{
                          capitalizeFirstLetter(premixData?.name)
                        }}</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label side>{{
                          premixData?.category
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-input>
      </div>

      <q-card-section>
        <div class="q-mb-sm">
          <div>Premix Name</div>
          <q-input
            v-model="addBranchPremixRecipe.name"
            readonly
            dense
            outlined
          />
        </div>
        <div class="q-mb-lg">
          <div>Category</div>
          <q-input
            v-model="addBranchPremixRecipe.category"
            readonly
            dense
            outlined
          />
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-sm">
        <div>
          <div>Quantity</div>
          <q-input
            v-model="addBranchPremixRecipe.quantity"
            dense
            outlined
            type="number"
            suffix="kg/s"
          />
        </div>
        <div align="right">
          <q-btn
            padding="sm md"
            size="xm"
            icon="add"
            dense
            outline
            @click="addPremixToList"
          ></q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <q-list dense separator class="box">
          <q-item>
            <q-item-section align="center">
              <q-item-label> Premix Name </q-item-label>
            </q-item-section>
            <q-item-section align="center">
              <q-item-label> Quantity </q-item-label>
            </q-item-section>
            <q-item-section align="center" side>
              <q-item-label> Action</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-for="(premix, index) in premixList" :key="index">
            <q-item-section align="center">
              <q-item-label> {{ premix.name }}</q-item-label>
            </q-item-section>
            <q-item-section align="center">
              <q-item-label> {{ premix.quantity }} </q-item-label>
            </q-item-section>
            <q-item-section align="center" side>
              <q-item-label>
                <q-btn
                  @click="removePremixToList(index)"
                  color="negative"
                  icon="clear"
                  dense
                  flat
                  round
                  class="text-red"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" />
        <!-- @click="dismiss" -->
        <q-btn
          class="glossy"
          color="teal"
          label="Create"
          @click="save"
          :disable="!isFormValid"
        />
        <!--  -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useBakerReportsStore } from "src/stores/baker-report";
import { usePremixStore } from "src/stores/premix";
import { useRequestPremixStore } from "src/stores/request-premix";
import { Notify } from "quasar";

const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};

const bakerReportStore = useBakerReportsStore();
const userData = computed(() => bakerReportStore.user);
console.log("userData in RawMaterialsTable:", userData.value);
const branchId = userData.value?.device?.reference_id || "";
console.log("branchId in PremixPage:", branchId);
const warehouseId = userData.value?.device?.reference?.warehouse_id || "";
console.log("warehouseId in PremixPage:", warehouseId);
const employeeId = userData.value?.data?.employee_id || "";
console.log("warehouseId in PremixPage:", warehouseId);
const premixStore = usePremixStore();
const premixDatas = computed(() => premixStore.premixes);
const premixDatasFetch = computed(() => premixStore.branchEmployeePremix);
console.log("premixdatas", premixDatas.value);
const requestPremixStore = useRequestPremixStore();

const premixList = ref([]);

const searchQuery = ref("");
const search = async () => {
  await premixStore.searchPremix(searchQuery.value, branchId);
};

const autofillPremix = (data) => {
  console.log("data", data);
  addBranchPremixRecipe.branch_premix_id = data.id;
  addBranchPremixRecipe.name = data.name;
  addBranchPremixRecipe.category = data.category;
  searchQuery.value = "";
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const isFormValid = computed(() => {
  return premixList.value !== 0;
});

const addPremixToList = () => {
  const premix = premixList.value.push({
    branch_premix_id: addBranchPremixRecipe.branch_premix_id,
    warehouse_id: addBranchPremixRecipe.warehouse_id,
    employee_id: addBranchPremixRecipe.employee_id,
    name: addBranchPremixRecipe.name,
    category: addBranchPremixRecipe.category,
    quantity: addBranchPremixRecipe.quantity,
    status: addBranchPremixRecipe.status,
  });
  console.log("premix", premix);

  clearForm();
};

const removePremixToList = (index) => {
  premixList.value.splice(index, 1);
};

const clearForm = () => {
  addBranchPremixRecipe.branch_premix_id = 0;
  addBranchPremixRecipe.name = "";
  addBranchPremixRecipe.category = "";
  addBranchPremixRecipe.quantity = 0;
};

const addBranchPremixRecipe = reactive({
  branch_premix_id: 0,
  name: "",
  category: "",
  quantity: 0,
  warehouse_id: warehouseId,
  employee_id: employeeId,
  status: "pending",
});

const save = async () => {
  try {
    console.log("Data sent for premix request:", premixList.value);

    // Save the premix request
    await premixStore.saveRequestPremix(premixList.value, branchId, employeeId);

    // Fetch updated premix data for the branch and employee
    // await premixStore.fetchRequestBranchEmployeePremix(branchId, employeeId);

    // Show success notification
    Notify.create({
      type: "positive",
      message: "Premix request saved successfully!",
    });

    // Clear form and reset state
    clearForm();
    premixList.value = [];
    dialog.value = false;
  } catch (error) {
    console.error("Failed to save premix request:", error);

    // Show error notification
    Notify.create({
      type: "negative",
      message: "Failed to save premix request. Please try again.",
    });
  }
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #ff31c5, #471b3b);
}
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
