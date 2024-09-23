import { defineStore } from 'pinia'

export interface TableProps {
    headers: string[]
    rows: string[][]
}

export const TableStyles = ['FB default - light' , 'FB striped rows - light' , 'FB striped columns - light' 
, 'FB default - dark' , 'FB striped rows - dark' , 'FB striped columns - dark'] as const;

export type TableStyle = typeof TableStyles[number];

export const useTableStore = defineStore('table', {
    state: () => ({
        _tableData: [] as string[][],
        _tableStyle: 'FB default - dark' as TableStyle
    }),
    actions: {
        updateTableData(newData: string[][]) {
            console.log('Updating table data:', newData)
            this._tableData = newData
        },
        updateTableStyle(newStyle: TableStyle) {
            this._tableStyle = newStyle
        },
        addColumn() {
            if (this._tableData.length === 0) {
                this._tableData.push(['New Column'])
                this._tableData.push([''])
            } else {
                this._tableData[0].push('New Column')
                for (let i = 1; i < this._tableData.length; i++) {
                    this._tableData[i].push('')
                }
            }
        },
        removeColumn(index: number) {
            if (this._tableData.length > 0) {
                for (let row of this._tableData) {
                    row.splice(index, 1)
                }
            }
        },
        addRow() {
            if (this._tableData.length === 0) {
                this._tableData.push([''])
            } else {
                const newRow = new Array(this._tableData[0].length).fill('')
                this._tableData.push(newRow)
            }
        },
        updateCell(rowIndex: number, colIndex: number, value: string) {
            if (this._tableData[rowIndex] && this._tableData[rowIndex][colIndex] !== undefined) {
                this._tableData[rowIndex][colIndex] = value
            }
        },
        updateColumnHeader(index: number, value: string) {
            if (this._tableData.length > 0 && this._tableData[0][index] !== undefined) {
                this._tableData[0][index] = value
            }
        }
    }, getters: {
        tableData: (state) => state._tableData,
        tableStyle: (state) => state._tableStyle
    }
})