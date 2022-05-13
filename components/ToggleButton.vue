<template>
    <div class="title-with-toggle-btn" :class="[cssClass ? cssClass : '', freezeToggleButton ? 'disabled' : '', help ? 'with-tooltip' : '']">
        <span class="config-title">
            <span>
                <span>{{ title ? title : 'Title' }}</span>
                <v-tooltip top v-if="help" content-class="form-help-icon">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" icon x-small>
                            <v-icon small>mdi-help-circle-outline</v-icon>
                        </v-btn>
                    </template>
                    <span>{{ help }}</span>
                </v-tooltip>
            </span>
        </span>
        <span class="action">
            <span v-if="actionTitle">{{ actionTitle }}</span>
            <template v-if="size && size === 'x-small'">
                <v-btn icon @click="toggleState()" :color="state ? 'primary' : ''" x-small>
                    <v-icon v-if="state">mdi-toggle-switch-outline</v-icon>
                    <v-icon v-else>mdi-toggle-switch-off-outline</v-icon>
                </v-btn>
            </template>
            <template v-else-if="size && size === 'small'">
                <v-btn icon @click="toggleState()" :color="state ? 'primary' : ''" small>
                    <v-icon v-if="state">mdi-toggle-switch-outline</v-icon>
                    <v-icon v-else>mdi-toggle-switch-off-outline</v-icon>
                </v-btn>
            </template>
            <template v-else-if="size && size === 'large'">
                <v-btn icon @click="toggleState()" :color="state ? 'primary' : ''" large>
                    <v-icon v-if="state">mdi-toggle-switch-outline</v-icon>
                    <v-icon v-else>mdi-toggle-switch-off-outline</v-icon>
                </v-btn>
            </template>
            <template v-else-if="size && size === 'x-large'">
                <v-btn icon @click="toggleState()" :color="state ? 'primary' : ''" x-large>
                    <v-icon v-if="state">mdi-toggle-switch-outline</v-icon>
                    <v-icon v-else>mdi-toggle-switch-off-outline</v-icon>
                </v-btn>
            </template>
            <template v-else>
                <v-btn icon @click="toggleState()" :color="state ? 'primary' : ''">
                    <v-icon v-if="state">mdi-toggle-switch-outline</v-icon>
                    <v-icon v-else>mdi-toggle-switch-off-outline</v-icon>
                </v-btn>
            </template>
        </span>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name   : 'ToggleButton',
        props  : ['initData', 'title', 'help', 'actionTitle', 'cssClass', 'size', 'freezeToggleButton'],
        data   : () => {
            return {
                state: false
            }
        },
        methods: {
            toggleState() {
                if (this.freezeToggleButton) {
                    return
                }
                this.$emit('state-change', !this.state)
                this.state = !this.state
            }
        },
        watch  : {
            initData: {
                immediate: true,
                handler(data: any) {
                    this.state = !!data
                }
            }
        }
    })
</script>
<style lang="scss">
    .title-with-toggle-btn { font-size: 14px; font-weight: bold; display: flex; justify-content: space-between; align-content: center; align-items: center;
        .action {
            > span {font-weight: normal; font-size: 12px; padding-right: 6px; }
        }
        &.disabled .action {opacity: 0.5}
        &.with-tooltip {
            .config-title > span { display: flex; justify-content: flex-start;align-content: flex-start; align-items: flex-start;
                button.v-btn {width: 16px;height: 16px; margin: 2px 0 0 6px;}
            }
        }
    }
</style>
