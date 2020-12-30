import moment from 'moment';

const timeFormatter = (format) => (value) => {
  const formatTemplate = {
    dateTime: 'DD/MM/YYYY HH:mm:ss',
    date: 'DD/MM/YYYY',
  }[format];

  return moment(value).format(formatTemplate);
};

export default timeFormatter;