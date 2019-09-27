package ca.gov.portal.scv.api.config;

import static java.util.Collections.emptyList;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/**
 * Application MVC configuration.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Slf4j
@Configuration
@ConfigurationProperties("application.web-mvc-config")
public class WebMvcConfig implements WebMvcConfigurer {

	@Setter List<String> corsAllowedOrigins = emptyList();

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		log.info("Configuring MVC cross-origin policy");

		if (corsAllowedOrigins.isEmpty()) {
			log.warn("corsAllowedOrigins is empty");
			log.warn("access to this web service will be restricted to same-origin");
		}

		registry.addMapping("/auth").allowedOrigins(corsAllowedOrigins.toArray(new String[0]));
		registry.addMapping("/api/**").allowedOrigins(corsAllowedOrigins.toArray(new String[0]));
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addRedirectViewController("/", "/swagger-ui.html");
	}

}
