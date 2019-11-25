package ca.gov.portal.scv.api.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import ca.gov.portal.scv.api.service.dto.Location;
import ca.gov.portal.scv.api.service.dto.OpenApiInfo;
import ca.gov.portal.scv.api.service.dto.OpenApiResponse;
import ca.gov.portal.scv.api.service.dto.Person;
import ca.gov.portal.scv.api.service.dto.PersonLocationsResponse;
import ca.gov.portal.scv.api.service.dto.PersonProgramsResponse;
import ca.gov.portal.scv.api.service.dto.PersonResponse;
import ca.gov.portal.scv.api.service.dto.Program;
import ca.gov.portal.scv.api.service.dto.ProgramBenefitRequest;
import ca.gov.portal.scv.api.service.dto.ProgramPersonLocationAssociation;
import lombok.RequiredArgsConstructor;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
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
			return Arrays
					.asList(locationApiRestTemplate.getForObject("/fuzzySearch/{searchString}", Location[].class, searchString));
		} catch (HttpStatusCodeException e) {

			HttpStatus httpStatus = e.getStatusCode();

			if (httpStatus == HttpStatus.BAD_REQUEST || httpStatus == HttpStatus.NOT_FOUND) {
				return null;
			}

			throw e;
		}

	}

	@Override
	public Person getPerson(String sin) {

		try {
			return personApiRestTemplate.getForObject("/Person?SIN={sin}", PersonResponse.class, sin).getPerson();
		} catch (HttpStatusCodeException e) {

			HttpStatus httpStatus = e.getStatusCode();

			if (httpStatus == HttpStatus.BAD_REQUEST || httpStatus == HttpStatus.NOT_FOUND) {
				return null;
			}

			throw e;
		}
	}

	@Override
	public List<Program> getPersonPrograms(String id) {

		try {
			List<ProgramBenefitRequest> programBenefitRequests = personApiRestTemplate
				.getForObject("/Person/{id}/Program", PersonProgramsResponse.class, id)
				.getProgramBenefitRequests();

			// select program from the list
			return programBenefitRequests.stream().map((programBenefitRequest) -> programBenefitRequest.getProgram())
					.collect(Collectors.toList());

		} catch (HttpStatusCodeException e) {

			HttpStatus httpStatus = e.getStatusCode();

			if (httpStatus == HttpStatus.BAD_REQUEST || httpStatus == HttpStatus.NOT_FOUND) {
				return null;
			}

			throw e;
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
					.map((programPersonLocationAssociation) -> programPersonLocationAssociation
							.getPersonLocationAssociation().getLocation())
					.collect(Collectors.toList());

		} catch (HttpStatusCodeException e) {

			HttpStatus httpStatus = e.getStatusCode();

			if (httpStatus == HttpStatus.BAD_REQUEST || httpStatus == HttpStatus.NOT_FOUND) {
				return null;
			}

			throw e;
		}
	}

}
