<!-- pages/index.vue -->
<template>
  <div class="container mx-auto h-screen p-4">
    <Splitter class="">
      <SplitterPanel class="mx-4 h-full min-w-[350px] space-y-2">
        <h1 class="text-4xl font-bold mb-4 mt-4">Table To Image Generator</h1>
        <TableOptions/>
        <TableInput />
        <div class="mt-4 flex flex-col space-y-4">
          <Button
            @click="() => exportImageFull(2)"
            fluid
            icon="pi pi-download"
            label="Download Image"
          />
          <div class="flex gap-2">
            <Button @click="() => exportImageFull(1)" severity="secondary" fluid icon="pi pi-download" label="Download Image (1x)" />
            <Button @click="() => exportImageFull(4)" severity="secondary" fluid icon="pi pi-download" label="Download Image (4x)" />
            <Button @click="() => exportImageFull(8)" severity="secondary" fluid icon="pi pi-download" label="Download Image (8x)" />
          </div>
        </div>
      </SplitterPanel>
      <SplitterPanel class="h-full">
        <TablePreview class="h-full" ref="tablePreview" />
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import html2canvas from "html2canvas";
import TableInput from "~/components/TableInput.vue";
import TableOptions from "~/components/TableOptions.vue";
import TablePreview from "~/components/TablePreview.vue";

import Divider from "primevue/divider";

import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Button from "primevue/button";

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

const tablePreview = ref(null);




const exportImageFull = async (upscaleFactor: number) => {
  if (tablePreview.value) {
    // find table container with id "tableContainer" using document
    const element = document.getElementById("tableContainer");

    if (!element) {
      console.error("Table container not found");
      return;
    }

    // Store original styles
    const originalStyles = {
      width: element.style.width,
      height: element.style.height,
      position: element.style.position,
      overflow: element.style.overflow,
      maxHeight: element.style.maxHeight,
    };

    // Modify styles to capture full table
    element.style.width = "auto";
    element.style.height = "auto";
    element.style.position = "relative";
    element.style.overflow = "visible";
    element.style.maxHeight = "none";

    try {
      const canvas = await html2canvas(element, {
        scrollY: -window.scrollY,
        scale: 2, // Increase resolution
        useCORS: true,
        logging: false,
        backgroundColor: null, // Transparent background
      });

      // refactor using html-to-image
      toJpeg(element, {
        quality: 1,
        // upscale the elements width and height by 4
        canvasWidth: canvas.width * upscaleFactor,
        canvasHeight: canvas.height * upscaleFactor,
      }).then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "table-export.jpeg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(dataUrl);
      })



      

      // Convert canvas to blob
      // canvas.toBlob((blob) => {
      //   if (!blob) {
      //     console.error("Failed to create blob");
      //     return;
      //   }

      //   // Create download link
      //   const url = URL.createObjectURL(blob);
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.download = "table-export.png";

      //   // Trigger download
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);

      //   // Clean up
      //   URL.revokeObjectURL(url);
      // }, "image/png");
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      // Restore original styles
      Object.assign(element.style, originalStyles);
    }
  }
};
</script>
