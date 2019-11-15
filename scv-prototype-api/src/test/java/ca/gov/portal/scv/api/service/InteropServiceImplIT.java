package ca.gov.portal.scv.api.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.UUID;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import ca.gov.portal.scv.api.service.dto.Location;
import ca.gov.portal.scv.api.service.dto.Person;
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
		List<Location> locations = interopService.getLocations(searchString);

		// assert
		assertThat(locations).isEmpty();
	}

	@Test
	public void testGetLocations_hasResult() {
		// arrange
		final String searchString = environment.getProperty("tests.interop-service.success-search-string");

		// act
		List<Location> locations = interopService.getLocations(searchString);

		// act
		assertThat(locations).isNotEmpty();
	}

	@Test
	public void testGetPerson_noResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.fail-sin");

		// act
		Person person = interopService.getPerson(sin);

		// assert
		assertThat(person).isNull();
	}

	@Test
	public void testGetPerson_hasResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.valid-sin");

		// act
		Person person = interopService.getPerson(sin);

		// assert
		assertThat(person).isNotNull();
	}

	@Test
	public void testGetPersonPrograms_hasResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.valid-sin");
		Person person = interopService.getPerson(sin);
		UUID id = UUID.fromString(person.getOtherIdentification().getId());

		// act
		List<Program> programs = interopService.getPersonPrograms(id);

		// assert
		assertThat(programs).isNotEmpty();
	}

	@Test
	public void testGetPersonLocations_hasResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.valid-sin");
		Person person = interopService.getPerson(sin);
		UUID id = UUID.fromString(person.getOtherIdentification().getId());

		// act
		List<Location> Locations = interopService.getPersonLocations(id, sin);

		// assert
		assertThat(Locations).isNotEmpty();
	}
}
