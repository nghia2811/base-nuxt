<template>
    <div class="full-height-content-wrap">
        <div class="full-height-title">
            <page-title :title="$t('settings')" icon="mdi-cog-outline"/>
        </div>
        <div class="full-height-content">
            SettingsPage <br>
            <div style="display: block">{{ userProfile }}</div>
            <div style="display: block">{{ userToken }}</div>
            <br>
            <SyntaxHighlight language="javascript">{{ jsonData }}</SyntaxHighlight>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'SettingsPage',
        data() {
            return {
                jsonData: null as any,
                yamlData: null as any,
                isValid : false
            }
        },
        computed: {
            userProfile(): any {
                // return this.$lodash.isEmpty(this.$auth.user) ? null : this.$auth.user
            },
            userToken(): any {
                // const authInstance: any = this.$auth // prevent ide warning
                // return authInstance.strategy.token.get()
            }
        },
        mounted() {
            setTimeout(() => {
                this.$services.app.hideLoading()
            }, 500)
        },
        methods: {
        }
    })
</script>
