# Table Creator Tool

The Table Creator Tool is a versatile application that allows users to create and customize tables in various styles. It offers two methods for table creation: text input and a visual table builder. Users can easily switch between these methods and preview the table in real-time.

## Features

1. **Text Input**: Users can input table data using the conventional pipe `|` syntax to separate columns and newlines for rows.
2. **Table Builder**: Users can visually add, remove, and reorder columns, as well as edit column headers and cell contents.
3. **Table Styles**: The tool provides several predefined table styles, including light and dark variants with different formatting options (e.g., default, striped rows, striped columns).
4. **Image Export**: Users can export the created table as an image (PNG or JPEG) for use in presentations, documents, or other applications.

## Extending the Table Designs

The Table Creator Tool is designed to be easily extensible, allowing you to add new table styles as needed. Here's how you can do it:

1. **Add a new style to the `TableStyles` array**: In the `stores/tableStore.ts` file, locate the `TableStyles` array and add your new style. For example:

```typescript
export const TableStyles = [
  'FB default - light',
  'FB striped rows - light',
  'FB striped columns - light',
  'FB default - dark',
  'FB striped rows - dark',
  'FB striped columns - dark',
  'My Custom Style - Light',
] as const;
```

## Create a new table component: 
In the components/tablePresets directory, create a new Vue component that represents your custom table style. For example, create a file named MyCustomStyleLight.vue and add the following content:

```vue
<script setup lang="ts">
import type { TableProps } from '~/stores/tableStore';
const props = defineProps<TableProps>();
</script>

<template>
  <table class="w-full text-sm text-left rtl:text-right text-gray-400">
    <thead class="text-xs text-gray-400 uppercase bg-gray-200">
      <tr>
        <th scope="col" class="px-6 py-3" v-for="header in props.headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex" class="bg-white border-b border-gray-200">
        <td v-for="(cell, colIndex) in row" :key="colIndex" class="px-6 py-4 font-medium text-gray-900">
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
```

## Update the currentTableComponent in components/TablePreview.vue
In the components/TablePreview.vue file, locate the currentTableComponent computed property and add a new case for your custom style:

```ts
const currentTableComponent = computed(() => {
  switch (tableStyle.value) {
    case 'FB default - light':
      return FBDefaultLight;
    case 'FB default - dark':
      return FBDefaultDark;
    case 'FB striped rows - light':
      return FBStripedRowsLight;
    case 'FB striped rows - dark':
      return FBStripedRowsDark;
    case 'FB striped columns - light':
      return FBStripedColumnsLight;
    case 'FB striped columns - dark':
      return FBStripedColumnsDark;
    case 'My Custom Style - Light':
      return MyCustomStyleLight;
    default:
      return FBDefaultLight;
  }
});
```

With these changes, your new table style will be available in the Table Creator Tool, and users will be able to select and preview it alongside the other predefined styles.
Feel free to create as many custom table styles as needed to meet your requirements. The modular design of the tool makes it easy to extend and maintain.
Happy table creating!