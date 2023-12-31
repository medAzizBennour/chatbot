/// <reference types="react" />
export declare const DISPLAYNAME_PREFIX = "Liquify";
export declare const Intent: {
    DEFAULT: "default";
    PRIMARY: "primary";
    SECONDARY: "secondary";
    SUCCESS: "success";
    INFO: "info";
    WARNING: "warning";
    DANGER: "danger";
};
export declare type Intent = typeof Intent[keyof typeof Intent];
export declare const Appearance: {
    DEFAULT: "default";
    MINIMAL: "minimal";
    OUTLINE: "outline";
    MATERIAL: "material";
};
export declare type Appearance = typeof Appearance[keyof typeof Appearance];
export declare const Shape: {
    CIRCLE: "circle";
    ROUNDED: "rounded";
    PILL: "pill";
    RECTANGLE: "rectangle";
};
export declare type Shape = typeof Shape[keyof typeof Shape];
export declare const HtmlType: {
    SUBMIT: "submit";
    BUTTON: "button";
    REST: "reset";
};
export declare type HtmlType = typeof HtmlType[keyof typeof HtmlType];
export declare const Size: {
    SMALL: "small";
    MEDIUM: "medium";
    LARGE: "large";
};
export declare type Size = typeof Size[keyof typeof Size];
export declare const Flex: {
    /** Use initial to allow a flex item to shrink but not grow, taking into account its initial size */
    INITIAL: "initial";
    /** Use auto to allow a flex item to grow and shrink, taking into account its initial size */
    AUTO: "auto";
    /** Use block to allow a flex item to grow and shrink as needed, ignoring its initial size (recommanded for same size columns) */
    BLOCK: "block";
    /** Use none to prevent a flex item from growing or shrinking */
    NONE: "none";
    /** Use grow to allow a flex item to grow to fill any available space */
    GROW: "grow";
    /** Use shrink to allow a flex item to shrink if needed */
    SHRINK: "shrink";
};
export declare type Flex = typeof Flex[keyof typeof Flex];
export declare const Alignment: {
    /** left alignment */
    LEFT: "left";
    /** right alignment */
    RIGHT: "right";
    /** centred alignment */
    CENTER: "center";
};
export declare type Alignment = typeof Alignment[keyof typeof Alignment];
export interface IMediaQueries {
    MOBILE_BP: string;
    MOBILE_LANDSCAPE_BP: string;
    TABLET_BP: string;
    TABLET_LANDSCAPE_BP: string;
    DESK_BP: string;
    DESK_WIDE_BP: string;
}
export declare type IndicatorType = 'none' | 'error' | 'warning';
export interface IControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
    alignIndicator?: 'left' | 'right' | 'center';
    checked?: boolean;
    children?: React.ReactNode;
    defaultChecked?: boolean;
    disabled?: boolean;
    /** Ref handler that receives HTML `<input>` element backing this component. */
    inputRef?: (ref: HTMLInputElement | null) => any;
    inline?: boolean;
    label?: string;
    labelElement?: React.ReactNode;
    large?: boolean;
    onChange?: React.FormEventHandler<HTMLInputElement>;
    style?: React.CSSProperties;
    className?: string;
}
