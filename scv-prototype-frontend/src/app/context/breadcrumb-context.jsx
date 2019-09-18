import { createContext } from 'react';

/**
 * React context that holds beadcrumb data.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const BreadcrumbContext = createContext();
export const BreadcrumbConsumer = BreadcrumbContext.Consumer;
export const BreadcrumbProvider = BreadcrumbContext.Provider;
