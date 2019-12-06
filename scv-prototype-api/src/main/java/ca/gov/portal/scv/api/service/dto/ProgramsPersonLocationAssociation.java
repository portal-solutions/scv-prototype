package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.Builder;
import lombok.Value;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
@JsonDeserialize(builder = ProgramsPersonLocationAssociation.ProgramsPersonLocationAssociationBuilder.class)
public class ProgramsPersonLocationAssociation implements Serializable {

	@JsonProperty("AssociationDateRange")
	private AssociationDateRange associationDateRange;

	@JsonProperty("Program")
	private List<ProgramRequest> program;

	@JsonProperty("PersonLocationAssociation")
	private PersonLocationAssociation personLocationAssociation;
}
