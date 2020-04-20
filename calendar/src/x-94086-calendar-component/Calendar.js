import Calendar from 'tui-calendar';

function addDays(date, days) {
    var newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}

const CalendarComponent = {
    calendarObj: '',
    createCalendar(domElement) {
        this.calendarObj = new Calendar(domElement, {
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
                visibleScheduleCount: 4
            },
            calendars: [
                {
                    id: 'blackout',
                    name: 'Blackout',
                    color: '#ffffff',
                    bgColor: '#000000'
                },{
                    id: 'maintenance',
                    name: 'Maintenance',
                    color: '#ff0000',
                    bgColor: '#00ff00'
                }
            ]
        });
    },
    get calendar() {
        return this.calendarObj;
    },
    set calendar(value) {
        this.calendarObj = value;
    },
    recurringDates(startDate, endDate, interval) {
        var date = startDate;
        var dates = [];
      
        while ((date = addDays(date, interval)) < endDate) {
            dates.push(date);
        }
      
        return dates;
    }
}

export default CalendarComponent;