// import {
//   PartialGenerics,
//   CoreColumnDef,
//   CoreColumn,
//   VisibilityColumnDef,
//   FiltersColumnDef,
//   ColumnPinningColumnDef,
//   SortingColumnDef,
//   GroupingColumnDef,
//   ColumnSizingColumnDef,
//   ColumnVisibilityColumn,
//   ColumnPinningColumn,
//   FiltersColumn,
//   SortingColumn,
//   GroupingColumn,
//   ColumnSizingColumn,
//   ColumnDef
// } from "@tanstack/react-table";

// interface ExtColumn {
//   className?: string;
//   style?: React.CSSProperties;
//   disableAggregateNumber?: boolean;
//   popupText?: string | JSX.Element;
//   hideAggregatedRows?: boolean;
//   textAlign?: "center" | "left" | "right";
//   // renderDepth?: {
//   //   [key: number]: (cell: CellProps<T>) => boolean | JSX.Element;
//   // };
// }

// declare module "@tanstack/react-table" {
//   export interface ColumnDef<TGenerics extends PartialGenerics> {
//     className?: string;
//     style?: React.CSSProperties;
//     disableAggregateNumber?: boolean;
//     popupText?: string | JSX.Element;
//     hideAggregatedRows?: boolean;
//     textAlign?: "center" | "left" | "right";
//   }
//   export interface Column<TGenerics extends PartialGenerics>
//     extends ColumnDef<TGenerics>,
//       CoreColumn<TGenerics>,
//       ColumnVisibilityColumn,
//       ColumnPinningColumn,
//       FiltersColumn<TGenerics>,
//       SortingColumn<TGenerics>,
//       GroupingColumn<TGenerics>,
//       ColumnSizingColumn<TGenerics>,
//       ExtColumn {}
// }
