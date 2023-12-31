declare type display = 'currency' | 'percent' | undefined;
export interface NumberFormatterProps {
    /** the value to format */
    value?: number;
    /** currency code (required for currency formatter) */
    currency?: string;
    /** minimum digits to show for decimal values
     * @default 2
     * */
    minimumFraction?: number;
    /** maximum digits to show for decimal values
     * @default 2
     * */
    maximumFraction?: number;
    /** formatting style for negative number
     * @default 'parenthesis'
     * */
    negativeFormat?: 'sign' | 'parenthesis';
    /** show negative number in red color
     * @default true
     * */
    withNegativeStyle?: boolean;
    /** show positive number in green color
     * @default false
     * */
    withPositiveStyle?: boolean;
    /** region/locale
     * @default 'en-US'
     * */
    locale?: string;
    /** return formatted value in html format
     * @default false
     * */
    html?: boolean;
    /** remove trailing zeros from decimal values
     * @default true
     * */
    truncateZeros?: boolean;
    /** display big numbers in friendly format (1000 => 1K)
     * @default false
     * */
    compact?: boolean;
    /**  Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. Possible values are true and false.
     * @default true
     * */
    useGrouping?: boolean;
    /**  If the value is not available, display the string if parameter is set.
     * @default "--"
     * */
    blankPlaceholder?: string;
}
export declare const prettyBignumbers: (value: number, sign?: string) => string;
export declare const numberFormatter: (params: NumberFormatterProps, display?: display) => string | JSX.Element;
export declare const currencyFormatter: (params: NumberFormatterProps) => string | JSX.Element;
export declare const percentFormatter: (params: NumberFormatterProps) => string | JSX.Element;
export {};
