import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { PageMetadataContext } from '../../../context/PageMetadata';

const PageDetails = (props) => {
	const { t } = useTranslation();
	const { pageMetadata } = useContext(PageMetadataContext);

	return (
		<div className="pagedetails clearfix">
			{(pageMetadata.applicationDateModified || pageMetadata.applicationVersion || pageMetadata.pageIdentifier) &&
				<dl id="wb-dtmd">
					{pageMetadata.pageIdentifier &&
						<>
							<dt>{t('wet-boew.page-details.screen-identifier')}</dt>
							<dd property="identifier">{pageMetadata.pageIdentifier}</dd>
						</>
					}
					{pageMetadata.applicationDateModified &&
						<>
							<dt>{t('wet-boew.page-details.date-modified')}</dt>
							<dd><time property="dateModified">{pageMetadata.applicationDateModified}</time></dd>
						</>
					}
					{pageMetadata.applicationVersion &&
						<>
							<dt>{t('wet-boew.page-details.version')}</dt>
							<dd property="version">{pageMetadata.applicationVersion}</dd>
						</>
					}
				</dl>
			}
		</div>
	);
}

export default PageDetails;
