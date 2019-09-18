import { createContext } from 'react';

/**
 * React context that holds global application data.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const ApplicationContext = createContext();
export const ApplicationContextConsumer = ApplicationContext.Consumer;
export const ApplicationContextProvider = ApplicationContext.Provider;
