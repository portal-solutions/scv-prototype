package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;

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
@JsonDeserialize(builder = Person.PersonBuilder.class)
public class Person implements Serializable {

	@JsonProperty("PersonBirthDate")
	private DateTime birthDate;

	@JsonProperty("PersonName")
	private PersonName name;

	@JsonProperty("PersonOtherIdentification")
	private Identification otherIdentification;

	// @JsonProperty("PersonSINIdentification")
	// private Identification sinIdentification;

}
