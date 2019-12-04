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
@JsonDeserialize(builder = ProgramRequest.ProgramRequestBuilder.class)
public class ProgramRequest implements Serializable {

	@JsonProperty("ActivityIdentification")
	private List<Identification> activityIdentifications;

}
