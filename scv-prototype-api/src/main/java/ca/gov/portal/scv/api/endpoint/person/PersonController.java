package ca.gov.portal.scv.api.endpoint.person;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpStatusCodeException;

import ca.gov.portal.scv.api.service.InteropServiceImpl;
import ca.gov.portal.scv.api.service.dto.Location;
import ca.gov.portal.scv.api.service.dto.Person;
import ca.gov.portal.scv.api.service.dto.Program;
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

	private final InteropServiceImpl interopService;

	@GetMapping(path = { "/{sin}" }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public ResponseEntity<?> handleGetPerson(@PathVariable String sin) throws Exception {

		try {
			Person person = interopService.getPerson(sin);

			return person != null ? ResponseEntity.ok(person) : ResponseEntity.notFound().build();

		} catch (HttpStatusCodeException e) {

			HttpStatus httpStatus = e.getStatusCode();
			return ResponseEntity.status(httpStatus).build();
		}

	}

	@GetMapping(path = { "/{sin}/programs" }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public ResponseEntity<?> handleGetPersonPrograms(@PathVariable String sin) throws Exception {

		try {
			Person person = interopService.getPerson(sin);

			if (person == null) {
				return ResponseEntity.notFound().build();
			}

			// get person's programs
			List<Program> programs = interopService.getPersonPrograms(person.getOtherIdentification().getId());

			return programs != null ? ResponseEntity.ok(programs) : ResponseEntity.notFound().build();

		} catch (HttpStatusCodeException e) {

			HttpStatus httpStatus = e.getStatusCode();
			return ResponseEntity.status(httpStatus).build();
		}
	}

	@GetMapping(path = { "/{sin}/locations" }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public ResponseEntity<?> handleGetPersonLocations(@PathVariable String sin) throws Exception {

		try {
			Person person = interopService.getPerson(sin);

			if (person == null) {
				return ResponseEntity.notFound().build();
			}

			// get person's locations
			List<Location> locations = interopService.getPersonLocations(person.getOtherIdentification().getId(), sin);

			return locations != null ? ResponseEntity.ok(locations) : ResponseEntity.notFound().build();

		} catch (HttpStatusCodeException e) {

			HttpStatus httpStatus = e.getStatusCode();
			return ResponseEntity.status(httpStatus).build();
		}
	}
}
