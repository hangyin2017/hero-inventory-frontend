import moment from 'moment';

const timeFormatter = {
  dateTime: (value) => moment(value).format('YYYY-MM-DD HH:mm:ss'),
  date: (value) => moment(value).format('YYYY-MM-DD'),
};

export default timeFormatter;