interface IStyledStatusContent {
    isSelected: boolean;
    isEmpty?: boolean;
}
interface IWrapperProps {
    tabWidth?: number;
}
export declare const Wrapper: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, IWrapperProps, never>;
export declare const ContentWrapper: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, IStyledStatusContent, never>;
export declare const ItemLabel: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {}, never>;
export declare const Item: import("styled-components").StyledComponent<"li", import("styled-components").DefaultTheme, {}, never>;
export {};
