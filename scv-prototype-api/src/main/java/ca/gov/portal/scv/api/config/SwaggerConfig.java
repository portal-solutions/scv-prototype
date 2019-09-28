package ca.gov.portal.scv.api.config;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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
@ConfigurationProperties("application.config.swagger")
public class SwaggerConfig {

	@Autowired GitProperties gitProperties;

	@Bean Docket docket() {
		final ApiInfo apiInfo = new ApiInfoBuilder()
			.title("Single Client View API Documentation (v1)")
			.description("This document describes the key areas where developers typically engage with the Single Client View platform.")
			.contact(new Contact("Portal Solutions", null, null))
			.version("v1/" + gitProperties.get("build.version"))
			.build();

		final BasicAuth basicAuth = new BasicAuth("scv-vcu");
		final SecurityReference securityReference = new SecurityReference("scv-vcu", new AuthorizationScope[0]);
		final SecurityContext securityContext = new SecurityContext(Collections.singletonList(securityReference), PathSelectors.ant("/api/**"));

		return new Docket(DocumentationType.SWAGGER_2)
			.apiInfo(apiInfo)
			.groupName("API version 1")
			.securityContexts(Collections.singletonList(securityContext))
			.securitySchemes(Collections.singletonList(basicAuth))
			.select().apis(RequestHandlerSelectors.basePackage("ca.gov.portal.scv.api.endpoint"))
			.build();
	}

}
