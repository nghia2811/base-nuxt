<template>
    <div class="full-height-content-wrap">
        <div class="full-height-title">
            <page-title :title="$t('account')" icon="mdi-account-circle-outline"/>
        </div>
        <div class="full-height-content">
            <HistoryEventProps :details="userProfile"/>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name    : 'AccountPage',
        computed: {
            userProfile(): any {
                // return this.$lodash.isEmpty(this.$auth.user) ? {} : this.$auth.user
            }
        },
        mounted() {
            setTimeout(() => {
                this.$services.app.hideLoading()
            }, 500)
        }
    })
</script>

<style lang="scss">
</style>
