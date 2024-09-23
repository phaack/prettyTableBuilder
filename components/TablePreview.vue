<!-- components/TablePreview.vue -->
<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">Table Preview</h2>
    <div class="table-container" ref="tableContainer">
      <!-- <table :class="['preview-table', tableStyle]">
        
      </table> -->
      <FBDefaultLight v-if="useTableStore().tableStyle === 'FB default - light'" :headers="tableStore.tableData[0]" :rows="tableStore.tableData.slice(1)"/>
      <FBDefaultDark v-if="useTableStore().tableStyle === 'FB default - dark'" :headers="tableStore.tableData[0]" :rows="tableStore.tableData.slice(1)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FBDefaultLight from './tablePresets/FBDefaultLight.vue';
import FBDefaultDark from './tablePresets/FBDefaultDark.vue';

const tableStore = useTableStore()

const tableContainer = ref(null)

defineExpose({ tableContainer })
</script>

<style scoped>
.table-container {
  overflow: auto;
  max-width: 100%;
  max-height: 500px; /* Adjust as needed */
}

.preview-table {
  width: 100%;
  background-color: aqua;
  border-collapse: collapse;
}

.preview-table th,
.preview-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.preview-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.preview-table.striped tbody tr:nth-child(even) {
  background-color: #f8f8f8;
}

.preview-table.bordered {
  border: 2px solid #ddd;
}

.preview-table.rounded {
  border-radius: 8px;
  overflow: hidden;
}
</style>