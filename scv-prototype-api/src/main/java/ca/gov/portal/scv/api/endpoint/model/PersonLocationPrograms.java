package ca.gov.portal.scv.api.endpoint.model;

import java.io.Serializable;
import java.util.List;

import ca.gov.portal.scv.api.service.dto.PersonLocationAssociation;
import lombok.Builder;
import lombok.Value;

/**
 * @author Sebastien comeau (sebastien.comeau@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
public class PersonLocationPrograms implements Serializable {

	private PersonLocationAssociation personLocationAssociation;

	private Location location;

	private List<ProgramRequestStatus> programRequestStatuses;
}
