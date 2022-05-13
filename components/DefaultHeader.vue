<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
        >
            <MainMenu @mini-variant-change="miniVariant = $event"/>
        </v-navigation-drawer>
        <v-app-bar
            :clipped-left="clipped"
            :clipped-right="clipped"
            class="header-wrap elevation-0 page-gradient"
            dark
            fixed
            app
        >
            <v-app-bar-nav-icon class="toggle-main-menu" @click.stop="drawer = !drawer"/>
            <header-logo/>
            <div v-if="workflow && workflow.name" class="header-wf-name">
                <v-icon small>mdi-arrow-right-thin</v-icon>
                {{ workflow.name }}
            </div>
            <v-spacer/>
            <v-btn v-if="$auth.loggedIn" icon @click.stop="displayAccountNav = !displayAccountNav" title="account">
                <v-icon>mdi-account-circle-outline</v-icon>
            </v-btn>
            <v-btn v-else icon @click.stop="() => $router.push('/login')" title="login">
                <v-icon>mdi-account-circle-outline</v-icon>
            </v-btn>
            <AppLocale/>
        </v-app-bar>
        <v-navigation-drawer
            v-model="displayAccountNav"
            :mini-variant="accountMiniVariant"
            :right="right"
            :clipped="clipped"
            :absolute="true"
            app
        >
            <UserMenu @trigger-close="displayAccountNav = false" @mini-variant-change="accountMiniVariant = $event"/>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'DefaultHeader',
        data() {
            return {
                clipped           : true,
                drawer            : true,
                fixed             : false,
                right             : true,
                displayAccountNav : false,
                miniVariant       : true,
                accountMiniVariant: true
            }
        },
        computed: {
        }
    })
</script>

<style lang="scss">
    .header-wrap {
        .toggle-main-menu {opacity: 0.5;-webkit-transition: opacity 0.25s linear;-moz-transition: opacity 0.25s linear;transition: opacity 0.25s linear;
            &:hover,
            &:focus {opacity: 1}
        }
        .header-wf-name {padding-left: 10px;}
    }
</style>
