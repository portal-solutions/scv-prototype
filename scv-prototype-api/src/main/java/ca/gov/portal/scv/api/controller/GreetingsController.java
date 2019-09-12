package ca.gov.portal.scv.api.controller;

import java.util.Collections;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.gov.portal.scv.api.controller.bean.GreetingBean;

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
		final GreetingBean greetingBean = GreetingBean.builder().message("Hello, world!").build();
		return ResponseEntity.ok(Collections.singleton(greetingBean));
	}

}
