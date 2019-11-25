package ca.gov.portal.scv.api.service.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
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
@JsonDeserialize(builder = DateTime.DateTimeBuilder.class)
public class DateTime implements Serializable {

	@JsonProperty("Date")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.S")
	private LocalDateTime dateTime;

	// NOTE: lombok will enhance this builder class as necessary
	// it exists _only_ to propagate the JsonFormat annotation down to the date
	// field
	public static class DateTimeBuilder {

		@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.S")
		private LocalDateTime dateTime;

	}

}
