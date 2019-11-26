package ca.gov.portal.scv.api.endpoint.person;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import ca.gov.portal.scv.api.endpoint.location.LocationsController;
import ca.gov.portal.scv.api.service.InteropService;
import ca.gov.portal.scv.api.service.dto.Person;

/**
 * Unit tests for {@link LocationsController}
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @author Sebastien Comeau (sebastien.comeau@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
public class PersonsControllerTest {

	@Mock
	InteropService interopService;

	PersonsController personsController;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		this.personsController = new PersonsController(interopService);
	}

	@Test
	public void testHandleGetPerson_noResult() throws Exception {
		when(interopService.getPerson(anyString())).thenReturn(Optional.empty());

		final ResponseEntity<?> responseEntity = this.personsController.handleGetPerson("sin");

		assertThat(responseEntity).extracting(ResponseEntity::getStatusCode).isEqualTo(NOT_FOUND);
	}

	@Test
	public void testHandleGetPerson_hasResult() throws Exception {
		when(interopService.getPerson(anyString())).thenReturn(Optional.of(Person.builder().build()));

		final ResponseEntity<?> responseEntity = this.personsController.handleGetPerson("sin");

		assertThat(responseEntity).extracting(ResponseEntity::getStatusCode).isEqualTo(OK);
		assertThat(responseEntity).extracting(ResponseEntity::getBody).isInstanceOf(Person.class);
	}

}
