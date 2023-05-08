interface IStyledGridProps {
    theme: any;
    useNormalDomLayout: boolean;
    showBorderBottom: boolean;
    gridHeight: string;
    scrolling: string;
    rowHeight: number;
    gridWidth: number;
    headerColor?: string;
    headerTextColor?: string;
    focusableCells?: boolean;
}
export declare const GridWrapper: import("styled-components").StyledComponent<"div", any, IStyledGridProps, never>;
export {};
