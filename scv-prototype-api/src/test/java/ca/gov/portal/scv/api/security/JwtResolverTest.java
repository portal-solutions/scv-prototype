package ca.gov.portal.scv.api.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatIllegalArgumentException;
import static org.assertj.core.api.Assertions.assertThatNullPointerException;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.Duration;

import javax.servlet.http.HttpServletRequest;

import org.junit.Before;
import org.junit.Test;
import org.springframework.security.core.userdetails.UserDetails;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

/**
 * Test for {@link JwtResolver}.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
public class JwtResolverTest {

	private JwtResolver jwtResolver;

	@Before
	public void setUp() throws Exception {
		this.jwtResolver = new JwtResolver();
		this.jwtResolver.setExpirationTime(Duration.ZERO);
		this.jwtResolver.setIssuer("issuer");
		this.jwtResolver.setSecret("secret");
	}

	@Test
	public void afterPropertiesSet_fieldValidation() {
		assertThatIllegalArgumentException()
			.isThrownBy(() -> new JwtResolver().afterPropertiesSet())
			.withMessage("expirationTime is required; it must not be null");

		assertThatIllegalArgumentException()
			.isThrownBy(() -> {
				final JwtResolver jwtResolver = new JwtResolver();
				jwtResolver.setExpirationTime(Duration.ZERO);
				jwtResolver.afterPropertiesSet();
			})
			.withMessage("issuer is required; it must not be null or blank");

		assertThatIllegalArgumentException()
		.isThrownBy(() -> {
			final JwtResolver jwtResolver = new JwtResolver();
			jwtResolver.setExpirationTime(Duration.ZERO);
			jwtResolver.setIssuer("issuer");
			jwtResolver.afterPropertiesSet();
		})
		.withMessage("secret is required; it must not be null or blank");
	}

	@Test
	public void testSetters_fieldValidation() {
		assertThatNullPointerException()
			.isThrownBy(() -> new JwtResolver().setExpirationTime(null))
			.withMessage("expirationTime is marked non-null but is null");

		assertThatNullPointerException()
			.isThrownBy(() -> new JwtResolver().setIssuer(null))
			.withMessage("issuer is marked non-null but is null");

		assertThatNullPointerException()
			.isThrownBy(() -> new JwtResolver().setSecret(null))
			.withMessage("secret is marked non-null but is null");
	}

	@Test
	public void createToken() {
		final UserDetails userDetails = mock(UserDetails.class);
		final String token = this.jwtResolver.createToken(userDetails);
		assertThat(token).isNotNull();
	}

	@Test
	public void getDecodedJwt_nullHeader() {
		final HttpServletRequest request = mock(HttpServletRequest.class);
		this.jwtResolver.getDecodedJwt(request);
		assertThat(this.jwtResolver.getDecodedJwt(request)).isEmpty();
	}

	@Test
	public void getDecodedJwt_noMatch() {
		final HttpServletRequest request = mock(HttpServletRequest.class);
		when(request.getHeader(anyString())).thenReturn("something that isn't Bearer XXXX");
		assertThat(this.jwtResolver.getDecodedJwt(request)).isEmpty();
	}

	@Test
	public void getDecodedJwt_invalidToken() {
		final HttpServletRequest request = mock(HttpServletRequest.class);
		when(request.getHeader(anyString())).thenReturn("Bearer foo");
		assertThat(this.jwtResolver.getDecodedJwt(request)).isEmpty();
	}

	@Test
	public void getDecodedJwt_validToken() {
		final String token = JWT.create().sign(Algorithm.HMAC512("secret"));
		final HttpServletRequest request = mock(HttpServletRequest.class);
		when(request.getHeader(anyString())).thenReturn("Bearer " + token);
		assertThat(this.jwtResolver.getDecodedJwt(request)).isNotNull();
	}

}
