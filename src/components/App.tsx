import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import BasicTablePage from './BasicTablePage';
import SortingTablePage from './SortingTablePage';
import PaginationTablePage from './PaginationTablePage';
import CustomePaginationTablePage from './CustomePaginationTablePage';
import EditableTablePage from './EditableTablePage';
import CustomEditableTablePage from './CustomEditableTablePage';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BasicTablePage />
    <SortingTablePage />
    <PaginationTablePage />
    <CustomePaginationTablePage />
    <EditableTablePage />
    <CustomEditableTablePage />
  </ChakraProvider>
);
