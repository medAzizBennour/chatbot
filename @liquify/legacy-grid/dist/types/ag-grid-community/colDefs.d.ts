export interface AbstractColDef {
    /** The name to render in the column header */
    headerName?: string;
    /** Whether to show the column when the group is open / closed. */
    columnGroupShow?: string;
    /** CSS class for the header */
    headerClass?: string | string[] | ((params: any) => string | string[]);
    /** CSS class for the header */
    toolPanelClass?: string | string[] | ((params: any) => string | string[]);
    /** Expression or function to get the cells value. */
    headerValueGetter?: string | (() => void);
    /** Never set this, it is used internally by grid when doing in-grid pivoting */
    pivotKeys?: string[];
    /** Set to true to not include this column in the toolpanel */
    suppressToolPanel?: boolean;
    /** Tooltip for the column header */
    headerTooltip?: string;
    tooltipComponent?: string;
    tooltipComponentFramework?: any;
    tooltipComponentParams?: any;
}
export interface ColGroupDef extends AbstractColDef {
    /** Columns in this group */
    children: Array<ColDef | ColGroupDef>;
    /** Group ID */
    groupId?: string;
    /** Open by Default */
    openByDefault?: boolean;
    /** If true, group cannot be broken up by column moving, child columns will always appear side by side, however you can rearrange child columns within the group */
    marryChildren?: boolean;
    /** The custom header group component to be used for rendering the component header. If none specified the default ag-Grid is used */
    headerGroupComponent?: string;
    /** The custom header group component to be used for rendering the component header in the hosting framework (ie: React/Angular). If none specified the default ag-Grid is used */
    headerGroupComponentFramework?: any;
    /** The custom header group component to be used for rendering the component header. If none specified the default ag-Grid is used */
    headerGroupComponentParams?: any;
}
/****************************************************************
 * Don't forget to update ComponentUtil if changing this class. PLEASE!*
 ****************************************************************/
export interface ColDef extends AbstractColDef {
    /** The unique ID to give the column. This is optional. If missing, the ID will default to the field.
     *  If both field and colId are missing, a unique ID will be generated.
     *  This ID is used to identify the column in the API for sorting, filtering etc.
     */
    colId?: string;
    /** If sorting by default, set it here. Set to 'asc' or 'desc' */
    sort?: string;
    /** If sorting more than one column by default, the milliseconds when this column was sorted, so we know what order to sort the columns in. */
    sortedAt?: number;
    /** The sort order, provide an array with any of the following in any order ['asc','desc',null] */
    sortingOrder?: string[] | null;
    /** The field of the row to get the cells data from */
    field?: string;
    /**
     * A comma separated string or array of strings containing ColumnType keys which can be used as a template for a column.
     * This helps to reduce duplication of properties when you have a lot of common column properties.
     */
    type?: string | string[];
    /** Set to true for this column to be hidden. Naturally you might think, it would make more sense to call this field 'visible' and mark it false to hide,
     *  however we want all default values to be false and we want columns to be visible by default.
     */
    hide?: boolean;
    /** Whether this column is pinned or not. */
    pinned?: boolean | string;
    /** The field where we get the tooltip on the object */
    tooltipField?: string;
    /** Initial width, in pixels, of the cell */
    width?: number;
    /** Min width, in pixels, of the cell */
    minWidth?: number;
    /** Max width, in pixels, of the cell */
    maxWidth?: number;
    /** True if this column should stretch rows height to fit contents */
    autoHeight?: boolean;
    /** Class to use for the cell. Can be string, array of strings, or function. */
    cellClass?: any;
    /** An object of css values. Or a function returning an object of css values. */
    cellStyle?: any | ((params: any) => void);
    /** A function for rendering a cell. */
    cellRenderer?: any;
    cellRendererFramework?: any;
    cellRendererParams?: any;
    /** Cell editor */
    /** To group by this column by default, either provide an index (eg rowGroupIndex=1), or set rowGroup=true. */
    rowGroupIndex?: number;
    rowGroup?: boolean;
    /** Set to true to have the grid place the values for the group into the cell, or put the name of a grouped column to just show that group. */
    showRowGroup?: string | boolean;
    /** To pivot by this column by default, either provide an index (eg pivotIndex=1), or set pivot=true. */
    pivotIndex?: number;
    pivot?: boolean;
    /** Comparator function for custom sorting. */
    comparator?: (valueA: any, valueB: any, nodeA: any, nodeB: any, isInverted: boolean) => number;
    /** Set to true if sorting allowed for this column. */
    sortable?: boolean;
    reactNext?: boolean;
    resizable?: boolean;
    onRowClicked?(event: any): void;
    onRowDoubleClicked?(event: any): void;
    onSelectionChanged?(event: any): void;
}
