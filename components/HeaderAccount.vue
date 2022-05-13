<template>
    <div>
        <v-btn icon @click.stop="showNav = !showNav">
            <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>
        <v-navigation-drawer v-model="showNav" :right="right" temporary fixed>
            <v-list>
                <v-list-item @click.native="switchLocale('en')">
                    <v-list-item-title>Lang: EN</v-list-item-title>
                </v-list-item>
                <v-list-item @click.native="switchLocale('vi')">
                    <v-list-item-title>Lang: VI</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'DefaultHeader',
        data() {
            return {
                items: [] as any,
                clipped: true,
                drawer: true,
                fixed: false,
                miniVariant: true,
                right: true,
                showNav: false
            }
        },
        mounted() {
            this.initItems()
        },
        methods: {
            initItems() {
                this.items = [
                    {
                        icon: 'mdi-home-outline',
                        title: 'Welcome',
                        to: '/',
                        active: false
                    },
                    {
                        icon: 'mdi-sitemap-outline',
                        title: 'Flow Builder',
                        to: '/builder',
                        active: false
                    },
                    {
                        icon: 'mdi-server-network',
                        title: 'Workflows',
                        to: '/workflows',
                        active: false
                    },
                    {
                        icon: 'mdi-cog-outline',
                        title: this.$i18n.t('settings'),
                        to: '/settings',
                        active: false
                    }
                ]
            },
            switchLocale(locale: string) {
                if (this.$i18n.locale !== locale) {
                    this.$i18n.setLocale(locale)
                    this.$storage.setItem(this.$conf.STORAGE_LANGUAGE_KEY, locale).then(() => {
                        this.$store.dispatch(this.$storeAction.SET_CURRENT_LOCALE, locale)
                    })
                }
            }
        },
        watch: {
            '$i18n.locale': function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.initItems()
                }
            }
        }
    })
</script>

<style lang="scss">

</style>
