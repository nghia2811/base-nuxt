import { Context } from '@nuxt/types'
import { Route, NavigationGuardNext } from 'vue-router/types/router'

export default function ({app, store}: Context | any) {
    if (app && app.router) {
        app.router.beforeEach(async (to: Route, from: Route, next: NavigationGuardNext) => {
            await store.dispatch(app.$storeAction.LOADING, true)
            if (!store.state.initialized) {
                await store.dispatch(app.$storeAction.INIT_STATE, true)
                await store.dispatch(app.$storeAction.LOAD_STORAGE_DATA)
            } else {
                await store.dispatch(app.$storeAction.CANCEL_PENDING_REQUESTS);
            }
            if (from.name === 'login') {
                await app.$services.app.hideLoading()
            }
            // console.log(to)
            // console.log(from)
            next()
        })
    }
}
