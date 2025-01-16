/// <reference types="react" />
import { IconByType } from './AttributeIcon';
export declare const BoxWrapper: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").FastOmit<Omit<import("@strapi/design-system").TransientBoxProps & {
    children?: import("react").ReactNode;
} & import("@strapi/design-system/dist/types").AsProp<import("react").ElementType<any, keyof import("react").JSX.IntrinsicElements>> & Omit<Omit<any, "ref">, "children" | keyof import("@strapi/design-system/dist/types").AsProp<C> | keyof import("@strapi/design-system").TransientBoxProps> & {
    ref?: any;
}, "ref"> & {
    ref?: any;
}, never>> & Omit<import("@strapi/design-system").BoxComponent<"div">, keyof import("react").Component<any, {}, any>>;
type ListRowProps = {
    configurable?: boolean;
    customField?: string | null;
    editTarget: string;
    firstLoopComponentUid?: string | null;
    isFromDynamicZone?: boolean;
    name: string;
    onClick: (editTarget: string, targetUid: string | null, attributeName: string, attributeType: string, customField: string | null) => void;
    relation?: string;
    repeatable?: boolean;
    secondLoopComponentUid?: string | null;
    target?: string | null;
    targetUid?: string | null;
    type: IconByType;
};
export declare const ListRow: import("react").MemoExoticComponent<({ configurable, customField, editTarget, firstLoopComponentUid, isFromDynamicZone, name, onClick, relation, repeatable, secondLoopComponentUid, target, targetUid, type, }: ListRowProps) => import("react/jsx-runtime").JSX.Element>;
export {};
