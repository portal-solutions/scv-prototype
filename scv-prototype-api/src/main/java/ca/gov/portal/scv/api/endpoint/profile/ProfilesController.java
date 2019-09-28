package ca.gov.portal.scv.api.endpoint.profile;

import java.io.InputStreamReader;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * A basic REST controller that will dispatch .json files (ie: dummy data).
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@RestController
@RequestMapping({ "/api/profiles" })
@ConfigurationProperties("application.profiles-controller")
public class ProfilesController {

	private final Resource resource = new ClassPathResource("/dummy-data/profile.json");

	@GetMapping(path = { "/{id}" }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public ResponseEntity<?> handleGetProfile(@PathVariable String id) throws Exception {
		return ResponseEntity.ok(FileCopyUtils.copyToString(new InputStreamReader(resource.getInputStream())));
	}

}
