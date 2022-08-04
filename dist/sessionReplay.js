export * from './generated/sessionReplay.js';
export { NodeType, IncrementalSource, MouseInteractionType, MediaInteractionType } from './browserSessionReplay.js';
export { WireframeType } from './mobileSessionReplay.js';
export var RecordType = {
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
