import React from 'react';
import { IMenuItem } from '@liquify/popup-menu';
interface IExpansionPanelSummaryProps {
    contextMenu?: IMenuItem[];
    children?: React.ReactNode;
    isMenuOpen?: boolean;
    id?: string;
}
declare const ExpansionPanelSummary: {
    (props: IExpansionPanelSummaryProps): JSX.Element;
    defaultProps: {};
    displayName: string;
};
export default ExpansionPanelSummary;
