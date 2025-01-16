import type { Component, Components } from '../../../types';
import type { Internal } from '@strapi/types';
type ChildComponent = {
    component: Internal.UID.Component;
};
export type ComponentWithChildren = {
    component: Internal.UID.Component;
    childComponents: ChildComponent[];
};
declare const retrieveComponentsThatHaveComponents: (allComponents: Components) => ComponentWithChildren[];
declare const getComponentWithChildComponents: (component: Component) => ComponentWithChildren;
export { getComponentWithChildComponents, retrieveComponentsThatHaveComponents };
