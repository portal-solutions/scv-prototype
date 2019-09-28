package ca.gov.portal.scv.api.endpoint.auth;

import java.io.Serializable;

import org.springframework.lang.NonNull;

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
public class AuthResponse implements Serializable {

	/**
	 * Authorization token type. Defaults to 'bearer' since
	 * this is the only token type supported by this API.
	 */
	@NonNull
	private String accessTokenType = "bearer";

	/**
	 * Authorization token value.
	 */
	@NonNull
	private String accessToken;

	/**
	 * The user id.
	 */
	@NonNull
	private String uid;

}
