import axios from 'axios';
import {
	PREDICTION_REQUEST,
	PREDICTION_SUCCESS,
	PREDICTION_FAIL,
} from '../constants/predictionConstants';

export const createPrediction =
	({
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
	}) =>
	async (dispatch) => {
		try {
			dispatch({
				type: PREDICTION_REQUEST,
			});
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};
			console.log({
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
			});
			const { data } = await axios.post('/api/predict/', {
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
			});
			// console.log(data);
			dispatch({
				type: PREDICTION_SUCCESS,
				payload: data,
			});
			localStorage.setItem('predictedValue', JSON.stringify(data.target));
		} catch (error) {
			dispatch({
				type: PREDICTION_FAIL,
				payload:
					error.response && error.response.data.detail
						? error.response.data.detail
						: error.message,
			});
		}
	};
