import React from 'react';
import styled from 'styled-components';
import { Calendar, Card } from 'antd';

const cardStyle = {
  textAlign: 'center',
  borderRadius: 20,
};

const StyledCalendar = styled(Calendar)`
line-height:4
`

class DashboardCalendar extends React.Component {
  render() {
    return(
      <Card title="Calendar" style={cardStyle} hoverable={true}>
        <div className="CalendarCard">
          <StyledCalendar fullscreen={false} />
        </div>
      </Card>
    );
  };
}

export default DashboardCalendar;