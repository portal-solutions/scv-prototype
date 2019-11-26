package ca.gov.portal.scv.api.endpoint.location;

import static com.google.common.collect.ImmutableList.toImmutableList;

import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Component;

/**
 * Mapper to convert location DTOs to endpoint responses.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Component
public class LocationMapper {

	public List<Location> map(Collection<ca.gov.portal.scv.api.service.dto.Location> locations) {
		return locations.stream()
			.map(this::map)
			.collect(toImmutableList());
	}

	public Location map(ca.gov.portal.scv.api.service.dto.Location location) {
		return Location.builder()
			.city(location.getAddress().getCityName())
			.countryCode(location.getAddress().getCountry().getIso3166Code())
			.id(location.getIdentification().getId())
			.postalCode(location.getAddress().getPostalCode())
			.provinceCode(location.getAddress().getState().getStateCode())
			.build();
	}

}
