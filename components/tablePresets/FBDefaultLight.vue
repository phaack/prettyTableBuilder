<script setup lang="ts">
import type { TableProps } from '~/stores/tableStore';
defineProps<TableProps>();

</script>

<template>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3" v-for="header in headers" :key="header">
                    {{ header }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="bg-white border-b">
                <td v-for="(cell, colIndex) in row" :key="colIndex" class="px-6 py-4 font-medium text-gray-900">
                    {{ cell }}
                </td>
            </tr>
        </tbody>
    </table>
</template>