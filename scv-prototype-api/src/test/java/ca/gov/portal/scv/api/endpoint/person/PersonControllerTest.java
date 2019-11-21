package ca.gov.portal.scv.api.endpoint.person;

import static java.util.Collections.singletonList;
import static java.util.Collections.singletonMap;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;

import ca.gov.portal.scv.api.endpoint.auth.AuthController;
import ca.gov.portal.scv.api.endpoint.auth.AuthRequest;
import ca.gov.portal.scv.api.endpoint.auth.AuthResponse;
import ca.gov.portal.scv.api.security.ApplicationUser;
import ca.gov.portal.scv.api.service.InteropService;
import ca.gov.portal.scv.api.service.dto.Date;
import ca.gov.portal.scv.api.service.dto.Person;
import ca.gov.portal.scv.api.service.dto.PersonName;

public class PersonControllerTest {

	@Mock
	private InteropService interopService;
	
	private PersonController personController;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		this.personController = new PersonController(interopService);
	}
	
	@Test
	public void testHandleGetPersonBySin() throws Exception {
		final PersonName personName = PersonName.builder().fullName("Test Test").build();
		final Person person = Person.builder().name(personName).build();
		
		when(this.interopService.getPersonBySin("1234567")).thenReturn(person);

		final ResponseEntity<?> responseEntity = this.personController.handleGetPersonBySin("1234567");
		
		assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat((Person) responseEntity.getBody()).extracting(Person::getName).isEqualTo(personName);
	}

}
