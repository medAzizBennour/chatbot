import { GetContextMenuItems, ICellRendererComp, ICellRendererFunc, ModelUpdatedEvent, RowNode } from 'ag-grid-community';
import React from 'react';
import './ag-grid-community/ag-grid.css';
import { ColDef, ColGroupDef } from './ag-grid-community/colDefs';
interface IState {
    scrolling: boolean;
    useNormalDomLayout: boolean;
    showBorderBottom: boolean;
    scrollFixed: boolean;
    gridWidth: number;
}
interface IRowData {
    id: string;
}
export interface IGridProps {
    /**
     * When set to true, rows changes are animated
     * @default true
     */
    animateRows?: boolean;
    /**
     * Automatically resize column width based on content
     * @default false
     */
    autoSizeColumns?: boolean;
    /**
     * Column IDs to exclude from auto resize
     * @default Empty[]
     */
    excludeColumnsFromAutoSize?: string[];
    /**
     * Data provided to the grid.
     * @default Empty[]
     */
    rowData?: IRowData[];
    /**
     * Height of each row, in pixels. If not set, defaults to 45.
     */
    rowHeight?: number;
    /**
     * Defines how the grid columns will look like
     */
    columnDefs: Array<ColDef | ColGroupDef>;
    /**
     * Object which defines components to render the data
     * @default {}
     */
    frameworkComponents?: any;
    /**
     * Function to execute upon grid becoming ready
     */
    gridReady?: (params: any) => void;
    /**
     * Cb when row is clicked once
     */
    onRowClicked?: (row: any) => void;
    /**
     * Cb when row is double clicked
     */
    onRowDoubleClicked?: (row: any) => void;
    /**
     * Cb when selection has changed
     */
    onSelectionChanged?: (rows: any) => void;
    /**
     * Cb when a column is resized
     */
    onColumnResized?: (params: any) => void;
    /**
     * Cb when the viewport changes
     */
    onViewportChanged?: (params: any) => void;
    /**
     * Max grid height
     */
    maxGridHeight?: number;
    /**
     * Function to determine if rowData should be filtered
     */
    isExternalFilterPresent?: () => boolean;
    /**
     * Function to filter the rowData
     */
    doesExternalFilterPass?: (node: any) => boolean;
    /**
     * Function to filter the rowData
     * @default false
     */
    disableDynamicLayout?: boolean;
    /**
     * Default column definition. Can be overridden by colDef.
     */
    defaultColDef?: any;
    /**
     * Callback to be ran when user finishes editing
     */
    onCellValueChanged?: any;
    /**
     * Edit by row or by cell
     * @default ''
     */
    editType?: string;
    /**
     * Allows user to edit by single click rather than double click
     * @default false
     */
    singleClickEdit?: boolean;
    /**
     * Finish editing and save values when grid loses focus
     * @default false
     */
    stopEditingWhenGridLosesFocus?: boolean;
    /**
     * Set the header height. Defaults to 40px
     */
    headerHeight?: number;
    /**
     * Set the header color. Defaults theme color panther
     */
    headerColor?: string;
    /**
     * Set the header text color. Defaults theme color super
     */
    headerTextColor?: string;
    /**
     * Set row data to pin to the top of the grid. (Can be multiple rows)
     */
    pinnedTopRowData?: IRowData[];
    /**
     * Set row data to pin to the bottom of the grid. (Can be multiple rows)
     */
    pinnedBottomRowData?: IRowData[];
    /**
     * Render a full width row
     * @default ''
     */
    fullWidthCellRenderer?: (new () => ICellRendererComp) | ICellRendererFunc | string;
    /**
     * Function to to tell the grid which rows should be treated as fullWidth
     */
    isFullWidthCell?(rowNode: RowNode): boolean;
    /**
     * Extend onModelUpdated
     */
    onModelUpdated?: (event: ModelUpdatedEvent) => void;
    /**
     * Enable styles of cell focus
     */
    focusableCells?: boolean;
    /**
     * Context menu items
     */
    getContextMenuItems?: GetContextMenuItems;
    /**
     * Specific row class rules
     */
    rowClassRules?: {
        [cssClassName: string]: ((params: any) => boolean) | string;
    };
    /**
     * Show or hide context menu (ag-grid enterprise only)
     */
    suppressContextMenu?: boolean;
    /**
     * Enable or disabled multiselection
     * @default multiple
     */
    rowSelection?: 'single' | 'multiple';
}
export default class Grid extends React.Component<IGridProps, IState> {
    static defaultProps: {
        rowData: undefined;
        frameworkComponents: {};
        disableDynamicLayout: boolean;
        autoSizeColumns: boolean;
        animateRows: boolean;
    };
    private _timer;
    private gridApi;
    private gridColumnApi;
    private gridComponentRef;
    constructor(props: IGridProps);
    componentDidMount: () => void;
    componentWillUnmount: () => void;
    handleScroll: () => void;
    handleResize: () => void;
    shouldScrollBeFixed: () => boolean;
    autoSizeAll: () => void;
    onGridReady: (params: any) => void;
    setGridDomLayout: () => void;
    calculateGridLayout: (event: ModelUpdatedEvent) => void;
    renderGrid: () => JSX.Element;
    render(): JSX.Element | null;
    onRowClicked: (params: any) => void;
    onRowDoubleClicked: (params: any) => void;
    onSelectionChanged: (params: any) => void;
}
export {};
