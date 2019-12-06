package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
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
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonDeserialize(builder = PersonLocationAssociation.PersonLocationAssociationBuilder.class)
public class PersonLocationAssociation implements Serializable {

	@JsonProperty("Person")
	private Person person;

	@JsonProperty("Location")
	private Location location;

	@JsonProperty("PersonLocationAssociationIdentification")
	private Identification identification;

}
