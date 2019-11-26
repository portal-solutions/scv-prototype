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
@JsonDeserialize(builder = Street.StreetBuilder.class)
public class Street implements Serializable {

	@JsonProperty("StreetNumberText")
	private String number;

	@JsonProperty("StreetName")
	private String name;

	@JsonProperty("StreetCategoryText")
	private String category;

}
