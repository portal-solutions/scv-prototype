package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.Builder;
import lombok.Value;

/**
 * @author Sebastien Comeau (sebastien.comeau@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
@JsonDeserialize(builder = RequestStatus.RequestStatusBuilder.class)
public class RequestStatus implements Serializable {

	@JsonProperty("StatusText")
	private String statusText;

	@JsonProperty("StatusDate")
	private StatusDate statusDate;
}
