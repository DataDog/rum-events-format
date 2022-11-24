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
exports.IncrementalSource = exports.WireframeType = exports.RecordType = exports.MobileSource = void 0;
__exportStar(require("../generated/mobileSessionReplay"), exports);
exports.MobileSource = {
    Android: 'android',
    Ios: 'ios',
    Flutter: 'flutter',
    ReactNative: 'react-native',
};
exports.RecordType = {
    FullSnapshot: 10,
    IncrementalSnapshot: 11,
    Meta: 4,
    Focus: 6,
    ViewEnd: 7,
    VisualViewport: 8,
};
exports.WireframeType = {
    Shape: 'shape',
    Text: 'text',
};
exports.IncrementalSource = {
    Mutation: 0,
    Touch: 2,
    ViewportResize: 4,
    PointerInteraction: 9,
};
