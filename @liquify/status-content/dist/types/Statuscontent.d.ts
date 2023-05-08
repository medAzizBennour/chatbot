export interface IStatus {
    label: string;
    value: number;
}
export interface IStatusContentProps {
    /**
     * Array of IStatus
     */
    content: IStatus[];
    /**
     * Action to take when selection is changed
     */
    changeSelection: (selector: string) => void;
    /**
     * Array of selected tab names
     * @default empty
     */
    selectedTabs: string[];
    /**
     * Width of the tabs, in pixels
     * @default 96
     */
    tabWidth?: number;
}
export declare function StatusContent(props: IStatusContentProps): JSX.Element;
export declare namespace StatusContent {
    var displayName: string;
}
export default StatusContent;
