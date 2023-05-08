import { IThemeInterface } from './utils/themes';
interface IProps {
    theme?: IThemeInterface;
    children?: any;
    useGlobalStyle?: boolean;
}
declare const ThemeProvider: {
    ({ theme, children, useGlobalStyle }: IProps): JSX.Element;
    defaultProps: {
        useGlobalStyle: boolean;
    };
    displayName: string;
};
export default ThemeProvider;
