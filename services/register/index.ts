import { Store } from 'vuex'

export interface RegisterApi {
    getForm(workflowId: string): Promise<any>
    register(workflowId: string, payload: any, params?: any): Promise<any>
}

export default (store: Store<any>, config: any, axios?: any): RegisterApi => {
    return {
        getForm(workflowId: string) {
            return axios({ url: `/kratos/public/self-service/registration/flows?id=${workflowId}`, baseURL: process.env.REGISTER_API_ENDPOINT, withCredentials: true })
        },
        register(workflowId: string, params: any){
            return axios({ url: `/kratos/public/self-service/registration?flow=${workflowId}`,  method: 'POST', baseURL: process.env.REGISTER_API_ENDPOINT, data: params, withCredentials: true })
        }
    }
}
