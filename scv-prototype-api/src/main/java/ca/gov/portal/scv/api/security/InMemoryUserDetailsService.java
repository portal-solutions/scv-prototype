package ca.gov.portal.scv.api.security;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.lang.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A dev-only UserDetailsService that loads users from an in-memory store.
 *
 * TODO :: GjB :: move this into the src/dev folder once attached to a real directory
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
@Primary
@Component
@ConfigurationProperties("application.in-memory-user-details-service")
@ConditionalOnProperty(name = "application.in-memory-user-details-service.enabled", matchIfMissing = false)
public class InMemoryUserDetailsService implements UserDetailsService {

	private final List<User> users;

	public InMemoryUserDetailsService() throws Exception {
		final Resource resource = new ClassPathResource("/dummy-data/users.json");
		this.users = Collections.unmodifiableList(new ObjectMapper().readValue(resource.getInputStream(), new TypeReference<List<User>>() {}));
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return users.stream()
			.filter((user) -> user.getUsername().equals(username))
			.map(toApplicationUser()).findFirst()
			.orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));
	}

	private Function<User, ApplicationUser> toApplicationUser() {
		return (user) -> {
			final List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());

			final Map<String, ?> extendedAttributes = Collections.singletonMap("uid", user.getUid());

			return new ApplicationUser(user.getUsername(), user.getPassword(), grantedAuthorities, extendedAttributes);
		};
	}

}

@Data
@NoArgsConstructor
@SuppressWarnings({ "serial" })
class User implements Serializable {

	@NonNull
	private String uid;

	@NonNull
	private String username;

	@NonNull
	private String password;

	@NonNull
	private List<String> authorities;

}
