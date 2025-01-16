import type { Database } from '..';
export declare const createRepairManager: (db: Database) => {
    removeOrphanMorphType: (arg: import("./operations/remove-orphan-morph-types").RemoveOrphanMorphTypeOptions) => Promise<void>;
};
export type RepairManager = ReturnType<typeof createRepairManager>;
//# sourceMappingURL=index.d.ts.map