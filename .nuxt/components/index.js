export { default as AppLocale } from '../../components/AppLocale.vue'
export { default as ConfirmMenu } from '../../components/ConfirmMenu.vue'
export { default as DefaultFooter } from '../../components/DefaultFooter.vue'
export { default as DefaultHeader } from '../../components/DefaultHeader.vue'
export { default as HeaderAccount } from '../../components/HeaderAccount.vue'
export { default as HeaderLogo } from '../../components/HeaderLogo.vue'
export { default as JqCheatSheet } from '../../components/JqCheatSheet.vue'
export { default as JqSelect } from '../../components/JqSelect.vue'
export { default as JsonEditorDialog } from '../../components/JsonEditorDialog.vue'
export { default as LabelWithTooltip } from '../../components/LabelWithTooltip.vue'
export { default as MainMenu } from '../../components/MainMenu.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as PageLoading } from '../../components/PageLoading.vue'
export { default as PageTitle } from '../../components/PageTitle.vue'
export { default as Pagination } from '../../components/Pagination.vue'
export { default as ToggleButton } from '../../components/ToggleButton.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as VueTable } from '../../components/VueTable.vue'
export { default as VueTableBody } from '../../components/VueTableBody.vue'
export { default as VueTableFixedHeader } from '../../components/VueTableFixedHeader.vue'
export { default as VueTableHeader } from '../../components/VueTableHeader.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'
export { default as UserLogin } from '../../components/user/Login.vue'
export { default as UserMenu } from '../../components/user/Menu.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
