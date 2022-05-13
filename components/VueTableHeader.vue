<template>
    <thead v-if="data && data.length" :thead-ref="$utils.genID()">
    <tr>
        <th v-for="header in data" :key="header.value">
            <slot :name="header.value" :header="header">
                <div class="d-flex align-center"
                     :class="{'justify-center': header.align && header.align === 'center', 'justify-end': header.align && header.align === 'right'}">
                    <span class="text">{{ capitalize(header.text) }}</span>
                    <div v-if="header.sortable">
                        <div class="d-flex flex-column sort-actions">
                            <v-btn icon
                                   :id="ascID"
                                   :color="sortBy === header.value && currentDirection === 'asc' ? 'info' : 'blue-grey lighten-4'"
                                   @click="sortNow(header.value, 'asc')">
                                <v-icon small>mdi-arrow-up</v-icon>
                            </v-btn>
                            <v-btn icon
                                   :id="descID"
                                   :color="sortBy === header.value && currentDirection === 'desc' ? 'info' : 'blue-grey lighten-4'"
                                   @click="sortNow(header.value, 'desc')">
                                <v-icon small>mdi-arrow-down</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </slot>
        </th>
    </tr>
    </thead>
</template>

<script lang="ts">
    import Vue, { PropOptions } from 'vue'

    export default Vue.extend({
        name : 'VueTableHeader',
        props: {
            data         : {
                type    : Array,
                required: false
            } as PropOptions<any>,
            sortBy       : {
                type    : String,
                required: false
            } as PropOptions<any>,
            sortDirection: {
                type    : String,
                required: false
            } as PropOptions<any>
        },
        data() {
            return {
                ascID : null as any,
                descID: null as any
            }
        },
        beforeMount() {
            this.ascID  = this.$utils.genID()
            this.descID = this.$utils.genID()
        },
        computed: {
            currentDirection(): string {
                if (!this.sortDirection && this.sortBy) {
                    const direct: any = this.sortBy.charAt(0)
                    return direct === '-' ? 'desc' : 'asc'
                } else {
                    if (this.sortDirection === 'asc' || this.sortDirection === 'desc') {
                        return this.sortDirection
                    }
                }
                return 'asc'
            }
        },
        methods : {
            sortNow(value: any, direction: any) {
                if (this.sortBy === value && this.currentDirection === direction) {
                    return
                }
                this.$emit('sort-change', {
                    order_by  : value,
                    order_desc: direction === 'desc'
                })
            },
            capitalize(str: any) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            }
        }
    })
</script>

<style scoped lang="scss">
    thead {
        th, td {background: #fff; color: #333;border-top: 1px solid #eee;border-bottom: 1px solid #eee;padding: 14px; vertical-align: middle;
            font-size: 14px; font-weight: 600;
            &:first-child {border-left: 1px solid #eee; border-top-left-radius: 4px;}
            &:last-child {border-right: 1px solid #eee;border-top-right-radius: 4px}
        }
    }
    .sort-actions {flex-direction: column; margin-left: 8px;
        .v-btn,
        .v-icon {width: 16px !important;height: 16px !important; font-size: 12px !important;}
    }
    @media (max-width: 767px) {
        thead {display: none;visibility: hidden;}
    }
</style>
