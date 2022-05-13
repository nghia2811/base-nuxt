<template>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        content-class="json-code-editor"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn small outlined color="blue-grey darken-1" v-bind="attrs" v-on="on">
                <v-icon small left>mdi-code-json</v-icon>
                Edit Value
            </v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="primary" dark>JSON Editor</v-toolbar>
                <v-card-text class="pa-0">
                    <VueCodeEditor v-model="model" :mode="'json'"/>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                    <v-btn outlined color="primary" @click="emitData(); dialog.value = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name : 'JsonEditorDialog',
        props: ['editorData'],
        data() {
            return {
                model: '' as any
            }
        },
        methods: {
            emitData() {
                let data: any = ''
                console.log(this.model)
                if (this.model) {
                    try {
                        const str: any = this.model
                        data           = JSON.parse(str.trim())
                    } catch (e: any) {
                        console.log(e)
                    }
                }
                this.$emit('saveData', data)
            }
        },
        watch  : {
            editorData: {
                immediate: true,
                handler(data: any) {
                    if (data) {
                        if (typeof data === 'string') {
                            this.model = data
                        } else {
                            try {
                                this.model = JSON.stringify(data, null, 4)
                            } catch (e: any) {
                                console.log(e)
                            }
                        }
                    } else {
                        this.model = ''
                    }
                }
            }
        }
    })
</script>

<style lang="scss">

</style>
