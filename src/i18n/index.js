import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

import zhCNLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhTWLocale from 'element-ui/lib/locale/lang/zh-TW'
import enLocale from 'element-ui/lib/locale/lang/en'
import itLocale from 'element-ui/lib/locale/lang/it' //意大利语  Italiano
import plLocale from 'element-ui/lib/locale/lang/pl' //波兰语  Polish
import ptLocale from 'element-ui/lib/locale/lang/pt' //葡萄牙语  Português
import deLocale from 'element-ui/lib/locale/lang/de' //德语 German
import csCZLocale from 'element-ui/lib/locale/lang/cs-CZ' //捷克语 Česky

import zhCN from './zh-CN'
import zhTW from './zh-TW'
import enUS from './en-US'
import it from './it'
import pl from './pl'
import pt from './pt'
import de from './de'
import csCZ from './cs-CZ'

Vue.use(VueI18n)

export const messages = {
  'zh-CN': {
    _lang: '简体中文',
    ...zhCN,
    ...zhCNLocale
  },
  'zh-TW': {
    _lang: '繁體中文',
    ...zhTW,
    ...zhTWLocale
  },
  'en-US': {
    _lang: 'English',
    ...enUS,
    ...enLocale
  },
  it: {
    _lang: 'Italiano',
    ...it,
    ...itLocale
  },
  pl: {
    _lang: 'Polish',
    ...pl,
    ...plLocale
  },
  pt: {
    _lang: 'Português',
    ...pt,
    ...ptLocale
  },
  de: {
    _lang: 'German',
    ...de,
    ...deLocale
  },
  'cs-CZ': {
    _lang: 'Česky',
    ...csCZ,
    ...csCZLocale
  },
}
// console.info(messages,"messages",enLocale)
export default new VueI18n({
  locale: Cookies.get('language') || 'zh-CN',
  messages
})
