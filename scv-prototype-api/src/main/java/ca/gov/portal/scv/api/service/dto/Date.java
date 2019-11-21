package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
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
@JsonDeserialize(builder = Date.DateBuilder.class)
public class Date implements Serializable {

	@JsonProperty("Date")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.S")
	private LocalDate date;

	// NOTE: lombok will enhance this builder class as necessary
	//       it exists _only_ to propagate the JsonFormat annotation down to the date field
	public static class DateBuilder {

		@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.S")
		private LocalDate date;

	}

}
