import { Store } from 'vuex'

export type Executions = {
    data: {
        executions: Execution[]
        next_page_token?: string
    }
}

export enum ExecutionStatus {
    RUNNING        = 'Running',
    COMPLETED      = 'Completed',
    FAILED         = 'Failed',
    CANCELLED      = 'Canceled',
    TERMINATED     = 'Terminated',
    CONTINUEDASNEW = 'ContinuedAsNew',
    TIMEDOUT       = 'TimedOut',
}

export type Execution = {
    close_time: string
    execution: {
        workflow_id: string
        run_id: string
    }
    execution_time: string
    history_length: number
    memo: any[]
    parent_execution: null
    parent_namespace_id: string
    search_attributes: any
    start_time: string
    state_transition_count: number
    status: string
    task_queue: string
    type: any
}

export type ExecutionsQueryParam = {
    workflow_name?: string | null
    event?: string | null
    event_id?: string | null
    dsl_workflow_id?: string | null
    execution_time_from?: string | null
    execution_time_to?: string | null
    start_time_from?: string | null
    start_time_to?: string | null
    close_time_from?: string | null
    close_time_to?: string | null
    run_id?: string | null
    taskqueue?: string | null
    next_page_token?: string | null
    limit: number | null
    order_by?: string | null
    order_desc?: boolean | null
    execution_status?: string | null
    workflow_id?: string | null
}

export interface ResponseWithDataObjOnly {
    data: object | any
}

export interface ExecutionHistoryStruct {
    list(params?: any): Promise<Executions>
    detail(workflow_id: string, run_id: string): Promise<ResponseWithDataObjOnly>
    summary(workflow_id: string, run_id: string): Promise<ResponseWithDataObjOnly>
}

export default (store: Store<any>, config: any, axios?: any): ExecutionHistoryStruct => {
    return {
        list(params?: any) {
            return axios.$get('/executions', {params: params || {}})
        },
        detail(workflow_id: string, run_id: string, params?: any) {
            return axios.$get(`/executions/${workflow_id}/${run_id}/history`, {params: params || {}})
        },
        summary(workflow_id: string, run_id: string, params?: any) {
            return axios.$get(`/executions/${workflow_id}/${run_id}`, {params: params || {}})
        }
    }
}
