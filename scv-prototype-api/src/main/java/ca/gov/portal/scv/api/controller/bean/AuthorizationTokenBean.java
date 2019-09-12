package ca.gov.portal.scv.api.controller.bean;

import java.io.Serializable;

import org.springframework.lang.NonNull;

import lombok.Value;

/**
 * @see ca.gov.portal.scv.api.controller.AuthorizationController
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@SuppressWarnings({ "serial" })
public class AuthorizationTokenBean implements Serializable {

	/**
	 * Authorization token type. Defaults to 'bearer' since
	 * this is the only token type supported by this API.
	 */
	@NonNull
	private String tokenType = "bearer";

	/**
	 * Authorization token value.
	 */
	@NonNull
	private String accessToken;

}
