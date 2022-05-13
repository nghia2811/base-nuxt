`
<template>
    <div class="vue-fixed-header d-flex" :id="compID">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import Vue, { PropOptions } from 'vue'
    import debounce from 'lodash/debounce'

    export default Vue.extend({
        name : 'VueTableFixedHeader',
        props: {
            // for load more feature
            offsetBottom: {
                type    : Number,
                required: false,
                default : 150
            } as PropOptions<any>
        },
        data() {
            return {
                compDom              : null as any,
                compID               : null as any,
                handleDebouncedScroll: null as any,
                headerRefAttr        : null as any,
                lastScrollPos        : 0
            }
        },
        beforeMount() {
            this.compID = this.$utils.genID()
        },
        mounted() {
            this.compDom               = document.getElementById(this.compID)
            this.handleDebouncedScroll = debounce(this.handleScroll, 100)
            this.compDom.addEventListener('scroll', this.handleDebouncedScroll)
        },
        beforeDestroy() {
            this.compDom.removeEventListener('scroll', this.handleDebouncedScroll)
            this.compID                = null
            this.compDom               = null
            this.handleDebouncedScroll = null
            this.headerRefAttr         = null
        },
        methods: {
            createDom() {
                if (!this.headerRefAttr) {
                    let thead: any = this.compDom.querySelectorAll('[thead-ref]')
                    if (thead && thead[0]) {
                        thead               = thead[0]
                        this.headerRefAttr  = thead.getAttribute('thead-ref')
                        const newTable: any = document.createElement('table')
                        newTable.appendChild(thead.cloneNode(true))
                        const newDiv: any = document.createElement('div')
                        newDiv.classList.add('fixed-header')
                        newDiv.appendChild(newTable)
                        this.compDom.insertBefore(newDiv, this.compDom.firstChild)
                    }
                }
            },
            removeStyle(delayMs?: number) {
                const cDome: any = document.getElementById(this.compID)
                let div: any     = cDome ? cDome.getElementsByClassName('fixed-header') : null
                if (div && div[0]) {
                    div                       = div[0]
                    const currentPadding: any = div.style.padding
                    div.setAttribute('style', 'top:' + 0 + 'px; padding: 0 ' + currentPadding + 'px')
                    setTimeout(() => {
                        div.remove()
                        this.headerRefAttr = null
                        cDome.classList.remove('hide-real-thead')
                    }, delayMs || 120)
                }
            },
            handleStyle(e: any) {
                if (this.headerRefAttr) {
                    const cDome: any       = document.getElementById(this.compID)
                    const div: any         = cDome.getElementsByClassName('fixed-header') ? cDome.getElementsByClassName('fixed-header')[0] : null
                    const allThead: any    = cDome.querySelectorAll('[thead-ref]')
                    const clonedThead: any = allThead ? allThead[0] : null
                    const realThead: any   = allThead ? allThead[1] : null
                    if (e.target.scrollTop > realThead.offsetHeight) {
                        cDome.classList.add('hide-real-thead')
                        // set th width
                        const clonedTh: any = clonedThead.querySelectorAll('th')
                        const realTh: any   = realThead.querySelectorAll('th')
                        realTh.forEach((th: any, idx: number) => {
                            clonedTh[idx].setAttribute('style', 'width:' + th.offsetWidth + 'px')
                        })
                        // set warp padding
                        let hPadding: any = 0
                        if ((div.offsetWidth + 1) < realThead.offsetWidth) {
                            hPadding = (realThead.offsetWidth - div.offsetWidth) / 2
                        }
                        if (div.offsetWidth > (realThead.offsetWidth + 1)) {
                            hPadding = (div.offsetWidth - realThead.offsetWidth) / 2
                        }
                        // set style
                        div.setAttribute('style', 'top:' + e.target.scrollTop + 'px; padding: 0 ' + hPadding + 'px')
                    } else {
                        this.removeStyle(0)
                    }
                } else {
                    this.removeStyle(0)
                }
            },
            handleBottomReached(e: any) {
                if ((this.lastScrollPos < e.target.scrollTop) && (e.target.scrollTop >= (e.target.scrollHeight - e.target.offsetHeight - this.offsetBottom))) {
                    this.$emit('bottom-reached', true)
                }
                this.lastScrollPos = e.target.scrollTop
            },
            handleScroll(e: any) {
                this.createDom()
                this.handleStyle(e)
                this.handleBottomReached(e)
            }
        }
    })
</script>

<style lang="scss">
    .vue-fixed-header {height: 100%; overflow: auto; overflow-x: hidden; flex-direction: column; position: relative;
        .fixed-header {position: absolute;left: 0;top: 0;width: 100%; z-index: 100; transition: top 0.15s ease 0s;
            table {table-layout: fixed;box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
                thead th {padding-top: 16px; padding-bottom: 16px;}
            }
            button {display: none;}
        }
    }
</style>
`
