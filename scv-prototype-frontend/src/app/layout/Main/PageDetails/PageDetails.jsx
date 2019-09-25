import React, { useContext } from 'react';
import { PageMetadataContext } from '../../../context';
import { useTranslation } from 'react-i18next';

const PageDetails = (props) => {
	const { t } = useTranslation();
	const { applicationDateModified, applicationVersion, pageIdentifier } = useContext(PageMetadataContext);

	return (
		<div className="pagedetails clearfix">
			{(applicationDateModified || applicationVersion || pageIdentifier) &&
				<dl id="wb-dtmd">
					{pageIdentifier &&
						<>
							<dt>{t('wet-boew.page-details.screen-identifier')}</dt>
							<dd property="identifier">{pageIdentifier}</dd>
						</>
					}
					{applicationDateModified &&
						<>
							<dt>{t('wet-boew.page-details.date-modified')}</dt>
							<dd><time property="dateModified">{applicationDateModified}</time></dd>
						</>
					}
					{applicationVersion &&
						<>
							<dt>{t('wet-boew.page-details.version')}</dt>
							<dd property="version">{applicationVersion}</dd>
						</>
					}
				</dl>
			}
		</div>
	);
}

export default PageDetails;
