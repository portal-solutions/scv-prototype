package ca.gov.portal.scv.api.endpoint.model;

import java.io.Serializable;
import java.time.LocalDate;

import lombok.Builder;
import lombok.Value;

/**
 * @author Sebastien comeau (sebastien.comeau@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
public class PersonProgramLocation implements Serializable {

	private String programId;

	private String locationAddressCategoryText;

	private String statusText;

	private LocalDate statusDate;

	private Location location;
}
