package ca.gov.portal.scv.api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import ca.gov.portal.scv.api.service.dto.PingResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class InteropServiceImpl implements InteropService {

	private final RestTemplate restTemplate;

	@Override
	public PingResponse checkAvailability() {
		final PingResponse pingResponse = restTemplate.getForObject("/ping", PingResponse.class);
		log.debug("Ping response: [{}]", pingResponse);
		return pingResponse;
	}


}
