package ca.gov.portal.scv.api.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import ca.gov.portal.scv.api.service.dto.Location;
import ca.gov.portal.scv.api.service.dto.Program;

/**
 * Integration test that will test that the interop service.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@SpringBootTest
@ActiveProfiles({ "tests" })
@RunWith(SpringRunner.class)
public class InteropServiceImplIT {

	@Autowired
	Environment environment;

	@Autowired
	InteropServiceImpl interopService;

	@Test
	public void testGetLocations_noResult() {
		// arrange
		final String searchString = environment.getProperty("tests.interop-service.fail-search-string");

		// act
		final List<Location> locations = interopService.getLocations(searchString);

		// assert
		assertThat(locations).isEmpty();
	}

	@Test
	public void testGetLocations_hasResult() {
		// arrange
		final String searchString = environment.getProperty("tests.interop-service.success-search-string");

		// act
		final List<Location> locations = interopService.getLocations(searchString);

		// act
		assertThat(locations).isNotEmpty();
	}

	@Test
	public void testGetPerson_noResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.fail-sin");

		// assert
		assertThat(interopService.getPerson(sin)).isEmpty();
	}

	@Test
	public void testGetPerson_hasResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.valid-sin");

		// assert
		assertThat(interopService.getPerson(sin)).isNotEmpty();
	}

	@Test
	public void testGetPersonPrograms_hasResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.valid-sin");

		// act
		final List<Program> programs = interopService.getPersonPrograms(interopService.getPerson(sin).get().getOtherIdentification().getId());

		// assert
		assertThat(programs).isNotEmpty();
	}

	@Test
	public void testGetPersonLocations_hasResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.valid-sin");

		// act
		final List<Location> Locations = interopService.getPersonLocations(interopService.getPerson(sin).get().getOtherIdentification().getId(), sin);

		// assert
		assertThat(Locations).isNotEmpty();
	}

}
