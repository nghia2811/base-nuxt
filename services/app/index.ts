import { Context } from '@nuxt/types'

export interface AppUtilsServices {
    showLoading(): Promise<any>
    hideLoading(): Promise<any>
}

export default (ctx: Context): AppUtilsServices => {
    return {
        showLoading() {
            return ctx.store.dispatch(ctx.$conf.$storeAction.LOADING, true)
        },
        hideLoading() {
            return ctx.store.dispatch(ctx.$conf.$storeAction.LOADING, false)
        }
    }
}
