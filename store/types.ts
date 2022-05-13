import { Plugin } from '@nuxt/types'

export const types: any = {
    LOADING                 : 'LOADING',
    INIT_STATE              : 'INIT_STATE',
    LOAD_STORAGE_DATA       : 'LOAD_STORAGE_DATA',
    SET_CURRENT_LOCALE      : 'SET_CURRENT_LOCALE',
    ADD_CANCEL_TOKEN        : 'ADD_CANCEL_TOKEN',
    CLEAR_CANCEL_TOKENS     : 'CLEAR_CANCEL_TOKENS',
    CANCEL_PENDING_REQUESTS : 'CANCEL_PENDING_REQUESTS',
    TOAST_ERROR             : 'TOAST_ERROR',
}

const storeActionPlugin: Plugin = (context, inject) => {
    inject('storeAction', {...types})
}

declare module 'vue/types/vue' {
    // this.$storeAction inside Vue components
    interface Vue {
        $storeAction: any
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$storeAction inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $storeAction: any
    }

    // nuxtContext.$storeAction
    interface Context {
        $storeAction: any
    }
}

declare module 'vuex/types/index' {
    // this.$storeAction inside Vuex stores
    interface Store<S> {
        $storeAction: any
    }
}

export default storeActionPlugin


