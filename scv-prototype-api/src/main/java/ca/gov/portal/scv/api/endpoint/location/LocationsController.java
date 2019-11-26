package ca.gov.portal.scv.api.endpoint.location;

import static org.springframework.http.ResponseEntity.ok;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.gov.portal.scv.api.service.InteropService;

import lombok.RequiredArgsConstructor;

/**
 * A REST controller that provides a 'location' API to consumers.
 *
 * @author Rui Wang (rui.wang@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@RestController
@RequiredArgsConstructor
@RequestMapping({ "/api/locations" })
public class LocationsController {

	private final InteropService interopService;

	private final LocationMapper locationMapper;

	@GetMapping
	public ResponseEntity<?> handleGetAllLocations() {
		throw new UnsupportedOperationException("not yet implemented");
	}

	@GetMapping(params = { "q" })
	public ResponseEntity<?> handleGetLocationsFiltered(@RequestParam("q") String searchString) {
		return ok(locationMapper.map(interopService.getLocations(searchString)));
	}

}
