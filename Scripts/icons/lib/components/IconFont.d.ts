import * as React from 'react';
import { IconBaseProps } from './Icon';
export interface CustomIconOptions {
    scriptUrl?: string;
    extraCommonProps?: {
        [key: string]: any;
    };
}
interface IconFontProps extends IconBaseProps {
    type: string;
}
export default function create(options?: CustomIconOptions): React.SFC<IconFontProps>;
export {};
