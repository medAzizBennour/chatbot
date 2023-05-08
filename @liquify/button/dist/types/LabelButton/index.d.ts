import { IBaseButtonProps } from '../IconLabelButton';
export interface ILabelButtonProps extends IBaseButtonProps {
}
declare const LabelButton: {
    (props: ILabelButtonProps): JSX.Element;
    defaultProps: {
        type: string;
        size: number;
        disabled: boolean;
        autoFocus: boolean;
    };
    displayName: string;
};
export default LabelButton;
