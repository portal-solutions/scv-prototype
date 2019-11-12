package ca.gov.portal.scv.api.actuate;

import org.springframework.boot.actuate.health.AbstractHealthIndicator;
import org.springframework.boot.actuate.health.Health.Builder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

import ca.gov.portal.scv.api.service.InteropService;
import ca.gov.portal.scv.api.service.dto.PingResponse;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Component
@RequiredArgsConstructor
@ConfigurationProperties("application.config.service.interop")
public class InteropHealthIndicator extends AbstractHealthIndicator {

	private final InteropService interopService;

	@Setter
	private String baseUri;

	@Override
	protected void doHealthCheck(Builder builder) throws Exception {
		final StopWatch stopWatch = new StopWatch();

		try {
			stopWatch.start();

			final PingResponse pingResponse = interopService.checkAvailability();
			builder.up().withDetail("response", pingResponse);
		}
		finally {
			stopWatch.stop();

			builder
				.withDetail("baseUri", baseUri)
				.withDetail("responseTime", stopWatch.getTotalTimeMillis() + "ms");
		}
	}

}
