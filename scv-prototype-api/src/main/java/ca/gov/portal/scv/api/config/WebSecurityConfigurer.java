package ca.gov.portal.scv.api.config;

import org.springframework.beans.factory.annotation.Autowired;
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
public class WebSecurityConfigurer extends WebSecurityConfigurerAdapter {

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
			.withUser("user").password("{noop}password").roles("API");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		final AuthenticationManager authenticationManager = super.authenticationManager();

		http
			.csrf().disable()
			.addFilter(new JwtAuthenticationFilter(applicationEventPublisher, authenticationManager, jwtResolver))
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http
			.authorizeRequests()
				.antMatchers("/auth").permitAll().and()
			.authorizeRequests()
				.antMatchers("/api/**").authenticated();
	}

}
