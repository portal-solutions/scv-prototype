package ca.gov.portal.scv.api.service;

import static com.google.common.collect.ImmutableList.toImmutableList;
import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpClientErrorException.BadRequest;
import org.springframework.web.client.HttpClientErrorException.NotFound;
import org.springframework.web.client.RestTemplate;

import ca.gov.portal.scv.api.service.dto.AddLocationRequest;
import ca.gov.portal.scv.api.service.dto.AssociationDateRange;
import ca.gov.portal.scv.api.service.dto.Identification;
import ca.gov.portal.scv.api.service.dto.Location;
import ca.gov.portal.scv.api.service.dto.LocationResponse;
import ca.gov.portal.scv.api.service.dto.OpenApiInfo;
import ca.gov.portal.scv.api.service.dto.OpenApiResponse;
import ca.gov.portal.scv.api.service.dto.Person;
import ca.gov.portal.scv.api.service.dto.PersonLocationAssociation;
import ca.gov.portal.scv.api.service.dto.PersonLocationsResponse;
import ca.gov.portal.scv.api.service.dto.PersonProgramsResponse;
import ca.gov.portal.scv.api.service.dto.PersonResponse;
import ca.gov.portal.scv.api.service.dto.Program;
import ca.gov.portal.scv.api.service.dto.ProgramBenefitRequest;
import ca.gov.portal.scv.api.service.dto.ProgramPersonLocationAssociation;
import ca.gov.portal.scv.api.service.dto.ProgramPersonLocationAssociationRequest;
import ca.gov.portal.scv.api.service.dto.ProgramRequest;
import ca.gov.portal.scv.api.service.dto.ProgramsPersonLocationAssociation;
import ca.gov.portal.scv.api.service.dto.StartDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class InteropServiceImpl implements InteropService {

	@Qualifier("locationApiRestTemplate")
	private final RestTemplate locationApiRestTemplate;

	@Qualifier("personApiRestTemplate")
	private final RestTemplate personApiRestTemplate;

	@Override
	public OpenApiInfo isAvailable() {
		return locationApiRestTemplate.getForObject("/openapi.json", OpenApiResponse.class).getInfo();
	}

	@Override
	public Optional<Location> getLocation(String id) {
		try {
			return Stream.of(locationApiRestTemplate.getForObject("/location/{id}", LocationResponse[].class, id))
					.map(LocationResponse::getLocation).findFirst();
		} catch (final NotFound exception) {
			return Optional.empty();
		}
	}

	@Override
	public List<Location> getLocations(String searchString) {
		try {
			return Stream.of(locationApiRestTemplate.getForObject("/fuzzySearch/{searchString}",
					LocationResponse[].class, searchString)).map(LocationResponse::getLocation)
					.collect(toImmutableList());
		} catch (final BadRequest | NotFound exception) {
			log.debug("Caught BadRequest or NotFound exception while calling fuzzySearch API", exception);
			return emptyList();
		}
	}

	@Override
	public Optional<Person> getPerson(String sin) {
		try {
			return Optional
					.of(personApiRestTemplate.getForObject("/Person?SIN={sin}", PersonResponse.class, sin).getPerson());
		} catch (final BadRequest | NotFound exception) {
			log.debug("Caught BadRequest or NotFound exception while calling person API", exception);
			return Optional.empty();
		}
	}

	@Override
	public List<Program> getPersonPrograms(String id) {
		try {
			return personApiRestTemplate.getForObject("/Person/{id}/Program", PersonProgramsResponse.class, id)
					.getProgramBenefitRequests().stream().map(ProgramBenefitRequest::getProgram).collect(toList());
		} catch (final BadRequest | NotFound exception) {
			log.debug("Caught BadRequest or NotFound exception while calling person/program API", exception);
			return emptyList();
		}
	}

	@Override
	public List<ProgramPersonLocationAssociation> getPersonLocations(String id, String sin) {
		try {
			return personApiRestTemplate
					.getForObject("/Person/{id}/Location?SIN={sin}", PersonLocationsResponse.class, id, sin)
					.getProgramPersonLocationAssociations();
		} catch (final BadRequest | NotFound exception) {
			log.debug("Caught BadRequest or NotFound exception while calling person/location API", exception);
			return emptyList();
		}
	}

	@Override
	public Optional<String> addLocation(String sin, String locationId) {

		final Optional<Person> person = getPerson(sin);
		final Optional<Location> location = getLocation(locationId);

		if (person.isPresent() && location.isPresent()) {
			final String personId = person.get().getOtherIdentification().getId();
			locationId = location.get().getIdentification().getId();

			// check if the location already added to the actual person
			final Optional<ProgramPersonLocationAssociation> programPersonLocationAssociation = getProgramPersonLocationAssociation(
					personId, sin, locationId);

			if (programPersonLocationAssociation.isPresent()) {
				// location already associated to the person
				return Optional.of(programPersonLocationAssociation.get().getPersonLocationAssociation()
						.getIdentification().getId());
			}

			// add location request
			final AssociationDateRange associationDateRange = AssociationDateRange.builder()
					.startDate(StartDate.builder().build()).build();

			final AddLocationRequest addLocationRequest = AddLocationRequest.builder()
					.associationDateRange(associationDateRange).person(person.get()).location(location.get()).build();

			personApiRestTemplate.postForEntity("/Person/{personId}/Location", addLocationRequest, Void.class,
					personId);

			// return new PersonLocationAssociation id
			if (programPersonLocationAssociation.isPresent()) {
				// location already associated to the person
				return Optional.of(getProgramPersonLocationAssociation(personId, sin, locationId).get()
						.getPersonLocationAssociation().getIdentification().getId());
			}
		}

		return Optional.empty();
	}

	@Override
	public void shareLocation(String sin, String locationId, List<String> programIds) {

		final Optional<Person> person = getPerson(sin);
		final Optional<Location> location = getLocation(locationId);

		if (person.isPresent() && location.isPresent()) {
			final String personId = person.get().getOtherIdentification().getId();
			locationId = location.get().getIdentification().getId();

			// check if the location is associated to the person
			final List<ProgramPersonLocationAssociation> programPersonLocationAssociations = getProgramPersonLocationAssociations(
					personId, sin, locationId);

			if (!programPersonLocationAssociations.isEmpty()) {

				// remove programid already present
				programIds.removeIf(programId -> programPersonLocationAssociations.stream()
						.anyMatch(obj -> obj.getProgram().getActivityIdentification().getId().equals(programId)));

				if (!programIds.isEmpty()) {

					// build the post request
					// association date range object
					final AssociationDateRange associationDateRange = AssociationDateRange.builder()
							.startDate(StartDate.builder().build()).build();

					// person object
					// PersonLocationAssociation ID into person
					// DONT ASK ME WHY!?
					final String personLocationAssociationId = programPersonLocationAssociations.get(0)
							.getPersonLocationAssociation().getIdentification().getId();
					final Person personForRequest = Person.builder()
							.otherIdentification(Identification.builder().id(personLocationAssociationId).build())
							.build();
					final PersonLocationAssociation personLocationAssociation = PersonLocationAssociation.builder()
							.person(personForRequest).build();

					// ProgramsPersonLocationAssociation object
					final List<Identification> activityIdentifications = programIds.stream()
							.map(programId -> Identification.builder().id(programId).build())
							.collect(Collectors.toList());

					final ProgramsPersonLocationAssociation programsPersonLocationAssociation = ProgramsPersonLocationAssociation
							.builder().associationDateRange(associationDateRange)
							.program(ProgramRequest.builder().activityIdentifications(activityIdentifications).build())
							.personLocationAssociation(personLocationAssociation).build();

					// ProgramPersonLocationAssociationRequest object
					final ProgramPersonLocationAssociationRequest programPersonLocationAssociationRequest = ProgramPersonLocationAssociationRequest
							.builder().programsPersonLocationAssociation(programsPersonLocationAssociation).build();

					try {
						personApiRestTemplate.postForEntity("​/Person/{personId}/Location/{locationId}",
								programPersonLocationAssociationRequest, Void.class, personId, locationId);
					} catch (final HttpClientErrorException exception) {
						log.debug(
								"Caught BadRequest or NotFound exception while calling ​/Person​/{personId}​/Location​/{locationId}",
								exception);

					} catch (final Exception ex) {
						log.debug(
								"Caught BadRequest or NotFound exception while calling ​/Person​/{personId}​/Location​/{locationId}",
								ex);
					}
				}
			}
		}

	}

	private Optional<ProgramPersonLocationAssociation> getProgramPersonLocationAssociation(String personId, String sin,
			String locationId) {
		return getProgramPersonLocationAssociations(personId, sin, locationId).stream().findFirst();
	}

	private List<ProgramPersonLocationAssociation> getProgramPersonLocationAssociations(String personId, String sin,
			String locationId) {
		return getPersonLocations(personId, sin).stream().filter(
				obj -> obj.getPersonLocationAssociation().getLocation().getIdentification().getId().equals(locationId))
				.collect(Collectors.toList());
	}
}
