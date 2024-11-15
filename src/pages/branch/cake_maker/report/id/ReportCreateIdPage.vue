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
        <div class="row q-gutter-md">
          <q-input outlined dense label="Cake Name" style="width: 300px" />
          <q-input outlined dense label="Price" style="width: 170px" />
        </div>
        <div>
          <div class="">
            <div class="row q-mt-md q-gutter-md">
              <q-input
                v-model="searchKeyword"
                @update:model-value="searchBranchRawMaterials"
                outlined
                dense
                label="Ingredient "
                style="width: 300px"
              />
              <q-input outlined dense label="Quantity" style="width: 170px" />
            </div>
            <div class="q-pa-sm" align="right">
              <q-btn
                padding="sm md"
                type="button"
                size="sm"
                outline
                dense
                label="add"
                icon="add"
                color="purple"
              />
            </div>
          </div>
        </div>
        <div class="q-mt-md">
          <div class="q-my-sm text-weight-light" align="center">
            Ingredient List
          </div>
          <div>
            <q-list dense separator class="box q-mr-sm">
              <q-item>
                <q-item-section>
                  <q-item-label> Raw Materials 1 </q-item-label>
                </q-item-section>
                <q-item-section> 100 grams </q-item-section>
                <q-item-section side>
                  <q-btn color="grey-10" icon="backspace" dense flat round />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="q-pa-sm q-mt-lg" align="right">
          <q-btn color="red-6" icon="edit" label="Create" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useCakeMakerReport } from "src/stores/cake-maker-report";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const branchId = localStorage.getItem("branch_id");
const showDropdown = ref(false);
const cakeMakerReport = useCakeMakerReport();
const searchKeyword = ref("");
const router = useRouter();

const searchBranchRawMaterials = async () => {
  if (searchKeyword.value.trim()) {
    // searchLoading.value = true;
    await cakeMakerReport.searchBranchRawMaterials(
      searchKeyword.value,
      branchId
    );
    // searchLoading.value = false;
    // showDropdown.value = true;
  }
};

const goBack = () => {
  cakeMakerReport.clearData(); // Clear the data in the store
  router.push("/branch/cake_maker/report"); // Navigate back
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
