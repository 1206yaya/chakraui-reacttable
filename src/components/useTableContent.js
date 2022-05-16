import React from 'react';

export const useTableContent = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
    ],
    []
  );

  const data = [
    {
      firstName: 'e',
      lastName: '1',
    },
    {
      firstName: 'a',
      lastName: '3',
    },
    {
      firstName: 'c',
      lastName: '2',
    },
  ];
  return { columns, data };
};
