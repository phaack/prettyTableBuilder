<!-- components/TableOptions.vue -->
<template>
  <div class="mt-4">
    <h2 class="text-xl font-semibold mb-2">Table Options</h2>
    <div>
      <label class="block mb-2">Table Style:</label>
      <Select v-model="selectedStyle" @change="updateStyle" :options="TableStyles"></Select>
      
    </div>
    <!-- Add more options here (e.g., background, shadow) -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Select from 'primevue/select';

import { TableStyles, useTableStore } from '~/stores/tableStore';


const selectedStyle = ref(null)
// set currently selected style
watchEffect(() => {
  selectedStyle.value = useTableStore().tableStyle
})


const updateStyle = () => {
  useTableStore().updateTableStyle(selectedStyle.value)
}
</script>