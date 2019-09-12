import { createContext } from 'react';

/**
 * React context that holds beadcrumb data.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const BreadcrumbContext = createContext([
	{ href: '/', text: 'Breadcrumb' }
]);

const BreadcrumbConsumer = BreadcrumbContext.Consumer;
const BreadcrumbProvider = BreadcrumbContext.Provider;

export { BreadcrumbConsumer, BreadcrumbContext, BreadcrumbProvider };
