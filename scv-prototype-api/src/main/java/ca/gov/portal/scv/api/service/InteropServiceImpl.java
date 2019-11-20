package ca.gov.portal.scv.api.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import ca.gov.portal.scv.api.service.dto.OpenApiInfo;
import ca.gov.portal.scv.api.service.dto.OpenApiResponse;
import ca.gov.portal.scv.api.service.dto.Person;
import ca.gov.portal.scv.api.service.dto.PersonResponse;
import ca.gov.portal.scv.api.service.dto.Location;
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
	public Person getPersonBySin(String sin) {
		return restTemplate.getForObject("https://person.okd.azure.sc-interop.ca/Person?SIN={sin}", PersonResponse.class, sin).getPerson();
	}

}
