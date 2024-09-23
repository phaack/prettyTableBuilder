<!-- components/TableInput.vue -->
<template>
  <div>
    <Tabs class="mb-4" v-model:value="inputType">
      <TabList>
        <Tab value="builder">Table Builder</Tab>
        <Tab value="text">Text Input</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="builder">
          <TableBuilder />
        </TabPanel>
        <TabPanel value="text">
          <Textarea v-model="textInput" @input="parseTextInput" class="w-full autoResize"
            placeholder="Enter table data using pipes (|) to separate columns and newlines for rows" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';


import Textarea from 'primevue/textarea';
import TableBuilder from './TableBuilder.vue';

const tableStore = useTableStore()

const inputType = ref('builder')
const textInput = ref('')

const parseTextInput = () => {
  const rows = textInput.value.trim().split('\n')
  const tableData = rows.map(row => row.split('|').map(cell => cell.trim()))

  tableStore?.updateTableData(tableData)
}

watch(inputType, () => {
  // Reset table data when switching input types
  if (inputType.value === 'text') {
    parseTextInput()
  } 
})

</script>