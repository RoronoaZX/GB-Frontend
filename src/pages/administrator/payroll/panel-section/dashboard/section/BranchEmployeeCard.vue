<template>
  <q-card class="user-card" style="height: 300px">
    <q-card-section>
      <div class="row justify-between">
        <div>
          <div class="text-h6">Branch Employee</div>
          <div class="text-caption text-grey-6">
            Total Number of Branch : {{ branches.length }}
          </div>
        </div>
        <!-- <div>
          <q-input outlined dense>
            <template v-slot:append>
              <div>
                <q-icon name="search" />
              </div>
            </template>
          </q-input>
        </div> -->
      </div>
      <!-- <div class="text-subtitle2">Department Or Grade Wise</div> -->
    </q-card-section>

    <!-- Grid Layout for Grade Data -->
    <q-card-section>
      <q-virtual-scroll
        :items="branches"
        scroll-target="body"
        virtual-scroll-horizontal
        class="my-virtual-scroll"
        align="center"
      >
        <template v-slot="{ item: branch, index }">
          <q-card flat bordered dense :key="index" class="my-card">
            <q-card-section class="bg-grey-2">
              <div class="text-subtitle2">{{ branch.name }}</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="text-h6 text-grey-6">
                {{ branch?.branch_employee?.length }}
              </div>
            </q-card-section>
          </q-card>
        </template>
      </q-virtual-scroll>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useBranchesStore } from "src/stores/branch";
import { computed, onMounted, ref, watch } from "vue";

const branchStore = useBranchesStore();
const branches = computed(() => branchStore.branches);

console.log("branchWithEmploye", branches.value);

onMounted(async () => {
  await fetchBranchData();
});

const fetchBranchData = async () => {
  try {
    branches.value = await branchStore.fetchBranchWithEmployee();
    console.log("branches", branches.value);
  } catch (error) {
    console.log("error fetching branch: ", error);
  }
};
</script>

<style lang="scss" scoped>
.user-card {
  height: 100%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.my-card {
  margin: 8px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  display: inline-block;
  vertical-align: top; /* Align cards at the top */
  width: auto;
  min-width: 150px; /* Optional: Set a minimum width if needed */
  margin-right: 10px; /* Optional: Add space between cards */
}

.my-virtual-scroll {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 16px;
}

.my-virtual-scroll .q-card {
  display: inline-block;
  white-space: normal;
}

.my-center-text {
  text-align: center;
}
</style>
