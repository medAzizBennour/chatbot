import { Intent, Size, Shape } from '@liquify/utils';
export interface IBadgeProps {
    /** define badge color from brand colors */
    intent: Intent;
    /** The maximum value to display. If value is 100, and max is 20, "20+" will be displayed */
    max?: number;
    /** the value of the badge */
    value?: number | string;
    /** if true the badge will pulsate, this is useful to indicate count changes */
    notify?: boolean;
    /** define custom background color.\n this will overwrite `appearance` proprety */
    bgcolor?: string;
    /** define custom text color. \n this will overwrite `appearance` proprety */
    textcolor?: string;
    /** Whether the badge have equal width and height */
    isSquare?: boolean;
    /** Whether the badge is dysblayed as a dot `same as a notification without a content` */
    isDot?: boolean;
    /** badge size */
    size?: Size;
    /** badge shape */
    shape?: Shape;
    /** badge variant */
    variant?: 'minimal' | 'default';
}
export declare function Badge(props: IBadgeProps): JSX.Element | null;
export declare namespace Badge {
    var defaultProps: {
        intent: "primary";
        max: number;
        value: undefined;
        shape: "pill";
    };
    var displayName: string;
}
export default Badge;
