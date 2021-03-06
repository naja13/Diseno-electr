import React from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {Button } from 'react-bootstrap'

import moment from "moment";

export class Calendar extends React.Component {
    constructor(props) {
        super(props);

        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        
        this.state = {
            start: start,
            end: end
        }
        this.applyCallback = this.applyCallback.bind(this);
    }
    applyCallback(startDate, endDate) {
        this.setState({
            start: startDate,
            end: endDate
        })
        this.props.onSelectDate({start:startDate,end:endDate}); 
    }
    

    render() {
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        let ranges = {
            "Today Only": [moment(start), moment(end)],
            "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
            "3 Days": [moment(start).subtract(3, "days"), moment(end)]
        }
        let local = {
            "format": "DD-MM-YYYY HH:mm",
            "sundayFirst": true
        }
        let maxDate = moment(start).add(24, "hour")
        return (
            <div>
                <DateTimeRangeContainer
                    ranges={ranges}
                    start={this.state.start}
                    end={this.state.end}
                    local={local}
                    maxDate={maxDate}
                    applyCallback={this.applyCallback}
                >
                    <Button
                        id="formControlsTextB"
                        type="text"
                        label="Text" 

                    >Introducir el Rango de Tiempo</Button>
                </DateTimeRangeContainer>
            </div>
        );
    }
}

export default Calendar;