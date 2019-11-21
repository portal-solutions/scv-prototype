package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.Builder;
import lombok.Value;

/**
 * @author Sebastien Comeau (sebastien.comeau@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
@JsonDeserialize(builder = PersonProgramsResponse.PersonProgramsResponseBuilder.class)
public class PersonProgramsResponse implements Serializable {

	@JsonProperty("Person")
	private Person person;

	@JsonProperty("ProgramBenefitRequest")
	private List<ProgramBenefitRequest> programBenefitRequests;
}
