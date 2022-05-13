<template>
    <tbody v-if="!rowData || !rowData.length">
    <tr class="even">
        <td :colspan="header.length" class="align-center">
            empty Data
        </td>
    </tr>
    </tbody>
    <tbody v-else>
    <template v-for="(row, index) in rowData">
        <tr :key="'main-row-' + (row.id || row._id || index)"
            :class="{'even' : index % 2, 'odd': !(index % 2), 'expand-header' : rowExpand, 'row-cursor': rowCursor}"
            :data-item-index="index"
            @click="handleRowClick(row, $event)">
            <td v-for="(column, columnIndex) in header"
                :data-label="column.text"
                :key="columnIndex"
                :class="{'align-center': column.align && column.align === 'center', 'align-right': column.align && column.align === 'right'}">
                <slot :name="column.value" :row="row">
                    {{ row[column.value] }}
                </slot>
            </td>
        </tr>
        <tr v-if="row.expanded"
            :key="'expanded-row-' + (row._id || row.image_id || row.id || index)"
            class="expanded-style"
            :class="{'expanded-row' : row.expanded, 'hidden-row': !row.expanded}">
            <td :colspan="header.length">
                <slot name="expand" :row="row"/>
            </td>
        </tr>
    </template>
    </tbody>
</template>

<script lang="ts">
    import Vue, { PropOptions } from 'vue'
    import { NavigationGuardNext, Route } from 'vue-router/types/router'

    export default Vue.extend({
        name : 'VueTableBody',
        props: {
            rows          : {
                type    : Array,
                required: false
            } as PropOptions<any>,
            header        : {
                type    : Array,
                required: false
            } as PropOptions<any>,
            rowExpand     : {
                type    : Boolean,
                required: false
            } as PropOptions<Boolean>,
            multipleExpand: {
                type    : Boolean,
                required: false
            } as PropOptions<Boolean>,
            rowCursor     : {
                type    : Boolean,
                required: false,
                default : true
            } as PropOptions<Boolean>
        },
        data() {
            return {
                rowData     : [],
                routerListen: null
            } as any
        },
        mounted(): void {
            this.prepareData()
            this.routerListen = this.$router.beforeEach(async (to: Route, from: Route, next: NavigationGuardNext) => {
                if (this.rowData && this.rowExpand) {
                    // close all expanded row
                    this.prepareRowExpand(this.rowData)
                }
                next()
            })
        },
        beforeDestroy(): void {
            this.rowData      = []
            this.routerListen = null
        },
        methods: {
            prepareData(items?: any[]): void {
                this.rowData = []
                if ((items && items.length) || (this.rows && this.rows.length)) {
                    const data: any = items || this.rows
                    if (this.rowExpand) {
                        this.prepareRowExpand(data)
                    } else {
                        this.rowData = data
                        this.setIndex()
                    }
                    this.$forceUpdate()
                }
            },
            setIndex(): void {
                this.rowData = this.rowData.map((item: any, idx: number) => {
                    item.index = idx
                    return item
                })
            },
            prepareRowExpand(data: any): void {
                this.rowData = data.map((item: any, idx: number) => {
                    item.expanded = item.expanded || false
                    item.index    = idx
                    return item
                })
            },
            handleRowClick(row: any, e: any): void {
                if (e.target && e.target.tagName && (e.target.tagName === 'A')) {
                    return
                }
                const rowID: any = row.id || row._id || row.image_id
                if (this.rowExpand && rowID) {
                    const data: any = this.rowData
                    this.rowData    = data.map((item: any) => {
                        const itemID: any = item.id || item._id || item.image_id
                        if (itemID === rowID) {
                            item.expanded = !item.expanded
                        }
                        if (!this.multipleExpand && itemID !== rowID) {
                            item.expanded = false
                        }
                        return item
                    })
                }
                this.$emit('click', row)
            }
        },
        watch  : {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            rows: function (newData, oldData) {
                if (newData) {
                    this.prepareData(newData)
                }
            }
        }
    })
</script>

<style scoped lang="scss">
    tbody {
        td, th { color: #16171d;border-bottom: 1px solid #eee; padding: 14px; vertical-align: middle; font-size: 13px;
            &:first-child {border-left: 1px solid #eee;}
            &:last-child {border-right: 1px solid #eee;}
            a {text-decoration: none;
                &:hover,
                &:focus {text-decoration: underline;}
            }
        }
    }
    tbody {
        td, th { color: #16171d;border-bottom: 1px solid #eee;}
    }
    tr {
        td, th { word-wrap: break-word; word-break: break-all;}
    }
    tr.odd {
        td, th {background: #f3f3fd; }
    }
    tr.expanded-style.expanded-row {
        td, th {background: #f7f7fc;}
    }
    .row-cursor {cursor: pointer;}
    @media (max-width: 767px) {
        tr:not(.expanded-style) {display: flex; flex-direction: column; align-items: flex-start;align-content: flex-start;
            td, th {width: 100%;border: 1px solid #eee;
                &:before {
                    content: attr(data-label);
                    display: block;
                    font-weight: bold;
                    font-size: 12px;
                }
                + td,
                + th {border-top: none;}
            }
        }
        tr.expanded-style.expanded-row {display: flex; flex-direction: column; align-items: flex-start;align-content: flex-start;
            td, th {width: 100%; }
        }
    }
</style>
