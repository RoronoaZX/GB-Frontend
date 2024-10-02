<template>
    <q-btn color="negative" icon="delete" size="sm" flat round dense @click="open_delete_ingredients_dialog">
        <q-tooltip class="bg-negatitve" :delay="200">Edit</q-tooltip>
    </q-btn>
    <q-dialog v-model="deleteIngredientsDialog">
        <q-card class="my-card" style="width: 400px">
            Do you want to delete?
        </q-card>
    </q-dialog>
</template>
<script setup>
import {ref} from 'vue'

const deleteIngredientsDialog = ref()
const open_delete_ingredients_dialog = () => {
    deleteIngredientsDialog.value = true
}

</script>
