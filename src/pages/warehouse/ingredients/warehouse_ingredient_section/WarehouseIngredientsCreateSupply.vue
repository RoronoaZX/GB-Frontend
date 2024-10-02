<template>
    <q-btn class="q-pa-sm" color="red" dense elevated icon="add_circle" label="Add Supply" @click="open_add_ingredients_dialog" />
    <q-dialog v-model="addIngredientsDialog" >
        <q-card class="my-card" style="width:900px">
            <q-card-section  class="row items-center" >
                <div class="text-h6">Add Supply </div>
                <q-space />
                <q-btn icon="close" flat dense round v-close-popup/>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-my-md q-mx-sm q-gutter-y-sm">
                <div>
                    <div class="q-my-sm">Supplier's Company Name</div>
                    <q-input v-model="addSupplierForm.companyName" outlined dense />
                </div>
                <div>
                    <div class="q-my-sm">Supplier's Name</div>
                    <q-input v-model="addSupplierForm.supplierName" outlined dense />
                </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="row q-gutter-x-sm">
                    <div>
                        <div class="q-my-sm">Ingredients Name</div>
                        <q-input v-model="addSupplierForm.ingredientName" placeholder="Search Ingredients" outlined dense style="width:320px; max-width: 350px; min-width: 20px;" />
                    </div>
                    <div>
                        <div class="q-my-sm">Amount</div>
                        <q-input v-model="addSupplierForm.ingredientAmount" type="number" outlined dense 
                        style="width:80px; max-width: 150px; min-width: none;" />
                    </div>
                    <div>
                        <div class="q-my-sm">Unit</div>
                        <q-select v-model="addSupplierForm.unit" :options = "ingredientsUnitOptions" outlined dense style="width:90px; max-width:100px; min-width: none;" />
                    </div>
                    <div class="q-mt-sm">
                        <q-btn size="sm" outline dense icon="add" color="purple" />
                    </div>
                </div>
            </q-card-section>
            <q-separator />
                <q-card-actions class="row q-ma-md" align="right">
                    <q-btn class="glossy" color="grey-9" label="Cancel" v-close-popup />
                    <q-btn class="glossy" color="teal" label="Create" />
                </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import {ref, reactive} from 'vue'

const addIngredientsDialog = ref(false)
const ingredientsUnitOptions = ['Grams', 'Kgs', 'Pcs']
const open_add_ingredients_dialog = () => {
    addIngredientsDialog.value = true
}
const addSupplierForm = reactive({
    companyName: '',
    supplierName: '',
    ingredientName: '',
    ingredientAmount: '',
    unit: null,
}) 

</script>