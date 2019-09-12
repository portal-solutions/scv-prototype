import { createContext } from 'react';

/**
 * React context that holds various page metadata values
 * such as page title and page identifier.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const PageMetadataContext = createContext({
	pageIdentifier: 'SCV-0000',
	pageTitle: 'Page Title',

	setPageTitle: () => {},
	setPageIdentifier: () => {}
});

const PageMetadataConsumer = PageMetadataContext.Consumer;
const PageMetadataProvider = PageMetadataContext.Provider;

export { PageMetadataConsumer, PageMetadataContext, PageMetadataProvider };
