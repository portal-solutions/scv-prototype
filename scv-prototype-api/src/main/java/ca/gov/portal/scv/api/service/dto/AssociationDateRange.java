package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class AssociationDateRange implements Serializable {

	@JsonProperty("StartDate")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate;

}
