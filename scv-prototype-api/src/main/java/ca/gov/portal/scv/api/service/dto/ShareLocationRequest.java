package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Value;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
public class ShareLocationRequest implements Serializable {

	@JsonProperty("ProgramPersonLocationAssociation")
	private ProgramPersonLocationAssociation programPersonLocationAssociation;

}
