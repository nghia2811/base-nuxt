<template>
    <div class="jq-select-container">
        <v-menu bottom offset-y
                :close-on-content-click="false"
                content-class="jq-select-props elevation-2"
                max-width="275"
                min-width="275"
        >
            <template v-slot:activator="{ on, attrs }">
                <div
                    @mouseover="showDel = true"
                    @mouseleave="showDel = false"
                    v-bind="attrs"
                    v-on="on"
                    class="value-container">
                    <v-btn
                        v-show="!internalValue"
                        color="primary"
                        :class="['select-btn', branch.valueName ? 'special-value-btn' : '']"
                        rounded
                        outlined
                        small
                        dark
                    >
                        {{ branch.valueName ? branch.valueName : 'value' }}
                    </v-btn>
                    <div
                        v-show="internalValue"
                        :class="[branch.method ? 'method' : 'value', branch.valueName ? 'special-value' : '']"
                    >
                        {{ internalValue }}
                    </div>
                    <transition name="fade">
                        <v-btn
                            v-show="showDel && !branch.unremovable && !branch.method"
                            class='remove-btn'
                            color="error"
                            depressed
                            x-small
                            fab
                            title="Remove"
                            @click="removeChildren">
                            <v-icon color="white">mdi-close</v-icon>
                        </v-btn>
                    </transition>
                </div>
            </template>
            <v-btn
                v-show="branch.method === 'Elif'"
                class="remove-elif"
                color="grey lighten-2"
                small
                title="Remove"
                @click="removeChildren">
                <v-icon color="red" left>mdi-trash-can-outline</v-icon>
                Remove
            </v-btn>
            <div class="select-box" v-show="!['If', 'Then', 'Else', 'Elif'].includes(branch.method)">
                <v-tabs
                    v-model="tab"
                    background-color="white"
                    :hide-slider="true"
                    height="34px"
                >
                    <v-tab
                        v-for="item in tabs"
                        :key="item.tab"
                    >
                        {{ item.tab }}
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item
                        v-for="(item, index) in tabs"
                        :key="index"
                    >
                        <v-card flat class="options-list" v-show="item.tab === 'Method'">
                            <div class="current-method" v-if="!branch.unremovable && branch.method">
                                <span>Current: </span>
                                <span>{{ currentSearchMethod }}</span>
                                <v-btn icon x-small @click="removeChildren" color="warning">
                                    <v-icon style="font-size: 16px;">mdi-trash-can-outline</v-icon>
                                </v-btn>
                            </div>
                            <div class="jq-select-input">
                                <input type="text"
                                       placeholder="Search method"
                                       @keyup="doFilterMethod($event)"
                                       class="jq-text-input"/>
                            </div>
                            <div class="list-container">
                                <div v-for="(value, name) in jqMethodsFilter" :key="name" class="list-method">
                                    <template v-if="jqMethodsFilter[name].length">
                                        <label>{{ name }}</label>
                                        <ul class="list-props">
                                            <li v-for="(item, i) in jqMethodsFilter[name]" :key="i" @click="selectJq(item)">
                                                {{ item.method }}
                                            </li>
                                        </ul>
                                    </template>
                                </div>
                            </div>
                        </v-card>
                        <v-card flat class="options-list" v-show="item.tab === 'Property'">
                            <div class="current-method" v-if="!branch.unremovable && branch.value && currentSearchProperty">
                                <span class="d-block">Current:</span>
                                <span>{{ currentSearchProperty }}</span>
                                <v-btn icon x-small @click="removeChildren" color="warning">
                                    <v-icon style="font-size: 16px;">mdi-trash-can-outline</v-icon>
                                </v-btn>
                            </div>
                            <div class="jq-select-input">
                                <input type="text"
                                       placeholder="Search property"
                                       @keyup="doFilterProps($event)"
                                       class="jq-text-input"/>
                            </div>
                            <div class="list-container">
                                <ul class="list-props" v-if="filterProperties.length">
                                    <li v-for="(item, i) in filterProperties" :key="i" @click="selectJq(item)">
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </v-card>
                        <v-card flat class="options-list" v-show="item.tab === 'Value'">
                            <div class="jq-select-input">
                                <input type="text"
                                       placeholder="text"
                                       :value="internalValueText"
                                       @keyup="changeText"
                                       class="jq-text-input"/>
                            </div>
                            <v-menu
                                transition="slide-y-transition"
                                bottom
                                offset-y
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <div class="jq-select-input date-input" v-bind="attrs" v-on="on">
                                        <input type="text"
                                               v-model="date"
                                               placeholder="date picker"
                                               @change="changeDate"
                                               class="jq-text-input"/>
                                        <v-icon>mdi-calendar</v-icon>
                                    </div>
                                </template>
                                <v-date-picker
                                    v-model="date"
                                    scrollable
                                    color="primary"
                                    @change="changeDate"
                                />
                            </v-menu>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </div>
        </v-menu>
        <span class="method" v-if="branch.children">(</span>

        <JqSelect
            v-for="(child, index) in branch.children"
            :key="child.id"
            :branch="child"
            :properties="properties"
            :isLast="index === branch.children.length-1"
            @change-branch="changeBranch"
            @add-children="addChildren"
            @remove-children="removeChildren"
        />
        <v-btn
            class="add-btn ml-1"
            color="teal"
            depressed
            fab
            title="Add"
            @click="addChildren"
            v-if="branch.addable">
            <v-icon color="white">mdi-plus</v-icon>
        </v-btn>
        <span class="method mr-1" v-if="!isLast && !branch.method">,</span>
        <span class="method" v-if="branch.children">)</span>
        <span class="method mr-1" v-if="!isLast && branch.method && !['If', 'Then', 'Elif'].includes(branch.method)">,</span>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name : 'JqSelect',
        props: ['branch', 'properties', 'isLast'],
        data() {
            return {
                internalValue        : '',
                internalValueText    : '',
                currentSearchMethod  : '',
                currentSearchProperty: '',
                showDel              : false,
                tab                  : null as any,
                tabs                 : [
                    {tab: 'Method'},
                    {tab: 'Property'},
                    {tab: 'Value'}
                ] as any,
                date                 : '',
                showDatePicker       : false,
                selectedItem         : null,
                jqMethods            : {
                    Basic      : [
                        {method: 'Get'},
                        {method: 'Pipe'},
                        {method: 'Select'},
                        {method: 'Assignment'},
                        {method: 'Length'},
                        {method: 'Keys'},
                        {method: 'Type'},
                        {method: 'If-Then-Else'}
                        // { method: 'Utf8bytelength'},
                        // { method: 'inside' },
                    ],
                    Calculation: [
                        {method: 'Addition'},
                        {method: 'Subtraction'},
                        {method: 'Multiplication'},
                        {method: 'Division'},
                        {method: 'Modulo'}
                    ],
                    Convert    : [
                        {method: 'ToJson'},
                        {method: 'ToNumber'},
                        {method: 'ToString'},
                        {method: 'Reverse'},
                        {method: 'Unique'},
                        {method: 'Del'},
                        {method: 'Join'},
                        {method: 'Split'},
                        {method: 'Flatten'},
                        {method: 'Floor'}
                    ],
                    Comparisons: [
                        {method: 'Min'},
                        {method: 'Max'},
                        {method: 'min_by(path_exp)'},
                        {method: 'max_by(path_exp)'},
                        {method: 'Equal'},
                        {method: 'Greater'},
                        {method: 'Greater or Equal'},
                        {method: 'Less'},
                        {method: 'Less or Equal'},
                        {method: 'And'},
                        {method: 'Or'},
                        {method: 'Not'},
                        {method: 'StartWith'},
                        {method: 'EndWith'}
                    ],
                    Array      : [
                        {method: 'Array Index'},
                        {method: 'Array/String Slice'},
                        {method: 'Array/Object Value Iterator'}
                    ]
                    // Date: [
                    //     { method: 'DayDiff' },
                    //     { method: 'Inside Date Range' },
                    // ],
                },
                jqMethodsFilter      : {} as any,
                filterProperties     : [] as any,
                filterDebounce       : null as any
            }
        },
        watch: {
            properties(newV, oldV) {
                this.filterProperties = [...newV]
            },
            branch(newV, oldV){
                if(newV.method){
                    this.internalValue = newV.method
                } else if(newV.value) {
                    this.internalValue = newV.value
                }
            }
        },
        mounted() {
            this.currentSearchMethod = ''
            this.jqMethodsFilter     = this.jqMethods ? {...this.jqMethods} : {}
            this.filterProperties    = this.properties ? [...this.properties] : []
            if (this.branch) {
                if (this.branch.textOnly) {
                    this.tabs = [
                        {tab: 'Value'}
                    ]
                }
                if (this.branch.value) {
                    if (this.branch.type == 'date') {
                        this.date = this.branch.value
                        this.tab  = 2
                    } else if (this.branch.type == 'string' || this.branch.type == 'number') {
                        this.internalValueText = this.branch.value
                        this.tab               = 2
                    } else if (this.branch.type == 'property') {
                        this.currentSearchProperty = this.branch.value
                        this.tab                   = 1
                    }
                    this.internalValue = this.branch.value
                } else if (this.branch.method) {
                    this.currentSearchMethod = this.branch.method
                    this.internalValue       = this.branch.method
                }
            }
        },
        beforeDestroy() {
            this.internalValue         = ''
            this.date                  = ''
            this.currentSearchMethod   = ''
            this.currentSearchProperty = ''
            this.jqMethodsFilter       = {}
            this.filterProperties      = []
        },
        methods: {
            doFilterMethod(e: any) {
                if (e.target.value) {
                    let filterList: any = {...this.jqMethods}
                    for (let property in filterList) {
                        filterList[property] = filterList[property].filter((item: any) => item.method.toLowerCase().includes(e.target.value.toLowerCase()))
                    }
                    this.jqMethodsFilter = filterList
                } else {
                    this.jqMethodsFilter = {...this.jqMethods}
                }
            },
            doFilterProps(e: any) {
                if (e.target.value) {
                    this.filterProperties = this.properties.filter((item: any) => item.toLowerCase().includes(e.target.value.toLowerCase()))
                } else {
                    this.filterProperties = {...this.properties}
                }
            },
            changeBranch(branch: any) {
                this.$emit('change-branch', branch)
            },
            addChildren(branch: any) {
                if (branch.id) {
                    this.$emit('add-children', branch)
                } else {
                    this.$emit('add-children', this.branch)
                }
            },
            removeChildren(branch: any) {
                if (branch.id) {
                    this.$emit('remove-children', branch)
                } else {
                    this.$emit('remove-children', this.branch)
                }
            },
            selectJq(item: any) {
                if (item.method) {
                    this.internalValue = item.method
                    let _branch        = {
                        ...this.branch,
                        method: item.method,
                        type  : 'method'
                    }
                    delete _branch.value
                    this.$emit('change-branch', _branch)
                } else {
                    this.internalValue = item
                    let _branch: any   = {
                        ...this.branch,
                        value: item,
                        type : 'property'
                    }
                    delete _branch.method
                    this.$emit('change-branch', _branch)
                }
            },
            changeText(e: any) {
                this.date = ''
                if (this.filterDebounce) {
                    return
                }
                this.filterDebounce = setTimeout(() => {
                    const value: any   = e.target.value
                    this.date          = ''
                    this.internalValue = value
                    let _branch        = {
                        ...this.branch,
                        value: value
                    }
                    if (isNaN(value)) {
                        _branch.type = 'string'
                    } else {
                        _branch.type = 'number'
                    }
                    this.$emit('change-branch', _branch)
                    clearTimeout(this.filterDebounce)
                    this.filterDebounce = null
                }, 1500)
            },
            changeDate(value: any) {
                this.internalValueText = ''
                this.internalValue     = value
                let _branch            = {
                    ...this.branch,
                    value: value,
                    type : 'date'
                }
                this.$emit('change-branch', _branch)
            }
        }
    })
</script>

<style lang="scss">
    .jq-select-container { display: inline !important; align-items: center; position: relative;
        * {display: inline-block; margin: 0;}
        .v-btn.add-btn { width: 16px; height: 16px;
            .v-btn__content { display: block;
                .v-icon { width: 100%;height: 100%; display: block; line-height: 16px;font-size: 14px; text-align: center;
                    &:before {display: block;line-height: 16px; text-align: center;}
                }
            }
        }
        .value-container {
            margin: 3px 0;
            position: relative;
            .fade-enter-active,
            .fade-leave-active {
                transition: opacity 0.5s ease;
            }
            .fade-enter-from,
            .fade-leave-to {
                opacity: 0;
            }
            .select-btn {
                height: 20px;
                padding: 0 5px;
                text-transform: none;
                border: 1px dashed;
                span {
                    font-size: 11px;
                }
            }
            .special-value-btn {
                color: #ef6c00 !important;
                caret-color: #ef6c00 !important;
            }
            .value {
                padding: 4px 10px 1px;
                border-radius: 30px;
                background-color: #c8e6c9;
                color: #2e7d32;
                font-size: 11px;
            }
            .special-value {
                background-color: #ffcc80;
                color: #e65100;
            }
            .v-btn.remove-btn {position: absolute;right: -2px;top: -4px;height: 14px;width: 14px;
                .v-btn__content { display: block;
                    .v-icon { width: 100%;height: 100%; display: block; line-height: 14px;font-size: 10px; text-align: center;
                        &:before {display: block;line-height: 14px; text-align: center;}
                    }
                }
            }
        }
        .method {padding-top: 5px;color: #4527a0;font-size: 11px;}
    }
    .jq-select-props { border: 1px solid #ddd;
        .remove-elif {
            .v-btn__content {
                font-size: 12px;
                text-transform: none;
            }
        }
        .jq-text-input {border: 1px solid #ccc; border-radius: 4px; outline: none; padding: 0 8px; transition: all 0.15s linear;
            height: 30px; line-height: 1; font-size: 12px; width: 100%;margin: 0;
            &:hover,
            &:focus {border-color: #bd9d92;}
        }
        .select-box {
            .list-container { display: block;height: auto;max-height: 200px; overflow: auto;}
            .jq-select-input {display: block;padding: 10px;}
            .jq-select-input ~ .jq-select-input { padding-top: 0;}
            .jq-select-input.date-input { position: relative;
                input {background: transparent; position: relative;z-index: 2;}
                .v-icon {position: absolute;z-index: 1;right: 14px;top: 3px;}
            }
        }
        .v-tabs {
            .v-tabs-bar {
                background: rgb(243, 247, 255) !important;
                background: linear-gradient(0deg, rgba(243, 247, 255, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(243, 247, 255, 1) 100%) !important;
                border-bottom: 1px solid #ddd !important;}
            .v-tab { font-size: 12px; text-transform: capitalize; border-left: 1px solid #ddd;
                padding: 0 18px; min-width: inherit; max-width: inherit;
                &:first-child {border-left: none;}
                &:hover,
                &:focus,
                &.v-tab--active { background: #fff;}
            }
        }
        .current-method {display: block;padding: 8px 10px 6px; font-size: 11px; line-height: 1.2; border-bottom: 1px solid #ddd;
            span + span { color: #2e7d32;}
        }
        .list-props,
        .list-props li {display: block;list-style: none;margin: 0;padding: 0; line-height: 1.2;}
        .list-props li {padding: 6px 10px; font-size: 12px; cursor: pointer; transition: all 0.15s linear; border-top: 1px solid #fff; border-bottom: 1px solid #fff;
            &:hover {background: #fafafa; color: #2e7d32; border-color: #eee;}
        }
        .list-method {
            > label {display: block;padding: 10px 10px 0; font-weight: 500; font-size: 13px;}
            .list-props li {padding-left: 18px;}
        }
    }
</style>
