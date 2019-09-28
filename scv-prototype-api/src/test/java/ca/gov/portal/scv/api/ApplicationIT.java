package ca.gov.portal.scv.api;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Application integration test that will test that the
 * spring context loads without issues.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@SpringBootTest
@ActiveProfiles({ "tests" })
@RunWith(SpringRunner.class)
public class ApplicationIT {

	@Test
	public void contextLoads() {}

}
