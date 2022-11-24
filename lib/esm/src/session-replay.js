export * from '../generated/sessionReplay';
export { BrowserSource, NodeType, IncrementalSource as BrowserIncrementalSource, MouseInteractionType, MediaInteractionType, } from './session-replay-browser';
export { IncrementalSource as MobileIncrementalSource, MobileSource, WireframeType } from './session-replay-mobile';
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
export var PointerEventType = {
    PointerDown: 'down',
    PointerUp: 'up',
    PointerMove: 'move',
};
export var PointerType = {
    Mouse: 'mouse',
    Touch: 'touch',
    Pen: 'pen',
};
