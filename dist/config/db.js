"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Re-export Firestore db from firebase config
// All services should import { db } from this file
var firebase_1 = require("./firebase");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return firebase_1.db; } });
//# sourceMappingURL=db.js.map