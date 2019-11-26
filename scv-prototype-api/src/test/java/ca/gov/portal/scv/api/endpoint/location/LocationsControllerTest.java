package ca.gov.portal.scv.api.endpoint.location;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpStatus.OK;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import ca.gov.portal.scv.api.service.InteropService;
import ca.gov.portal.scv.api.service.dto.Location;

/**
 * Unit tests for {@link LocationsController}
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @author Sebastien Comeau (sebastien.comeau@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
*/
public class LocationsControllerTest {

	@Mock
	InteropService interopService;

	LocationsController locationsController;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		this.locationsController = new LocationsController(interopService);
	}

	@Test
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void handleGetLocations_noResults() throws Exception {
		when(interopService.getLocations(anyString())).thenReturn(emptyList());

		final ResponseEntity<?> responseEntity = this.locationsController.handleGetLocations("123 Anywhere Street");

		assertThat(responseEntity).extracting(ResponseEntity::getStatusCode).isEqualTo(OK);
		assertThat(responseEntity).extracting(ResponseEntity::getBody).isInstanceOf(List.class);
		assertThat((List) responseEntity.getBody()).isEmpty();
	}

	@Test
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void handleGetLocations_noHasResults() throws Exception {
		when(interopService.getLocations(anyString())).thenReturn(singletonList(Location.builder().build()));

		final ResponseEntity<?> responseEntity = this.locationsController.handleGetLocations("123 Anywhere Street");

		assertThat(responseEntity).extracting(ResponseEntity::getStatusCode).isEqualTo(OK);
		assertThat(responseEntity).extracting(ResponseEntity::getBody).isInstanceOf(List.class);
		assertThat((List) responseEntity.getBody()).hasSize(1);
	}

}
