import { ThemedStyledProps } from 'styled-components';
export interface IThemeInterface {
    isLVStyle?: boolean;
    brand: {
        [key: string]: {
            [key: string]: string;
        };
    };
    colors: {
        [key: string]: string;
    };
    font: {
        [key: string]: string;
    };
    text: {
        default: string;
        muted: string;
        inverted: string;
        disabled: string;
    };
    background: {
        default: string;
        dark: string;
        light: string;
    };
    forms: {
        input: {
            background: string;
            disabled: string;
            focus: string;
            placeholder: string;
            outline: string;
        };
    };
    navigation: {
        text: {
            default: string;
            hover: string;
        };
    };
    components: {
        highlighter: string;
    };
}
export declare type MyThemeProps<P> = ThemedStyledProps<P, IThemeInterface>;
