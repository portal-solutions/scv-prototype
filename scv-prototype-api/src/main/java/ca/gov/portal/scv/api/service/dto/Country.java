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
@JsonDeserialize(builder = Country.CountryBuilder.class)
public class Country implements Serializable {

	@JsonProperty("LocationCountryISO3166NumericCode")
	private String iso3166Code;

	@JsonProperty("LocationCountryName")
	private String name;

}
