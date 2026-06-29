export function isInputNumberComponent(scheme) {
  return scheme?.__config__?.tag === 'el-input-number'
}

export function hasInputNumberRange(scheme) {
  const { min, max } = scheme || {}
  return min !== undefined && min !== null && min !== ''
    && max !== undefined && max !== null && max !== ''
}

export function wrapInputNumberField(h, scheme, innerVnode) {
  const unit = scheme.unit || ''
  const showRange = hasInputNumberRange(scheme)

  return (
    <div class="fg-input-number-wrap">
      <div class="fg-input-number-inner">
        {innerVnode}
        {unit ? <span class="fg-input-number-unit">{unit}</span> : null}
      </div>
      {showRange ? (
        <span class="fg-input-number-range">[{scheme.min},{scheme.max}]</span>
      ) : null}
    </div>
  )
}
