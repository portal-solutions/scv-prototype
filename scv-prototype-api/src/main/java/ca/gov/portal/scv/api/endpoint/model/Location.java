package ca.gov.portal.scv.api.endpoint.model;

import java.io.Serializable;
import java.util.Map;

import lombok.Builder;
import lombok.Value;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
public class Location implements Serializable {

	private String id;

	private String city;

	private String postalCode;

	private String provinceCode;

	private Map<String, String> provinceName;

	private String countryCode;

	private String countryName;

	private String line1;

	private String line2;

}
