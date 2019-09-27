package ca.gov.portal.scv.api.config;

import static org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest.to;
import static org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest.toAnyEndpoint;
import static org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest.toLinks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import ca.gov.portal.scv.api.filter.JwtAuthenticationFilter;
import ca.gov.portal.scv.api.security.JwtResolver;

/**
 * Application web security configuration.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Configuration
@ConfigurationProperties("application.security")
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired ApplicationEventPublisher applicationEventPublisher;

	@Autowired JwtResolver jwtResolver;

	@Bean PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean @Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean @Override
	public UserDetailsService userDetailsServiceBean() throws Exception {
		return super.userDetailsServiceBean();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		final PasswordEncoder passwordEncoder = passwordEncoder();

		auth.inMemoryAuthentication()
			.passwordEncoder(passwordEncoder)
			.withUser("actuator").password("{noop}password").roles("ACTUATOR").and()
			.withUser("user@example.com").password("{noop}password").roles("API");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		final AuthenticationManager authenticationManager = super.authenticationManager();

		http // typical REST stuff
			.cors().and()
			.csrf().disable()
			.addFilter(new JwtAuthenticationFilter(applicationEventPublisher, authenticationManager, jwtResolver))
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http // unprotected resources
			.authorizeRequests()
				.antMatchers("/").permitAll()
				.antMatchers("/auth").permitAll()
				.requestMatchers(toLinks()).permitAll()
				.requestMatchers(to(HealthEndpoint.class)).permitAll()
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

}
