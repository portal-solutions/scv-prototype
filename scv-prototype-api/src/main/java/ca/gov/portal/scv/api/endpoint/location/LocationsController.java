package ca.gov.portal.scv.api.endpoint.location;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpStatusCodeException;

import ca.gov.portal.scv.api.service.InteropServiceImpl;

import lombok.RequiredArgsConstructor;

/**
 * A basic REST controller that will dispatch .json files (ie: dummy data).
 *
 * @author Rui Wang (rui.wang@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@RestController
@RequestMapping({ "/api/locations" })
@RequiredArgsConstructor
public class LocationsController {

	private final InteropServiceImpl interopService;

	@GetMapping({ "/fuzzySearch/{searchString}" })
	public ResponseEntity<?> handleGetLocations(@PathVariable String searchString) throws Exception {
		return ResponseEntity.ok(interopService.getLocations(searchString));
	}

}
