import type { Internal } from '@strapi/types';
interface ComponentListProps {
    component: Internal.UID.Component;
    customRowComponent: any;
    firstLoopComponentUid?: string;
    isFromDynamicZone?: boolean;
    isNestedInDZComponent?: boolean;
}
export declare const ComponentList: ({ customRowComponent, component, isFromDynamicZone, isNestedInDZComponent, firstLoopComponentUid, }: ComponentListProps) => import("react/jsx-runtime").JSX.Element;
export {};
