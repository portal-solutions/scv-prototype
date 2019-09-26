import React from 'react';

const Phone = () => {
	return (
		<div className="panel panel-default">
			<div className="panel-heading">Phone</div>
			<ul className="list-group">
				<li className="list-group-item">
					<p>905-488-888</p>
					<p className="text-muted">Primary, Mobile</p>
					<p>Used for <strong>Canada Learning Bond</strong>.</p>
					<div>
						<a href="#">Edit</a>
					</div>
				</li>
				<li className="list-group-item">
					<p>905-566-4444</p>
					<p className="text-muted">Home</p>
					<p>Used for <strong>Canada Learning Bond</strong>.</p>
					<div>
						<a href="#">Edit</a> &#124; <a href="#">Remove</a>
					</div>
				</li>
				<li className="list-group-item">
					<p>905-346-4429</p>
					<p className="text-muted">Work</p>
					<p>Used for <strong>Employment Insurance</strong>.</p>
					<div>
						<a href="#">Edit</a> &#124; <a href="#">Remove</a>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Phone;
