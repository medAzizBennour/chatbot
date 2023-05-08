import * as React from 'react';
export interface IBaseButtonProps {
    type?: 'primary' | 'secondary' | 'tertiary' | 'success';
    /** Use this proprety if you want to define a text only button */
    label: string;
    /** icon name to be displayed */
    icon?: React.ReactElement;
    /** Define the height of the button in pixels */
    size?: number;
    /** Whether the button is non-interactive */
    disabled?: boolean;
    /** Click function definition */
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    tabIndex?: number;
    /** Whether the button should be focused
     * @default false
     */
    autoFocus?: boolean;
}
declare function IconLabelButton(props: IBaseButtonProps): JSX.Element;
declare namespace IconLabelButton {
    var defaultProps: {
        type: string;
        size: number;
        disabled: boolean;
    };
    var displayName: string;
}
export default IconLabelButton;
