<template>
    <v-menu rounded="5" offset-y>
        <template v-slot:activator="{ attrs, on }">
            <v-btn v-bind="attrs" v-on="on" icon class="ma-2">
                <v-icon>mdi-translate</v-icon>
            </v-btn>
        </template>
        <v-list class="ma-0 pa-0">
            <v-list-item v-for="(locale, index) in locales" :key="index" link
                         :class="{'v-list-item--active': currentLocale === locale.code}"
                         @click="switchLocale(locale.code)">
                <v-list-item-title v-text="locale.title"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {mapState} from "vuex";

    export default Vue.extend({
        name: 'AppLocale',
        data() {
            return {
                locales: [
                    {
                        code: 'en',
                        title: 'EN',
                    },
                    {
                        code: 'vi',
                        title: 'VN',
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                currentLocale: (state: any) => state.locale
            })
        },
        methods: {
            switchLocale(locale: string) {
                if (this.$i18n.locale !== locale) {
                    this.$i18n.setLocale(locale)
                    this.$storage.setItem(this.$conf.STORAGE_LANGUAGE_KEY, locale).then(() => {
                        this.$store.dispatch(this.$storeAction.SET_CURRENT_LOCALE, locale)
                    })
                }
            }
        }
    })
</script>

<style lang="scss">

</style>
