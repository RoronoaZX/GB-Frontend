<template>
  <q-btn
    @click="goToBranch"
    outline
    size="sm"
    text-color="red-6"
    dense
    label="Go to store branch"
  />
  <!-- '/admin/store-branches/'+props.data.row.id -->
</template>
<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  data: Object,
});

const router = useRouter();

async function goToBranch(params) {
  const branchId = await props.data.row.id;
  router.push({
    name: "BranchDetail",
    params: { branch_id: branchId },
  });
}
</script>
