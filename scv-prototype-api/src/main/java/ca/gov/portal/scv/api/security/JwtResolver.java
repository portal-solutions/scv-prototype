package ca.gov.portal.scv.api.security;

import java.time.Duration;
import java.util.Date;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Slf4j
@Component
@ConfigurationProperties("application.security.jwt-resolver")
public class JwtResolver implements InitializingBean {

	/**
	 * Regex pattern used to extract the token value from the authorization header.
	 */
	public static final Pattern tokenPattern = Pattern.compile("^Bearer (?<token>[a-zA-Z0-9-._~+/]+)=*$", Pattern.CASE_INSENSITIVE);

	/**
	 * Amount of time that JWT tokens are valid for.
	 */
	@Setter
	@NonNull
	private Duration expirationTime;

	/**
	 * Token issuer.
	 */
	@Setter
	@NonNull
	private String issuer;

	/**
	 * Secret used to encrypt/decrypt the JWT token.
	 */
	@Setter
	@NonNull
	private String secret;

	@Override
	public void afterPropertiesSet() throws Exception {
		Assert.notNull(expirationTime, "expirationTime is required; it must not be null");
		Assert.hasText(issuer, "issuer is required; it must not be null or blank");
		Assert.hasText(secret, "secret is required; it must not be null or blank");
	}

	/**
	 * Creates a signed JWT token containing a username and all granted authorities.
	 */
	public String createToken(UserDetails userDetails) {
		log.debug("Creating JWT token for user: [{}]", userDetails.getUsername());

		final String[] authorities = userDetails.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.toArray(String[]::new);

		return JWT.create()
			.withIssuer(issuer)
			.withSubject(userDetails.getUsername())
			.withArrayClaim("authorities", authorities)
			.withExpiresAt(new Date(System.currentTimeMillis() + expirationTime.toMillis()))
			.sign(Algorithm.HMAC512(secret));
	}

	/**
	 * Extracts and decodes the JWT from the request headers (if present).
	 */
	public Optional<DecodedJWT> getDecodedJwt(HttpServletRequest request) {
		log.debug("Extracting JWT token from request");

		final String header = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (header == null) {
			log.debug("No authorization header found in request");
			return Optional.empty();
		}

		final Matcher matcher = tokenPattern.matcher(header);

		if (matcher.matches() == false) {
			log.debug("No bearer token found in authorization header");
			return Optional.empty();
		}

		final String token = matcher.group("token");
		log.debug("Verifying token [{}]", token);

		return Optional.of(JWT.require(Algorithm.HMAC512(secret)).build().verify(token));
	}

}
