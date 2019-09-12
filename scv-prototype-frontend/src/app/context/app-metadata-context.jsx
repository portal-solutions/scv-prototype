import preval from 'preval.macro';
import { createContext } from 'react';
import pkg from '../../../package.json';

/**
 * React context that holds application metadata values
 * such as application version and build date.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const AppMetadataContext = createContext({
	dateModified: preval`module.exports = new Date().toISOString().slice(0, 10)`,
	version: pkg.version,

	setDateModified: () => {},
	setVersion: () => {}
});

const AppMetadataConsumer = AppMetadataContext.Consumer;
const AppMetadataProvider = AppMetadataContext.Provider;

export { AppMetadataConsumer, AppMetadataContext, AppMetadataProvider };
