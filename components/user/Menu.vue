<template>
    <v-list class="ma-0 pa-0">
        <v-list-item link>
            <v-list-item-action @click="()=> $router.push('/account')" title="account">
                <v-icon>mdi-card-account-details-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title v-text="$t('profile')"/>
            </v-list-item-content>
        </v-list-item>
        <v-list-item @click.native="$auth.logout()" link>
            <v-list-item-action title="logout">
                <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title v-text="$t('logout')"/>
            </v-list-item-content>
        </v-list-item>
        <v-list-item>
            <v-list-item-action>
                <v-icon @click.stop="miniVariant = !miniVariant; $emit('mini-variant-change', miniVariant)">
                    mdi-{{ `chevron-${miniVariant ? 'left' : 'right'}` }}
                </v-icon>
            </v-list-item-action>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'UserMenu',
        data() {
            return {
                miniVariant: true
            }
        },
        methods: {
            logout() {
                this.$store.dispatch(this.$storeAction.USER.SIGN_OUT)
                this.$emit('trigger-close', true)
            }
        }
    })
</script>

<style lang="scss">

</style>
