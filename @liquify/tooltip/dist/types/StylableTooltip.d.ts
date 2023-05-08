import { ReactElement } from 'react';
import { PlacementType } from './PlacementType';
export interface IStylableTooltipProps {
    children: any;
    className?: string;
    placement: PlacementType;
    title: ReactElement<any>;
}
declare const StylableTooltip: (props: IStylableTooltipProps) => JSX.Element;
export default StylableTooltip;
