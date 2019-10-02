package ca.gov.portal.scv.api.endpoint.profile;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Before;
import org.junit.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Tests for {@link ProfilesController}.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
public class ProfilesControllerTests {

	private ProfilesController profilesController;

	@Before
	public void setUp() {
		this.profilesController = new ProfilesController();
	}

	@Test
	public void handleGetProfile() throws Exception {
		ResponseEntity<?> responseEntity = this.profilesController.handleGetProfile("id");

		assertThat(responseEntity)
			.extracting(ResponseEntity::getStatusCode)
			.isEqualTo(HttpStatus.OK);

		assertThat(responseEntity)
			.extracting(ResponseEntity::getBody)
			.isNotNull();
	}

	@Test
	public void handleGetPaymentDetails() throws Exception {
		ResponseEntity<?> responseEntity = this.profilesController.handleGetPaymentDetails("id");

		assertThat(responseEntity)
			.extracting(ResponseEntity::getStatusCode)
			.isEqualTo(HttpStatus.OK);

		assertThat(responseEntity)
			.extracting(ResponseEntity::getBody)
			.isNotNull();
	}

}
