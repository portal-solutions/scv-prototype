import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { AuthenticationContext } from '../../../../context/Authentication';
import Button from '../../../../components/Button';

/**
 * A no-frills login button. Doesn't do much; used mostly for testing.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const LoginButton = (props) => {
	const { authenticationContext, setAuthenticationContext } = useContext(AuthenticationContext);
	const { t } = useTranslation();

	return (
		<>
			{authenticationContext.authenticated ?

				<Button size={Button.sizes.sm} onClick={() => setAuthenticationContext(null)} >
					<i className="fas fa-sign-out-alt mr-2" aria-hidden="true"></i><span>{t("action.sign-out")}</span>
				</Button>
				:
				<Link to="/sign-in">
					<Button size={Button.sizes.sm}>
						<i className="fas fa-sign-in-alt mr-2" aria-hidden="true"></i><span>{t("action.sign-in")}</span>
					</Button>
				</Link>
			}
		</>
	);
};

export default LoginButton;
