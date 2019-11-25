package ca.gov.portal.scv.api.service;

import java.util.List;

import ca.gov.portal.scv.api.service.dto.Location;
import ca.gov.portal.scv.api.service.dto.OpenApiInfo;
import ca.gov.portal.scv.api.service.dto.Person;
import ca.gov.portal.scv.api.service.dto.Program;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
public interface InteropService {

	OpenApiInfo isAvailable();

	List<Location> getLocations(String searchString);

	Person getPerson(String sin);

	List<Program> getPersonPrograms(String id);

	List<Location> getPersonLocations(String id, String sin);
}
