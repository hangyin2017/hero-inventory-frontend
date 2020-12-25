import React from 'react';
import styled from 'styled-components';
import { Calendar, Card } from "antd";

const cardStyle = {
  textAlign: 'center',
};

const StyledCalendar = styled(Calendar)`
line-height:4
`

class DashboardCalendar extends React.Component {

    onPanelChange(value, mode) {
        console.log(value, mode);
      }

    render() {
      return(
        <Card title="Calendar" style={cardStyle}>
          <div className="CalendarCard">
            <StyledCalendar fullscreen={false} onPanelChange={this.onPanelChange} />
          </div>
        </Card>
      );
    };
  }

  export default DashboardCalendar;