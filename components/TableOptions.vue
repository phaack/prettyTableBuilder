<!-- components/TableOptions.vue -->
<template>
  <div class="mt-4">
    <h2 class="text-xl font-semibold mb-2">Table Options</h2>
    <div>
      <label class="block mb-2">Table Style:</label>
      <select v-model="selectedStyle" @change="updateStyle" class="w-full p-2 border rounded">
        <option value="default">Default</option>
        <option value="striped">Striped</option>
        <option value="bordered">Bordered</option>
        <option value="rounded">Rounded</option>
      </select>
    </div>
    <!-- Add more options here (e.g., background, shadow) -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update-style'])

const selectedStyle = ref('default')

const updateStyle = () => {
  emit('update-style', selectedStyle.value)
}
</script>