import { isOptionHiddenByHideFn } from '@/utils/setFn'

export default {
  options(h, conf, key, formData) {
    const list = []
    const useHideFn = conf.__config__.tag === 'el-select'
    conf.__slot__.options.forEach(item => {
      if (useHideFn && isOptionHiddenByHideFn(item, formData)) return
      list.push(<el-option label={item.label} value={item.value} disabled={item.disabled}></el-option>)
    })
    return list
  }
}
