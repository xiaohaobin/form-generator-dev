import {
  hasSetFnCode, compileSetFn, validateSetFn
} from '@/utils/setFn'

export { hasSetFnCode, compileSetFn, validateSetFn }
export const validateInputNumberSetFn = validateSetFn

export function isInputNumberComponent(scheme) {
  return scheme?.__config__?.tag === 'el-input-number'
}

export function buildFormDataFromDrawingList(list, formData = {}) {
  if (!Array.isArray(list)) return formData
  list.forEach((item) => {
    if (item.__vModel__) {
      formData[item.__vModel__] = item.__config__?.defaultValue
    }
    if (item.__config__?.children) {
      buildFormDataFromDrawingList(item.__config__.children, formData)
    }
  })
  return formData
}

export function resolveInputNumberBounds(scheme, formData) {
  let { min, max } = scheme || {}

  if (hasSetFnCode(scheme?.min_set_fn)) {
    const fn = compileSetFn(scheme.min_set_fn)
    if (fn && formData) {
      try {
        const val = fn(formData)
        if (val !== undefined && val !== null && val !== '') min = val
      } catch (e) {
        console.warn('min_set_fn execute failed:', e)
      }
    }
  }

  if (hasSetFnCode(scheme?.max_set_fn)) {
    const fn = compileSetFn(scheme.max_set_fn)
    if (fn && formData) {
      try {
        const val = fn(formData)
        if (val !== undefined && val !== null && val !== '') max = val
      } catch (e) {
        console.warn('max_set_fn execute failed:', e)
      }
    }
  }

  return { min, max }
}

export function applyInputNumberMinMax(confClone, formData) {
  if (!isInputNumberComponent(confClone)) return confClone
  const { min, max } = resolveInputNumberBounds(confClone, formData)
  if (hasSetFnCode(confClone.min_set_fn)) confClone.min = min
  if (hasSetFnCode(confClone.max_set_fn)) confClone.max = max
  return confClone
}

export function hasInputNumberRange(scheme, formData) {
  const { min, max } = resolveInputNumberBounds(scheme, formData)
  return min !== undefined && min !== null && min !== ''
    && max !== undefined && max !== null && max !== ''
}

/** 代码生成：计数器 min/max 范围文案（支持静态值与 min_set_fn / max_set_fn） */
export function buildInputNumberRangeHtml(scheme, formModel = 'formData') {
  const hasMinFn = hasSetFnCode(scheme?.min_set_fn)
  const hasMaxFn = hasSetFnCode(scheme?.max_set_fn)
  const hasStaticMin = scheme.min !== undefined && scheme.min !== null && scheme.min !== ''
  const hasStaticMax = scheme.max !== undefined && scheme.max !== null && scheme.max !== ''

  let minPart = null
  let maxPart = null

  if (hasMinFn) {
    minPart = `{{ (${String(scheme.min_set_fn).trim()})(${formModel}) }}`
  } else if (hasStaticMin) {
    minPart = String(scheme.min)
  }

  if (hasMaxFn) {
    maxPart = `{{ (${String(scheme.max_set_fn).trim()})(${formModel}) }}`
  } else if (hasStaticMax) {
    maxPart = String(scheme.max)
  }

  if (minPart === null || maxPart === null) return ''

  return `<span class="fg-input-number-range">[${minPart},${maxPart}]</span>`
}

export function wrapInputNumberField(h, scheme, innerVnode, formData) {
  const unit = scheme.unit || ''
  const { min, max } = resolveInputNumberBounds(scheme, formData)
  const showRange = min !== undefined && min !== null && min !== ''
    && max !== undefined && max !== null && max !== ''

  return (
    <div class="fg-input-number-wrap">
      <div class="fg-input-number-inner">
        {innerVnode}
        {unit ? <span class="fg-input-number-unit">{unit}</span> : null}
      </div>
      {showRange ? (
        <span class="fg-input-number-range">[{min},{max}]</span>
      ) : null}
    </div>
  )
}
