import React from 'react';
import styled from 'styled-components';
import { usePagination, useTable } from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Heading,
  NumberInput,
  Text,
  Flex,
  NumberInputField,
  NumberInputStepper,
  IconButton,
  Tooltip,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from '@chakra-ui/react';
import { useTableContent } from './useTableContent';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

function CustomePaginationTable({
  columns,
  data,
  // ⚡⚡
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    // ⚡⚡
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      // ⚡⚡ ★★★ ページネーションの設定を変えたいときはここでOptionを指定
      // https://react-table.tanstack.com/docs/api/usePagination#table-options
      initialState: { pageIndex: 0, pageSize: 2 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    // ⚡⚡
    usePagination
  );
  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);
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
          {page.map((row, i) => {
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
          <Tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <Td colSpan="10000">Loading...</Td>
            ) : (
              <Td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
              </Td>
            )}
          </Tr>
        </Tbody>
      </Table>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}

      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            Page{' '}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{' '}
            of{' '}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink="0">Go to page:</Text>{' '}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value) => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
      {/*<div className="pagination">*/}
      {/*  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>*/}
      {/*    {'<<'}*/}
      {/*  </button>{' '}*/}
      {/*  <button onClick={() => previousPage()} disabled={!canPreviousPage}>*/}
      {/*    {'<'}*/}
      {/*  </button>{' '}*/}
      {/*  <button onClick={() => nextPage()} disabled={!canNextPage}>*/}
      {/*    {'>'}*/}
      {/*  </button>{' '}*/}
      {/*  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>*/}
      {/*    {'>>'}*/}
      {/*  </button>{' '}*/}
      {/*  <span>*/}
      {/*    Page{' '}*/}
      {/*    <strong>*/}
      {/*      {pageIndex + 1} of {pageOptions.length}*/}
      {/*    </strong>{' '}*/}
      {/*  </span>*/}
      {/*  <span>*/}
      {/*    | Go to page:{' '}*/}
      {/*    <input*/}
      {/*      type="number"*/}
      {/*      defaultValue={pageIndex + 1}*/}
      {/*      onChange={(e) => {*/}
      {/*        const page = e.target.value ? Number(e.target.value) - 1 : 0;*/}
      {/*        gotoPage(page);*/}
      {/*      }}*/}
      {/*      style={{ width: '100px' }}*/}
      {/*    />*/}
      {/*  </span>{' '}*/}
      {/*  <select*/}
      {/*    value={pageSize}*/}
      {/*    onChange={(e) => {*/}
      {/*      setPageSize(Number(e.target.value));*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    {[2, 10, 20, 30, 40, 50].map((pageSize) => (*/}
      {/*      <option key={pageSize} value={pageSize}>*/}
      {/*        Show {pageSize}*/}
      {/*      </option>*/}
      {/*    ))}*/}
      {/*  </select>*/}
      {/*</div>*/}
    </>
  );
}

function CustomePaginationTablePage() {
  const { columns, data: serverData } = useTableContent();
  const [data, setData] = React.useState(serverData);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    console.log(
      'pageCount, pageSize, pageIndex',
      pageCount,
      pageSize,
      pageIndex
    );

    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(serverData.slice(startRow, endRow));
        setPageCount(Math.ceil(serverData.length / pageSize));
        console.log(Math.ceil(serverData.length / pageSize));
        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <>
      <Heading>CustomePaginationTable</Heading>
      <CustomePaginationTable
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </>
  );
}

export default CustomePaginationTablePage;
