import {createHttpEffect} from '@servicenow/ui-effect-http';

export const SCHEDULE_FETCH_SUCCESS = 'SCHEDULE_FETCH_SUCCESS';
export const SCHEDULE_FETCH_ERROR = 'SCHEDULE_FETCH_ERROR';
export const SCHEDULE_FETCH_START = 'SCHEDULE_FETCH_START';
export const SCHEDULE_FETCH_PROGRESS = 'SCHEDULE_FETCH_PROGRESS';
export const SCHEDULE_FETCH_REQUEST = 'SCHEDULE_FETCH_REQUEST';

export const getSchedules = createHttpEffect(
	'/api/now/table/cmn_schedule_blackout', {
		method: 'GET',
		headers: {},
		pathParams: [],
		dataParam: 'data',
		successActionType: SCHEDULE_FETCH_SUCCESS,
		errorActionType: SCHEDULE_FETCH_ERROR,
		startActionType: SCHEDULE_FETCH_START,
		progressActionType: SCHEDULE_FETCH_PROGRESS
	}
);
