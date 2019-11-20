package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Value;

/**
 * @author Rui Wang (rui.wang@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
public class PersonName implements Serializable {

	@JsonProperty("PersonGivenName")
	private String givenName;
	
	@JsonProperty("PersonMiddleName")
	private String middleName;
	
	@JsonProperty("PersonSurName")
	private String surName;
	
	@JsonProperty("PersonFullName")
	private String fullName;
	
	@JsonProperty("PersonPreferredName")
	private String preferredName;
}
