import { Plugin } from '@nuxt/types'
import appService, { AppUtilsServices } from '~/services/app'
import historyService, { ExecutionHistoryStruct } from '~/services/history'
import registerService, { RegisterApi } from '~/services/register'

export interface ServicesStruct {
    app: AppUtilsServices
    history: ExecutionHistoryStruct
    register: RegisterApi
}

const servicesPlugin: Plugin = (context, inject) => {
    const services: ServicesStruct = {
        app    : appService(context),
        history: historyService(context.store, context.$conf, context.$axios),
        register: registerService(context.store, context.$conf, context.$axios)
    }
    inject('services', services)
}

declare module 'vue/types/vue' {
    // this.$services inside Vue components
    interface Vue {
        $services: ServicesStruct
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$services inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $services: ServicesStruct
    }

    // nuxtContext.$services
    interface Context {
        $services: ServicesStruct
    }
}

declare module 'vuex/types/index' {
    // this.$services inside Vuex stores
    interface Store<S> {
        $services: ServicesStruct
    }
}

export default servicesPlugin
