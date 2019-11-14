package ca.gov.portal.scv.api.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

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

	@Autowired Environment environment;

	@Autowired InteropServiceImpl interopService;

	@Test
	public void testGetLocation_noResult() {
		final String searchString = environment.getProperty("tests.interop-service.fail-search-string");
		assertThat(interopService.getLocations(searchString)).isEmpty();
	}

	@Test
	public void testGetLocation_hasResult() {
		final String searchString = environment.getProperty("tests.interop-service.success-search-string");
		assertThat(interopService.getLocations(searchString)).isNotEmpty();
	}

}
