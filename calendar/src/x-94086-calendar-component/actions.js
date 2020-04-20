import * as schedule from './schedule'
import {actionTypes} from '@servicenow/ui-core';
import CalendarComponent from './Calendar';

var calendarComponent = CalendarComponent;

export default {
	actionHandlers: {
		[actionTypes.COMPONENT_BOOTSTRAPPED]: ({dispatch}) => {
			dispatch(schedule.SCHEDULE_FETCH_REQUEST, {query: 'typeINblackout,maintenance'});
		},
		[actionTypes.COMPONENT_RENDERED]: {
			effect({state, action: {payload: {host}}, dispatch}) {
				dispatch(schedule.SCHEDULE_FETCH_START);
				calendarComponent.createCalendar(host.shadowRoot.childNodes[0]);
			}
		},
		[actionTypes.COMPONENT_ERROR_THROWN]: ({action: {payload}}) => {},
		[schedule.SCHEDULE_FETCH_REQUEST]: schedule.getSchedules,
		[schedule.SCHEDULE_ENTRY_FETCH_REQUEST]: schedule.getScheduleEntry,
		[schedule.SCHEDULE_FETCH_SUCCESS]: ({action, dispatch}) => {
			for (var singleSchedule of action.payload.result){
				dispatch(schedule.SCHEDULE_ENTRY_FETCH_REQUEST, {
					query: 'schedule=' + singleSchedule.sys_id, 
					type: singleSchedule.type,
					scheduleName: singleSchedule.name
				});
			} 
		},
		[schedule.SCHEDULE_FETCH_ERROR]: ({action, updateState}) => {},
		[schedule.SCHEDULE_FETCH_START]: ({action, updateState}) => {},
		[schedule.SCHEDULE_FETCH_PROGRESS]: ({action, updateState}) => {},
		[schedule.SCHEDULE_ENTRY_FETCH_SUCCESS]: ({action}) => {
			let type = action.meta.request.updatedUrl.split('&')[1].split('sysparm_type=')[1];
			let scheduleName = decodeURI(action.meta.request.updatedUrl.split('&')[2].split('sysparm_scheduleName=')[1]);
			for (var singleEntry of action.payload.result){
				let dateStart = singleEntry.start_date_time;
				let dateEnd = singleEntry.end_date_time;
				let startDay = singleEntry.days_of_week;
				let duration = 0;
				let recurringDates = [];
				
				dateStart = dateStart.slice(0, 4) + '-' + dateStart.slice(4, 6) + '-' + dateStart.slice(6, 11) + ':' + dateStart.slice(11, 13) + ':' + dateStart.slice(13, 15);
				dateEnd = dateEnd.slice(0, 4) + '-' + dateEnd.slice(4, 6) + '-' + dateEnd.slice(6, 11) + ':' + dateEnd.slice(11, 13) + ':' + dateEnd.slice(13, 15);
				duration = new Date(dateEnd) - new Date(dateStart);
				recurringDates = calendarComponent.recurringDates(new Date(dateStart), new Date(), 7);

				for (var startRecDate of recurringDates) {
					calendarComponent.calendar.createSchedules([{
						id: singleEntry.sys_id,
						calendarId: type,
						title: scheduleName,
						category: 'time',
						dueDateClass: '',
						start: startRecDate,
						end: startRecDate + duration,
						recurrenceRule: singleEntry.repeat_type,
						isAllDay: singleEntry.all_day,
						state: 'busy'
					}]);
				}
			}
		}
	}
}
