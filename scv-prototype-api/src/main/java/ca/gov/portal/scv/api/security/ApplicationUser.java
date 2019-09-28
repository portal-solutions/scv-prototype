package ca.gov.portal.scv.api.security;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.util.Assert;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Value;

/**
 * Models core user information retrieved by a UserDetailsService.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
@Value
@SuppressWarnings({ "serial" })
@EqualsAndHashCode(callSuper = true)
public class ApplicationUser extends User {

	@Getter
	private final Map<String, ?> extendedAttributes;

	public ApplicationUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		this(username, password, authorities, Collections.emptyMap());
	}

	public ApplicationUser(String username, String password, Collection<? extends GrantedAuthority> authorities, Map<String, ?> extendedAttributes) {
		super(username, password, authorities);

		Assert.notNull(extendedAttributes, "extendedAttributes is required; it must not be null");
		this.extendedAttributes = Collections.unmodifiableMap(extendedAttributes);
	}

}
