package ca.gov.portal.scv.api.filter;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.Assert;

import ca.gov.portal.scv.api.security.JwtResolver;
import lombok.extern.slf4j.Slf4j;

/**
 * A filter that processes JWT bearer authorization headers, putting
 * the results into the SecurityContextHolder upon successful authentication.
 * <p>
 * If no JWT bearer headers are found, this filter will delegate
 * authentication to the BasicAuthenticationFilter.
 * <p>
 * Note: this filter should not be managed by spring (ie: using @Bean)
 * to avoid having spring place it in the default servlet filter chain.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Slf4j
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

	private final ApplicationEventPublisher applicationEventPublisher;

	private final JwtResolver jwtResolver;

	public JwtAuthenticationFilter(ApplicationEventPublisher applicationEventPublisher, AuthenticationManager authenticationManager, JwtResolver jwtResolver) {
		super(authenticationManager);

		Assert.notNull(applicationEventPublisher, "applicationEventPublisher is required; it must not be null");
		this.applicationEventPublisher = applicationEventPublisher;

		Assert.notNull(jwtResolver, "jwtResolver is required; it must not be null");
		this.jwtResolver = jwtResolver;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		jwtResolver.getDecodedJwt(request).ifPresent((decodedJwt) -> {
			log.debug("JWT token for user [{}] found in authorization header; authentication success", decodedJwt.getSubject());

			final List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(decodedJwt.getClaim("authorities").asArray(String.class));
			final Authentication authentication = new UsernamePasswordAuthenticationToken(decodedJwt.getSubject(), null, authorities);
			SecurityContextHolder.getContext().setAuthentication(authentication);

			applicationEventPublisher.publishEvent(new AuthenticationSuccessEvent(authentication));
		});

		super.doFilterInternal(request, response, filterChain);
	}

}
