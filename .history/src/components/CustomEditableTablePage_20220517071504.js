import {useState} from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Heading,
  Text,
  Tag,
} from '@chakra-ui/react';
import { useTableContent } from './useTableContent';
import { useEditableTableContent } from './useEditableTableContent';

function CustomEditableTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

function CustomEditableTablePage() {
  const [isError, setIsError] = useState(false);
  const { columns, data: serverData } = useEditableTableContent();

  const [data, setData] = React.useState(serverData);
  const [originalData] = React.useState(data);

  const resetData = () => setData(originalData);
  return (
    <>
      <Heading>
        CustomEditableTable<Tag>useEditableTableContent</Tag>
      </Heading>

      <button onClick={resetData}>Reset Data</button>
      <CustomEditableTable columns={columns} data={data} />
    </>
  );
}

export default CustomEditableTablePage;
