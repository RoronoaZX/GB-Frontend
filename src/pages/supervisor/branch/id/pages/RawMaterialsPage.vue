<template>
  <div class="inventory-view-wrapper">
    <q-scroll-observer @scroll="onScroll" />
    <div
      class="sticky-header-container"
      :class="{ 'is-hidden': !showSearch && lastScroll > 100 }"
    >
      <div
        class="row justify-between items-center q-px-md q-py-sm q-gutter-sm search-row-inner"
      >
        <div class="col-grow">
          <SearchEngine v-model="filter" />
        </div>
        <div class="col-auto q-ml-sm">
          <AddRawMaterials />
        </div>
      </div>
    </div>

    <!-- 3. Static Titles -->
    <div class="q-px-md q-pt-md q-pb-sm">
      <h1 class="text-h5 text-weight-bold text-slate-900 q-none">Inventory</h1>
      <p class="text-caption text-slate-500">
        Manage your branch raw materials levels
      </p>
    </div>

    <div class="q-px-md">
      <RawMaterials :filter="filter" />
    </div>

    <div v-if="loading" class="spinner-wrapper">
      <q-spinner-ripple color="primary" size="40px" />
    </div>
  </div>
</template>

<script setup>
import SearchEngine from "../search/SearchEngine.vue";
import RawMaterials from "../card/RawMaterialsCard.vue";
import AddRawMaterials from "../add_button/AddRawMaterials.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useBranchRawMaterialsStore } from "src/stores/branch-rawMaterials";

const route = useRoute();
const branchRawMaterialsStore = useBranchRawMaterialsStore();

const filter = ref("");
const loading = ref(false);
const showSearch = ref(true);
const lastScroll = ref(0);

const onScroll = (info) => {
  const currentScroll = info.position.top;

  if (currentScroll < lastScroll.value || currentScroll < 10) {
    showSearch.value = true;
  } else {
    showSearch.value = false;
  }
  lastScroll.value = currentScroll;
};

onMounted(async () => {
  if (route.params.branch_id) {
    loading.value = true;
    await branchRawMaterialsStore.fetchBranchRawMaterials(
      route.params.branch_id
    );

    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
.inventory-view-wrapper {
  background: #ffffff;
  min-height: 100vh;
}

/*
   THE STICKY LOGIC
*/
.sticky-header-container {
  position: sticky;
  /* If your layout header is sticky, set this to its height (e.g., 50px).
     If the layout header scrolls away, 0 is correct. */
  top: 50px;
  z-index: 500;
  background: white;
  transition: transform 0.3s ease-in-out, opacity 0.2s;

  /* Adds a subtle shadow only when sticking */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &.is-hidden {
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
  }
}

.search-row-inner {
  max-width: 1200px;
  margin: 0 auto;
}

/* Modern Typography */
.text-slate-900 {
  color: #0f172a;
}
.text-slate-500 {
  color: #64748b;
}

.spinner-wrapper {
  display: flex;
  justify-content: center;
  padding: 50px;
}

/* Deep selector to make the search bar look more 'integrated' */
:deep(.q-field--outlined .q-field__control) {
  border-radius: 12px;
  background: #f8fafc;
}
</style>
