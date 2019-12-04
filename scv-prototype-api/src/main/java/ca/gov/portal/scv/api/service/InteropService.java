package ca.gov.portal.scv.api.service;

import java.util.List;
import java.util.Optional;

import ca.gov.portal.scv.api.service.dto.Location;
import ca.gov.portal.scv.api.service.dto.OpenApiInfo;
import ca.gov.portal.scv.api.service.dto.Person;
import ca.gov.portal.scv.api.service.dto.Program;
import ca.gov.portal.scv.api.service.dto.ProgramPersonLocationAssociation;
import ca.gov.portal.scv.api.service.dto.ShareLocationByProgramRequest;
import ca.gov.portal.scv.api.service.dto.ShareLocationRequest;

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
	
	void shareLocation(String personId, ShareLocationRequest shareLocationRequest);

	void shareLocationByProgram(String personId, String locationId, ShareLocationByProgramRequest shareLocationByProgramRequest);
}
