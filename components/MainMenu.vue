<template>
    <v-list class="pa-0 main-nav-items page-gradient">
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            dark
            :class="{'v-list-item--active': item.active}"
        >
            <v-list-item-action :title="item.title">
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
        </v-list-item>
        <v-list-item>
            <v-list-item-action>
                <v-icon @click.stop="miniVariant = !miniVariant; $emit('mini-variant-change', miniVariant)">
                    mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
                </v-icon>
            </v-list-item-action>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'MainMenu',
        data() {
            return {
                items      : [] as any,
                miniVariant: true
            }
        },
        mounted() {
            this.initItems()
        },
        methods: {
            initItems(applyLastActiveState?: boolean) {
                let lastActiveLink: any = false
                if (applyLastActiveState) {
                    lastActiveLink = this.items.filter((item: any) => item.active)[0]
                }
                this.items = [
                    {
                        icon  : 'mdi-home-outline',
                        title : 'Home',
                        to    : '/',
                        active: false
                    },
                    {
                        icon  : 'mdi-sitemap-outline',
                        title : 'Flow Builder',
                        to    : '/builder',
                        active: false
                    },
                    {
                        icon  : 'mdi-server-network',
                        title : 'Execution History',
                        to    : '/history',
                        active: false
                    }
                    // {
                    //     icon  : 'mdi-cog-outline',
                    //     title : this.$i18n.t('settings'),
                    //     to    : '/settings',
                    //     active: false
                    // }
                ]
                if (lastActiveLink) {
                    this.items.map((item: any) => {
                        if (item.to === lastActiveLink.to) {
                            item.active = true
                        }
                        return item
                    })
                }
            },
            updateState(path: string) {
                this.items.map((i: any) => {
                    i.active = false
                    if (path === '/' && i.to === '/') {
                        i.active = true
                    } else {
                        if (path !== '/' && i.to.indexOf(path) === 0) {
                            i.active = true
                        }
                    }
                })
            }
        },
        watch  : {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            '$route'      : function (newData, oldData) {
                if (newData && newData.path) {
                    this.updateState(newData.path)
                }
            },
            '$i18n.locale': function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.initItems(true)
                }
            }
        }
    })
</script>

<style scoped lang="scss">
    .main-nav-items {height: 100%;overflow: auto; color: #fff !important;
        .v-icon {color: #fff !important;}
        .v-list-item {opacity: 0.5;-webkit-transition: opacity 0.25s linear;-moz-transition: opacity 0.25s linear;transition: opacity 0.25s linear; color: #fff !important;
            &:hover,
            &:focus,
            &.v-list-item--active {opacity: 1}
            .v-list-item__title {font-size: 13px;}
        }
    }
</style>
