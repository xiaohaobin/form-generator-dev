import { showByPrependFieldFn } from '@/utils/index'

export function hasSetFnCode(code) {
  if (code === undefined || code === null) return false
  return String(code).trim().length > 0
}

export function compileSetFn(code) {
  if (!hasSetFnCode(code)) return null
  if (typeof code === 'function') return code
  try {
    const fn = eval(`(${String(code).trim()})`)
    return typeof fn === 'function' ? fn : null
  } catch (e) {
    console.warn('set_fn compile failed:', e)
    return null
  }
}

/** hide_set_fn 已配置且可编译为有效函数 */
export function hasValidHideSetFn(config) {
  return hasSetFnCode(config?.hide_set_fn) && !!compileSetFn(config.hide_set_fn)
}

/** 校验动态函数代码；空值视为未配置，直接通过 */
export function validateSetFn(code, label = '动态函数') {
  if (!hasSetFnCode(code)) {
    return { valid: true }
  }
  const trimmed = String(code).trim()
  try {
    const fn = eval(`(${trimmed})`)
    if (typeof fn !== 'function') {
      return {
        valid: false,
        message: `${label}必须是函数，示例：(formData) => { return false }`,
      }
    }
    return { valid: true }
  } catch (e) {
    const errMsg = e && e.message ? e.message : String(e)
    return {
      valid: false,
      message: `${label}代码语法错误：${errMsg}`,
    }
  }
}

/** hide_set_fn 返回 true 时隐藏组件 */
export function isHiddenBySetFn(config, formData) {
  const fn = compileSetFn(config?.hide_set_fn)
  if (!fn || !formData) return false
  try {
    return fn(formData) === true
  } catch (e) {
    console.warn('hide_set_fn execute failed:', e)
    return false
  }
}

/** el-option.hide 返回 true 时隐藏该选项 */
export function isOptionHiddenByHideFn(option, formData) {
  if (!hasSetFnCode(option?.hide)) return false
  const fn = compileSetFn(option.hide)
  if (!fn || !formData) return false
  try {
    return fn(formData) === true
  } catch (e) {
    console.warn('option hide execute failed:', e)
    return false
  }
}

/** 下拉选项是否配置了有效的 hide 函数 */
export function hasSelectOptionHideFn(scheme) {
  return scheme?.__config__?.tag === 'el-select'
    && Array.isArray(scheme?.__slot__?.options)
    && scheme.__slot__.options.some((opt) => hasSetFnCode(opt.hide))
}

/**
 * 判断组件是否应渲染
 * hide_set_fn 有效时优先于 showByPrependField；未配置或无效时回退前置字段逻辑
 */
export function shouldRenderComponent(list, config, currentItem, formData) {
  if (hasValidHideSetFn(config)) {
    const hidden = isHiddenBySetFn(config, formData)
    return {
      show: !hidden,
      style: hidden ? 'display:none;' : 'display:block;',
    }
  }
  return showByPrependFieldFn(list, config, currentItem)
}

/**
 * 代码生成：组件 v-if 表达式
 * hide_set_fn 有效时仅使用动态隐藏；否则使用前置字段静态判断
 */
export function buildComponentVisibleAttr(config, fieldsList, scheme, formModel = 'formData') {
  if (hasValidHideSetFn(config)) {
    const hideExpr = `!(${String(config.hide_set_fn).trim()})(${formModel})`
    return `v-if="${hideExpr}"`
  }
  const prepend = showByPrependFieldFn(fieldsList, config, scheme)
  if (!prepend.show) {
    return 'v-if="false"'
  }
  return ''
}
