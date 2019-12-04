package ca.gov.portal.scv.api.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.Arrays;
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
import ca.gov.portal.scv.api.service.dto.ProgramPersonLocationAssociation;
import ca.gov.portal.scv.api.service.dto.ShareLocationByProgramRequest;
import ca.gov.portal.scv.api.service.dto.ShareLocationRequest;

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
	public void testShareLocation_hasResult() throws Throwable {
		// arrange
		final String sin = environment.getProperty("tests.interop-service.person.valid-sin");
		final String personId = interopService.getPerson(sin).get().getOtherIdentification().getId();
		final String locationId = "4049220833";
		final LocalDate startDate = LocalDate.of(2019, 10, 30);
		
		final ShareLocationRequest shareLocationRequest = ShareLocationRequest.builder().locationId("4049220833").build();
		
		
		// act
		interopService.shareLocation(personId, shareLocationRequest);

		// assert
		//assertThat(personLocationAssociation1).hasNoNullFieldsOrProperties();
	}

	@Test
	public void testShareLocationByProgram_hasResult() throws Throwable {
		
		final List<String> programIds = Arrays.asList("2");

		
		final String sin = "800019366";
		
		final String personId = "ef075b8b-656b-4ffa-a140-95f9bdeb4e25";

							
		ShareLocationByProgramRequest shareLocationByProgramRequest = ShareLocationByProgramRequest.builder()
					.locationId("4034556993").programIds(programIds).sin(sin).build();
			
		
		// act
		interopService.shareLocationByProgram(personId, "4034556993", shareLocationByProgramRequest);

		// assert
		//assertThat(personLocationAssociation1).hasNoNullFieldsOrProperties();
	}

}
