"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const admin = require("./admin.js");
const coreStore = require("./coreStore.js");
const cron = require("./cron.js");
const registries = require("./registries.js");
const telemetry = require("./telemetry.js");
const webhooks = require("./webhooks.js");
const providers = [registries, admin, coreStore, webhooks, telemetry, cron];
exports.providers = providers;
//# sourceMappingURL=index.js.map
