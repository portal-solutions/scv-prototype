package ca.gov.portal.scv.api.service;

import java.util.List;
import java.util.Optional;

import ca.gov.portal.scv.api.service.dto.Location;
import ca.gov.portal.scv.api.service.dto.OpenApiInfo;
import ca.gov.portal.scv.api.service.dto.Person;
import ca.gov.portal.scv.api.service.dto.Program;
import ca.gov.portal.scv.api.service.dto.ProgramPersonLocationAssociation;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
public interface InteropService {

	OpenApiInfo isAvailable();

	Optional<Location> getLocation(String id);

	List<Location> getLocations(String searchString);

	Optional<Person> getPerson(String sin);

	List<Program> getPersonPrograms(String id);

	List<ProgramPersonLocationAssociation> getPersonLocations(String id, String sin);

	Optional<String> addLocation(String sin, String locationId);

	void shareLocation(String sin, String locationId, List<String> programIds);
}
