import React from 'react';
import styled from 'styled-components';
import { useSortBy, useTable } from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Heading,
} from '@chakra-ui/react';
import { useTableContent } from './useTableContent';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
function SortingTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      // add
      useSortBy
    );

  // getHeaderPropsに column.getSortByToggleProps() を渡す
  // Headerのcolumnの隣にsort用アイコンを追加
  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // <Th {...column.getHeaderProps()}>
              // edit ↓
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {/*  edit ↑ */}
                {column.render('Header')}
                {/* add ↓ */}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
                {/* add ↑ */}
              </Th>
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
                return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

function SortingTablePage() {
  const { columns, data } = useTableContent();
  return (
    <>
      <Heading>SortingTablePage</Heading>
      <SortingTable columns={columns} data={data} />
    </>
  );
}

export default SortingTablePage;
