package ca.gov.portal.scv.api.endpoint.auth;

import static java.util.Collections.singletonList;
import static java.util.Collections.singletonMap;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.assertj.core.api.Assertions.assertThatNullPointerException;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import ca.gov.portal.scv.api.security.ApplicationUser;
import ca.gov.portal.scv.api.security.JwtResolver;

/**
 * Tests for the {@link AuthController} class.
 */
public class AuthControllerTests {

	private AuthController authController;

	@Mock
	private ApplicationEventPublisher applicationEventPublisher;

	@Mock
	private JwtResolver jwtResolver;

	@Mock
	private PasswordEncoder passwordEncoder;

	@Mock
	private UserDetailsService userDetailsService;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		this.authController = new AuthController(applicationEventPublisher, jwtResolver, passwordEncoder, userDetailsService);
	}

	@Test
	public void constructor_argumentValidation() {
		assertThatNullPointerException()
			.isThrownBy(() -> new AuthController(null, null, null, null))
			.withMessage("applicationEventPublisher is marked non-null but is null");

		assertThatNullPointerException()
			.isThrownBy(() -> new AuthController(applicationEventPublisher, null, null, null))
			.withMessage("jwtResolver is marked non-null but is null");

		assertThatNullPointerException()
			.isThrownBy(() -> new AuthController(applicationEventPublisher, jwtResolver, null, null))
			.withMessage("passwordEncoder is marked non-null but is null");

		assertThatNullPointerException()
			.isThrownBy(() -> new AuthController(applicationEventPublisher, jwtResolver, passwordEncoder, null))
			.withMessage("userDetailsService is marked non-null but is null");
	}

	@Test
	public void handleAuthRequest_badCredentials_throwsException() {
		final List<GrantedAuthority> grantedAuthorities = singletonList(new SimpleGrantedAuthority("ROLE_USER"));
		final Map<String, String> extendedAttributes = singletonMap("uid", "uid");
		final ApplicationUser applicationUser = new ApplicationUser("username", "password", grantedAuthorities, extendedAttributes);

		when(this.passwordEncoder.matches(anyString(), anyString())).thenReturn(false);
		when(this.userDetailsService.loadUserByUsername(anyString())).thenReturn(applicationUser);

		assertThatExceptionOfType(BadCredentialsException.class)
			.isThrownBy(() -> this.authController.handleAuthRequest(new AuthRequest("username", "password")))
			.withMessage("Username and password do not match");
	}

	@Test
	public void handleAuthRequest_goodCredentials() {
		final List<GrantedAuthority> grantedAuthorities = singletonList(new SimpleGrantedAuthority("ROLE_USER"));
		final Map<String, String> extendedAttributes = singletonMap("uid", "uid");
		final ApplicationUser applicationUser = new ApplicationUser("username", "password", grantedAuthorities, extendedAttributes);

		when(this.jwtResolver.createToken(any())).thenReturn("token");
		when(this.passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
		when(this.userDetailsService.loadUserByUsername(anyString())).thenReturn(applicationUser);

		final ResponseEntity<?> responseEntity = this.authController.handleAuthRequest(new AuthRequest("user", "password"));

		assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat((AuthResponse) responseEntity.getBody()).extracting(AuthResponse::getAccessToken).isEqualTo("token");
		assertThat((AuthResponse) responseEntity.getBody()).extracting(AuthResponse::getUid).isEqualTo("uid");
	}

}
