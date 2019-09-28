package ca.gov.portal.scv.api.endpoint.auth;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import lombok.Builder;
import lombok.Value;

/**
 * @see ca.gov.portal.scv.api.api.auth.AuthController
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
public class AuthRequest implements Serializable {

	/**
	 * The username of the account being authenticated.
	 */
	@NotBlank(message = "username must not be blank")
	private String username;

	/**
	 * The password of the account being authenticated.
	 */
	@NotBlank(message = "password must not be blank")
	private String password;

}
