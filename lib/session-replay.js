"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordType = exports.WireframeType = exports.MediaInteractionType = exports.MouseInteractionType = exports.IncrementalSource = exports.NodeType = void 0;
__exportStar(require("./generated/sessionReplay"), exports);
var session_replay_browser_1 = require("./session-replay-browser");
Object.defineProperty(exports, "NodeType", { enumerable: true, get: function () { return session_replay_browser_1.NodeType; } });
Object.defineProperty(exports, "IncrementalSource", { enumerable: true, get: function () { return session_replay_browser_1.IncrementalSource; } });
Object.defineProperty(exports, "MouseInteractionType", { enumerable: true, get: function () { return session_replay_browser_1.MouseInteractionType; } });
Object.defineProperty(exports, "MediaInteractionType", { enumerable: true, get: function () { return session_replay_browser_1.MediaInteractionType; } });
var session_replay_mobile_1 = require("./session-replay-mobile");
Object.defineProperty(exports, "WireframeType", { enumerable: true, get: function () { return session_replay_mobile_1.WireframeType; } });
exports.RecordType = {
    BrowserFullSnapshot: 2,
    BrowserIncrementalSnapshot: 3,
    Meta: 4,
    Focus: 6,
    ViewEnd: 7,
    VisualViewport: 8,
    FrustrationRecord: 9,
    MobileFullSnapshot: 10,
    MobileIncrementalSnapshot: 11,
};