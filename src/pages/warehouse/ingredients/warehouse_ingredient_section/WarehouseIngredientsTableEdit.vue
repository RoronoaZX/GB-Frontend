<template>
    <q-btn color="positive" icon="edit" size="sm" flat round dense @click="open_edit_ingredients_dialog">
        <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
    </q-btn>
    <q-dialog v-model="editIngredientsDialog">
        <q-card class="my-card" style="width: 400px">
            <q-card-section  class="row items-center" >
                <div class="text-h6">Edit Ingredients </div>
                <q-space />
                <q-btn icon="close" flat dense round v-close-popup/>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
                <div>
                    <div class="q-my-sm">Ingredient Name</div>
                    <q-input v-model="editIngredientsForm.name" outlined dense />
                </div>
                <div>
                    <div class="q-my-sm">Unit</div>
                    <q-select v-model="editIngredientsForm.unit" :options = "ingredientsUnitOptions" outlined dense />
                </div>
            </q-card-section>
            <q-card-actions class="row q-ma-md" align="right">
                <q-btn class="glossy" color="grey-9" label="Cancel" v-close-popup />
                <q-btn class="glossy" color="teal" label="Create" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup>
import {ref, reactive} from 'vue'

const editIngredientsDialog = ref()
const ingredientsUnitOptions = ['Grams','Pcs']
const open_edit_ingredients_dialog = () => {
    editIngredientsDialog.value = true
}

const editIngredientsForm = reactive({
    name: '',
    unit: null,
})
</script>
