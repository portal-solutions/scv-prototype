package ca.gov.portal.scv.api.endpoint.model;

import static com.google.common.collect.ImmutableList.toImmutableList;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import ca.gov.portal.scv.api.service.dto.Identification;
import ca.gov.portal.scv.api.service.dto.PersonLocationAssociation;
import ca.gov.portal.scv.api.service.dto.Program;
import ca.gov.portal.scv.api.service.dto.ProgramPersonLocationAssociation;
import ca.gov.portal.scv.api.service.dto.Location;

/**
 * Mapper to convert location DTOs to endpoint responses.
 *
 * @author Greg Baker (gregory.j.baker@hrsdc-rhdcc.gc.ca)
 * @since 0.0.0
 */
@Component
public class PersonLocationProgramsMapper {

	private final LocationMapper locationMapper = new LocationMapper();

	public List<PersonLocationPrograms> map(
			Collection<ProgramPersonLocationAssociation> programPersonLocationAssociations,
			Collection<Location> locations) {

		List<PersonLocationPrograms> personLocationProgramsList = new ArrayList<PersonLocationPrograms>();

		// collect disctinct personLocationAssociation id
		List<String> personLocationAssociationIds = programPersonLocationAssociations.stream()
				.map(ProgramPersonLocationAssociation::getPersonLocationAssociation)
				.map(PersonLocationAssociation::getIdentification).map(Identification::getId).distinct()
				.collect(toImmutableList());

		// loop through personLocationAssociation ids
		for (String id : personLocationAssociationIds) {

			// get ProgramPersonLocationAssociations for this PersonLocationAssociation id
			List<ProgramPersonLocationAssociation> currentProgramPersonLocationAssociations = programPersonLocationAssociations
					.stream().filter(ppla -> ppla.getPersonLocationAssociation().getIdentification().getId().equals(id))
					.collect(toImmutableList());

			// get single location id based on the current ProgramPersonLocationAssociation
			// list
			String locationId = currentProgramPersonLocationAssociations.stream()
					.map(ProgramPersonLocationAssociation::getPersonLocationAssociation)
					.map(PersonLocationAssociation::getLocation).map(Location::getIdentification)
					.map(Identification::getId).findFirst().get();

			// try get location
			Optional<Location> location = locations.stream()
					.filter(l -> l.getIdentification().getId().equals(locationId)).findFirst();

			if (location.isPresent()) {
				// add new item to list
				personLocationProgramsList.add(this.map(currentProgramPersonLocationAssociations, location.get()));

			}
		}

		return personLocationProgramsList;
	}

	private PersonLocationPrograms map(List<ProgramPersonLocationAssociation> programPersonLocationAssociations,
			Location location) {

		// get first one
		ProgramPersonLocationAssociation programPersonLocationAssociation = programPersonLocationAssociations.stream()
				.findFirst().get();

		// get distinct lis of program ids
		List<String> programIds = programPersonLocationAssociations.stream()
				.filter(ppla -> !ppla.getProgram().getActivityIdentification().getId().equals("1"))
				.map(ProgramPersonLocationAssociation::getProgram).map(Program::getActivityIdentification)
				.map(Identification::getId).collect(toImmutableList());

		return PersonLocationPrograms.builder().programIds(programIds)
				.locationAddressCategoryText(programPersonLocationAssociation.getPersonLocationAssociation()
						.getLocation().getLocationAddress().getAddressCategory())
				.statusText(programPersonLocationAssociation.getRequestStatus().getStatusText())
				.statusDate(programPersonLocationAssociation.getRequestStatus().getStatusDate().getDate())
				.location(locationMapper.map(location)).build();
	}
}
