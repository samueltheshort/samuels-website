import _ from 'lodash';
import type { UID, Schema, Data, Modules } from '@strapi/types';
type Input<T extends UID.Schema> = Modules.Documents.Params.Data.Input<T>;
type LoadedComponents<TUID extends UID.Schema> = Data.Entity<TUID, Schema.AttributeNamesByType<TUID, 'component' | 'dynamiczone'>>;
type SingleComponentValue = Schema.Attribute.ComponentValue<UID.Component, false>;
type RepeatableComponentValue = Schema.Attribute.ComponentValue<UID.Component, true>;
type ComponentValue = SingleComponentValue | RepeatableComponentValue;
type DynamicZoneValue = Schema.Attribute.DynamicZoneValue<UID.Component[]>;
type ComponentBody = {
    [key: string]: ComponentValue | DynamicZoneValue;
};
declare const omitComponentData: _.CurriedFunction2<import("@strapi/types/dist/struct").ComponentSchema | import("@strapi/types/dist/struct").ContentTypeSchema, Input<UID.Schema>, Partial<Input<UID.Schema>>>;
declare const createComponents: <TUID extends UID.Schema, TData extends Input<TUID>>(uid: TUID, data: TData) => Promise<ComponentBody>;
declare const getComponents: <TUID extends UID.Schema>(uid: TUID, entity: {
    id: Modules.EntityService.Params.Attribute.ID;
}) => Promise<LoadedComponents<TUID>>;
declare const updateComponents: <TUID extends UID.Schema, TData extends Partial<Input<TUID>>>(uid: TUID, entityToUpdate: {
    id: Modules.EntityService.Params.Attribute.ID;
}, data: TData) => Promise<ComponentBody>;
declare const deleteComponents: <TUID extends UID.Schema, TEntity extends Data.Entity<TUID, Extract<keyof Schema.Attributes<TUID>, string>>>(uid: TUID, entityToDelete: TEntity, { loadComponents }?: {
    loadComponents?: boolean | undefined;
}) => Promise<void>;
declare const deleteComponent: <TUID extends `${string}.${string}`>(uid: TUID, componentToDelete: Data.Component<TUID>) => Promise<void>;
declare const assignComponentData: _.CurriedFunction3<import("@strapi/types/dist/struct").ComponentSchema | import("@strapi/types/dist/struct").ContentTypeSchema, ComponentBody, Input<UID.Schema>, ComponentBody & Partial<Input<UID.Schema>>>;
export { omitComponentData, assignComponentData, getComponents, createComponents, updateComponents, deleteComponents, deleteComponent, };
//# sourceMappingURL=components.d.ts.map