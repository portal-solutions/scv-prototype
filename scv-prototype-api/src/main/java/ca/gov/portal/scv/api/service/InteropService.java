package ca.gov.portal.scv.api.service;

import ca.gov.portal.scv.api.service.dto.OpenApiInfo;

import java.util.List;
import java.util.UUID;

import ca.gov.portal.scv.api.service.dto.Location;
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

	List<Program> getPersonPrograms(UUID id);

	List<Location> getPersonLocations(UUID id, String sin);
}
