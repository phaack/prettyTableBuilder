<!-- components/TableInput.vue -->
<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">Table Input</h2>
    <div class="mb-4">
      <label class="block mb-2">
        <input type="radio" v-model="inputType" value="text"> Text Input
      </label>
      <label class="block">
        <input type="radio" v-model="inputType" value="builder"> Table Builder
      </label>
    </div>
    <div v-if="inputType === 'text'">
      <textarea
        v-model="textInput"
        @input="parseTextInput"
        class="w-full h-40 p-2 border rounded"
        placeholder="Enter table data using pipes (|) to separate columns and newlines for rows"
      ></textarea>
    </div>
    <div v-else>
      <!-- Implement table builder UI here -->
      <p>Table builder coming soon...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update-table'])

const inputType = ref('text')
const textInput = ref('')

const parseTextInput = () => {
  const rows = textInput.value.trim().split('\n')
  const tableData = rows.map(row => row.split('|').map(cell => cell.trim()))
  emit('update-table', tableData)
}

watch(inputType, () => {
  // Reset table data when switching input types
  emit('update-table', [])
})
</script>