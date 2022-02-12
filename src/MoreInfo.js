import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import './MoreInfo.css';

const MoreInfo = (props) => {
	if (!props.show) return null;

	const { wineInfo } = props;
	// console.log(wineInfo);

	const occasionDate = wineInfo.date;
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
				<Modal.Title>{wineInfo.wine}<br /><span className="modal-title-small">{wineInfo.country}</span></Modal.Title>
			</Modal.Header>
			
			<Modal.Body>
				<Container>
					<Row className="g-0">
						<Col><img className="wine-img" src={process.env.PUBLIC_URL + `images/${wineInfo.id}.jpg`} alt="wine image" /></Col>
						<Col>
							<table className="wine-stats">
								<tbody>
									<tr>
										<td>Ranked:</td>
										<td>{wineInfo.position}</td>
									</tr>
									<tr>
										<td>Tasting order:</td>
										<td>{wineInfo.tasting_order}</td>
									</tr>
									<tr>
										<td>Average score (20):</td>
										<td>{wineInfo.average_score}</td>
									</tr>
								</tbody>
							</table>
						</Col>
					</Row>
					<Row>
						<Col>
							<p><strong>Brought by:</strong> {wineInfo.owner}</p>
							<p><strong>Who's favourite was it:</strong><br />{wineInfo.favourite === "" ? "None" : wineInfo.favourite}</p>
							<p><strong>Who gave it their lowest score:</strong><br />{wineInfo.worst === undefined ? "None" : wineInfo.worst}</p>
							<hr />
						</Col>
					</Row>
					<Row>
						<Col>
							<p><strong>Date:</strong> {occasionDate}</p>
							<img src={occasionImage} className="event-img" width="100%" height="auto" />
						</Col>
					</Row>
					<Row>
						<Col>
							<Table striped bordered variant="dark">
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
											<tr key={item.id} className={item.id === wineInfo.id ? "selected" : null}>
												<td>{item.position}</td>
												<td>{item.wine}</td>
												<td>{item.average_score}</td>
												<td>{item.tasting_order}</td>
											</tr>
										)
									})}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
			</Modal.Body>
		</Modal>
	);

};

export default MoreInfo;