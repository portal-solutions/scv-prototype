import React from 'react';

const Address = () => {
	return (
		<div className="panel panel-default">
			<div className="panel-heading">Address</div>
			<ul className="list-group">
				<li className="list-group-item">
					<p>
						51 Deerfield Road.<br />
						Oakville ON L6H 4A4<br />
						Canada
								</p>
					<p className="text-muted">Primary, Residential</p>
					<p>Used for <strong>Canada Learning Bond</strong>.</p>
					<div>
						<a href="#">Edit</a>
					</div>
				</li>
				<li className="list-group-item">
					<p>
						405 Hampstead Lane<br />
						Oakville ON L6H 3R4<br />
						Canada
								</p>
					<p className="text-muted">Residential</p>
					<p>Used for <strong>Employment Insurance</strong>.</p>
					<div>
						<a href="#">Edit</a> &#124; <a href="#">Remove</a>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Address;
