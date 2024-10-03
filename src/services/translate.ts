import { ArabicTranslations, EnglishTranslations } from "@/languages"
import { AvailableLanguages } from "@/types"

export default function translate(key: string, lang: AvailableLanguages = 'ar') {

  if (lang === 'en') {
    if (EnglishTranslations[key]) {
      return EnglishTranslations[key]
    } else {
      return `_${key}`
    }
  } else if (lang === 'ar') {
    if (ArabicTranslations[key]) {
      return ArabicTranslations[key]
    } else {
      return `_${key}`
    }
  }
  return `_${key}`

}