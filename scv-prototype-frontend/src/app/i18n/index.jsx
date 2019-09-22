import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import messagesEn from './en.json';
import messagesFr from './fr.json';

/**
 * Application i18n configuration.
 *
 * @see https://react.i18next.com/
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
i18n.use(LanguageDetector).use(initReactI18next).init({
	detection: {
		order: [ 'querystring', 'cookie', 'localStorage', 'navigator' ],
		lookupQuerystring: 'locale', lookupCookie: 'locale', lookupLocalStorage: 'locale',
		caches: [ 'cookie', 'localStorage' ]
	},
	interpolation: {
		escapeValue: false // JSX escapes by default
	},
	load: 'languageOnly',
	resources: {
		en: { translation: messagesEn },
		fr: { translation: messagesFr }
	},
	whitelist: [ 'en', 'fr' ]
});
