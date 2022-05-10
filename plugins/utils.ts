import { Plugin } from '@nuxt/types'
import { Toasted } from 'vue-toasted'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'

export const utils: any = {
}

const utilsPlugin: Plugin = (context, inject) => {
    inject('utils', utils)
}

declare module 'vue/types/vue' {
    // this.$utils inside Vue components
    interface Vue {
        $utils: any
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$utils inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $utils: any
    }

    // nuxtContext.$utils
    interface Context {
        $utils: any
    }
}

declare module 'vuex/types/index' {
    // this.$utils inside Vuex stores
    interface Store<S> {
        $utils: any
    }
}

export default utilsPlugin


//
//
//
//
//
//
declare module 'vue/types/vue' {
    // this.$toast inside Vue components
    interface Vue {
        $toast: Toasted
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$toast inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $toast: Toasted
    }

    // nuxtContext.$toast
    interface Context {
        $toast: Toasted
    }
}

declare module 'vuex/types/index' {
    // this.$toast inside Vuex stores
    interface Store<S> {
        $toast: Toasted
    }
}

