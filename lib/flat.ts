const flat: any = {
    isBuffer(obj: any): boolean {
        return obj &&
            obj.constructor &&
            (typeof obj.constructor.isBuffer === 'function') &&
            obj.constructor.isBuffer(obj)
    },
    keyIdentity(key: any): any {
        return key
    },
    flatten(target: any, opts: any): any {
        opts               = opts || {}
        const delimiter    = opts.delimiter || '.'
        const maxDepth     = opts.maxDepth
        const transformKey = opts.transformKey || flat.keyIdentity
        const output: any  = {}
        const step         = (object: any, prev?: any, currentDepth?: any): any => {
            currentDepth = currentDepth || 1
            Object.keys(object).forEach(function (key) {
                const value    = object[key]
                const isarray  = opts.safe && Array.isArray(value)
                const type     = Object.prototype.toString.call(value)
                const isbuffer = flat.isBuffer(value)
                const isobject = (
                    type === '[object Object]' ||
                    type === '[object Array]'
                )
                const newKey   = prev
                    ? prev + delimiter + transformKey(key)
                    : transformKey(key)
                if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
                    (!opts.maxDepth || currentDepth < maxDepth)) {
                    return step(value, newKey, currentDepth + 1)
                }
                output[newKey] = value
            })
        }
        step(target)
        return output
    },
    unflatten(target: any, opts?: any): any {
        opts = opts || {}

        const delimiter    = opts.delimiter || '.'
        const overwrite    = opts.overwrite || false
        const transformKey = opts.transformKey || flat.keyIdentity
        const result       = {}

        const isbuffer = flat.isBuffer(target)
        if (isbuffer || Object.prototype.toString.call(target) !== '[object Object]') {
            return target
        }

        // safely ensure that the key is
        // an integer.
        const getkey = (key: any): any => {
            const parsedKey = Number(key)

            return (
                isNaN(parsedKey) ||
                key.indexOf('.') !== -1 ||
                opts.object
            ) ? key
                : parsedKey
        }

        const addKeys = (keyPrefix: any, recipient: any, target: any): any => {
            return Object.keys(target).reduce(function (result, key) {
                result[keyPrefix + delimiter + key] = target[key]

                return result
            }, recipient)
        }

        const isEmpty = (val: any): any => {
            const type     = Object.prototype.toString.call(val)
            const isArray  = type === '[object Array]'
            const isObject = type === '[object Object]'

            if (!val) {
                return true
            } else if (isArray) {
                return !val.length
            } else if (isObject) {
                return !Object.keys(val).length
            }
        }

        target = Object.keys(target).reduce((result: any, key: any) => {
            const type     = Object.prototype.toString.call(target[key])
            const isObject = (type === '[object Object]' || type === '[object Array]')
            if (!isObject || isEmpty(target[key])) {
                result[key] = target[key]
                return result
            } else {
                return addKeys(
                    key,
                    result,
                    flat.flatten(target[key], opts)
                )
            }
        }, {})

        Object.keys(target).forEach((key: any) => {
            const split        = key.split(delimiter).map(transformKey)
            let key1           = getkey(split.shift())
            let key2           = getkey(split[0])
            let recipient: any = result

            while (key2 !== undefined) {
                if (key1 === '__proto__') {
                    return
                }

                const type     = Object.prototype.toString.call(recipient[key1])
                const isobject = (
                    type === '[object Object]' ||
                    type === '[object Array]'
                )

                // do not write over falsey, non-undefined values if overwrite is false
                if (!overwrite && !isobject && typeof recipient[key1] !== 'undefined') {
                    return
                }

                if ((overwrite && !isobject) || (!overwrite && recipient[key1] == null)) {
                    recipient[key1] = (
                        typeof key2 === 'number' &&
                        !opts.object ? [] : {}
                    )
                }

                recipient = recipient[key1]
                if (split.length > 0) {
                    key1 = getkey(split.shift())
                    key2 = getkey(split[0])
                }
            }

            // unflatten again for 'messy objects'
            recipient[key1] = flat.unflatten(target[key], opts)
        })

        return result
    }
}

export default flat
