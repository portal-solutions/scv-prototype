package ca.gov.portal.scv.api.service;

import ca.gov.portal.scv.api.service.dto.OpenApiInfo;

import java.util.List;

import ca.gov.portal.scv.api.service.dto.Location;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
public interface InteropService {

	OpenApiInfo isAvailable();

	List<Location> getLocations(String searchString);
}
