<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6">Scalling Section</div>
    </q-card-section>
    <q-card-section>
      <div>
        <WarehouseScallingTable />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
// import WarehouseScallingSearchEngine from './warehouse_scalling_section/WarehouseScallingSearchEngine.vue';
import WarehouseScallingTable from "./components/WarehouseScallingTable.vue";
</script>
