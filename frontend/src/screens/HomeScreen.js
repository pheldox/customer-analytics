import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createPrediction } from '../actions/predictionActions';
import { PREDICTION_RESET } from '../constants/predictionConstants';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Button,
	Card,
	Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const HomeScreen = () => {
	const predictionCreate = useSelector((state) => state.predictionCreate);
	const { loading, error, success, prediction } = predictionCreate;
	console.log(error);

	const dispatch = useDispatch();

	const [book_length_tot, setBookLength] = useState('');
	const [book_length_avg, setBookLengthAvg] = useState('');
	const [price_tot, setPrice] = useState('');
	const [price_avg, setPriceAvg] = useState('');
	const [review, setReview] = useState('');
	const [min_listened, setMinListened] = useState('');
	const [completion, setCompletion] = useState('');
	const [support_requests, setSupportRequests] = useState('');
	const [last_visited, setLastVisited] = useState('');
	const [purchase_data, setPurchaseDate] = useState('');
	// const [target, setTarget] = useState('');

	useEffect(() => {
		if (success) {
			setBookLength('');
			setBookLengthAvg('');
			setPrice('');
			setPriceAvg('');
			setReview('');
			setMinListened('');
			setCompletion('');
			setSupportRequests('');
			setLastVisited('');
			setPurchaseDate('');
			// dispatch({ type: PREDICTION_RESET });
		}
	}, [dispatch, success]);
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			createPrediction({
				book_length_tot,
				book_length_avg,
				price_tot,
				price_avg,
				review,
				min_listened,
				completion,
				support_requests,
				last_visited,
				purchase_data,
			})
		);
	};

	return (
		<div>
			<h1>Predict Customer Conversion</h1>
			<FormContainer>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						<h4>Will customer convert?</h4>

						<Form onSubmit={submitHandler}>
							<Form.Group controlId='total-booklength'>
								<Form.Label>Total Book Length</Form.Label>
								<Form.Control
									type='number'
									value={book_length_tot ? book_length_tot : ''}
									onChange={(e) => setBookLength(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='avg-booklength'>
								<Form.Label>Book Length Average</Form.Label>
								<Form.Control
									type='number'
									value={book_length_avg ? book_length_avg : ''}
									onChange={(e) => setBookLengthAvg(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='price'>
								<Form.Label>Total Price</Form.Label>
								<Form.Control
									type='number'
									value={price_tot ? price_tot : ''}
									onChange={(e) => setPrice(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='averagePrice'>
								<Form.Label>Average Price</Form.Label>
								<Form.Control
									type='number'
									value={price_avg ? price_avg : ''}
									onChange={(e) => setPriceAvg(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='review'>
								<Form.Label>Review</Form.Label>
								<Form.Control
									type='number'
									value={review ? review : ''}
									onChange={(e) => setReview(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='minListened'>
								<Form.Label>Minutes Listened</Form.Label>
								<Form.Control
									type='number'
									value={min_listened ? min_listened : ''}
									onChange={(e) => setMinListened(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='completion'>
								<Form.Label>Completion</Form.Label>
								<Form.Control
									type='number'
									value={completion ? completion : ''}
									onChange={(e) => setCompletion(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='suppportRequests'>
								<Form.Label>Support Requests</Form.Label>
								<Form.Control
									type='number'
									value={support_requests ? support_requests : ''}
									onChange={(e) => setSupportRequests(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='lastVisited'>
								<Form.Label>Last Visited</Form.Label>
								<Form.Control
									type='number'
									value={last_visited ? last_visited : ''}
									onChange={(e) => setLastVisited(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='purchasedate'>
								<Form.Label>Purchase Date</Form.Label>
								<Form.Control
									type='number'
									value={purchase_data ? purchase_data : ''}
									onChange={(e) => setPurchaseDate(e.target.value)}
								></Form.Control>
							</Form.Group>
							{loading && <Loader />}

							{error && <Message variant='danger'>{error}</Message>}
							{prediction &&
								(prediction.target ? (
									<div>
										<Message variant='success'>
											Yes, Customer will convert.
										</Message>
									</div>
								) : (
									<div>
										<Message variant='danger'>No</Message>
									</div>
								))}

							<Button disabled={loading} type='submit' variant='primary'>
								Submit
							</Button>
						</Form>
					</ListGroup.Item>
				</ListGroup>
			</FormContainer>
		</div>
	);
};

export default HomeScreen;
