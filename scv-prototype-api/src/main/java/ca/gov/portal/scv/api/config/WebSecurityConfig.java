package ca.gov.portal.scv.api.config;

import static java.util.Collections.emptyList;
import static org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest.to;
import static org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest.toAnyEndpoint;
import static org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest.toLinks;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import ca.gov.portal.scv.api.security.JwtAuthenticationFilter;
import ca.gov.portal.scv.api.security.JwtResolver;
import lombok.Setter;

/**
 * Application web security configuration.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@ConfigurationProperties("application.config.security")
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired ApplicationEventPublisher applicationEventPublisher;

	@Autowired JwtResolver jwtResolver;

	@Setter List<String> ignoredPaths = emptyList();

	@Bean PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean @Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		final AuthenticationManager authenticationManager = super.authenticationManager();

		http // typical REST stuff
			.cors().and()
			.csrf().disable()
			.addFilter(new JwtAuthenticationFilter(applicationEventPublisher, authenticationManager, jwtResolver))
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http
			.exceptionHandling() // respond with 401 when unauthenticated
				.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));

		http // unprotected resources
			.authorizeRequests()
				.antMatchers("/").permitAll()
				.antMatchers("/auth").permitAll()
				.requestMatchers(toLinks()).permitAll()
				.requestMatchers(to("health", "info")).permitAll()
				.and()
			.authorizeRequests() // springfox/swagger support
				.antMatchers("/webjars/**").permitAll()
				.antMatchers("/*/api-docs/**").permitAll()
				.antMatchers("/swagger-ui.html").permitAll()
				.antMatchers("/swagger-resources/**").permitAll();

		http // protected resources
			.authorizeRequests()
				.antMatchers("/api/**").hasRole("API")
				.requestMatchers(toAnyEndpoint()).hasRole("ACTUATOR");

		http // lock down all other requests
			.authorizeRequests()
				.anyRequest().denyAll();
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		ignoredPaths.forEach((ignoredPath) -> web.ignoring().antMatchers(ignoredPath));
	}

}
