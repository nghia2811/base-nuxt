<template>
    <v-footer
        :absolute="!fixed"
        class="app-footer"
        app
        dark
    >
        <div style="text-align: center; width: 100%">&copy; {{ new Date().getFullYear() }} - KinCloud</div>
    </v-footer>
</template>

<script>
    export default {
        name: 'DefaultFooter',
        data() {
            return {
                fixed: false
            }
        }
    }
</script>
<style lang="scss">
    body .v-application .app-footer { font-size: 12px; background: rgb(9, 15, 32);}
</style>
