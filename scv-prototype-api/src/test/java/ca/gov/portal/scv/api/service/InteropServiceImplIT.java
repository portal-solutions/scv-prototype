package ca.gov.portal.scv.api.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.stream.Collectors;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import ca.gov.portal.scv.api.service.dto.Identification;
import ca.gov.portal.scv.api.service.dto.Location;
import ca.gov.portal.scv.api.service.dto.Program;
import ca.gov.portal.scv.api.service.dto.ProgramPersonLocationAssociation;

/**
 * Integration test that will test that the interop service.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @author Sébastien Comeau (sebastien.comeau@hrsdc-rhdcc.gc.ca)
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
		final String searchString = environment.getProperty("tests.interop-service.location.fail-search-string");

		// act
		final List<Location> locations = interopService.getLocations(searchString);

		// assert
		assertThat(locations).isEmpty();
	}

	@Test
	public void testGetLocations_hasResult() {
		// arrange
		final String searchString = environment.getProperty("tests.interop-service.location.success-search-string");

		// act
		final List<Location> locations = interopService.getLocations(searchString);

		// act
		assertThat(locations).isNotEmpty();
	}

	@Test
	public void testGetPerson_noResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.person.fail-sin");

		// assert
		assertThat(interopService.getPerson(sin)).isEmpty();
	}

	@Test
	public void testGetPerson_hasResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.person.valid-sin");

		// assert
		assertThat(interopService.getPerson(sin)).isNotEmpty();
	}

	@Test
	public void testGetPersonPrograms_hasResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.person.valid-sin");

		// act
		final List<Program> programs = interopService
				.getPersonPrograms(interopService.getPerson(sin).get().getOtherIdentification().getId());

		// assert
		assertThat(programs).isNotEmpty();
	}

	@Test
	public void testGetPersonLocations_hasResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.person.valid-sin");

		// act
		final List<ProgramPersonLocationAssociation> programPersonLocationAssociations = interopService
				.getPersonLocations(interopService.getPerson(sin).get().getOtherIdentification().getId(), sin);

		// assert
		assertThat(programPersonLocationAssociations).isNotEmpty();
	}

	@Test
	public void testAddLocation_hasResult() {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.person.valid-sin");
		final String searchString = environment.getProperty("tests.interop-service.location.success-search-string");
		final String locationId = interopService.getLocations(searchString).stream().findFirst().get()
				.getIdentification().getId();

		// assert
		assertThat(interopService.addLocation(sin, locationId)).isNotEmpty();
	}

	@Test
	public void testShareLocationByProgram_hasResult() throws Throwable {

		// arrange
		final String sin = environment.getProperty("tests.interop-service.person.valid-sin");
		final String personId = interopService.getPerson(sin).get().getOtherIdentification().getId();
		final String searchString = environment.getProperty("tests.interop-service.location.success-search-string");
		final String locationId = interopService.getLocations(searchString).stream().findFirst().get()
				.getIdentification().getId();
		final List<String> programid = interopService.getPersonPrograms(personId).stream()
				.map(Program::getActivityIdentification).map(Identification::getId).collect(Collectors.toList());

		// assert
		assertThat(interopService.shareLocation(sin, locationId, programid)).isTrue();
	}

}
