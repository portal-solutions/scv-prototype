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
@JsonDeserialize(builder = Address.AddressBuilder.class)
public class Address implements Serializable {

	@JsonProperty("AddressSecondaryUnitText")
	private String secondaryUnit;

	@JsonProperty("LocationState")
	private State state;

	@JsonProperty("LocationCountry")
	private Country country;

	@JsonProperty("LocationPostalCode")
	private String postalCode;

}
