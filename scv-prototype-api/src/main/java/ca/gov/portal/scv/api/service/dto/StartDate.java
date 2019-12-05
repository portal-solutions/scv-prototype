package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.Builder;
import lombok.Value;

/**
 * @author Sebastien comeau (sebastien.comeau@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
@JsonDeserialize(builder = StartDate.StartDateBuilder.class)
public class StartDate implements Serializable {

}
