import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import lodash from 'lodash'

export default ({$axios, redirect, app}: any) => {
    $axios.onRequest((config: AxiosRequestConfig) => {
        //  Generate cancel token source
        let source = axios.CancelToken.source();

        // Set cancel token on this request
        config.cancelToken = source.token;

        // Add to vuex to make cancellation available from anywhere
        app.store.dispatch(app.$storeAction.ADD_CANCEL_TOKEN, source);

        return config
    })

    $axios.onError((error: AxiosError) => {
        app.$services.app.hideLoading()
        const status: any      = lodash.get(error, 'response.status') || error.code
        const message: any     = lodash.get(error, 'response.data.message') || lodash.get(error, 'response.data.detail') || lodash.get(error, 'response.data.error_description') || lodash.get(error, 'response.data.error')
        const toastConfig: any = {
            duration: 4000,
            position: 'top-center',
            action  : {
                text   : 'Ok',
                onClick: (e: any, toastObject: any) => {
                    toastObject.goAway(0)
                }
            }
        }
        if (error.response?.status === 401) {
            app.$toast.error(message || status, toastConfig)
            return error
        }
        if (error.response?.status === 403) {
            app.$toast.error('access denied' || status, toastConfig)
            redirect('/')
            return error
        }
        app.$toast.error(message || status, toastConfig)
    })
}
