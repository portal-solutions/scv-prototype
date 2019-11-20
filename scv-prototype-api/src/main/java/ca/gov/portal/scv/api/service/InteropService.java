package ca.gov.portal.scv.api.service;

import ca.gov.portal.scv.api.service.dto.OpenApiInfo;
import ca.gov.portal.scv.api.service.dto.Person;

import java.util.List;
import java.util.Optional;

import ca.gov.portal.scv.api.service.dto.Location;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
public interface InteropService {

	OpenApiInfo isAvailable();

	List<Location> getLocations(String searchString);
	
	Person getPersonBySin(String sin);
}
