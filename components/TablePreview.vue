<!-- components/TablePreview.vue -->
<template>
    <div class="table-container h-full" ref="tableContainer">
      <FBDefaultLight v-if="useTableStore().tableStyle === 'FB default - light'" :headers="tableStore.tableData[0]" :rows="tableStore.tableData.slice(1)"/>
      <FBDefaultDark v-if="useTableStore().tableStyle === 'FB default - dark'" :headers="tableStore.tableData[0]" :rows="tableStore.tableData.slice(1)"/>
      <FBStripedRowsLight v-if="useTableStore().tableStyle === 'FB striped rows - light' " :headers="tableStore.tableData[0]" :rows="tableStore.tableData.slice(1)"/>
      <FBStripedRowsDark v-if="useTableStore().tableStyle === 'FB striped rows - dark'" :headers="tableStore.tableData[0]" :rows="tableStore.tableData.slice(1)"/>
      <FBStripedColumnsLight v-if="useTableStore().tableStyle === 'FB striped columns - light'" :headers="tableStore.tableData[0]" :rows="tableStore.tableData.slice(1)"/>
      <FBStripedColumnsDark v-if="useTableStore().tableStyle === 'FB striped columns - dark'" :headers="tableStore.tableData[0]" :rows="tableStore.tableData.slice(1)"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FBDefaultLight from './tablePresets/FBDefaultLight.vue';
import FBDefaultDark from './tablePresets/FBDefaultDark.vue';
import FBStripedRowsLight from './tablePresets/FBStripedRowsLight.vue';
import FBStripedRowsDark from './tablePresets/FBStripedRowsDark.vue';
import FBStripedColumnsLight from './tablePresets/FBStripedColumnsLight.vue';
import FBStripedColumnsDark from './tablePresets/FBStripedColumnsDark.vue';

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