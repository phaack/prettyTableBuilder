<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase">
        <tr>
          <th scope="col" class="px-6 py-3 bg-gray-50" v-for="header in headers" :key="header">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="border-b border-gray-200">
          <td v-for="(cell, colIndex) in row" :key="colIndex" class="px-6 py-4 font-medium text-gray-900" :class="colIndex % 2 === 0 ? 'bg-gray-50' : ''">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { TableProps } from '~/stores/tableStore';

const props = defineProps<TableProps>();
</script>