package ca.gov.portal.scv.api.endpoint.person;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.gov.portal.scv.api.service.InteropService;
import lombok.RequiredArgsConstructor;

/**
 * A basic REST controller that will dispatch .json files (ie: dummy data).
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@RestController
@RequestMapping({ "/api/person" })
@RequiredArgsConstructor
public class PersonController {
	
	private final InteropService interopService;
	
	@GetMapping(path = { "/Person?SIN={sin}" }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public ResponseEntity<?> handleGetPersonBySin(@PathVariable String sin) throws Exception {
		return ResponseEntity.ok(interopService.getPersonBySin(sin));
	}
}
