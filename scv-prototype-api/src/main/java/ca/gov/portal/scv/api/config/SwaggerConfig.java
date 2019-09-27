package ca.gov.portal.scv.api.config;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.BasicAuth;
import springfox.documentation.service.Contact;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

	@Autowired Environment environment;

	@Bean Docket docket() {
		final ApiInfo apiInfo = new ApiInfoBuilder()
			.title("Single Client View API Documentation (v1)")
			.description("This document describes the key areas where developers typically engage with the Single Client View platform.")
			.contact(new Contact("Portal Solutions", null, null))
			.version("v1/" + environment.getProperty("application.build-version"))
			.build();

		final BasicAuth basicAuth = new BasicAuth("scv-vcu");
		final SecurityReference securityReference = new SecurityReference("scv-vcu", new AuthorizationScope[] {});
		final SecurityContext securityContext = new SecurityContext(Collections.singletonList(securityReference), PathSelectors.ant("/api/**"));

		return new Docket(DocumentationType.SWAGGER_2)
			.apiInfo(apiInfo)
			.groupName("API version 1")
			.securitySchemes(Collections.singletonList(basicAuth)).securityContexts(Collections.singletonList(securityContext))
			.select().apis(RequestHandlerSelectors.basePackage("ca.gov.portal.scv.api.controller"))
			.build();
	}

}
