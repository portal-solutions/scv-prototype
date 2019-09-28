package ca.gov.portal.scv.api.endpoint.greeting;

import java.io.Serializable;
import java.util.Collections;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.Builder;
import lombok.Value;

/**
 * Simple controller that returns a single greeting.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@RestController
@RequestMapping({ "/api/greetings" })
@ConfigurationProperties("application.controller.greetings-controller")
public class GreetingsController {

	@GetMapping
	public ResponseEntity<?> getAllGreetings() {
		return ResponseEntity.ok(Collections.singleton(GreetingResponse.builder()
			.message("Hello, world!")
			.build()));
	}

}

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
class GreetingResponse implements Serializable {

	/**
	 * The greeting's message. Examples are 'Hello, world!' or
	 * 'How many people work in the government? About half.'
	 */
	private String message;

}
