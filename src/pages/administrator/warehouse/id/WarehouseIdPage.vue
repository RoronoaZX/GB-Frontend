<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6 row justify-between">
        <div>
          <q-btn outline flat icon="arrow_back" to="/admin/warehouse" />
          <q-space />
        </div>
        <div>
          <q-icon name="factory" />
          Warehouse 1
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 q-ma-sm" align="center">Transaction History</div>
      <div class="row justify-between q-ma-sm">
        <!-- <WarehouseTransactionSearch /> -->
      </div>
    </q-card-section>
    <!-- <div class="row q-mx-sm">
            <div class="text-dark q-mt-xm q-mr-sm">Status Origin:</div>
                        <div class="q-gutter-x-sm">
                            <q-badge label="Processing" class="text-white"  color="blue"/>
                            <q-badge label="To Recieved" class="text-white"  color="deep-orange-5"/>
                            <q-badge label="Received" class="text-white"  color="green"/>
                            <q-badge label="Transaction Failed" class="text-white"  color="negative"/>
                            <q-badge label="Normal Transaction" class="text-white"  color="grey"/>
                        </div>
        </div> -->
    <q-card-section>
      <!-- <WarehouseTransactionTable /> -->
      <WarehouseIdTableComponent />
    </q-card-section>
  </q-card>
</template>
<script setup>
import WarehouseIdTableComponent from "./components/WarehouseIdTableComponent.vue";
</script>
