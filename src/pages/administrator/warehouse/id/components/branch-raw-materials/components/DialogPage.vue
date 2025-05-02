<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">
            {{ `${capitalizeFirstLetter(branchReport.branch_name)}  Branch` }}
          </div>
          <div>
            <q-btn round dense flat icon="close" @click="onDialogCancel" />
          </div>
        </div>

        <div>
          <q-tabs
            v-model="tab"
            align="justify"
            narrow-indicator
            class="q-mb-lg"
          >
            <q-tab
              class="text-purple"
              name="branchRawMaterials"
              label="Branch Raw Materials"
            />
            <q-tab
              class="text-orange"
              name="branchPremixTransactions"
              label="Branch Premix Transactions"
            />
          </q-tabs>
          <div>
            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="scale"
              transition-next="scale"
            >
              <q-tab-panel name="branchRawMaterials">
                <BranchRawMaterials
                  :branchReport="branchReport"
                  :getRawMaterialBadgeColor="getRawMaterialBadgeColor"
                  :getBadgeCategoryColor="getBadgeCategoryColor"
                  :formatTotalQuantity="formatTotalQuantity"
                  :capitalizeFirstLetter="capitalizeFirstLetter"
                />
              </q-tab-panel>
              <q-tab-panel name="branchPremixTransactions">
                <BranchTransaction :branchId="branchId" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useDialogPluginComponent } from "quasar";
import BranchRawMaterials from "./branch-raw-materials/BranchRawMaterials.vue";
import BranchTransaction from "./branch-raw-materials/BranchTransaction.vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  branchReport: Object,
  capitalizeFirstLetter: Function,
  getRawMaterialBadgeColor: Function,
  getBadgeCategoryColor: Function,
  formatTotalQuantity: Function,
  // capitalizeFirstLetter: Function,
});
const branchId = props.branchReport.branch_id;

const tab = ref("branchRawMaterials");

const dialog = ref(false);
const maximizedToggle = ref(true);
</script>
