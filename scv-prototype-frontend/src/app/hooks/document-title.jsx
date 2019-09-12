import { useEffect } from "react";

/**
 * React hook that can be used to set the document title.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const useDocumentTitle = (documentTitle) => {
	useEffect(() => { document.title = documentTitle }, [ documentTitle ]);
}

export { useDocumentTitle };
