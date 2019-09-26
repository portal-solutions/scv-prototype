import React from 'react';

const VolunteerExperience = () => {
	return (
		<div className="panel panel-default">
			<div className="panel-heading">Volunteer Experience</div>
			<ul className="list-group">
				<li className="list-group-item">
					<p>
						<strong>Service type</strong><br />
						<span className="text-muted">Description of service.</span><br />
						<i className="fa fa-clock"></i> 25 service hours
								</p>
					<div>
						<a href="#">Edit</a> &#124; <a href="#">Remove</a>
					</div>
				</li>
				<li className="list-group-item">
					<p>
						<strong>Service type</strong><br />
						<span className="text-muted">Description of service.</span><br />
						<i className="fa fa-clock"></i> 10 service hours
								</p>
					<div>
						<a href="#">Edit</a> &#124; <a href="#">Remove</a>
					</div>
				</li>
				<li className="list-group-item">
					<p>
						<strong>Service type</strong><br />
						<span className="text-muted">Description of service.</span><br />
						<i className="fa fa-clock"></i> 52 service hours
								</p>
					<div>
						<a href="#">Edit</a> &#124; <a href="#">Remove</a>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default VolunteerExperience;
