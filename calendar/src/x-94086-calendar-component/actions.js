import {
	SCHEDULE_FETCH_SUCCESS,
	SCHEDULE_FETCH_ERROR,
	SCHEDULE_FETCH_START,
	SCHEDULE_FETCH_PROGRESS,
	SCHEDULE_FETCH_REQUEST
} from './schedule'
import {actionTypes} from '@servicenow/ui-core';
import Calendar from 'tui-calendar';
import {createHttpEffect} from '@servicenow/ui-effect-http';

const getSchedules = createHttpEffect(
	'/api/now/table/cmn_schedule_blackout', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		pathParams: [],
		dataParam: 'data',
		successActionType: SCHEDULE_FETCH_SUCCESS,
		errorActionType: SCHEDULE_FETCH_ERROR,
		startActionType: SCHEDULE_FETCH_START,
		progressActionType: SCHEDULE_FETCH_PROGRESS
	}
);

export default {
	actionHandlers: {
		[actionTypes.COMPONENT_BOOTSTRAPPED]: ({dispatch}) => {
			dispatch(SCHEDULE_FETCH_REQUEST);
		},
		[actionTypes.COMPONENT_RENDERED]: {
			effect({state, action: {payload: {host}}, dispatch}) {
				dispatch(SCHEDULE_FETCH_START);

				var calendar = new Calendar(host.shadowRoot.childNodes[0], {
					defaultView: 'month',
					taskView: true,
					template: {
						monthDayname: function(dayname) {
							return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
						}
					},
					isReadOnly: true,
					month: {
						startDayOfWeek: 1,
						narrowWeekend: true,
						visibleScheduleCount: 3
					}
				});
			}
		},
		[actionTypes.COMPONENT_ERROR_THROWN]: ({action: {payload}}) => {
			console.log(payload)
		},
		[SCHEDULE_FETCH_SUCCESS]: ({action, updateState}) => {
			console.log(action);
			console.log(updateState);
		},
		[SCHEDULE_FETCH_ERROR]: ({action, updateState}) => {
			console.log(action);
			console.log(updateState);
		},
		[SCHEDULE_FETCH_START]: ({action, updateState}) => {
			console.log(action);
			console.log(updateState);
		},
		[SCHEDULE_FETCH_PROGRESS]: ({action, updateState}) => {
			console.log(action);
			console.log(updateState);
		},
		[SCHEDULE_FETCH_REQUEST]: ({action, updateState}) => {
			console.log(action);
			console.log(updateState);
			console.log(getSchedules);
			createHttpEffect(
				'/api/now/table/cmn_schedule_blackout', {
					method: 'GET',
					headers: {},
					pathParams: [],
					dataParam: 'data',
					batch: false,
					successActionType: SCHEDULE_FETCH_SUCCESS,
					errorActionType: SCHEDULE_FETCH_ERROR,
					startActionType: SCHEDULE_FETCH_START,
					progressActionType: SCHEDULE_FETCH_PROGRESS
				}
			);
		},
	}
}
