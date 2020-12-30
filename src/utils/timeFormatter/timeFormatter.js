import moment from 'moment';

const timeFormatter = (format) => (value) => {
  const formatTemplate = {
    dateTime: 'YYYY-MM-DD HH:mm:ss',
    date: 'YYYY-MM-DD',
  }[format];

  return moment(value).format(formatTemplate);
};

export default timeFormatter;