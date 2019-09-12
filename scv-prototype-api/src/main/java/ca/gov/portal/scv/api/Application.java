package ca.gov.portal.scv.api;

import java.net.InetAddress;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import lombok.extern.slf4j.Slf4j;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Slf4j
@SpringBootApplication
public class Application {

	public static void main(String[] args) throws Exception {
		log.info("Starting SCV (frontend)");

		final ApplicationContext applicationContext = SpringApplication.run(Application.class, args);
		final String port = applicationContext.getEnvironment().getProperty("server.port", "8080");
		final String contextPath = applicationContext.getEnvironment().getProperty("server.servlet.context-path", "/");
		final String canonicalHostName = InetAddress.getLocalHost().getCanonicalHostName();

		log.info("Application successfully started");
		log.info("Local application URL: http://localhost:{}{}", port, contextPath);
		log.info("External application URL: http://{}:{}{}", canonicalHostName, port, contextPath);
	}

}
