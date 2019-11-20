package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.Builder;
import lombok.Value;

/**
 * @author Rui Wang (rui.wang@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
@JsonDeserialize(builder = PersonName.PersonNameBuilder.class)
public class PersonName implements Serializable {

	@JsonProperty("PersonGivenName")
	private String givenName;

	// XXX :: GjB :: why is this a collection type?!
	@JsonProperty("PersonMiddleName")
	private List<String> middleNames;

	@JsonProperty("PersonSurName")
	private String surName;

	@JsonProperty("PersonFullName")
	private String fullName;

	@JsonProperty("PersonPreferredName")
	private String preferredName;
}
