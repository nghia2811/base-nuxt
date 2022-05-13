<template>
    <div class="login-page d-flex">
        <div class="login-side">
            <svg
                viewBox="0 0 960 540"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMax slice"
                xmlns="http://www.w3.org/2000/svg"
                class="login-bg-svg"
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
                class="login-svg-top-right"
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
                        <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                    </pattern>
                </defs>
                <rect
                    width="220"
                    height="192"
                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                ></rect>
            </svg>
            <div class="login-form">
                <div class="sign-in-logo d-flex justify-center">
                    <header-logo/>
                </div>
                <div class="sign-in-avatar d-flex justify-space-between">
                    <div class="d-flex">
                        <div class="round-img"><img alt="avatar" :src="require(`~/assets/image/other/female-18.jpg`)"/></div>
                        <div class="round-img"><img alt="avatar" :src="require(`~/assets/image/other/female-11.jpg`)"/></div>
                        <div class="round-img"><img alt="avatar" :src="require(`~/assets/image/other/male-09.jpg`)"/></div>
                        <div class="round-img"><img alt="avatar" :src="require(`~/assets/image/other/male-16.jpg`)"/></div>
                    </div>
                    <div>Join With Us</div>
                </div>
                <v-btn @click="login()" block outlined class="login-btn">
                    Sign In
                </v-btn>
                <v-btn @click="register()" block outlined color="white" class="mt-5">
                    Sign Up
                </v-btn>
                <div class="d-flex" style="justify-content: center">
                    <v-btn @click="home()" text dark class="mt-8">
                        Home
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name  : 'LoginPage',
        layout: 'login',
        mounted() {
            this.$services.app.hideLoading()
        },
        methods: {
            register() {
                window.location.href =
                    'https://kin-auth-dev.grit.software/api/kratos/public/self-service/registration/browser'
            },
            login() {
                // this.$auth.loginWith('social')
            },
            home() {
                this.$router.push('/')
            },
            dec2hex(dec: any) {
                return ('0' + dec.toString()).substr(-2)
            },
            generateRandomString() {
                let array = new Uint32Array(56 / 2)
                window.crypto.getRandomValues(array)
                return Array.from(array, this.dec2hex).join('')
            }
        }
    })
</script>

<style lang="scss">
    .login-page {
        justify-content: center;
        align-items: center;
        align-content: center;
        height: 100vh;
        overflow: auto;
        position: relative;
        .login-side {
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
            .login-bg-svg {
                display: block;
                width: 100%;
                height: 100%;
            }
            .login-svg-top-right {
                position: absolute;
                right: 0;
                top: 0;
                z-index: 1;
            }
            .login-form {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                margin: auto;
                z-index: 2;
                width: 365px;
                .sign-in-avatar {
                    flex-direction: column;
                    flex-wrap: wrap;
                    font-size: 12px;
                    align-items: center;
                    margin-top: 50px;
                    margin-bottom: 40px;
                    .round-img {
                        width: 60px;
                        height: 60px;
                        border: 5px solid #fff;
                        border-radius: 50%;
                        overflow: hidden;
                        margin-left: -15px;
                        margin-bottom: 10px;
                        &:first-child {
                            margin-left: -5px;
                        }
                        img {
                            display: block;
                            margin: 0;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
            button.v-btn.login-btn {
                border-color: rgb(30, 41, 59);
                color: rgb(30, 41, 59);
                font-weight: 600;
                margin-top: 30px;
                background: white;
                margin-top: 40px;
            }
        }
    }
    @media screen and (max-width: 1023px) {
        .v-application div.login-page {
            display: block !important;
            .login-side {
                width: 100%;
                height: 100vh;
                display: block;
                .login-bg-svg {
                    height: 100vh;
                    min-height: 600px;
                }
                .login-svg-top-right {
                    height: auto;
                    max-width: 150px;
                }
                .login-form {
                    position: absolute;
                    display: block;
                    width: 100%;
                    max-width: 365px;
                    padding: 0 10px;
                    margin: 0 auto;
                }
            }
        }
    }
    @media screen and (max-width: 767px) {
        .v-application div.login-page {
            .login-side {
                .login-bg-svg {
                    height: 100vh;
                }
            }
        }
    }
</style>
