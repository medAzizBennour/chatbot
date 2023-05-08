import { NumberFormatterProps } from '../numberFormatter';
export interface PercentageFormatterProps extends Omit<NumberFormatterProps, 'value'> {
    value?: number;
    blankPlaceholder?: string;
}
export declare const formattedPercentage: (params: PercentageFormatterProps) => string | JSX.Element;
