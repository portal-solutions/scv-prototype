import React from 'react';

const PersonalInformation = () => {
	return (
		<div className="panel panel-default">
			<div className="panel-heading">Personal information</div>
			<div className="panel-body text-center">
				<div className="row">
					<div className="col-xs-12 col-md-4">
						<label>First name</label>
						<div>NAME</div>
					</div>
					<div className="col-xs-12 col-md-4">
						<label>Middle name</label>
						<div>NAME</div>
					</div>
					<div className="col-xs-12 col-md-4">
						<label>Last name</label>
						<div>NAME</div>
					</div>
				</div>
			</div>
			<ul className="list-group">
				<li className="list-group-item">
					<div className="row">
						<div className="col-xs-12 col-md-4">
							<label>Date of birth</label>
							<div>October 10, 1993</div>
						</div>
						<div className="col-xs-12 col-md-4">
							<label>Social insurance number</label>
							<div>000 000 000</div>
						</div>
						<div className="col-xs-12 col-md-4">
							<label>Language of preference</label>
							<div>English</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default PersonalInformation;
