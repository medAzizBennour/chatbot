import { PopoverOrigin } from '@material-ui/core';
export interface IMenuItem {
    text: string | JSX.Element;
    handler?: () => void;
    disabled?: boolean;
}
export interface IPopupMenuProps {
    /** Options list with handler and text */
    menuList: IMenuItem[];
    /**
     * Anchor element which opens the menu
     * @default null
     */
    anchorEl?: any;
    /** On close function definition */
    onClose?: () => void;
    /**
     * Determines if the popup menu is open
     * @default false
     */
    isOpen: boolean;
    /**
     * This is the point on the popover which will attach to the anchor's origin vertically.
     * @default 'top'
     */
    anchorOriginVertical?: PopoverOrigin['vertical'];
    /**
     * This is the point on the anchor where the popover's anchorEl will attach to horizontally.
     * @default 'left'
     */
    anchorOriginHorizontal?: PopoverOrigin['horizontal'];
    /**
     * This is the point on the popover which will attach to the anchor's origin vertically.
     * @default 'top'
     */
    transformOriginVertical?: PopoverOrigin['vertical'];
    /**
     * This is the point on the popover which will attach to the anchor's origin horizontally.
     * @default 'left'
     */
    transformOriginHorizontal?: PopoverOrigin['horizontal'];
    /**
     * Get content of the anchor element
     * @default null
     */
    contentAnchorEl?: null | ((element: Element) => Element);
    /**  The width  @default  */
    width?: string;
}
export declare function PopupMenu(props: IPopupMenuProps): JSX.Element;
export declare namespace PopupMenu {
    var defaultProps: {
        anchorEl: null;
        isOpen: boolean;
        anchorOriginVertical: number | "center" | "top" | "bottom";
        anchorOriginHorizontal: number | "left" | "center" | "right";
        transformOriginVertical: number | "center" | "top" | "bottom";
        transformOriginHorizontal: number | "left" | "center" | "right";
    };
    var displayName: string;
}
export default PopupMenu;
