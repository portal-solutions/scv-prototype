package ca.gov.portal.scv.api.config;

import java.io.Serializable;

import javax.annotation.PostConstruct;

import org.apache.http.HttpHost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import lombok.Data;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Configuration
@ConfigurationProperties("application.config.service")
public class ServiceConfig {

	@Autowired LocationApiProperties locationApiConfig;

	@Autowired PersonApiProperties personApiConfig;

	@Autowired RestTemplateBuilder restTemplateBuilder;

	@Bean RestTemplate locationApiRestTemplate() {
		final HttpClientBuilder httpClientBuilder = HttpClients.custom();

		if (StringUtils.hasText(locationApiConfig.getProxyHost())) {
			httpClientBuilder.setProxy(new HttpHost(locationApiConfig.getProxyHost(), locationApiConfig.getProxyPort()));
		}

		return restTemplateBuilder
			.requestFactory(() -> new HttpComponentsClientHttpRequestFactory(httpClientBuilder.build()))
			.rootUri(locationApiConfig.getBaseUri())
			.build();
	}

	@Bean RestTemplate personApiRestTemplate() {
		final HttpClientBuilder httpClientBuilder = HttpClients.custom();

		if (StringUtils.hasText(personApiConfig.getProxyHost())) {
			httpClientBuilder.setProxy(new HttpHost(personApiConfig.getProxyHost(), personApiConfig.getProxyPort()));
		}

		return restTemplateBuilder
			.requestFactory(() -> new HttpComponentsClientHttpRequestFactory(httpClientBuilder.build()))
			.rootUri(personApiConfig.getBaseUri())
			.build();
	}

}

@Configuration
@SuppressWarnings({ "serial" })
@ConfigurationProperties("application.config.service.interop.location")
class LocationApiProperties extends InteropProperties {}

@Configuration
@SuppressWarnings({ "serial" })
@ConfigurationProperties("application.config.service.interop.person")
class PersonApiProperties extends InteropProperties {}

@Data
@SuppressWarnings({ "serial" })
abstract class InteropProperties implements Serializable {

	private String baseUri;

	private String proxyHost;

	private Integer proxyPort;

	@PostConstruct
	public void postConstruct() {
		Assert.hasText(baseUri, "baseUri is required; it must not be null or blank");

		if (StringUtils.hasText(proxyHost)) {
			Assert.notNull(proxyPort, "proxyPort is required; it must not be null");
		}

		if (proxyPort != null) {
			Assert.hasText(proxyHost, "proxyHost is required; it must not be null or blank");
		}
	}

}
