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
@JsonDeserialize(builder = Address.AddressBuilder.class)
public class Address implements Serializable {

	@JsonProperty("LocationAddress")
	private List<String> fullText;

	@JsonProperty("LocationCityName")
	private String cityName;

	@JsonProperty("LocationState")
	private State state;

	@JsonProperty("LocationCountry")
	private Country country;

	@JsonProperty("LocationPostalCode")
	private String postalCode;

	@JsonProperty("AddressCategoryText")
	private AddressCategory addressCategory;

	@JsonProperty("LocationStreet")
	private Street street;

}
