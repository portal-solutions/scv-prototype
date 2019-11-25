package ca.gov.portal.scv.api.endpoint.location;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import ca.gov.portal.scv.api.service.InteropService;
import ca.gov.portal.scv.api.service.InteropServiceImpl;

@SpringBootTest
@ActiveProfiles({ "tests" })
@RunWith(SpringRunner.class)
public class LocationsControllerTest {

	@Mock
	private InteropService interopService;

	@Autowired
	Environment environment;

	@Autowired
	InteropServiceImpl interopServiceImpl;

	private LocationsController locationsController;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		this.locationsController = new LocationsController(interopServiceImpl);
	}

	@Test
	public void handleGetLocations() throws Exception {

		// arrange
		final String searchString = environment.getProperty("tests.interop-service.fail-search-string");

		// act
		ResponseEntity<?> responseEntity = this.locationsController.handleGetLocations(searchString);

		// assert
		assertThat(responseEntity).extracting(ResponseEntity::getStatusCode).isEqualTo(HttpStatus.OK);
		assertThat(responseEntity).extracting(ResponseEntity::getBody).isNotNull();
	}

}
