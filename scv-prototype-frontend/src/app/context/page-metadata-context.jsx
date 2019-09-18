import { createContext } from 'react';

/**
 * React context that holds various page metadata values
 * such as page title and page identifier.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const PageMetadataContext = createContext();
export const PageMetadataConsumer = PageMetadataContext.Consumer;
export const PageMetadataProvider = PageMetadataContext.Provider;
