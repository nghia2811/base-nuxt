<template>
    <div class="register-page d-flex">
        <div class="register-side">
            <svg
                viewBox="0 0 960 540"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMax slice"
                xmlns="http://www.w3.org/2000/svg"
                class="register-bg-svg"
            >
                <g fill="none" stroke="currentColor" stroke-width="100">
                    <circle r="234" cx="196" cy="23"></circle>
                    <circle r="234" cx="790" cy="491"></circle>
                </g>
            </svg>
            <svg
                viewBox="0 0 220 192"
                width="220"
                height="192"
                fill="none"
                class="register-svg-top-right"
            >
                <defs>
                    <pattern
                        id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="4"
                            height="4"
                            fill="currentColor"
                        ></rect>
                    </pattern>
                </defs>
                <rect
                    width="220"
                    height="192"
                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                ></rect>
            </svg>
            <div class="register-form">
                <div class="sign-in-logo d-flex justify-center">
                    <header-logo/>
                </div>
                <br />
                <FormulateForm
                    class="ma-0"
                    ref="registerForm"
                    v-model="formValues"
                    @submit="submitData($event)"
                >
                    <FormulateInput
                        v-for="(item, index) of inputs"
                        :key="index"
                        :type="item.attributes.type"
                        v-show="item.attributes.name == 'traits.tenant_id' || item.attributes.type == 'submit' ? false : true"
                        :name="item.attributes.name"
                        :disabled="item.attributes.disabled"
                        :value="
                            item.attributes.type != 'submit'
                                ? item.attributes.value
                                : item.meta.label.text
                        "
                        :label="item.meta.label ? item.meta.label.text : ''"
                        :validation="inputValidation(item.meta.label)"
                        :validation-messages="validationMessages(item.meta.label)"
                        autocomplete="off"
                    />
                </FormulateForm>

                <v-btn block color="white" class="mt-10" @click="triggerRegister()"
                    >Sign Up</v-btn
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'

export default Vue.extend({
    name: 'RegistrationPage',
    layout: 'registration',
    // auth: false,
    data() {
        return {
            inputs: [
                {
                    type: 'input',
                    group: 'default',
                    attributes: {
                        name: 'csrf_token',
                        type: 'hidden',
                        value: '5Bb/Efh0Ey6DpZX7JqOWNJXxCeUAyCZUlasr27s4kjdjcMUJNP3GALHBuABhRGelWdddroev7Da+N+6ZpZtC1g==',
                        required: true,
                        disabled: false,
                        node_type: 'input',
                    },
                    messages: [],
                    meta: {},
                },
                {
                    type: 'input',
                    group: 'password',
                    attributes: {
                        name: 'traits.email',
                        type: 'email',
                        required: true,
                        disabled: false,
                        node_type: 'input',
                    },
                    messages: [],
                    meta: {
                        label: {
                            id: 1070002,
                            text: 'E-Mail',
                            type: 'info',
                        },
                    },
                },
                {
                    type: 'input',
                    group: 'password',
                    attributes: {
                        name: 'password',
                        type: 'password',
                        required: true,
                        disabled: false,
                        node_type: 'input',
                    },
                    messages: [],
                    meta: {
                        label: {
                            id: 1070001,
                            text: 'Password',
                            type: 'info',
                        },
                    },
                },
                {
                    type: 'input',
                    group: 'password',
                    attributes: {
                        name: 'traits.first_name',
                        type: 'text',
                        disabled: false,
                        node_type: 'input',
                    },
                    messages: [],
                    meta: {
                        label: {
                            id: 1070002,
                            text: 'First Name',
                            type: 'info',
                        },
                    },
                },
                {
                    type: 'input',
                    group: 'password',
                    attributes: {
                        name: 'traits.last_name',
                        type: 'text',
                        disabled: false,
                        node_type: 'input',
                    },
                    messages: [],
                    meta: {
                        label: {
                            id: 1070002,
                            text: 'Last Name',
                            type: 'info',
                        },
                    },
                },
                {
                    type: 'input',
                    group: 'password',
                    attributes: {
                        name: 'traits.tenant_name',
                        type: 'text',
                        disabled: false,
                        node_type: 'input',
                    },
                    messages: [],
                    meta: {
                        label: {
                            id: 1070002,
                            text: 'Tenant Name',
                            type: 'info',
                        },
                    },
                },
                {
                    type: 'input',
                    group: 'password',
                    attributes: {
                        name: 'traits.tenant_id',
                        type: 'text',
                        disabled: false,
                        node_type: 'input',
                    },
                    messages: [],
                    meta: {
                        label: {
                            id: 1070002,
                            text: 'Tenant ID',
                            type: 'info',
                        },
                    },
                },
                {
                    type: 'input',
                    group: 'password',
                    attributes: {
                        name: 'method',
                        type: 'submit',
                        value: 'password',
                        disabled: false,
                        node_type: 'input',
                    },
                    messages: [],
                    meta: {
                        label: {
                            id: 1040001,
                            text: 'Sign up',
                            type: 'info',
                            context: {},
                        },
                    },
                },
            ],
            formValues: {} as any,
        }
    },
    created(){
        // if(this.$auth.loggedIn){
        //     this.$router.back()
        // }
    },
    mounted() {
        if (!this.$route.query.flow) {
            window.location.href =
                'https://kin-auth-dev.grit.software/api/kratos/public/self-service/registration/browser'
        } else {
            console.log(this.$route.query.flow)
            this.$services.register.getForm(this.$route.query.flow as string)
        }

        this.$services.app.hideLoading()
    },
    methods: {
        inputValidation(value: any) {
            if (value) {
                switch (value.text) {
                    case 'E-Mail':
                        return '^required|email'
                    case 'Password':
                        return '^required|min:6,length|matches:/[0-9]/'
                    default:
                        return '^required'
                }
            }
        },
        validationMessages(value: any) {
            if (value) {
                switch (value.text) {
                    case 'Password':
                        return {
                            matches: 'Passwords require at least one number.',
                        }
                    default:
                        return {
                            required: `${value.text} is required.`
                        }
                }
            }
        },
        triggerRegister() {
            const formInstance: any = this.$refs.registerForm
            formInstance.formSubmitted()
        },
        submitData(data: string) {
            // console.log(this.formValues);
            console.log(data);
            this.$services.register.register(
                this.$route.query.flow as string,
                data
            )
        }
    },
})
</script>

<style lang="scss">
.register-page {
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100vh;
    overflow: auto;
    position: relative;
    .register-side {
        width: 100%;
        height: 100%;
        overflow: auto;
        position: relative;
        background: rgb(30, 41, 59);
        color: #fff;
        h1 {
            font-size: 30px;
            line-height: 1;
            font-weight: 600;
        }
        > svg {
            margin: 0;
            opacity: 0.04;
        }
        .register-bg-svg {
            display: block;
            width: 100%;
            height: 100%;
        }
        .register-svg-top-right {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 1;
        }
        .register-form {
            position: absolute;
            left: 0;
            right: 0;
            top: 15%;
            margin: auto;
            z-index: 2;
            width: 320px;
        }
        .formulate-input .formulate-input-label {
            color: #fff;
            padding: 0 0 8px;
            font-weight: 300;
        }
        .formulate-input.kinitiras-form .formulate-input-element input {
            color: #fff;
            font-weight: 300;
            border-color: #fff;
            &:focus {
                border-color: #fff;
            }
        }
        .formulate-input .formulate-input-error {
            color: #fff176;
            font-size: 11px;
            padding-top: 4px;
        }
    }
}
@media screen and (max-width: 1023px) {
    .v-application div.register-page {
        display: block !important;
        .register-side {
            width: 100%;
            height: 100vh;
            display: block;
            .register-bg-svg {
                height: 100vh;
                min-height: 600px;
            }
            .register-svg-top-right {
                height: auto;
                max-width: 150px;
            }
            .register-form {
                position: absolute;
                left: 0;
                right: 0;
                display: block;
                width: 100%;
                max-width: 320px;
                padding: 0 10px;
                margin: 0 auto;
            }
        }
    }
}
@media screen and (max-width: 767px) {
    .v-application div.register-page {
        .register-side {
            .register-bg-svg {
                height: 100vh;
                min-height: 500px;
            }
        }
    }
}
</style>
