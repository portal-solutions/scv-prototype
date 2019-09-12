import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppMetadataContext, PageMetadataContext } from '../../context';
import './page-details.css';

/**
 * Standard WETv4 page details component.
 * (stateless)
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const PageDetails = () => {
	const { t } = useTranslation();
	const { dateModified, version } = useContext(AppMetadataContext);
	const { pageIdentifier } = useContext(PageMetadataContext);

	return (
		<div className="pagedetails clearfix">
			{ (pageIdentifier || dateModified || version) &&
				<dl id="wb-dtmd">
					{ pageIdentifier &&
						<>
							<dt>{ t('wet-boew.page-details.screen-identifier') }</dt>
							<dd property="identifier">{ pageIdentifier }</dd>
						</>
					}
					{ dateModified &&
						<>
							<dt>{ t('wet-boew.page-details.date-modified') }</dt>
							<dd><time property="dateModified">{ dateModified }</time></dd>
						</>
					}
					{ version &&
						<>
							<dt>{ t('wet-boew.page-details.version') }</dt>
							<dd property="version">{ version }</dd>
						</>
					}
				</dl>
			}
		</div>
	);
}

export { PageDetails };
