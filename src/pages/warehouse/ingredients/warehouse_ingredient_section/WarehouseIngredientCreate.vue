<template>
    <q-btn class="q-pa-sm" outline dense elevated icon="add_circle" label="Add Ingredients" @click="open_add_ingredients_dialog" />
    <q-dialog v-model="addIngredientsDialog" >
        <q-card class="my-card" style="width: 400px">
            <q-card-section  class="row items-center" >
                <div class="text-h6">Add Ingredients </div>
                <q-space />
                <q-btn icon="close" flat dense round v-close-popup/>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
                <div>
                    <div class="q-my-sm">Ingredient Name</div>
                    <q-input v-model="addIngredientsForm.name" outlined dense />
                </div>
                <div>
                    <div class="q-my-sm">Unit</div>
                    <q-select v-model="addIngredientsForm.unit" :options = "ingredientsUnitOptions" outlined dense />
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

const addIngredientsDialog = ref(false)
const ingredientsUnitOptions = ['Grams', 'Pcs']
const open_add_ingredients_dialog = () => {
    addIngredientsDialog.value = true
}
const addIngredientsForm = reactive({
    name: '',
    unit: null,
}) 

</script>