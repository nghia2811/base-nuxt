<template>
    <div>
        <FormulateForm :schema="formValues"></FormulateForm>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'FormBuilder',
        data() {
            return {
                formValues: [
                    {
                        'component': 'h3',
                        'children' : 'Social profile'
                    },
                    {
                        'type' : 'image',
                        'name' : 'headshot',
                        'label': 'Your headshot'
                    },
                    {
                        'type'      : 'group',
                        'name'      : 'accounts',
                        'validation': 'min:2,length',
                        'repeatable': true,
                        'add-label' : '+ Add platform',
                        'value'     : [{}],
                        'children'  : [
                            {
                                'type'       : 'select',
                                'name'       : 'platform',
                                'label'      : 'Social platform',
                                'placeholder': 'Select one',
                                'options'    : {
                                    'twitter'  : 'Twitter',
                                    'facebook' : 'Facebook',
                                    'instagram': 'Instagram',
                                    'linkedin' : 'LinkedIn'
                                }
                            },
                            {
                                'type'      : 'text',
                                'name'      : 'url',
                                'label'     : 'Profile url',
                                'validation': 'required|url'
                            }
                        ]
                    },
                    {
                        'type' : 'submit',
                        'label': 'Save my social'
                    }
                ]
            }
        }
    })
</script>

<style scoped lang="scss">

</style>
