<template>
    <div
        :class="[`formulate-input-element formulate-input-autocomplete formulate-input-element--input-autocomplete`, {'show-menu-btn': isMenuEnabled}, {'has-value': context.model}]"
        :data-type="context.type"
    >
        <input
            type="text"
            v-model="context.model"
            v-bind="context.attributes"
            autocomplete="off"
            @keyup="handleKeyUp($event)"
            @blur="context.blurHandler; otherBlurHandle()"
            :ref-id="idForRef"
        >
        <div class="autocomplete-actions">
            <v-btn v-if="context.model" icon x-small @click="showMenu = false; showAllOption = false; context.model = ''" color="red" class="close-btn">
                <v-icon small>mdi-close</v-icon>
            </v-btn>
            <v-btn v-if="isMenuEnabled" depressed small @click="displayMenu(true)" class="menu-btn">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </div>
        <div class="autocomplete-items-wrap" :id="itemWrapID"></div>
        <v-menu offset-y
                v-model="showMenu"
                :min-width="minWidth"
                :max-width="maxWidth"
                @input="showMenu = false; showAllOption = false"
                :attach="'[id=\''+ itemWrapID +'\']'">
            <v-card class="ma-0 pa-0">
                <v-list v-if="filteredOptions.length" class="ma-0 pa-0">
                    <v-list-item v-for="(option, idx) in filteredOptions" :key="option.value + '-' + idx" @click="context.model = option.value">
                        <v-list-item-title>{{ option.label }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                <div v-else class="filter-not-found pa-3">Oops! Not Found</div>
            </v-card>
        </v-menu>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    /*
    <FormulateInput
        type="autocomplete"
        name="user"
        label="Search for a user"
        :show-menu-button="true"
        :should-match-value="false"
        @debounce-end="logX($event)"
        :options="[
        { value: 1, label: 'Jon Doe'},
        { value: 2, label: 'Jane Roe'},
        { value: 3, label: 'Bob Foe'},
        { value: 4, label: 'Ben Cho'},
        ]"
    />
    */

    export default Vue.extend({
        name : 'FormulateAutocomplete',
        props: {
            context: {
                type    : Object,
                required: true
            }
        },
        data : () => {
            return {
                showMenu     : false,
                idForRef     : '',
                itemWrapID   : '',
                menuPosX     : 0,
                menuPosY     : 0,
                minWidth     : 200,
                maxWidth     : 200,
                showAllOption: false,
                debounce     : null as any,
                delayTime    : 750
            }
        },
        beforeMount() {
            this.idForRef   = this.$utils.genID()
            this.itemWrapID = this.$utils.genID()
        },
        computed: {
            model(): any {
                return this.context.model
            },
            hasOptions(): boolean {
                return Array.isArray(this.context.options) && this.context.options.length
            },
            filteredOptions(): any[] {
                if (this.hasOptions && this.showAllOption) {
                    return this.context.options
                } else if (this.hasOptions && this.context.model) {
                    const isAlreadySelected = this.context.options.find((option: any) => option.label === this.context.model)
                    if (!isAlreadySelected) {
                        return this.context.options
                            .filter((option: any) => option.label.toLowerCase().includes(this.context.model.toLowerCase()))
                    }
                }
                return []
            },
            isMenuEnabled(): boolean {
                return this.context.slotProps.component && this.context.slotProps.component.showMenuButton
            },
            checkMatchValue(): boolean {
                return this.context.slotProps.component && this.context.slotProps.component.shouldMatchValue
            }
        },
        methods : {
            getInputInfo() {
                const input: any = document.querySelector('[ref-id="' + this.idForRef + '"]')
                const info: any  = input.getBoundingClientRect()
                this.minWidth    = info.width
                this.maxWidth    = info.width
            },
            displayMenu(canShowAll?: boolean) {
                this.showAllOption = !!canShowAll
                this.getInputInfo()
                this.showMenu = true
            },
            handleKeyUp(e?: any) {
                this.showAllOption = false
                if (!this.showMenu) {
                    this.displayMenu()
                }
                if (this.debounce) {
                    clearTimeout(this.debounce)
                }
                this.debounce = setTimeout(() => {
                    this.$emit('debounce-end', this.model)
                    clearTimeout(this.debounce)
                    this.debounce = null
                }, this.delayTime)
            },
            otherBlurHandle() {
                if (this.checkMatchValue) {
                    setTimeout(() => {
                        if (this.hasOptions) {
                            let valid = false
                            this.context.options.map((o: any) => {
                                if (o.value === this.context.model) {
                                    valid = true
                                }
                            })
                            if (!valid) {
                                this.context.model = ''
                            }
                        } else {
                            this.context.model = ''
                        }
                    }, 250)
                }
            }
        }
    })
</script>
