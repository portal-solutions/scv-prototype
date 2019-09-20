import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { PageMetadataContext } from '../../context';
import './page-details.css';

/**
 * Standard WETv4 page details component.
 * (stateless)
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const PageDetails = (props) => {
	const { t } = useTranslation();
	const { applicationDateModified, applicationVersion, pageIdentifier } = useContext(PageMetadataContext);

	return (
		<div className="pagedetails clearfix">
			{ (applicationDateModified || applicationVersion || pageIdentifier) &&
				<dl id="wb-dtmd">
					{ pageIdentifier &&
						<>
							<dt>{ t('wet-boew.page-details.screen-identifier') }</dt>
							<dd property="identifier">{ pageIdentifier }</dd>
						</>
					}
					{ applicationDateModified &&
						<>
							<dt>{ t('wet-boew.page-details.date-modified') }</dt>
							<dd><time property="dateModified">{ applicationDateModified }</time></dd>
						</>
					}
					{ applicationVersion &&
						<>
							<dt>{ t('wet-boew.page-details.version') }</dt>
							<dd property="version">{ applicationVersion }</dd>
						</>
					}
				</dl>
			}
		</div>
	);
}
