/**
 * Various hooks that can be used in the application.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */
import { useContext, useEffect } from "react";
import { PageMetadataContext } from "../context";

/**
 * Set the 'date modified' WETv4 element.
 */
export const useApplicationDateModified = (applicationDateModified) => {
	const { setApplicationDataModified: setState } = useContext(PageMetadataContext);
	useEffect(() => { setState(applicationDateModified) }, [ applicationDateModified, setState ]);
}

/**
 * Set the 'application version' WETv4 element.
 */
export const useApplicationVersion = (applicationVersion) => {
	const { setApplicationVersion: setState } = useContext(PageMetadataContext);
	useEffect(() => { setState(applicationVersion) }, [ applicationVersion, setState ]);
}

/**
 * Set the document title.
 */
export const useDocumentTitle = (documentTitle) => {
	useEffect(() => { document.title = documentTitle }, [ documentTitle ]);
}

/**
 * Set the 'page identifier' WETv4 element.
 */
export const usePageIdentifier = (pageIdentifier) => {
	const { setPageIdentifier: setState } = useContext(PageMetadataContext);
	useEffect(() => { setState(pageIdentifier) }, [ pageIdentifier, setState ]);
}

/**
 * Set the 'page title' WETv4 element.
 */
export const usePageTitle = (pageTitle) => {
	const { setPageTitle: setState } = useContext(PageMetadataContext);
	useEffect(() => { setState(pageTitle) }, [ pageTitle, setState ]);
}
