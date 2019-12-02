package ca.gov.portal.scv.api.endpoint.model;

import static com.google.common.collect.ImmutableList.toImmutableList;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.google.common.collect.ImmutableMap;

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
		return locations.stream().map(this::map).collect(toImmutableList());
	}

	public Location map(ca.gov.portal.scv.api.service.dto.Location location) {
		return Location.builder().city(location.getLocationAddress().getCityName())
				.countryCode(location.getLocationAddress().getCountry().getIso3166Code())
				.countryName(location.getLocationAddress().getCountry().getName())
				.id(location.getIdentification().getId()).line1(mapLine1(location))
				.postalCode(location.getAddress().getPostalCode())
				.provinceCode(location.getLocationAddress().getState().getStateCode())
				.provinceName(mapProvinceName(location)).build();
	}

	protected String mapLine1(ca.gov.portal.scv.api.service.dto.Location location) {
		final StringBuilder stringBuilder = new StringBuilder();

		if (location.getLocationAddress().getStreet().getNumber() != null) {
			stringBuilder.append(location.getLocationAddress().getStreet().getNumber()).append(" ");
		}

		if (location.getLocationAddress().getStreet().getName() != null) {
			stringBuilder.append(location.getLocationAddress().getStreet().getName()).append(" ");
		}

		if (location.getLocationAddress().getStreet().getCategory() != null) {
			stringBuilder.append(location.getLocationAddress().getStreet().getCategory());
		}

		final String line1 = stringBuilder.toString().trim();

		return line1.isEmpty() ? null : line1;
	}

	protected Map<String, String> mapProvinceName(ca.gov.portal.scv.api.service.dto.Location location) {
		final List<Map<String, String>> stateNames = location.getLocationAddress().getState().getStateNames();

		final String englishStateName = stateNames.stream().filter(stateName -> stateName.containsKey("eng"))
				.map(stateName -> stateName.get("eng")).findFirst().orElse("");

		final String frenchStateName = stateNames.stream().filter(stateName -> stateName.containsKey("fra"))
				.map(stateName -> stateName.get("fra")).findFirst().orElse("");

		return ImmutableMap.of("eng", englishStateName, "fra", frenchStateName);
	}

}
