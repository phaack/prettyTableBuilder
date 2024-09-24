<template>
  <div class="flex flex-col pt-8 gap-4">
    <FloatLabel class="w-full">
      <label for="tableStyle">Table Style</label>
      <Select
        inputId="tableStyle"
        class="w-full"
        v-model="selectedStyle"
        :options="TableStyles"
      />
    </FloatLabel>

    <!-- Rounded -->
    <div>
      <Checkbox id="rounded" v-model="rounded" :binary="true" />
      <label for="rounded" class="ml-2">Rounded</label>
    </div>

    <!-- Show Background -->
    <div>
      <Checkbox id="showBackground" v-model="showBackground" :binary="true" />
      <label for="showBackground" class="ml-2">Show Background</label>
    </div>

    <!-- Background Options -->
    <div v-if="showBackground" class="space-y-8 pt-4">
      <FloatLabel class="w-full">
        <Select
          inputId="backgroundBlur"
          class="w-full"
          :options="BackgroundBlurOptionsArray"
          v-model="backgroundBlur"
        />
        <label for="backgroundBlur">Background Blur</label>
      </FloatLabel>
      <div>
        <Slider v-model="bgMargin" inputId="bgMarginSlider" />
      </div>
        <FileUpload mode="basic" @select="handleImageUpload" customUpload auto severity="secondary" class="p-button-outlined" chooseLabel="Upload Background Image"/>
    </div>

    <!-- Shadow Strength -->
    <div class="mt-4">
      <FloatLabel class="w-full">
        <Select
          inputId="shadow"
          class="w-full"
          :options="ShadowOptionsArray"
          v-model="shadowStrength"
        />
        <label for="shadow">Shadow Strength</label>
      </FloatLabel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import {
  useTableStore,
  TableStyles,
  BackgroundBlurOptionsArray,
  ShadowOptionsArray,
} from "~/stores/tableStore";
import Select from "primevue/select";
import Checkbox from "primevue/checkbox";
import FloatLabel from "primevue/floatlabel";
import Slider from "primevue/slider";

const tableStore = useTableStore(); // Access the store once

const uploadedImage = ref<string | null>(null); // Store the uploaded image as Base64
const uploadedImageUrl = ref<string | null>(null);

// Handle the image upload and convert it to Base64
const handleImageUpload = (event: Event) => {
  const file = event.files?.[0];
  if (!file) return;

  uploadedImage.value = file;
  uploadedImageUrl.value = URL.createObjectURL(file);

  console.log(uploadedImageUrl.value);


  // update background image
  tableStore.updateBackgroundImage(uploadedImageUrl.value);
};

// Computed properties for reactive store values
const selectedStyle = computed({
  get: () => tableStore.tableStyle,
  set: (value) => tableStore.updateTableStyle(value),
});

const shadowStrength = computed({
  get: () => tableStore.shadow,
  set: (value) => tableStore.updateShadow(value),
});

const rounded = computed({
  get: () => tableStore.rounded,
  set: (value) => tableStore.updateRounded(value),
});

const showBackground = computed({
  get: () => tableStore.showBackground,
  set: (value) => tableStore.updateShowBackground(value),
});

const bgMargin = computed({
  get: () => tableStore.backgroundMargin,
  set: (value) => tableStore.updateBackgroundMargin(value),
});

const backgroundBlur = computed({
  get: () => tableStore.blurBackground,
  set: (value) => tableStore.updateBlurBackground(value),
});
</script>
