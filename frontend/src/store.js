import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { predictionCreateReducer } from './reducers/predictionReducers';

const reducer = combineReducers({
	predictionCreate: predictionCreateReducer,
});

const predictionTargetFromStorage = localStorage.getItem('predictedValue')
	? JSON.parse(localStorage.getItem('predictedValue'))
	: null;
const initialState = {
	predictionCreate: {
		predictedValue: predictionTargetFromStorage,
	},
};
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
