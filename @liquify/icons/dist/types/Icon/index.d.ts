import { ColorPalette } from '@liquify/theme';
import React from 'react';
export interface IconProps extends React.SVGAttributes<SVGElement> {
    /** icon size */
    size: number;
    /** the icon first color if not provided it will take default brand colors */
    color?: string;
    /** Color from the Liquify ColorPalette. If provided, overrides the color property */
    paletteColor?: ColorPalette;
    /** name of the icon  */
    name?: string;
    /** whether animate the icon  */
    animate?: boolean;
    /** label for aria-label attribute */
    label?: string;
    /** custom classes */
    className?: string;
}
export declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<"svg">>;
export default Icon;
