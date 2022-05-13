<template>
    <div class="d-flex error-page-wrap">
        <h1>
            {{ title }}
        </h1>
        <img alt="error" :src="require(`~/assets/image/error.gif`)"/>
        <div v-if="error && error.statusCode && (error.statusCode === 404)">
            <h3>Look like you're lost</h3>
            <p>the page you are looking for not available!</p>
        </div>
        <br>
        <v-btn color="primary" @click="() => $router.push('/')" depressed>
            Home page
        </v-btn>
    </div>
</template>

<script>
    export default {
        name : 'ErrorPage',
        props: {
            error: {
                type   : Object,
                default: null
            }
        },
        data() {
            return {
                title: ''
            }
        },
        mounted() {
            this.$services.app.hideLoading()
            this.title = this.error?.statusCode === 404 ? 'Page Not Found!' : 'An Error Occurred!'
        },
        head() {
            const title = this.title
            return {
                title
                // meta: [
                //     {
                //         hid: 'description',
                //         name: 'description',
                //         content: 'My custom description'
                //     }
                // ]
            }
        }
    }
</script>

<style scoped lang="scss">
    .error-page-wrap {text-align: center;justify-content: center;align-content: center;align-items: center; flex-direction: column; height: 100%; overflow: auto; font-size: 13px;
        * {position: relative; z-index: 2;}
        img {margin: -100px auto; width: auto;height: auto; z-index: 1; }
        h1 { font-size: 40px;}
        h3 {font-weight: 500; font-size: 24px;}
    }
    @media (max-width: 767px) {
        .error-page-wrap {
            img {margin: -50px auto; }
            h1 { font-size: 30px;}
            h3 { font-size: 20px;}
        }
    }
    @media (max-width: 599px) {
        .error-page-wrap {
            img {margin: -30px auto; }
        }
    }
</style>
