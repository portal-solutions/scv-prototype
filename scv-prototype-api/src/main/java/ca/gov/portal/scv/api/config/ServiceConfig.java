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

	@Autowired InteropProperties interopConfig;

	@Autowired RestTemplateBuilder restTemplateBuilder;

	@Bean RestTemplate restTemplate() {
		final HttpClientBuilder httpClientBuilder = HttpClients.custom();

		if (StringUtils.hasText(interopConfig.getProxyHost())) {
			httpClientBuilder.setProxy(new HttpHost(interopConfig.getProxyHost(), interopConfig.getProxyPort()));
		}

		return restTemplateBuilder
			.requestFactory(() -> new HttpComponentsClientHttpRequestFactory(httpClientBuilder.build()))
			.rootUri(interopConfig.getBaseUri())
			.build();
	}

}

@Data
@Configuration
@SuppressWarnings({ "serial" })
@ConfigurationProperties("application.config.service.interop")
class InteropProperties implements Serializable {

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
