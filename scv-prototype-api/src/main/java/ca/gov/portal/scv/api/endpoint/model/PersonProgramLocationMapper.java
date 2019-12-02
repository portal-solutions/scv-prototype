package ca.gov.portal.scv.api.endpoint.model;

import org.springframework.stereotype.Component;

/**
 * Mapper to convert location DTOs to endpoint responses.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Component
public class PersonProgramLocationMapper {

	private final LocationMapper locationMapper = new LocationMapper();

	public PersonProgramLocation map(
			ca.gov.portal.scv.api.service.dto.ProgramPersonLocationAssociation programPersonLocationAssociation,
			ca.gov.portal.scv.api.service.dto.Location location) {
		return PersonProgramLocation.builder()
				.programId(programPersonLocationAssociation.getProgram().getActivityIdentification().getId())
				.locationAddressCategoryText(programPersonLocationAssociation.getPersonLocationAssociation()
						.getLocation().getLocationAddress().getAddressCategory())
				.statusText(programPersonLocationAssociation.getRequestStatus().getStatusText())
				.statusDate(programPersonLocationAssociation.getRequestStatus().getStatusDate().getDate())
				.location(locationMapper.map(location)).build();
	}
}
