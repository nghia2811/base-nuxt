<template>
    <v-dialog
        v-model="visible"
        transition="dialog-top-transition"
        max-width="600"
        scrollable
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-account-circle-outline</v-icon>
            </v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="primary" dark class="elevation-0">
                    <h2>{{ $t('login') }}</h2>
                </v-toolbar>
                <v-card-text style="max-height: 600px;">
                    <FormulateForm ref="loginForm" @submit="submitData($event)">
                        <FormulateInput
                            type="email"
                            name="email"
                            :label="$t('form.enter_email')"
                            validation="email"
                        />
                        <FormulateInput
                            type="text"
                            name="username"
                            :label="$t('form.enter_user_name')"
                            validation="required"
                        />
                        <FormulateInput
                            :label="$t('form.password')"
                            type="password"
                            name="password"
                            validation="^required|min:4,length|matches:/[0-9]/"
                            :validation-messages="{
                                matches: 'Passwords require at least one number.'
                            }"
                        />
                        <FormulateInput
                            :label="$t('form.conf_password')"
                            type="password"
                            name="password_confirm"
                            validation="required|confirm"
                            validation-name="Password confirmation"
                        />
                        <FormulateInput name="terms" type="checkbox"
                                        label="I accept, just don't make me read the terms." validation="accepted"/>
                    </FormulateForm>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn @click="triggerLogin()" color="primary" class="elevation-0">
                        {{ $t('login') }}
                    </v-btn>
                    <v-btn @click="visible = false" color="blue-grey lighten-4" class="elevation-0">
                        {{ $t('form.cancel') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'UserLogin',
        data() {
            return {
                visible: false
            }
        },
        methods: {
            triggerLogin() {
                const formInstance: any = this.$refs.loginForm
                formInstance.formSubmitted()
                // this.$store.dispatch(this.$storeAction.USER.SET_TOKEN, 'xxx123')
                // this.$store.dispatch(this.$storeAction.USER.SET_PROFILE, {
                //     name: 'kien nguyen',
                //     email: 'kiennt2@smartosc.com'
                // })
                // this.visible = false
            },
            submitData(data: string) {
                console.log(data)
                this.visible = false
            }
        }
    })
</script>

<style lang="scss">

</style>
