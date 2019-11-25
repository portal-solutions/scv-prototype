package ca.gov.portal.scv.api.service;

import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException.BadRequest;
import org.springframework.web.client.HttpClientErrorException.NotFound;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import ca.gov.portal.scv.api.service.dto.Location;
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
	public List<Location> getLocations(String searchString) {
		try {
			final Location[] results = locationApiRestTemplate.getForObject("/fuzzySearch/{searchString}", Location[].class, searchString);
			return Arrays.asList(results);
		}
		catch (final BadRequest | NotFound exception) {
			log.debug("Caught BadRequest or NotFound exception while calling fuzzySearch API", exception);
			return emptyList();
		}
	}

	@Override
	public Optional<Person> getPerson(String sin) {
		try {
			return Optional.of(personApiRestTemplate.getForObject("/Person?SIN={sin}", PersonResponse.class, sin).getPerson());
		}
		catch (final BadRequest | NotFound exception) {
			log.debug("Caught BadRequest or NotFound exception while calling person API", exception);
			return Optional.empty();
		}
	}

	@Override
	public List<Program> getPersonPrograms(String id) {
		try {
			final List<ProgramBenefitRequest> programBenefitRequests = personApiRestTemplate
				.getForObject("/Person/{id}/Program", PersonProgramsResponse.class, id)
				.getProgramBenefitRequests();
			return programBenefitRequests.stream()
				.map(ProgramBenefitRequest::getProgram)
				.collect(toList());
		}
		catch (final BadRequest | NotFound exception) {
			log.debug("Caught BadRequest or NotFound exception while calling person/program API", exception);
			return emptyList();
		}
	}

	@Override
	public List<Location> getPersonLocations(String id, String sin) {
		try {
			List<ProgramPersonLocationAssociation> programPersonLocationAssociations = personApiRestTemplate
					.getForObject("/Person/{id}/Location?SIN={sin}", PersonLocationsResponse.class, id, sin)
					.getProgramPersonLocationAssociations();

			// select program from the list
			return programPersonLocationAssociations.stream()
				.map(ProgramPersonLocationAssociation::getPersonLocationAssociation)
				.map(PersonLocationAssociation::getLocation)
				.collect(toList());
		}
		catch (final BadRequest | NotFound exception) {
			log.debug("Caught BadRequest or NotFound exception while calling person/location API", exception);
			return emptyList();
		}
	}

}
