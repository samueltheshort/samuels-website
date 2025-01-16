import type { Schema } from '@strapi/types';
/**
 *
 * Retrieves the relation type
 */
export declare const getRelationType: (relation: Schema.Attribute.RelationKind.WithTarget | undefined, targetAttribute?: string | null) => Schema.Attribute.RelationKind.WithTarget | undefined;
