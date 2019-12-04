package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import lombok.Value;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
public class ShareLocationByProgramRequest implements Serializable {
	
	private String sin;
	private String locationId;
	private List<String> programIds;
}