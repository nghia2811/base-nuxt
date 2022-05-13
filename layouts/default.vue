<template>
    <v-app light>
        <default-header/>
        <v-main>
            <Nuxt/>
            <transition name="fade">
                <PageLoading v-if="isLoading"/>
            </transition>
        </v-main>
        <!--<default-footer/>-->
    </v-app>
</template>

<script>
    import {mapState} from "vuex"

    export default {
        name: 'DefaultLayout',
        computed: {
            ...mapState({
                isLoading: (state) => state.loading
            })
        },
    }
</script>
