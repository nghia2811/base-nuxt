import { Plugin } from '@nuxt/types'
import { types } from '~/store/types'

export const defaultConfig: any = {
    STORAGE_LANGUAGE_KEY: 'current_language'
}

export const httpStatus = [
    {code: 100, text: 'Continue'},
    {code: 101, text: 'Switching Protocols'},
    {code: 102, text: 'Processing (WebDAV)'},
    {code: 200, text: 'OK'},
    {code: 201, text: 'Created'},
    {code: 202, text: 'Accepted'},
    {code: 203, text: 'Non-Authoritative Information'},
    {code: 204, text: 'No Content'},
    {code: 205, text: 'Reset Content'},
    {code: 206, text: 'Partial Content'},
    {code: 207, text: 'Multi-Status (WebDAV)'},
    {code: 208, text: 'Already Reported (WebDAV)'},
    {code: 226, text: 'IM Used'},
    {code: 300, text: 'Multiple Choices'},
    {code: 301, text: 'Moved Permanently'},
    {code: 302, text: 'Found'},
    {code: 303, text: 'See Other'},
    {code: 304, text: 'Not Modified'},
    {code: 305, text: 'Use Proxy'},
    {code: 306, text: '(Unused)'},
    {code: 307, text: 'Temporary Redirect'},
    {code: 308, text: 'Permanent Redirect (experimental)'},
    {code: 400, text: 'Bad Request'},
    {code: 401, text: 'Unauthorized'},
    {code: 402, text: 'Payment Required'},
    {code: 403, text: 'Forbidden'},
    {code: 404, text: 'Not Found'},
    {code: 405, text: 'Method Not Allowed'},
    {code: 406, text: 'Not Acceptable'},
    {code: 407, text: 'Proxy Authentication Required'},
    {code: 408, text: 'Request Timeout'},
    {code: 409, text: 'Conflict'},
    {code: 410, text: 'Gone'},
    {code: 411, text: 'Length Required'},
    {code: 412, text: 'Precondition Failed'},
    {code: 413, text: 'Request Entity Too Large'},
    {code: 414, text: 'Request-URI Too Long'},
    {code: 415, text: 'Unsupported Media Type'},
    {code: 416, text: 'Requested Range Not Satisfiable'},
    {code: 417, text: 'Expectation Failed'},
    {code: 418, text: 'I\'m a teapot (RFC 2324)'},
    {code: 420, text: 'Enhance Your Calm (Twitter)'},
    {code: 422, text: 'Unprocessable Entity (WebDAV)'},
    {code: 423, text: 'Locked (WebDAV)'},
    {code: 424, text: 'Failed Dependency (WebDAV)'},
    {code: 425, text: 'Reserved for WebDAV'},
    {code: 426, text: 'Upgrade Required'},
    {code: 428, text: 'Precondition Required'},
    {code: 429, text: 'Too Many Requests'},
    {code: 431, text: 'Request Header Fields Too Large'},
    {code: 444, text: 'No Response (Nginx)'},
    {code: 449, text: 'Retry With (Microsoft)'},
    {code: 450, text: 'Blocked by Windows Parental Controls (Microsoft)'},
    {code: 451, text: 'Unavailable For Legal Reasons'},
    {code: 499, text: 'Client Closed Request (Nginx)'},
    {code: 500, text: 'Internal Server Error'},
    {code: 501, text: 'Not Implemented'},
    {code: 502, text: 'Bad Gateway'},
    {code: 503, text: 'Service Unavailable'},
    {code: 504, text: 'Gateway Timeout'},
    {code: 505, text: 'HTTP Version Not Supported'},
    {code: 506, text: 'Variant Also Negotiates (Experimental)'},
    {code: 507, text: 'Insufficient Storage (WebDAV)'},
    {code: 508, text: 'Loop Detected (WebDAV)'},
    {code: 509, text: 'Bandwidth Limit Exceeded (Apache)'},
    {code: 510, text: 'Not Extended'},
    {code: 511, text: 'Network Authentication Required'}
]


export const conf: any = {
    ...defaultConfig,
    $storeAction: {...types},
    httpStatus  : [...httpStatus]
}

const confPlugin: Plugin = (context, inject) => {
    inject('conf', conf)
}

declare module 'vue/types/vue' {
    // this.$conf inside Vue components
    interface Vue {
        $conf: any
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$conf inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $conf: any
    }

    // nuxtContext.$conf
    interface Context {
        $conf: any
    }
}

declare module 'vuex/types/index' {
    // this.$conf inside Vuex stores
    interface Store<S> {
        $conf: any
    }
}

export default confPlugin
