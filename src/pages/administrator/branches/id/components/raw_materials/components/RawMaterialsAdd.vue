<template>
  <q-btn
    class="text-white q-pa-sm"
    dense
    elevated
    icon="add_circle"
    label="Add Branch Raw Material"
    @click="open_create_bread_dialog"
    style="background: #ef4444"
  />
  <q-dialog v-model="dialog" persistent>
    <q-card
      class="my-card"
      style="width: 400px; max-width: 500px; min-width: 100px"
    >
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Create Branch Raw Materials</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-ma-md q-gutter-y-sm">
        <div class="q-mb-lg">
          <q-input
            v-model="searchQuery"
            @update:model-value="search"
            debounce="1000"
            outlined
            rounded
            placeholder="Search Raw Materials"
            dense
          >
            <template v-slot:append>
              <div>
                <q-icon name="search" />
              </div>
            </template>
            <div v-if="searchQuery" class="custom-list z-top">
              <q-card>
                <q-list separator>
                  <q-item v-if="!rawMaterialsData?.length">
                    No record found.
                  </q-item>
                  <template v-else>
                    <q-item
                      @click="autoFillRawMaterials(rawMaterials)"
                      v-for="rawMaterials in rawMaterialsData"
                      :key="rawMaterials.id"
                      clickable
                    >
                      <q-item-section>
                        <q-item-label>{{ rawMaterials.name }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </q-input>
        </div>
        <div>
          <div>Raw Materials Code</div>
          <q-input
            v-model="addNewBranchRawMaterials.ingredient_code"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Raw Materials Name</div>
          <q-input
            v-model="addNewBranchRawMaterials.ingredient_name"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Category</div>
          <q-input
            v-model="addNewBranchRawMaterials.category"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Quantity</div>
          <q-input
            v-model="addNewBranchRawMaterials.total_quantity"
            type="number"
            outlined
            suffix="grams"
            dense
          />
        </div>
      </q-card-section>
      <!-- <q-separator /> -->
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn class="glossy" color="teal" label="Create" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { useBranchProductsStore } from "src/stores/branch-product";
import { useBranchRawMaterialsStore } from "src/stores/branch-rawMaterials";
import { useRawMaterialsStore } from "src/stores/raw-material";
import { ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const rawMaterialsStore = useRawMaterialsStore();
const rawMaterialsData = computed(() => rawMaterialsStore.rawMaterials);
const branchRawMaterials = useBranchRawMaterialsStore();

const searchQuery = ref("");
const search = async () => {
  rawMaterialsStore.searchRawMaterials(searchQuery.value);
};

const dialog = ref(false);
const open_create_bread_dialog = () => {
  dialog.value = true;
};

const autoFillRawMaterials = (data) => {
  addNewBranchRawMaterials.ingredients_id = data.id;
  addNewBranchRawMaterials.ingredient_name = data.name;
  addNewBranchRawMaterials.ingredient_code = data.code;
  addNewBranchRawMaterials.category = data.category;
};
const addNewBranchRawMaterials = reactive({
  ingredients_id: "",
  ingredient_name: "",
  ingredient_code: "",
  total_quantity: "",
  branch_id: route.params.branch_id,
});

const save = async () => {
  try {
    const { product_name, ...data } = addNewBranchRawMaterials;
    await branchRawMaterials.createBranchRawMaterials(data);
    console.log("data to send", data);

    dialog.value = false;
  } catch (error) {
    console.log(error);
  }
};
</script>
