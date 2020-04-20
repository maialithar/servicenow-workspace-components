import {createHttpEffect} from '@servicenow/ui-effect-http';

export const SCHEDULE_FETCH_SUCCESS = 'SCHEDULE_FETCH_SUCCESS';
export const SCHEDULE_FETCH_ERROR = 'SCHEDULE_FETCH_ERROR';
export const SCHEDULE_FETCH_START = 'SCHEDULE_FETCH_START';
export const SCHEDULE_FETCH_PROGRESS = 'SCHEDULE_FETCH_PROGRESS';
export const SCHEDULE_FETCH_REQUEST = 'SCHEDULE_FETCH_REQUEST';

export const SCHEDULE_ENTRY_FETCH_SUCCESS = 'SCHEDULE_ENTRY_FETCH_SUCCESS';
export const SCHEDULE_ENTRY_FETCH_ERROR = 'SCHEDULE_ENTRY_FETCH_ERROR';
export const SCHEDULE_ENTRY_FETCH_START = 'SCHEDULE_ENTRY_FETCH_START';
export const SCHEDULE_ENTRY_FETCH_PROGRESS = 'SCHEDULE_ENTRY_FETCH_PROGRESS';
export const SCHEDULE_ENTRY_FETCH_REQUEST = 'SCHEDULE_ENTRY_FETCH_REQUEST';

export const getSchedules = createHttpEffect(
	'/api/now/table/cmn_schedule?sysparm_query=:query', {
		method: 'GET',
		pathParams: ['query'],
		dataParam: 'data',
		batch: false,
		successActionType: SCHEDULE_FETCH_SUCCESS,
		errorActionType: SCHEDULE_FETCH_ERROR,
		startActionType: SCHEDULE_FETCH_START,
		progressActionType: SCHEDULE_FETCH_PROGRESS
	}
);

export const getScheduleEntry = createHttpEffect(
	'/api/now/table/cmn_schedule_span?sysparm_query=:query&sysparm_type=:type&sysparm_scheduleName=:scheduleName', {
		method: 'GET',
		pathParams: ['query', 'type', 'scheduleName'],
		batch: false,
		successActionType: SCHEDULE_ENTRY_FETCH_SUCCESS,
		errorActionType: SCHEDULE_ENTRY_FETCH_ERROR,
		startActionType: SCHEDULE_ENTRY_FETCH_START,
		progressActionType: SCHEDULE_ENTRY_FETCH_PROGRESS
	}
);
