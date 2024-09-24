<!-- components/TableOptions.vue -->
<template>
  <h2 class="text-3xl font-bold mb-4 mt-12">Table Options</h2>
  <div class="flex flex-col pt-8 gap-4">
    <FloatLabel class="w-full">
      <label for="tableStyle">Table Style</label>
      <Select
        inputId="tableStyle"
        class="w-full"
        v-model="selectedStyle"
        @change="updateStyle"
        :options="TableStyles"
      ></Select>
    </FloatLabel>
    <div>
      <!-- Rounded -->
      <Checkbox
        id="rounded"
        v-model="rounded"
        @change="useTableStore().updateRounded(rounded)"
        :binary="true"
        inputId="rounded"
      />
      <label for="rounded" class="ml-2">Rounded</label>
    </div>
    <div class="">
      <Checkbox
        id="showBackground"
        v-model="showBackground"
        @change="useTableStore().updateShowBackground(showBackground)"
        :binary="true"
        inputId="showBackground"
      />
      <label for="showBackground" class="ml-2">Show Background</label>
    </div>

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
      <FloatLabel class="w-full mt-4">
        <p>Background Selector...</p>
      </FloatLabel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Select from "primevue/select";
import Checkbox from "primevue/checkbox";

import {
  TableStyles,
  useTableStore,
  BackgroundBlurOptionsArray,
} from "~/stores/tableStore";
import FloatLabel from "primevue/floatlabel";

const showBackground = ref(useTableStore().showBackground);

const rounded = ref(useTableStore().rounded);

const selectedStyle = ref(null);

const backgroundBlur = ref(useTableStore().blurBackground);
// set currently selected style
watchEffect(() => {
  selectedStyle.value = useTableStore().tableStyle;
  backgroundBlur.value = useTableStore().blurBackground;
});

const updateStyle = () => {
  useTableStore().updateTableStyle(selectedStyle.value);
};
</script>
