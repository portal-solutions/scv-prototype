import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../../hooks';

const ProfileInformation = () => {
	const { t } = useTranslation();

	useDocumentTitle(`${t('profile.profile-information.document-title')} - ${t('profile.document-title')}`);
	usePageIdentifier(t('profile.profile-information.page-identifier'));
	usePageTitle(`${t('profile.page-title')} - ${t('profile.profile-information.page-title')}`);

	return (
		<>
			<div className="row">
				<div className="col-xs-12">
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
				</div>
			</div>

			<div className="row">
				<div className="col-xs-12 col-md-4">
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
				</div>
				<div className="col-xs-12 col-md-4">
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
				</div>
				<div className="col-xs-12  col-md-4">
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
				</div>
			</div>

			<div className="row">
				<div className="col-xs-12 col-md-8">
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
				</div>
				<div className="col-xs-12 col-md-4">
					<div className="panel panel-default">
						<div className="panel-heading">Notes</div>
						<div className="panel-body">
							<p>
								I want to be called by my middle name during service interactions.<br />
								<span className="text-muted">09/10/19</span>
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ultricies odio.<br />
								<span className="text-muted">09/10/19</span>
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ultricies odio.<br />
								<span className="text-muted">09/10/19</span>
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ultricies odio.<br />
								<span className="text-muted">09/10/19</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileInformation;
