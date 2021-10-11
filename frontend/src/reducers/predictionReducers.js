import {
	PREDICTION_REQUEST,
	PREDICTION_SUCCESS,
	PREDICTION_FAIL,
	PREDICTION_RESET,
} from '../constants/predictionConstants';

export const predictionCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PREDICTION_REQUEST:
			return { loading: true };

		case PREDICTION_SUCCESS:
			return { loading: false, success: true, prediction: action.payload };
		case PREDICTION_FAIL:
			return { loading: false, error: action.payload };
		case PREDICTION_RESET:
			return {};
		default:
			return state;
	}
};
