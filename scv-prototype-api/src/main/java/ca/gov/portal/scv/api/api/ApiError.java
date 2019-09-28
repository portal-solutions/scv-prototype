package ca.gov.portal.scv.api.api;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import lombok.Builder;
import lombok.Value;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
public class ApiError implements Serializable {

	/**
	 * A machine-parsable code. While error messages might change over time,
	 * error codes should stay the same for any specific error type.
	 */
	@NonNull
	private final String errorCode;

	/**
	 * A descriptive text message explaining the cause of the error.
	 */
	@NonNull
	private final String message;

	/**
	 * The timestamp that the error occurred. Will default to the current date and time.
	 */
	@NonNull
	@Builder.Default
	private final LocalDateTime timestamp = LocalDateTime.now();

	/**
	 * The HTTP response code returned by the server. It is the developer's responsibility
	 * to ensure that this value, when set, matches the actual HTTP response.
	 */
	@Nullable
	private final Integer httpStatus;

}
