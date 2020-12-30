const getColumns = (FIELDS) => {
  const DEFAULT_COLUMNS = Object.keys(FIELDS).filter((key) => FIELDS[key].inTable);

  const columns = DEFAULT_COLUMNS.map((key) => ({
    title: FIELDS[key].title || FIELDS[key].label,
    dataIndex: key,
    width: FIELDS[key].width || 100,
    sorter: (a, b) => {
      const [aString, bString] = [a, b].map((row) => (row[key] || '').toString());
      return aString.localeCompare(bString);
    },
  }));

  return columns;
}

export default getColumns;