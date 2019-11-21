package ca.gov.portal.scv.api.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import ca.gov.portal.scv.api.service.dto.OpenApiInfo;
import ca.gov.portal.scv.api.service.dto.OpenApiResponse;
import ca.gov.portal.scv.api.service.dto.PersonResponse;
import ca.gov.portal.scv.api.service.dto.Location;
import ca.gov.portal.scv.api.service.dto.Person;
import ca.gov.portal.scv.api.service.dto.PersonLocationsResponse;
import ca.gov.portal.scv.api.service.dto.PersonProgramsResponse;
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

	private final RestTemplate restTemplate;

	@Override
	public OpenApiInfo isAvailable() {
		return restTemplate.getForObject("/openapi.json", OpenApiResponse.class).getInfo();
	}

	@Override
	public List<Location> getLocations(String searchString) {
		return Arrays.asList(restTemplate.getForObject("/fuzzySearch/{searchString}", Location[].class, searchString));
	}

	@Override
	public Person getPerson(String sin) {

		try {
			return restTemplate
					.getForObject("https://person.okd.azure.sc-interop.ca/Person?SIN={sin}", PersonResponse.class, sin)
					.getPerson();
		} catch (HttpStatusCodeException e) {

			HttpStatus statusCode = e.getStatusCode();

			if (statusCode != HttpStatus.BAD_REQUEST && statusCode != HttpStatus.NOT_FOUND) {
				throw e;
			}
		}

		return null;
	}

	@Override
	public List<Program> getPersonPrograms(UUID id) {

		try {
			List<ProgramBenefitRequest> programBenefitRequests = restTemplate
					.getForObject("https://person.okd.azure.sc-interop.ca/Person/{id}/Program",
							PersonProgramsResponse.class, id)
					.getProgramBenefitRequests();

			// select program from the list
			return programBenefitRequests.stream().map((programBenefitRequest) -> programBenefitRequest.getProgram())
					.collect(Collectors.toList());

		} catch (HttpStatusCodeException e) {

			HttpStatus statusCode = e.getStatusCode();

			if (statusCode != HttpStatus.BAD_REQUEST && statusCode != HttpStatus.NOT_FOUND) {
				throw e;
			}
		}

		return new ArrayList<Program>();
	}

	@Override
	public List<Location> getPersonLocations(UUID id, String sin) {

		try {
			List<ProgramPersonLocationAssociation> programPersonLocationAssociations = restTemplate
					.getForObject("https://person.okd.azure.sc-interop.ca/Person/{id}/Location?SIN={sin}",
							PersonLocationsResponse.class, id, sin)
					.getProgramPersonLocationAssociations();

			// select program from the list
			return programPersonLocationAssociations.stream()
					.map((programPersonLocationAssociation) -> programPersonLocationAssociation
							.getPersonLocationAssociation().getLocation())
					.collect(Collectors.toList());

		} catch (HttpStatusCodeException e) {

			HttpStatus statusCode = e.getStatusCode();

			if (statusCode != HttpStatus.BAD_REQUEST && statusCode != HttpStatus.NOT_FOUND) {
				throw e;
			}
		}

		return new ArrayList<Location>();
	}

}
