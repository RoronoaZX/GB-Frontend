<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6 text-dark row justify-between">
        <div>
          <q-btn outline flat icon="arrow_back" @click="goBack" />
        </div>
        <q-space />
        <div>
          <!-- <q-icon name="fa-solid fa-store" /> -->
          Cake Report
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <!-- {{ branchId }} -->

      <div class="q-px-xl q-mx-xl">
        <div class="q-my-sm">
          <q-input
            v-model="cakeMakerReportForm.name"
            outlined
            dense
            label="Cake Name"
          />
        </div>
        <div class="row justify-between">
          <q-input
            v-model="cakeMakerReportForm.price"
            outlined
            dense
            label="Price"
            mask="###,###.##"
            reverse-fill-mask
            input-class="text-right"
            style="width: 300px"
          />
          <q-input
            v-model="cakeMakerReportForm.layers"
            outlined
            dense
            label="Layer/s"
            type="number"
            style="width: 100px"
          />
          <q-input
            v-model="cakeMakerReportForm.pieces"
            outlined
            dense
            label="PCS"
            type="number"
            style="width: 100px"
          />
        </div>

        <div>
          <div class="">
            <div class="row q-mt-md justify-between">
              <q-select
                v-model="selectedRawMaterials.name"
                debounce="3000"
                outlined
                :options="filterRawMaterialsOptions"
                dense
                behavior="menu"
                use-input
                hide-dropdown-icon
                @filter="filterRawMaterials"
                label="Ingredients"
                style="width: 330px"
              >
                <!-- use-chips
                chips-color="primary" -->
                <template>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-input
                v-model="selectedRawMaterials.quantity"
                outlined
                dense
                label="Quantity"
                :suffix="selectedRawMaterials.name.unit || ''"
                style="width: 170px"
              />
            </div>
            <form @keyup.enter.prevent="addRawMaterials">
              <div class="q-mt-sm q-gutter-sm" align="right">
                <q-btn
                  padding="sm md"
                  type="button"
                  size="sm"
                  outline
                  dense
                  icon="delete_sweep"
                  label="Clear Input"
                  color="red"
                  @click="clearData"
                />
                <q-btn
                  padding="sm md"
                  type="button"
                  size="sm"
                  outline
                  dense
                  label="Add Ingredients"
                  icon="add"
                  color="purple"
                  @click="addRawMaterials"
                />
              </div>
            </form>
          </div>
        </div>
        <div class="q-mt-md">
          <div class="q-my-sm text-weight-light" align="center">
            Ingredient List
          </div>
          <div>
            <q-list dense separator class="box q-mr-sm">
              <q-item
                v-for="(rawMaterials, index) in rawMaterialsGroup"
                :key="index"
              >
                <q-item-section>
                  <q-item-label>{{ rawMaterials.label }} </q-item-label>
                </q-item-section>
                <q-item-section
                  >{{ rawMaterials.quantity }}
                  {{ rawMaterials.unit }}</q-item-section
                >
                <q-item-section side>
                  <q-btn
                    color="grey-10"
                    icon="backspace"
                    dense
                    flat
                    round
                    @click="removeRawMaterials(index)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div
          class="q-pa-sm q-mt-lg"
          align="right"
          v-if="rawMaterialsGroup.length > 0"
        >
          <q-btn color="red-6" icon="edit" label="Create" @click="saveReport" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useCakeMakerReportStore } from "src/stores/cake-maker-report";
import { useBranchRawMaterialsStore } from "src/stores/branch-rawMaterials";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Loading, Notify } from "quasar";

const branchId = localStorage.getItem("branch_id");
const branchRawMaterialsStore = useBranchRawMaterialsStore();
const branchRawMaterialsData = computed(
  () => branchRawMaterialsStore.branchRawMaterials
);
const showDropdown = ref(false);
const useCakeMakerReport = useCakeMakerReportStore();
const searchKeyword = ref("");
const router = useRouter();
const rawMaterialsGroup = ref([]);
const rawmaterialsOptions = ref([]);
const loading = ref(false);
const filterRawMaterialsOptions = ref(rawmaterialsOptions.value);
const userData = computed(() => useCakeMakerReport.user);

const user_id = userData.value?.data?.id || "";
console.log("user_id", user_id);

const selectedRawMaterials = reactive({
  name: "",
  quantity: "",
});

const fetchRawMaterialsData = async (branchId) => {
  const rawMaterials = await branchRawMaterialsStore.fetchBranchRawMaterials(
    branchId
  );
  console.log("branch raw Materials", rawMaterials);

  loading.value = false;
  rawmaterialsOptions.value = branchRawMaterialsStore.branchRawMaterials.map(
    (val) => {
      // console.log("val", val);
      return {
        label: val.ingredients?.name,
        value: val.id,
        unit: val.ingredients.unit,
      };
    }
  );
};

onMounted(async () => {
  console.log("props.branchId in onMounted:", branchId);
  if (branchId) {
    await fetchRawMaterialsData(branchId);
  }
});

const clearData = () => {
  (selectedRawMaterials.name = ""),
    (selectedRawMaterials.quantity = ""),
    (selectedRawMaterials.unit = "");
};

const clearCakeMakerReportForm = () => {
  (cakeMakerReportForm.branch_id = ""),
    (cakeMakerReportForm.user_id = ""),
    (cakeMakerReportForm.name = ""),
    (cakeMakerReportForm.layers = ""),
    (cakeMakerReportForm.pieces = ""),
    (cakeMakerReportForm.price = "");
  rawMaterialsGroup.value = [];
  clearData();
};

const filterRawMaterials = (val, update) => {
  update(() => {
    if (val === "") {
      filterRawMaterialsOptions.value = rawmaterialsOptions.value;
    } else {
      const needle = val.toLowerCase();
      filterRawMaterialsOptions.value = rawmaterialsOptions.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const addRawMaterials = () => {
  const data = rawMaterialsGroup.value;

  function findObjectById(arr, id) {
    return arr.find((obj) => obj.rawMaterials_id == id);
  }
  const idToSearch = selectedRawMaterials.name.value;

  const foundObject = findObjectById(data, idToSearch);
  if (!foundObject) {
    rawMaterialsGroup.value = [
      ...data,
      {
        rawMaterials_id: selectedRawMaterials.name.value,
        label: selectedRawMaterials.name.label,
        quantity: selectedRawMaterials.quantity,
        unit: selectedRawMaterials.name.unit,
      },
    ];
    clearData();
  } else {
    Notify.create({
      type: "negative",
      icon: "warning",
      message: "Ingredient already exist",
      timeout: 2000,
    });
  }
};

const removeRawMaterials = (index) => {
  rawMaterialsGroup.value.splice(index, 1);
};

watch(
  () => selectedRawMaterials.name,
  (newVal) => {
    if (newVal && newVal.unit) {
      selectedRawMaterials.unit = newVal.unit;
    } else {
      selectedRawMaterials.unit = "";
    }
  }
);

// onMounted(() => fetchRawMaterialsData());
// const fetchRawMatetrialsData = async () => {
//   const ingredient = await
// }
// const search = async () => {
//   branchRawMaterialsStore.searchBranchRawMaterials(
//     searchKeyword.value,
//     branchId
//   );

//   // if (searchKeyword.value.trim()) {
//   //   // searchLoading.value = true;
//   //   await useCakeMakerReport.searchBranchRawMaterials(
//   //     searchKeyword.value,
//   //     branchId
//   //   );
//   //   // searchLoading.value = false;
//   //   // showDropdown.value = true;
//   // }
// };

const cakeMakerReportForm = reactive({
  branch_id: branchId,
  user_id: user_id,
  name: "",
  layers: "",
  pieces: "",
  confirmation_status: "pending",
  price: "",
});

const saveReport = async () => {
  // Loading.create(true)
  const newData = {
    ...cakeMakerReportForm,
    ingredients: rawMaterialsGroup.value.map((ingredients) => ({
      branch_raw_materials_reports_id: ingredients.rawMaterials_id,
      quantity: ingredients.quantity,
      unit: ingredients.unit,
    })),
  };

  await useCakeMakerReport.createReports(newData);
  clearCakeMakerReportForm();
  // console.log("cake maker report", newData);
};

const goBack = () => {
  useCakeMakerReport.clearData(); // Clear the data in the store
  router.push("/branch/cake_maker/report"); // Navigate back
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
