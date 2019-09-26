import React from 'react';

const Email = () => {
	return (
		<div className="panel panel-default">
			<div className="panel-heading">Email</div>
			<ul className="list-group">
				<li className="list-group-item">
					<p>useremail@outlook.com</p>
					<p className="text-muted">Primary email</p>
					<p>Used for <strong>all programs</strong>.</p>
					<div>
						<a href="#">Edit</a>
					</div>
				</li>
				<li className="list-group-item">
					<p>useremail2@outlook.com</p>
					<p className="text-muted">Secondary email</p>
					<p>Used for <strong>CSLP, Job Bank</strong>.</p>
					<div>
						<a href="#">Edit</a> &#124; <a href="#">Remove</a>
					</div>
				</li>
			</ul>
		</div>

	);
};

export default Email;
