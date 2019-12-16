package ca.gov.portal.scv.api.endpoint.model;

import java.io.Serializable;

import ca.gov.portal.scv.api.service.dto.Program;
import ca.gov.portal.scv.api.service.dto.RequestStatus;
import lombok.Builder;
import lombok.Value;

/**
 * @author Sebastien comeau (sebastien.comeau@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
public class ProgramRequestStatus implements Serializable {

	private Program program;

	private RequestStatus requestStatus;
}
