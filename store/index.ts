import { types } from '~/store/types'

export interface IState {
    loading: boolean
    initialized: boolean
    locale: string
    cancelTokens: any[]
}

export const state = () => ({
    loading    : false,
    initialized: false,
    locale     : '',
    cancelTokens: []
}) as IState

export const mutations = {
    [types.LOADING](state: any, loadingState: boolean) {
        state.loading = loadingState
    },
    [types.INIT_STATE](state: any, initState: boolean) {
        state.initialized = initState
    },
    [types.SET_CURRENT_LOCALE](state: any, locale: string) {
        state.locale = locale
    },
    [types.ADD_CANCEL_TOKEN](state: any, token: any) {
        state.cancelTokens.push(token);
    },
    [types.CLEAR_CANCEL_TOKENS](state: any) {
        state.cancelTokens = [];
    },
}

export const actions = {
    [types.LOADING]({commit}: any, isLoading: boolean) {
        commit(types.LOADING, isLoading)
    },
    [types.INIT_STATE]({commit}: any, initState: boolean) {
        commit(types.INIT_STATE, initState)
    },
    [types.SET_CURRENT_LOCALE]({commit}: any, locale: string) {
        commit(types.SET_CURRENT_LOCALE, locale)
    },
    [types.ADD_CANCEL_TOKEN]({commit}: any, token: any) {
        commit(types.ADD_CANCEL_TOKEN, token)
    },
    [types.CANCEL_PENDING_REQUESTS]({state, commit}: any) {
        state.cancelTokens.forEach((request:any, i:any) => {
            if(request.cancel){
                request.cancel("Change router");
            }
        });
        commit(types.CLEAR_CANCEL_TOKENS,)
    },
    [types.TOAST_ERROR]({commit}: any, {message, duration}: any) {
        const self: any = this
        self.$toast.error(message, {duration: duration || 4000})
    },
    [types.LOAD_STORAGE_DATA]({commit}: any) {
        const self: any            = this
        const storage: LocalForage = self.$storage
        // set default language
        storage.getItem(self.$conf.STORAGE_LANGUAGE_KEY).then((value: any) => {
            value ? commit(types.SET_CURRENT_LOCALE, value) : commit(types.SET_CURRENT_LOCALE, 'en')
        }).catch(() => {
            commit(types.SET_CURRENT_LOCALE, 'en')
        })
    }
}
