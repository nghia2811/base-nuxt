<template>
    <div class="page-title">
        <v-app-bar class="elevation-0" :class="{'has-tabs': hasTabsSlot, 'has-actions': hasActionsSlot}">
            <v-btn
                icon
                color="primary"
                @click.stop="back()"
                v-if="canGoBack"
            >
                <v-icon>mdi-arrow-left-circle</v-icon>
            </v-btn>
            <v-icon class="page-icon" v-if="icon">{{ icon }}</v-icon>
            <v-toolbar-title v-if="title" v-text="title"/>
            <div class="page-tabs" :class="{'hidden': !hasTabsSlot}">
                <slot name="tabs"></slot>
            </div>
            <v-spacer/>
            <div class="page-actions" :class="{'hidden': !hasActionsSlot}">
                <slot name="actions"></slot>
            </div>
        </v-app-bar>
        <div class="bottom-of-page-title" :class="{'hidden': !hasBottomTitleSlot}">
            <slot name="bottomTitle"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name    : 'PageTitle',
        props   : ['title', 'canGoBack', 'icon'],
        computed: {
            hasTabsSlot(): boolean {
                return !!this.$slots.tabs
            },
            hasActionsSlot(): boolean {
                return !!this.$slots.actions
            },
            hasBottomTitleSlot(): boolean {
                return !!this.$slots.bottomTitle
            }
        },
        methods : {
            back() {
                this.$router.back()
            }
        }
    })
</script>

<style lang="scss">
    .page-title { border-bottom: 1px solid #e8e8e8;
        .v-toolbar__content { padding: 0 20px !important; }
        .v-toolbar__title {font-weight: 900; text-transform: uppercase;padding-left: 5px !important;}
        .v-toolbar__title,
        .v-icon {color: rgb(15, 23, 42);}
        .page-icon {margin-right: 15px;}
        .page-tabs { padding-left: 40px; }
        .bottom-of-page-title {display: block; position: relative;z-index: 100;}
        .hidden {display: none !important; visibility: hidden !important;}
        .page-filter {position: absolute; left: 0;top: 100%;width: 100%; background: #fff; padding: 4px 4px 10px;
            .row > div {padding-bottom: 5px;}
        }
    }
</style>
