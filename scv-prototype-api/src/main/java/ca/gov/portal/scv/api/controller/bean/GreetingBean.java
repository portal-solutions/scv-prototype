package ca.gov.portal.scv.api.controller.bean;

import java.io.Serializable;

import lombok.Builder;
import lombok.Value;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Value
@Builder
@SuppressWarnings({ "serial" })
public class GreetingBean implements Serializable {

	/**
	 * The greeting's message. Examples are 'Hello, world!' or
	 * 'How many people work in the government? About half.'
	 */
	private String message;

}
