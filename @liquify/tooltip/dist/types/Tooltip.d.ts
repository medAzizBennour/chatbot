import { PlacementType } from './PlacementType';
export interface ITooltipProps {
    /** The tooltip content */
    children: any;
    /** Where to place the tooltip.  Valid values are 'bottom-start'
     * @default 'bottom-start'
     */
    placement?: PlacementType;
    /** The title of the tooltip
     * @default 'none'
     */
    title?: string;
    /** The content of the tooltip
     *  @default 'none'
     */
    className?: string;
    /** The content of the tooltip
     *  @default 'none'
     */
    content?: string | JSX.Element;
    /** Color of tooltip text
     * @default dead
     */
    textColor?: string;
    /**
     * Set custom max width
     * @default '360px'
     */
    maxWidth?: string;
}
export declare function Tooltip(props: ITooltipProps): JSX.Element;
export declare namespace Tooltip {
    var defaultProps: {
        placement: string;
    };
    var displayName: string;
}
export default Tooltip;
