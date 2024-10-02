<template>
    <q-btn color="primary" icon="visibility" size="sm" flat round dense @click="open_warehouse_transaction_action_dialog">
        <q-tooltip class="bg-primary" :delay="200">View</q-tooltip>
    </q-btn>
    <q-dialog v-model="warehouseTransactionActionDialog">
        <q-card class="my-card">
            <h1>Transaction 1 </h1>
        </q-card>
    </q-dialog>
</template>
<script setup>
import {ref} from 'vue'

const warehouseTransactionActionDialog = ref()
const open_warehouse_transaction_action_dialog = () => {
    warehouseTransactionActionDialog.value = true
}

</script>
