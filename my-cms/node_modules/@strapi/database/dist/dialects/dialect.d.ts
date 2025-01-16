import type { Database } from '..';
import type { ForeignKey, Index, Schema } from '../schema';
export interface SchemaInspector {
    getSchema(): Promise<Schema>;
    getIndexes(tableName: string): Promise<Index[]>;
    getForeignKeys(tableName: string): Promise<ForeignKey[]>;
    getTables(): Promise<string[]>;
}
export default class Dialect {
    db: Database;
    schemaInspector: SchemaInspector;
    client: string;
    constructor(db: Database, client: string);
    configure(conn?: any): void;
    initialize(_nativeConnection?: unknown): Promise<void>;
    getTables(): void;
    getSqlType(type: unknown): unknown;
    canAlterConstraints(): boolean;
    usesForeignKeys(): boolean;
    useReturning(): boolean;
    supportsUnsigned(): boolean;
    supportsOperator(operator?: string): boolean;
    startSchemaUpdate(): Promise<void>;
    endSchemaUpdate(): Promise<void>;
    transformErrors(error: Error | {
        message: string;
    }): void;
    canAddIncrements(): boolean;
}
//# sourceMappingURL=dialect.d.ts.map