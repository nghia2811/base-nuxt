<template>
    <div class="vue-pagination d-flex justify-space-between">
        <div class="per-page">
            <div class="item-per-page">
                {{ $t('rowPerPage') }} &nbsp;
                <v-menu top :offset-y="true">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            outlined small
                            v-bind="attrs"
                            v-on="on"
                        >
                            {{ !currentRowPerPage ? 'All' : currentRowPerPage }} &nbsp;
                            <v-icon small>mdi-arrow-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(value, index) in rowsPerPage" :key="index" @click="setPerPage(value)">
                            <v-list-item-title>{{ value }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>
        <div class="page">
            <div class="d-flex align-center">
                <div class="total" v-if="total">
                    <span v-if="!currentRowPerPage">
                        1 - {{ total }} {{ $t('of') }} {{ total }}
                    </span>
                    <span v-else>
                        {{ (currentPage * currentRowPerPage) - currentRowPerPage + 1 }}
                        -
                        {{ currentPage * currentRowPerPage > total ? total : currentPage * currentRowPerPage }}
                        {{ $t('of') }}
                        {{ total }}
                    </span>
                    &nbsp;&nbsp;
                </div>
                <div v-else>0 of 0 &nbsp;&nbsp;</div>
                <div class="pager" v-if="total">
                    <div class="d-flex align-center">
                        <v-btn outlined small color="teal" v-if="currentPage > 3" @click="prevPage()">
                            <v-icon small>mdi-arrow-left</v-icon>
                        </v-btn>
                        <template v-if="currentPage > 3">
                            <span>...</span>
                            <v-btn outlined small color="teal" @click="setPage(currentPage - 2)">
                                {{ currentPage - 2 }}
                            </v-btn>
                            <v-btn outlined small color="teal" @click="setPage(currentPage - 1)">
                                {{ currentPage - 1 }}
                            </v-btn>
                        </template>
                        <template v-if="currentPage <= 3">
                            <v-btn outlined small color="teal" v-for="(n, index) in currentPage - 1"
                                   :key="index" @click="setPage(n)">{{ n }}
                            </v-btn>
                        </template>
                        <v-btn depressed small color="info" strong>{{ currentPage }}</v-btn>
                        <template v-if="totalPage - currentPage > 2">
                            <v-btn outlined small color="teal" v-for="(n, index) in 2" :key="index"
                                   @click="setPage(currentPage + n)">{{ currentPage + n }}
                            </v-btn>
                        </template>
                        <template v-if="totalPage - currentPage <= 2">
                            <template v-for="(n, index) in 2">
                                <v-btn outlined small color="teal" v-if="currentPage + n <= totalPage"
                                       :key="index" @click="setPage(currentPage + n)">{{
                                        currentPage + n
                                    }}
                                </v-btn>
                            </template>
                        </template>
                        <template v-if="totalPage - currentPage > 3">
                            <span>...</span>
                            <v-btn outlined small color="teal" @click="nextPage()">
                                <v-icon small>mdi-arrow-right</v-icon>
                            </v-btn>
                        </template>
                        <v-btn outlined small color="teal" v-if="totalPage - currentPage === 3"
                               @click="setPage(totalPage)">{{ totalPage }}
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, { PropOptions } from 'vue'

    export default Vue.extend({
        name : 'Pagination',
        props: {
            page : {
                type    : Number,
                required: true,
                default : 1
            } as PropOptions<any>,
            total: {
                type    : Number,
                required: false
            } as PropOptions<any>,
            limit: {
                type    : Number,
                required: false,
                default : 0
            } as PropOptions<any>
        },
        data() {
            return {
                currentPage      : 1,
                currentRowPerPage: 12,
                rowsPerPage      : [12, 24, 36, 50, 100]
            }
        },
        computed: {
            totalPage(): any {
                let num: any = 0
                if (this.total && this.currentRowPerPage && this.currentRowPerPage > 0) {
                    num = Math.ceil(this.total / this.currentRowPerPage)
                }
                return num > 0 ? num : 0
            }
        },
        mounted(): void {
            this.currentPage       = this.page
            this.currentRowPerPage = this.limit
        },
        methods: {
            setPerPage(value: number) {
                this.currentRowPerPage = value
                this.currentPage       = 1
                this.$emit('per-page-change', {
                    limit: value,
                    page : 1
                })
            },
            setPage(value: number) {
                this.currentPage = value
                this.$emit('page-change', {
                    page: value
                })
            },
            prevPage() {
                this.setPage(this.currentPage - 1)
            },
            nextPage() {
                this.setPage(this.currentPage + 1)
            }
        }
    })
</script>

<style scoped lang="scss">
    .vue-pagination { padding: 16px; font-weight: 500; font-size: 13px;
        .per-page {position: relative;
            ul {list-style: none; display: block; margin: 0;padding: 0;}
        }
        .pager {
            .v-btn {min-width: 28px;}
            > .d-flex {
                > * {margin: 0 3px;}
                > .v-btn:last-child {margin-right: 0;}
            }
        }
    }
</style>
