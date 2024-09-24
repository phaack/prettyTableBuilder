<!-- pages/index.vue -->
<template>
  <div class="container mx-auto h-screen p-4">
    <Splitter class="h-full">
      <SplitterPanel class="mx-4 h-full min-w-[300px] space-y-2">
        <h1 class="text-4xl font-bold mb-12 mt-4">Table To Image</h1>
        <TableOptions />
        <TableInput />
        <div class="">
          <Button @click="exportImageFull" fluid icon="pi pi-download" label="Download Image" />
        </div>
      </SplitterPanel>
      <SplitterPanel class="h-full">
        <TablePreview class="h-full" ref="tablePreview" />
      </SplitterPanel>
    </Splitter>

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
import Button from 'primevue/button';

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

const exportImageFull = async () => {
  if (tablePreview.value) {
    const element = tablePreview.value.tableContainer
    if (!element) {
      console.error('Table container not found');
      return;
    }

    // Store original styles
    const originalStyles = {
      width: element.style.width,
      height: element.style.height,
      position: element.style.position,
      overflow: element.style.overflow,
      maxHeight: element.style.maxHeight
    };

    // Modify styles to capture full table
    element.style.width = 'auto';
    element.style.height = 'auto';
    element.style.position = 'relative';
    element.style.overflow = 'visible';
    element.style.maxHeight = 'none';

    try {
      const canvas = await html2canvas(element, {
        scrollY: -window.scrollY,
        scale: 2, // Increase resolution
        useCORS: true,
        logging: false,
        backgroundColor: null // Transparent background
      });

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create blob');
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'table-export.png';

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      // Restore original styles
      Object.assign(element.style, originalStyles);
    }
  }
};
</script>