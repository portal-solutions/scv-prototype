package ca.gov.portal.scv.api.controller;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.gov.portal.scv.api.controller.bean.AuthenticationBean;
import ca.gov.portal.scv.api.controller.bean.AuthorizationTokenBean;
import ca.gov.portal.scv.api.security.JwtResolver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Simple authorization controller that accepts a user object and
 * returns a JWT token if authorization is successful.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping({ "/auth" })
@ConfigurationProperties("application.controller.authorization-controller")
public class AuthorizationController {

	@NonNull
	private final ApplicationEventPublisher applicationEventPublisher;

	@NonNull
	private final JwtResolver jwtResolver;

	@NonNull
	private final PasswordEncoder passwordEncoder;

	@NonNull
	private final UserDetailsService userDetailsService;

	@PostMapping
	public ResponseEntity<?> handleAuthRequest(@Validated @RequestBody AuthenticationBean authenticationBean) {
		log.debug("Incoming authentication request for user: [{}]", authenticationBean.getUsername());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationBean.getUsername());

		if (passwordEncoder.matches(authenticationBean.getPassword(), userDetails.getPassword()) == false) {
			throw new BadCredentialsException("Username and password do not match");
		}

		final Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities());
		applicationEventPublisher.publishEvent(new AuthenticationSuccessEvent(authentication));

		log.debug("User [{}] has successfully authenticated", authenticationBean.getUsername());
		return ResponseEntity.ok(new AuthorizationTokenBean(jwtResolver.createToken(userDetails)));
	}

}
