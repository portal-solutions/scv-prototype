package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

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
@JsonDeserialize(builder = State.StateBuilder.class)
public class State implements Serializable {

	@JsonProperty("StateCode")
	private String stateCode;

	@JsonProperty("LocationStateName")
	private List<Map<String, String>> stateNames;

}
