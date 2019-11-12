package ca.gov.portal.scv.api.service;

import ca.gov.portal.scv.api.service.dto.PingResponse;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
public interface InteropService {

	PingResponse checkAvailability();

}
