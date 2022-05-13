import { Plugin } from '@nuxt/types'
import Localforage from 'localforage'

export const storage: any = Localforage.createInstance({
    name: 'client-storage'
})

const storagePlugin: Plugin = (context, inject) => {
    inject('storage', storage)
}

declare module 'vue/types/vue' {
    // this.$storage inside Vue components
    interface Vue {
        $storage: LocalForage
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$storage inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $storage: LocalForage
    }

    // nuxtContext.$storage
    interface Context {
        $storage: LocalForage
    }
}

declare module 'vuex/types/index' {
    // this.$storage inside Vuex stores
    interface Store<S> {
        $storage: LocalForage
    }
}

export default storagePlugin
