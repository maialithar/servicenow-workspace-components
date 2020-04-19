import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';
import calendarActions from './actions';

createCustomElement('x-94086-calendar-component', {
	renderer: {type: snabbdom},
	view,
	styles,
	...calendarActions
});
