<!-- components/TableBuilder.vue -->
<template>
  <DataTable :value="rows" editMode="cell" @cell-edit-complete="onCellEditComplete" v-model:reorderableColumns="columns"
    :reorderableColumns="true" @column-reorder="onColumnReorder" :pt="{
      // table: { style: 'min-width: 20rem' },
      column: {
        bodycell: ({ state }) => ({
          class: [{ 'pt-0 pb-0': state['d_editing'] }]
        })
      }
    }">
    <Column v-for="col in columns" :key="col.field" :field="col.field">
      <template #header>
        <div class="flex justify-between items-center">
          <InputText variant="filled" v-model="col.header" @input="updateColumnHeader(col)" class="p-1 max-w-32 min-w-4 mr-2 text-sm"
            @focus="focusedHeader = col.field" @blur="focusedHeader = null" />
          <Button icon="pi pi-trash" @click="removeColumn(col)" class="p-button-text p-button-danger p-button-sm" />
        </div>
      </template>
      <template #body="{ data, field }">
        {{ data[field] }}
      </template>
      <template #editor="{ data, field }">
        <InputText placeholder="Enter value" v-model="data[field]" autofocus />
      </template>
    </Column>
  </DataTable>
  <div class="mb-4 flex  justify-between mt-2 items-center">
    <div class="flex gap-2">
    <Button @click="addRow" severity="secondary" icon="pi pi-arrow-circle-down" label="Add Row" />
    <Button @click="addColumn" severity="secondary" icon="pi pi-arrow-circle-right" label="Add Column" />
</div>
<!-- Reset -->
    <Button @click="resetTable" severity="danger" icon="pi pi-undo" label="Reset" />
  </div>

</template>

<script setup>
import { ref, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const columns = ref([
  { field: 'col1', header: 'Column 1' },
  { field: 'col2', header: 'Column 2' },
]);

const rows = ref([
  { col1: 'Data 1', col2: 'Data 2'},
]);

const focusedHeader = ref(null);

const emit = defineEmits(['update-table']);

const onCellEditComplete = (event) => {
  let { data, newValue, field } = event;
  data[field] = newValue;
  emitTableUpdate();
};

const addColumn = () => {
  const newField = `col${columns.value.length + 1}`;
  columns.value.push({ field: newField, header: `Column ${columns.value.length + 1}` });
  rows.value.forEach(row => row[newField] = '...');
  emitTableUpdate();
};

const removeColumn = (col) => {
  const index = columns.value.findIndex(c => c.field === col.field);
  if (index > -1) {
    columns.value.splice(index, 1);
    rows.value.forEach(row => delete row[col.field]);
    emitTableUpdate();
  }
};

const updateColumnHeader = (col) => {
  // This function is now called on input, not on blur
  emitTableUpdate();
};

const addRow = () => {
  const newRow = {};
  columns.value.forEach(col => newRow[col.field] = '...');
  rows.value.push(newRow);
  emitTableUpdate();
};

const onColumnReorder = () => {
  emitTableUpdate();
};

const emitTableUpdate = () => {
  const headers = columns.value.map(col => col.header);
  const data = rows.value.map(row => columns.value.map(col => row[col.field]));
  
  const tableData = [headers, ...data];
  
  emit('update-table', tableData);
  console.log('Emitted table data:', tableData);
};

// Watch for changes in columns or rows and emit updates
watch([columns, rows], () => {
  emitTableUpdate();
}, { deep: true });
</script>

<style scoped>
.p-column-header-content {
  display: none;
}
</style>