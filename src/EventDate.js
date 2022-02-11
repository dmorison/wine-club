import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const EventDate = (props) => {
	if (!props.show) return null;

	const occasionDate = props.eventWines[0].date;
	const occasionImage = process.env.PUBLIC_URL + `images/${occasionDate}.jpg`;

	const sortedWines = props.eventWines.sort((a, b) => {
		return a.position - b.position;
	});

	return (
		<Modal
			show={props.show}
			onHide={props.handleHide}
			fullscreen="md-down"
			dialogClassName="modalstyle"
		>
			<Modal.Header closeButton>
				<Modal.Title>{occasionDate}</Modal.Title>
			</Modal.Header>
			
			<Modal.Body>
				<img src={occasionImage} width="100%" height="auto" />
				<Table striped bordered>
					<thead>
						<tr>
							<th>Rank</th>
							<th>Wine</th>
							<th>Score (20)</th>
							<th>Taste order</th>
						</tr>
					</thead>
					<tbody>
						{sortedWines.map(item => {
							return (
								<tr key={item.id}>
									<td>{item.position}</td>
									<td>{item.wine}</td>
									<td>{item.average_score}</td>
									<td>{item.tasting_order}</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Modal.Body>
		</Modal>
	);

};

export default EventDate;