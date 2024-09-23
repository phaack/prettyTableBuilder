<!-- pages/index.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Table Creator</h1>
    <Splitter>
      <SplitterPanel class="min-w-[300px]">
        <TableInput />
        <TableOptions />
      </SplitterPanel>
      <SplitterPanel>
        <TablePreview ref="tablePreview" />
      </SplitterPanel>
    </Splitter>


    <button @click="exportImage" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
      Export as Image
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import html2canvas from 'html2canvas'
import TableInput from '~/components/TableInput.vue';
import TableOptions from '~/components/TableOptions.vue';
import TablePreview from '~/components/TablePreview.vue';


import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

const tablePreview = ref(null)

const exportImage = async () => {
  if (tablePreview.value) {
    const element = tablePreview.value.tableContainer
    if (!element) {
      console.error('Table container not found')
      return
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Increase resolution
        useCORS: true, // Enable loading of images from other domains
        logging: false, // Disable logging for production
        backgroundColor: null // Transparent background
      })

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create blob')
          return
        }

        // Create download link
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'table-export.png'

        // Trigger download
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Clean up
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch (error) {
      console.error('Error generating image:', error)
    }
  }
}
</script>