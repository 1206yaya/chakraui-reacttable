import React, { memo } from 'react';
import { Input } from '@chakra-ui/react';
const invalid = (changedVal) => {
  if (!changedVal.match(/^[0-9]+$/)) {
    return true;
  }
  return false;
};
// Create an editable cell renderer
export const EditableCell = (
  {
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  },
  onError
) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    const changedVal = e.target.value;

    setValue(changedVal);
    if (invalid(changedVal)) {
      onError(true);
    } else {
      onError(false);
    }
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <Input value={value} onChange={onChange} onBlur={onBlur} />;
};
export const useEditableTableContent = (onError) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
            Cell: memo((props) => EditableCell(props, onError)),
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
