import React from 'react';
interface ExpansionPanelProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onChange?: (event: any, isOpen: boolean) => void;
    onDragStart?: () => void;
    onDragStop?: () => void;
    isMenuOpen?: boolean;
}
declare const ExpansionPanel: {
    (props: ExpansionPanelProps): JSX.Element;
    displayName: string;
};
export default ExpansionPanel;
