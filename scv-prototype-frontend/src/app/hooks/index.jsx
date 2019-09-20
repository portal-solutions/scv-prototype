import { useContext, useEffect } from "react";
import { PageMetadataContext } from "../context";

/**
 * React hook that can be used to set the date modified WETv4 element.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const useApplicationDateModified = (applicationDateModified) => {
	const { setApplicationDataModified: setState } = useContext(PageMetadataContext);
	useEffect(() => { setState(applicationDateModified) }, [ applicationDateModified, setState ]);
}

/**
 * React hook that can be used to set the version WETv4 element.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const useApplicationVersion = (applicationVersion) => {
	const { setApplicationVersion: setState } = useContext(PageMetadataContext);
	useEffect(() => { setState(applicationVersion) }, [ applicationVersion, setState ]);
}

/**
 * React hook that can be used to set the document title.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const useDocumentTitle = (documentTitle) => {
	useEffect(() => { document.title = documentTitle }, [ documentTitle ]);
}

/**
 * React hook that can be used to set the version WETv4 element.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const usePageIdentifier = (pageIdentifier) => {
	const { setPageIdentifier: setState } = useContext(PageMetadataContext);
	useEffect(() => { setState(pageIdentifier) }, [ pageIdentifier, setState ]);
}

/**
 * React hook that can be used to set the version WETv4 element.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const usePageTitle = (pageTitle) => {
	const { setPageTitle: setState } = useContext(PageMetadataContext);
	useEffect(() => { setState(pageTitle) }, [ pageTitle, setState ]);
}
