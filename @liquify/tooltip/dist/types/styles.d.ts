import { ReactElement } from 'react';
import { PlacementType } from './PlacementType';
export interface IStyledTooltipProps {
    children: any;
    className?: string;
    hasContent?: boolean;
    hasTitle?: boolean;
    placement: PlacementType;
    textColor?: string;
    title: ReactElement;
    maxWidth?: string;
}
export declare const StyledTooltip: import("styled-components").StyledComponent<(props: import("./StylableTooltip").IStylableTooltipProps) => JSX.Element, import("styled-components").DefaultTheme, IStyledTooltipProps, never>;
export declare const StyledDiv: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const StyledTitleSpan: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {}, never>;
export declare const StyledSpacerSpan: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {
    hasTitle: boolean;
    hasContent: boolean;
}, never>;
export declare const StyledContentSpan: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {}, never>;
