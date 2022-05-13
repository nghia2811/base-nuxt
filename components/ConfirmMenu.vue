<template>
    <div class="confirm-menu-wrap">
        <slot></slot>
        <v-menu bottom min-width="300" max-width="300" v-if="!disabled" content-class="confirm-menu-comp">
            <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on" class="confirm-layer">&nbsp;</div>
            </template>
            <v-card>
                <v-card-title class="text-h6" v-if="title">
                    {{ title }}
                </v-card-title>
                <v-card-text v-if="text">
                    <div v-html="text"></div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" small text @click="$emit('response', 'cancel')">
                        {{ cancelText ? cancelText : 'Cancel' }}
                    </v-btn>
                    <v-btn color="green darken-1" small text @click="$emit('response', 'continue')">
                        {{ agreeText ? agreeText : 'Continue' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name    : 'ConfirmMenu',
        props   : ['title', 'text', 'cancelText', 'agreeText', 'unwrap'],
        computed: {
            disabled(): boolean {
                return !!this.unwrap
            }
        }
    })
</script>

<style lang="scss">
    .confirm-menu-wrap { position: relative;
        .confirm-layer {position: absolute;left: 0;top: 0;width: 100%;height: 100%; cursor: pointer; z-index: 10; text-indent: -9999px;overflow: hidden;}
    }
    .confirm-menu-comp .v-card .v-card__text { font-size: 12px; }
</style>
