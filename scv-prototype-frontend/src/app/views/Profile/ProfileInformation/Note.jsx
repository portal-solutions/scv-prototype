import React from 'react';
import { useTranslation } from 'react-i18next';

const Note = (props) => {
	const { t } = useTranslation();

	return (
		<div className="panel panel-default">
			<div className="panel-heading">{t('profile.profile-information.note.title')}</div>
			<div className="panel-body">
				{props.notes && props.notes.length ? props.notes.map(note =>
					<p key={note.id}>
						{note.content}<br /><span className="text-muted">{new Date(note.createdOn).toLocaleDateString()}</span>
					</p>
				) : <p className="text-center"><em>{t('no-data-available')}</em></p>}
			</div>
		</div>
	);
};

export default Note;
