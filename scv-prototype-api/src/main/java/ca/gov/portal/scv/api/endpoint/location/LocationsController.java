
package ca.gov.portal.scv.api.endpoint.location;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import ca.gov.portal.scv.api.service.InteropService;

/**
 * A basic REST controller that will dispatch .json files (ie: dummy data).
 *
 * @author Rui Wang (rui.wang@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@RequiredArgsConstructor
@RestController
@RequestMapping({ "/api/locationss" })
public class LocationsController {

	private final InteropService interopService;

	@GetMapping(path = { "/fuzzySearch/{searchString}" }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public ResponseEntity<?> handleGetLocations(@PathVariable String searchString) throws Exception {
		return ResponseEntity.ok(interopService.getLocations(searchString));
	}
}
