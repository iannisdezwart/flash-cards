export const countryCodes = [
	'AE', 'AF', 'AL', 'AR', 'AT', 'AU', 'AZ', 'BA', 'BD', 'BE', 'BG', 'BH',
	'BO', 'BR', 'CA', 'CH', 'CL', 'CN', 'CO', 'CR', 'CU', 'CZ', 'DE', 'DK',
	'DO', 'DZ', 'EC', 'EE', 'EG', 'ES', 'ET', 'FI', 'FR', 'GB', 'GE', 'GQ',
	'GR', 'GT', 'HK', 'HN', 'HR', 'HU', 'ID', 'IE', 'IL', 'IN', 'IQ', 'IR',
	'IS', 'IT', 'JO', 'JP', 'KE', 'KH', 'KR', 'KW', 'KZ', 'LA', 'LB', 'LK',
	'LT', 'LV', 'LY', 'MA', 'MK', 'MM', 'MN', 'MT', 'MX', 'MY', 'NG', 'NI',
	'NL', 'NO', 'NP', 'NZ', 'OM', 'PA', 'PE', 'PH', 'PL', 'PR', 'PT', 'PY',
	'QA', 'RO', 'RS', 'RU', 'SA', 'SE', 'SG', 'SI', 'SK', 'SO', 'SV', 'SY',
	'TH', 'TN', 'TR', 'TW', 'TZ', 'UA', 'US', 'UY', 'UZ', 'VE', 'VN', 'YE',
	'ZA', 'XX'
] as const
export type CountryCode = typeof countryCodes[number]

export const locales = [
	'af-ZA', 'sq-AL', 'am-ET', 'ar-EG', 'ar-DZ', 'ar-IQ', 'ar-MA', 'ar-SA',
	'ar-YE', 'ar-SY', 'ar-TN', 'ar-JO', 'ar-AE', 'ar-LY', 'ar-LB', 'ar-OM',
	'ar-KW', 'ar-QA', 'ar-BH', 'az-AZ', 'bn-BD', 'bn-IN', 'bs-BA', 'bg-BG',
	'my-MM', 'ca-ES', 'zh-CN', 'zh-TW', 'zh-HK', 'hr-HR', 'cs-CZ', 'da-DK',
	'nl-NL', 'nl-BE', 'en-GB', 'en-US', 'en-CA', 'en-AU', 'en-SG', 'en-IN',
	'en-IE', 'en-HK', 'en-ZA', 'en-NG', 'en-NZ', 'en-KE', 'en-PH', 'en-TZ',
	'et-EE', 'fil-PH', 'fi-FI', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH', 'gl-ES',
	'ka-GE', 'de-DE', 'de-AT', 'de-CH', 'el-GR', 'gu-IN', 'he-IL', 'hi-IN',
	'hu-HU', 'is-IS', 'id-ID', 'ga-IE', 'it-IT', 'ja-JP', 'jv-ID', 'kn-IN',
	'kk-KZ', 'km-KH', 'ko-KR', 'lo-LA', 'lv-LV', 'lt-LT', 'mk-MK', 'ms-MY',
	'ml-IN', 'mt-MT', 'mr-IN', 'mn-MN', 'ne-NP', 'nb-NO', 'ps-AF', 'fa-IR',
	'pl-PL', 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'sr-RS', 'si-LK', 'sk-SK',
	'sl-SI', 'so-SO', 'es-ES', 'es-MX', 'es-CO', 'es-AR', 'es-PE', 'es-VE',
	'es-CL', 'es-EC', 'es-GT', 'es-BO', 'es-DO', 'es-CU', 'es-CR', 'es-SV',
	'es-CQ', 'es-HN', 'es-NI', 'es-PA', 'es-PY', 'es-PR', 'es-UY', 'es-US',
	'su-ID', 'sw-KE', 'sw-TZ', 'sv-SE', 'ta-IN', 'ta-MY', 'ta-SG', 'ta-LK',
	'te-IN', 'th-TH', 'tr-TR', 'uk-UA', 'ur-IN', 'uz-UZ', 'vi-VN', 'cy-GB',
	'zu-ZA', 'xx-XX'
] as const
export type Locale = typeof locales[number]

export class Lang
{
	name: string
	details?: string
	countryCode: CountryCode
	locale: Locale

	constructor(init: { name: string, details?: string, countryCode: CountryCode, locale: Locale })
	{
		this.name = init.name
		this.details = init.details
		this.countryCode = init.countryCode
		this.locale = init.locale
	}

	get fullName()
	{
		if (this.details == null)
		{
			return this.name
		}

		return `${ this.name } (${ this.details })`
	}

	static fromLocale(locale: Locale)
	{
		return Lang.all.find(lang => lang.locale == locale) || Lang.unknown
	}

	static all = ([
		{ name: 'Afrikaans', countryCode: 'ZA', locale: 'af-ZA' },
		{ name: 'Albanian', countryCode: 'AL', locale: 'sq-AL' },
		{ name: 'Amharic', countryCode: 'ET', locale: 'am-ET' },
		{ name: 'Arabic', details: 'Egypt', countryCode: 'EG', locale: 'ar-EG' },
		{ name: 'Arabic', details: 'Algeria', countryCode: 'DZ', locale: 'ar-DZ' },
		{ name: 'Arabic', details: 'Iraq', countryCode: 'IQ', locale: 'ar-IQ' },
		{ name: 'Arabic', details: 'Morocco', countryCode: 'MA', locale: 'ar-MA' },
		{ name: 'Arabic', details: 'Saudi Arabia', countryCode: 'SA', locale: 'ar-SA' },
		{ name: 'Arabic', details: 'Yemen', countryCode: 'YE', locale: 'ar-YE' },
		{ name: 'Arabic', details: 'Syria', countryCode: 'SY', locale: 'ar-SY' },
		{ name: 'Arabic', details: 'Tunisia', countryCode: 'TN', locale: 'ar-TN' },
		{ name: 'Arabic', details: 'Jordan', countryCode: 'JO', locale: 'ar-JO' },
		{ name: 'Arabic', details: 'UAE', countryCode: 'AE', locale: 'ar-AE' },
		{ name: 'Arabic', details: 'Libya', countryCode: 'LY', locale: 'ar-LY' },
		{ name: 'Arabic', details: 'Lebanon', countryCode: 'LB', locale: 'ar-LB' },
		{ name: 'Arabic', details: 'Oman', countryCode: 'OM', locale: 'ar-OM' },
		{ name: 'Arabic', details: 'Kuwait', countryCode: 'KW', locale: 'ar-KW' },
		{ name: 'Arabic', details: 'Qatar', countryCode: 'QA', locale: 'ar-QA' },
		{ name: 'Arabic', details: 'Bahrain', countryCode: 'BH', locale: 'ar-BH' },
		{ name: 'Azerbaijani', countryCode: 'AZ', locale: 'az-AZ' },
		{ name: 'Bangla', countryCode: 'BD', locale: 'bn-BD' },
		{ name: 'Bengali', countryCode: 'IN', locale: 'bn-IN' },
		{ name: 'Bosnian', countryCode: 'BA', locale: 'bs-BA' },
		{ name: 'Bulgarian', countryCode: 'BG', locale: 'bg-BG' },
		{ name: 'Burmese', countryCode: 'MM', locale: 'my-MM' },
		{ name: 'Catalan', countryCode: 'ES', locale: 'ca-ES' },
		{ name: 'Chinese', details: 'Mandarin, Simplified', countryCode: 'CN', locale: 'zh-CN' },
		{ name: 'Chinese', details: 'Taiwanese Mandarin, Traditional', countryCode: 'TW', locale: 'zh-TW' },
		{ name: 'Chinese', details: 'Cantonese, Traditional', countryCode: 'HK', locale: 'zh-HK' },
		{ name: 'Croatian', countryCode: 'HR', locale: 'hr-HR' },
		{ name: 'Czech', countryCode: 'CZ', locale: 'cs-CZ' },
		{ name: 'Danish', countryCode: 'DK', locale: 'da-DK' },
		{ name: 'Dutch', details: 'Netherlands', countryCode: 'NL', locale: 'nl-NL' },
		{ name: 'Dutch', details: 'Belgium', countryCode: 'BE', locale: 'nl-BE' },
		{ name: 'English', details: 'UK', countryCode: 'GB', locale: 'en-GB' },
		{ name: 'English', details: 'US', countryCode: 'US', locale: 'en-US' },
		{ name: 'English', details: 'Canada', countryCode: 'CA', locale: 'en-CA' },
		{ name: 'English', details: 'Australia', countryCode: 'AU', locale: 'en-AU' },
		{ name: 'English', details: 'Singapore', countryCode: 'SG', locale: 'en-SG' },
		{ name: 'English', details: 'India', countryCode: 'IN', locale: 'en-IN' },
		{ name: 'English', details: 'Ireland', countryCode: 'IE', locale: 'en-IE' },
		{ name: 'English', details: 'Hong Kong', countryCode: 'HK', locale: 'en-HK' },
		{ name: 'English', details: 'South Africa', countryCode: 'ZA', locale: 'en-ZA' },
		{ name: 'English', details: 'Nigeria', countryCode: 'NG', locale: 'en-NG' },
		{ name: 'English', details: 'New Zealand', countryCode: 'NZ', locale: 'en-NZ' },
		{ name: 'English', details: 'Kenya', countryCode: 'KE', locale: 'en-KE' },
		{ name: 'English', details: 'Phillipines', countryCode: 'PH', locale: 'en-PH' },
		{ name: 'English', details: 'Tanzania', countryCode: 'TZ', locale: 'en-TZ' },
		{ name: 'Estonian', countryCode: 'EE', locale: 'et-EE' },
		{ name: 'Filipino', countryCode: 'PH', locale: 'fil-PH' },
		{ name: 'Finnish', countryCode: 'FI', locale: 'fi-FI' },
		{ name: 'French', details: 'France', countryCode: 'FR', locale: 'fr-FR' },
		{ name: 'French', details: 'Canada', countryCode: 'CA', locale: 'fr-CA' },
		{ name: 'French', details: 'Belgium', countryCode: 'BE', locale: 'fr-BE' },
		{ name: 'French', details: 'Switzerland', countryCode: 'CH', locale: 'fr-CH' },
		{ name: 'Galician', countryCode: 'ES', locale: 'gl-ES' },
		{ name: 'Georgian', countryCode: 'GE', locale: 'ka-GE' },
		{ name: 'German', details: 'Germany', countryCode: 'DE', locale: 'de-DE' },
		{ name: 'German', details: 'Austria', countryCode: 'AT', locale: 'de-AT' },
		{ name: 'German', details: 'Switzerland', countryCode: 'CH', locale: 'de-CH' },
		{ name: 'Greek', countryCode: 'GR', locale: 'el-GR' },
		{ name: 'Gujarati', countryCode: 'IN', locale: 'gu-IN' },
		{ name: 'Hebrew', countryCode: 'IL', locale: 'he-IL' },
		{ name: 'Hindi', countryCode: 'IN', locale: 'hi-IN' },
		{ name: 'Hungarian', countryCode: 'HU', locale: 'hu-HU' },
		{ name: 'Icelandic', countryCode: 'IS', locale: 'is-IS' },
		{ name: 'Indonesian', countryCode: 'ID', locale: 'id-ID' },
		{ name: 'Irish', countryCode: 'IE', locale: 'ga-IE' },
		{ name: 'Italian', countryCode: 'IT', locale: 'it-IT' },
		{ name: 'Japanese', countryCode: 'JP', locale: 'ja-JP' },
		{ name: 'Javanese', countryCode: 'ID', locale: 'jv-ID' },
		{ name: 'Kannada', countryCode: 'IN', locale: 'kn-IN' },
		{ name: 'Kazakh', countryCode: 'KZ', locale: 'kk-KZ' },
		{ name: 'Khmer', countryCode: 'KH', locale: 'km-KH' },
		{ name: 'Korean', countryCode: 'KR', locale: 'ko-KR' },
		{ name: 'Lao', countryCode: 'LA', locale: 'lo-LA' },
		{ name: 'Latvian', countryCode: 'LV', locale: 'lv-LV' },
		{ name: 'Lithuanian', countryCode: 'LT', locale: 'lt-LT' },
		{ name: 'Macedonian', countryCode: 'MK', locale: 'mk-MK' },
		{ name: 'Malay', countryCode: 'MY', locale: 'ms-MY' },
		{ name: 'Malayalam', countryCode: 'IN', locale: 'ml-IN' },
		{ name: 'Maltese', countryCode: 'MT', locale: 'mt-MT' },
		{ name: 'Marathi', countryCode: 'IN', locale: 'mr-IN' },
		{ name: 'Mongolian', countryCode: 'MN', locale: 'mn-MN' },
		{ name: 'Nepali', countryCode: 'NP', locale: 'ne-NP' },
		{ name: 'Norwegian', countryCode: 'NO', locale: 'nb-NO' },
		{ name: 'Pashto', countryCode: 'AF', locale: 'ps-AF' },
		{ name: 'Persian', countryCode: 'IR', locale: 'fa-IR' },
		{ name: 'Polish', countryCode: 'PL', locale: 'pl-PL' },
		{ name: 'Portuguese', details: 'Brazil', countryCode: 'BR', locale: 'pt-BR' },
		{ name: 'Portuguese', details: 'Portugal', countryCode: 'PT', locale: 'pt-PT' },
		{ name: 'Romanian', countryCode: 'RO', locale: 'ro-RO' },
		{ name: 'Russian', countryCode: 'RU', locale: 'ru-RU' },
		{ name: 'Serbian', countryCode: 'RS', locale: 'sr-RS' },
		{ name: 'Sinhala', countryCode: 'LK', locale: 'si-LK' },
		{ name: 'Slovak', countryCode: 'SK', locale: 'sk-SK' },
		{ name: 'Slovenian', countryCode: 'SI', locale: 'sl-SI' },
		{ name: 'Somali', countryCode: 'SO', locale: 'so-SO' },
		{ name: 'Spanish', details: 'Spain', countryCode: 'ES', locale: 'es-ES' },
		{ name: 'Spanish', details: 'Mexico', countryCode: 'MX', locale: 'es-MX' },
		{ name: 'Spanish', details: 'Colombia', countryCode: 'CO', locale: 'es-CO' },
		{ name: 'Spanish', details: 'Argentina', countryCode: 'AR', locale: 'es-AR' },
		{ name: 'Spanish', details: 'Peru', countryCode: 'PE', locale: 'es-PE' },
		{ name: 'Spanish', details: 'Venezuela', countryCode: 'VE', locale: 'es-VE' },
		{ name: 'Spanish', details: 'Chile', countryCode: 'CL', locale: 'es-CL' },
		{ name: 'Spanish', details: 'Ecuador', countryCode: 'EC', locale: 'es-EC' },
		{ name: 'Spanish', details: 'Guatemala', countryCode: 'GT', locale: 'es-GT' },
		{ name: 'Spanish', details: 'Bolivia', countryCode: 'BO', locale: 'es-BO' },
		{ name: 'Spanish', details: 'Dominican Republic', countryCode: 'DO', locale: 'es-DO' },
		{ name: 'Spanish', details: 'Cuba', countryCode: 'CU', locale: 'es-CU' },
		{ name: 'Spanish', details: 'Costa Rica', countryCode: 'CR', locale: 'es-CR' },
		{ name: 'Spanish', details: 'El Salvador', countryCode: 'SV', locale: 'es-SV' },
		{ name: 'Spanish', details: 'Equatorial Guinea', countryCode: 'GQ', locale: 'es-CQ' },
		{ name: 'Spanish', details: 'Honduras', countryCode: 'HN', locale: 'es-HN' },
		{ name: 'Spanish', details: 'Nicaragua', countryCode: 'NI', locale: 'es-NI' },
		{ name: 'Spanish', details: 'Panama', countryCode: 'PA', locale: 'es-PA' },
		{ name: 'Spanish', details: 'Paraguay', countryCode: 'PY', locale: 'es-PY' },
		{ name: 'Spanish', details: 'Puerto Rico', countryCode: 'PR', locale: 'es-PR' },
		{ name: 'Spanish', details: 'Uruguay', countryCode: 'UY', locale: 'es-UY' },
		{ name: 'Spanish', details: 'US', countryCode: 'US', locale: 'es-US' },
		{ name: 'Sundanese', countryCode: 'ID', locale: 'su-ID' },
		{ name: 'Swahili', details: 'Kenya', countryCode: 'KE', locale: 'sw-KE' },
		{ name: 'Swahili', details: 'Tanzania', countryCode: 'TZ', locale: 'sw-TZ' },
		{ name: 'Swedish', countryCode: 'SE', locale: 'sv-SE' },
		{ name: 'Tamil', details: 'India', countryCode: 'IN', locale: 'ta-IN' },
		{ name: 'Tamil', details: 'Malaysia', countryCode: 'MY', locale: 'ta-MY' },
		{ name: 'Tamil', details: 'Singapore', countryCode: 'SG', locale: 'ta-SG' },
		{ name: 'Tamil', details: 'Sri Lanka', countryCode: 'LK', locale: 'ta-LK' },
		{ name: 'Telugu', countryCode: 'IN', locale: 'te-IN' },
		{ name: 'Thai', countryCode: 'TH', locale: 'th-TH' },
		{ name: 'Turkish', countryCode: 'TR', locale: 'tr-TR' },
		{ name: 'Ukrainian', countryCode: 'UA', locale: 'uk-UA' },
		{ name: 'Urdu', countryCode: 'IN', locale: 'ur-IN' },
		{ name: 'Uzbek', countryCode: 'UZ', locale: 'uz-UZ' },
		{ name: 'Vietnamese', countryCode: 'VN', locale: 'vi-VN' },
		{ name: 'Welsh', countryCode: 'GB', locale: 'cy-GB' },
		{ name: 'Zulu', countryCode: 'ZA', locale: 'zu-ZA' },
		{ name: 'Select...', countryCode: 'XX', locale: 'xx-XX' }
	] as Lang[]).map(init => new Lang(init))

	static unknown = Lang.all.find(lang => lang.countryCode == 'XX')!
}