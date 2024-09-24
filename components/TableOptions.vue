<!-- components/TableOptions.vue -->
<template>
  <div class=" mt-4">
    <FloatLabel>
      <Select fluid inputId="tableStyle" v-model="selectedStyle" @change="updateStyle" :options="TableStyles"></Select>
      <label for="tableStyle">Table Style</label> 
    </FloatLabel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Select from 'primevue/select';

import { TableStyles, useTableStore } from '~/stores/tableStore';
import FloatLabel from 'primevue/floatlabel';


const selectedStyle = ref(null)
// set currently selected style
watchEffect(() => {
  selectedStyle.value = useTableStore().tableStyle
})


const updateStyle = () => {
  useTableStore().updateTableStyle(selectedStyle.value)
}
</script>