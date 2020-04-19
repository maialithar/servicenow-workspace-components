import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';
import Calendar from 'tui-calendar';

const {COMPONENT_RENDERED, COMPONENT_ERROR_THROWN} = actionTypes;

createCustomElement('x-94086-calendar-component', {
	renderer: {type: snabbdom},
	view,
	styles,
	actionHandlers: {
		[COMPONENT_RENDERED]: {
			effect({state, action: {payload: {host}}}) {
				var calendar = new Calendar(host.shadowRoot.childNodes[0].childNodes[1], {
					defaultView: 'month',
					taskView: true,
					template: {
						monthDayname: function(dayname) {
							return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
						}
					},
					isReadOnly: true,
					MonthOptions: {
						startDayOfWeek: 1,
						narrowWeekend: true,
						visibleScheduleCount: 3
					}
				});
			}
		},
		[COMPONENT_ERROR_THROWN]: ({action: {payload}}) => {
			console.log(payload)
		}
	}
});
