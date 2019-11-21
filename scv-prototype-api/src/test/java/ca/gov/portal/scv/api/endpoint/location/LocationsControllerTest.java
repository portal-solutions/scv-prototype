package ca.gov.portal.scv.api.endpoint.location;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ca.gov.portal.scv.api.service.InteropService;

public class LocationsControllerTest {

	@Mock
	private InteropService interopService;

	private LocationsController locationsController;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		this.locationsController = new LocationsController(interopService);
	}

	@Test
	public void handleGetLocations() throws Exception {

		final String searchString = "69 FERRYLAND";

		// given(interopService.getLocations(searchString)).willReturn(Collections.singletonList(o))
		ResponseEntity<?> responseEntity = this.locationsController.handleGetLocations(searchString);

		assertThat(responseEntity).extracting(ResponseEntity::getStatusCode).isEqualTo(HttpStatus.OK);

		assertThat(responseEntity).extracting(ResponseEntity::getBody).isNotNull();
	}

}
