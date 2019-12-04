package ca.gov.portal.scv.api.endpoint.person;

import static com.google.common.collect.ImmutableList.toImmutableList;
import static java.util.Collections.singletonMap;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.http.ResponseEntity.status;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.gov.portal.scv.api.endpoint.model.PersonLocationProgramsMapper;
import ca.gov.portal.scv.api.service.InteropService;
import ca.gov.portal.scv.api.service.dto.Identification;
import ca.gov.portal.scv.api.service.dto.Location;
import ca.gov.portal.scv.api.service.dto.Person;
import ca.gov.portal.scv.api.service.dto.PersonLocationAssociation;
import ca.gov.portal.scv.api.service.dto.ProgramPersonLocationAssociation;
import lombok.RequiredArgsConstructor;

/**
 * A basic REST controller that will dispatch .json files (ie: dummy data).
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@RestController
@RequiredArgsConstructor
@RequestMapping({ "/api/persons" })
public class PersonsController {

	private final InteropService interopService;

	private final PersonLocationProgramsMapper personLocationProgramsMapper;

	@GetMapping({ "/{sin}" })
	public ResponseEntity<?> handleGetPerson(@PathVariable String sin) throws Exception {
		return ResponseEntity.of(interopService.getPerson(sin));
	}

	@GetMapping({ "/{sin}/programs" })
	public ResponseEntity<?> handleGetPersonPrograms(@PathVariable String sin) throws Exception {
		final Optional<Person> person = interopService.getPerson(sin);

		return person.isPresent() ? ok(interopService.getPersonPrograms(person.get().getOtherIdentification().getId()))
				: status(NOT_FOUND).body(singletonMap("message", "No program found for user with sin=" + sin));
	}

	@GetMapping({ "/{sin}/locations" })
	public ResponseEntity<?> handleGetPersonLocations(@PathVariable String sin) throws Exception {
		final Optional<Person> person = interopService.getPerson(sin);

		if (person.isPresent()) {

			List<ProgramPersonLocationAssociation> programPersonLocationAssociations = interopService
					.getPersonLocations(person.get().getOtherIdentification().getId(), sin);

			List<Location> locations = programPersonLocationAssociations.stream()
					.map(ProgramPersonLocationAssociation::getPersonLocationAssociation)
					.map(PersonLocationAssociation::getLocation).map(Location::getIdentification)
					.map(Identification::getId).map(locationId -> interopService.getLocation(locationId).get())
					.collect(toImmutableList());

			return ok(personLocationProgramsMapper.map(programPersonLocationAssociations, locations));
		} else {
			return status(NOT_FOUND).body(singletonMap("message", "No location found for user with sin=" + sin));
		}
	}

}
