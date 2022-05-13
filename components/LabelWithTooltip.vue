<template>
    <label v-if="label"
           :for="forId ? forId : ''"
           class="formulate-input-label label-with-tooltip"
           :class="cssClass">
        <span>{{ label }}</span>
        <v-tooltip top v-if="text" content-class="form-help-icon">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon x-small>
                    <v-icon small>mdi-help-circle-outline</v-icon>
                </v-btn>
            </template>
            <span>{{ text }}</span>
        </v-tooltip>
    </label>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name : 'LabelWithTooltip',
        props: ['forId', 'label', 'text', 'tooltipOnly', 'cssClass']
    })
</script>

<style lang="scss">

</style>
