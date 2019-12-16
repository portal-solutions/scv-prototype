package ca.gov.portal.scv.api.endpoint.model;

import static com.google.common.collect.ImmutableList.toImmutableList;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import ca.gov.portal.scv.api.service.dto.PersonLocationAssociation;
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

		// collect disctinct personLocationAssociation list
		List<PersonLocationAssociation> personLocationAssociations = programPersonLocationAssociations.stream()
				.map(ProgramPersonLocationAssociation::getPersonLocationAssociation).distinct()
				.collect(toImmutableList());

		// loop through personLocationAssociation ids
		for (PersonLocationAssociation pla : personLocationAssociations) {

			// try get location
			Optional<Location> location = locations.stream()
					.filter(l -> l.getIdentification().getId().equals(pla.getLocation().getIdentification().getId()))
					.findFirst();

			if (location.isPresent()) {

				// get ProgramPersonLocationAssociations for this PersonLocationAssociation id
				List<ProgramPersonLocationAssociation> currentProgramPersonLocationAssociations = programPersonLocationAssociations
						.stream().filter(ppla -> ppla.getPersonLocationAssociation().getIdentification().getId()
								.equals(pla.getIdentification().getId()))
						.collect(toImmutableList());

				// add new item to list
				personLocationProgramsList.add(this.map(location.get(), currentProgramPersonLocationAssociations));

			}
		}

		return personLocationProgramsList;
	}

	private PersonLocationPrograms map(Location location,
			List<ProgramPersonLocationAssociation> programPersonLocationAssociations) {

		return PersonLocationPrograms.builder()
				.personLocationAssociation(programPersonLocationAssociations.stream()
						.map(ProgramPersonLocationAssociation::getPersonLocationAssociation).findFirst().get())
				.location(locationMapper.map(location))
				.programRequestStatuses(
						programPersonLocationAssociations.stream()
								.map(ppla -> ProgramRequestStatus.builder().program(ppla.getProgram())
										.requestStatus(ppla.getRequestStatus()).build())
								.collect(toImmutableList()))
				.build();
	}
}
