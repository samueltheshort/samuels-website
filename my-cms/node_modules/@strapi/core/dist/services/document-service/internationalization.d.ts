/// <reference types="lodash" />
import type { Struct, Modules } from '@strapi/types';
declare const defaultLocaleCurry: import("lodash").CurriedFunction2<Struct.SingleTypeSchema | Struct.CollectionTypeSchema, Modules.Documents.Params.All, Promise<Modules.Documents.Params.All>>;
declare const localeToLookupCurry: import("lodash").CurriedFunction2<Struct.SingleTypeSchema | Struct.CollectionTypeSchema, Modules.Documents.Params.All, Modules.Documents.Params.All>;
declare const multiLocaleToLookupCurry: import("lodash").CurriedFunction2<Struct.SingleTypeSchema | Struct.CollectionTypeSchema, Modules.Documents.Params.All, Modules.Documents.Params.All>;
declare const localeToDataCurry: import("lodash").CurriedFunction2<Struct.SingleTypeSchema | Struct.CollectionTypeSchema, Modules.Documents.Params.All, Modules.Documents.Params.All>;
export { defaultLocaleCurry as defaultLocale, localeToLookupCurry as localeToLookup, localeToDataCurry as localeToData, multiLocaleToLookupCurry as multiLocaleToLookup, };
//# sourceMappingURL=internationalization.d.ts.map