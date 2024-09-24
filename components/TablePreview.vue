<template>
  <div
    class="table-container h-screen relative"
    ref="tableContainer"
    id="tableContainer"
    :style="containerStyle"
  >
    <!-- Background Layer -->
    <div
      v-if="showBackground"
      class="absolute inset-0 z-0"
      :style="backgroundStyle"
    ></div>

    

    <!-- Table Wrapper -->
    <div class="relative z-10" :class="{ 'py-12': showBackground }">
      <div
        :class="{ 'rounded-lg overflow-hidden': rounded }"
        :style="tableWrapperStyle"
      >
        <component
          :is="currentTableComponent"
          :headers="tableData[0]"
          :rows="tableData.slice(1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTableStore } from "@/stores/tableStore";

// Import table presets
import FBDefaultLight from "./tablePresets/FBDefaultLight.vue";
import FBDefaultDark from "./tablePresets/FBDefaultDark.vue";
import FBStripedRowsLight from "./tablePresets/FBStripedRowsLight.vue";
import FBStripedRowsDark from "./tablePresets/FBStripedRowsDark.vue";
import FBStripedColumnsLight from "./tablePresets/FBStripedColumnsLight.vue";
import FBStripedColumnsDark from "./tablePresets/FBStripedColumnsDark.vue";

// Access store and its properties
const tableStore = useTableStore();
const {
  shadow,
  tableStyle,
  tableData,
  showBackground,
  blurBackground,
  rounded,
  backgroundImage,
  backgroundMargin,
} = storeToRefs(tableStore);

// Compute the current table component based on selected style
const currentTableComponent = computed(() => {
  switch (tableStyle.value) {
    case "FB default - light":
      return FBDefaultLight;
    case "FB default - dark":
      return FBDefaultDark;
    case "FB striped rows - light":
      return FBStripedRowsLight;
    case "FB striped rows - dark":
      return FBStripedRowsDark;
    case "FB striped columns - light":
      return FBStripedColumnsLight;
    case "FB striped columns - dark":
      return FBStripedColumnsDark;
    default:
      return FBDefaultLight;
  }
});

// watch background image
watch(backgroundImage, () => {
  console.log(backgroundImage.value);
});

// Define the background style, applying blur
const backgroundStyle = computed(() => ({
  backgroundImage: backgroundImage.value
    ? `url(${backgroundImage.value})`
    : "url(/prettyTableBuilder/img/example.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter:
    blurBackground.value !== "none"
      ? `blur(${getBlurStrength(blurBackground.value)})`
      : "none",
}));

// Define the container style for the outer container
const containerStyle = computed(() => ({
  backgroundColor: showBackground.value ? "#f0f0f0" : "transparent",
  transition: "all 0.3s ease",
}));

// Define the table wrapper style to apply shadow directly to the table
const tableWrapperStyle = computed(() => ({
  boxShadow: shadow.value !== "none" ? getShadowStyle(shadow.value) : "none",
  marginLeft: `${backgroundMargin.value}px`,
  marginRight: `${backgroundMargin.value}px`,
}));

// Helper to get blur strength
const getBlurStrength = (blur: string) => {
  switch (blur) {
    case "light":
      return "2px";
    case "medium":
      return "5px";
    case "strong":
      return "10px";
    default:
      return "0px";
  }
};

// Helper to get shadow styles
const getShadowStyle = (shadow: string) => {
  switch (shadow) {
    case "light":
      return "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
    case "medium":
      return "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
    case "strong":
      return "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
    default:
      return "none";
  }
};
</script>

<style scoped>
.table-container {
  transition: all 0.3s ease;
}
</style>
