import React from 'react';
export interface IStandaloneIconButtonProps {
    /** icon name to be displayed */
    icon: React.ReactElement;
    /** Define the size of the button in pixels */
    size?: number;
    /** Define the size of the icon in pixels */
    iconSize?: number;
    /** Whether the button is non-interactive */
    disabled?: boolean;
    /** Click function definition */
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    /** Mouse down function definition */
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    /** Define the tab index position in the source html */
    tabIndex?: number;
    /** Whether the button should be focused
     * @default false
     */
    autoFocus?: boolean;
}
declare function StandaloneIconButton(props: IStandaloneIconButtonProps): JSX.Element;
declare namespace StandaloneIconButton {
    var defaultProps: {
        size: number;
        disabled: boolean;
    };
    var displayName: string;
}
export default StandaloneIconButton;
