package ca.gov.portal.scv.api.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatIllegalArgumentException;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.context.SecurityContextHolder;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

/**
 * Tests for {@link JwtAuthFilter}.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
public class JwtAuthFilterTests {

	private JwtAuthFilter jwtAuthFilter;

	@Mock
	private ApplicationEventPublisher applicationEventPublisher;

	@Mock
	private AuthenticationManager authenticationManager;

	@Mock
	private JwtResolver jwtResolver;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		this.jwtAuthFilter = new JwtAuthFilter(applicationEventPublisher, authenticationManager, jwtResolver);
	}

	@Test
	public void constructor_argumentValidation() {
		assertThatIllegalArgumentException()
			.isThrownBy(() -> new JwtAuthFilter(null, authenticationManager, null))
			.withMessage("applicationEventPublisher is required; it must not be null");

		assertThatIllegalArgumentException()
			.isThrownBy(() -> new JwtAuthFilter(applicationEventPublisher, authenticationManager, null))
			.withMessage("jwtResolver is required; it must not be null");
	}

	@Test
	public void doFilterInternal_noJwt_callsSuper() throws Exception {
		final FilterChain filterChain = mock(FilterChain.class);
		final HttpServletRequest request = mock(HttpServletRequest.class);

		when(this.jwtResolver.getDecodedJwt(any())).thenReturn(Optional.empty());
		when(request.getHeader(anyString())).thenReturn(null);

		this.jwtAuthFilter.doFilterInternal(request, null, filterChain);
		verify(filterChain).doFilter(any(), any());
	}

	@Test
	public void doFilterInternal_hasJwt() throws Exception {
		final Claim claim = mock(Claim.class);
		final DecodedJWT decodedJwt = mock(DecodedJWT.class);
		final FilterChain filterChain = mock(FilterChain.class);

		when(claim.asArray(any())).thenReturn(new String[0]);
		when(decodedJwt.getClaim("authorities")).thenReturn(claim);
		when(decodedJwt.getSubject()).thenReturn("subject");
		when(this.jwtResolver.getDecodedJwt(any())).thenReturn(Optional.of(decodedJwt));

		this.jwtAuthFilter.doFilterInternal(null, null, filterChain);

		assertThat(SecurityContextHolder.getContext().getAuthentication().getName()).isEqualTo("subject");
		verify(this.applicationEventPublisher).publishEvent(any(AuthenticationSuccessEvent.class));
		verify(filterChain).doFilter(any(), any());
	}

}
