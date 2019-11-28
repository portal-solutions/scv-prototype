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
@JsonDeserialize(builder = Location.LocationBuilder.class)
public class Location implements Serializable {

	@JsonProperty("Address")
	private Address address;

	@JsonProperty("LocationAddress")
	private LocationAddress locationAddress;

	@JsonProperty("LocationIdentification")
	private Identification identification;

}
