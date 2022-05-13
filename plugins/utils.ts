import { Plugin } from '@nuxt/types'
import { Toasted } from 'vue-toasted'
import kind_of from 'kind-of'
import moment from 'moment'
import lodash from 'lodash'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'

export const utils: any = {
    typesCheck   : (val: any) => {
        try {
            const data: any = typeof val === 'string' ? JSON.parse(val) : val
            return kind_of(data)
        } catch (err) {
            return val
        }
    },
    valueParse   : (key: string, val: any) => {
        const timeKeys: any = ['createTime', 'expireTime', 'startTime', 'closeTime', 'executionTime', 'parentExecution']
        if (timeKeys.includes(key)) {
            return utils.formatDateTime(val)
        }
        return val
    },
    hasChildProps: (val: any): Boolean => {
        const objs = ['object', 'array']
        return objs.includes(val)
    },
    jsonParse    : (val: any): any => {
        return typeof val === 'string' ? JSON.parse(val) || '' : val
    },
    timeDiffMinutes(start: any, end: any) {
        if (!start || !end) {
            return ''
        }
        start          = moment(start)
        end            = moment(end)
        const duration = moment.duration(end.diff(start))
        const mn       = parseInt(duration.asMinutes() + '')
        if (mn >= 2) {
            return mn + ' Minutes'
        } else {
            return '1 Minute'
        }
    },
    timeISO       : (time?: string | number): string => {
        return moment(time || Date.now()).toISOString()
    },
    formatDateTime: (date: any, details?: boolean): string | null => {
        if (!date) return null
        // 2019-05-17T08:16:58.310Z"
        return details ? moment.utc(date).local().format('MM-DD-YYYY HH:mm:ss') : moment.utc(date).local().format('lll')
    },
    formatDate    : (date: string | number): string | null => {
        if (!date) return null
        // 2019-05-17T08:16:58.310Z"
        return moment.utc(date).local().format('MM-DD-YYYY')
    },
    formatTime    : (time: string | number): string | null => {
        if (!time) return null
        return moment.utc(time).local().format('HH:mm:ss')
    },
    toHMS         : (sec: any): string | number => {
        if (!sec) return '0'
        sec              = parseInt(sec, 10)
        let hours: any   = Math.floor(sec / 3600)
        let minutes: any = Math.floor((sec - (hours * 3600)) / 60)
        let seconds: any = sec - (hours * 3600) - (minutes * 60)
        if (hours < 10) {
            hours = '0' + hours
        }
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        if (seconds < 10) {
            seconds = '0' + seconds
        }
        return hours + ':' + minutes + ':' + seconds
    },
    genID(): any {
        return uuidv4()
    },
    toggleClass(element: any, className: string) {
        if (element.classList) {
            element.classList.toggle(className)
        } else {
            const classes: any = element.className.split(' ')
            const i            = classes.indexOf(className)
            i >= 0 ? classes.splice(i, 1) : classes.push(className)
            element.className = classes.join(' ')
        }
    },
    getHttpStatusText(statusCode: number | string, listStatus: any[]): string {
        const obj: any = listStatus.filter((i: any) => i.code === parseInt(statusCode + ''))[0]
        return obj ? obj.text : ''
    },
    removeEmptyObjects(obj: any): any {
        if (lodash.isArray(obj)) {
            return lodash(obj)
                .filter(lodash.isObject)
                .map(utils.removeEmptyObjects)
                .reject(lodash.isEmpty)
                .concat(lodash.reject(obj, lodash.isObject))
                .value()
        }
        return lodash(obj)
            .pickBy(lodash.isObject)
            .mapValues(utils.removeEmptyObjects)
            .omitBy(lodash.isEmpty)
            .assign(lodash.omitBy(obj, lodash.isObject))
            .value()
    },
    mergeAndCleanFilterObj(filter: any, pagination?: any) {
        let f: any = {}
        if (filter && (typeof filter === 'object') && !Array.isArray(filter)) {
            f = lodash.cloneDeep(filter)
            Object.keys(f).forEach((k: any) => {
                if ((f[k] === null) || ((typeof f[k] === 'string') && !f[k])) {
                    delete f[k]
                }
            })
        }
        if (pagination) {
            const paging: any = lodash.cloneDeep(pagination)
            delete paging.total
            f = lodash.merge(f, utils.mergeAndCleanFilterObj(paging))
        }
        return f
    },
    booleanStatus(status: number | string) {
        return status ? 'Enabled' : 'Disabled'
    },
    isObjNotArr(obj: any) {
        return obj && (typeof obj === 'object') && !Array.isArray(obj)
    },
    lookupValue(obj: any, paths: string[]): any {
        let data: any = ''
        if (utils.isObjNotArr(obj) && paths.length) {
            for (let i = 0; i < paths.length; ++i) {
                data = lodash.get(obj, paths[i])
                if (data) break
            }
        }
        if (data && (typeof data === 'string')) {
            try {
                data = JSON.parse(data)
            } catch (err: any) {
                // console.log(err)
            }
        }
        return data
    },
    isObject(data: any) {
        return data && (typeof data === 'object') && !Array.isArray(data)
    }
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

//
//
//
//
//
//
declare module 'vue/types/vue' {
    // this.$lodash inside Vue components
    interface Vue {
        $lodash: typeof lodash
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$lodash inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $lodash: typeof lodash
    }

    // nuxtContext.$lodash
    interface Context {
        $lodash: typeof lodash
    }
}

declare module 'vuex/types/index' {
    // this.$lodash inside Vuex stores
    interface Store<S> {
        $lodash: typeof lodash
    }
}
