export * from './generated/sessionReplay';
export { NodeType, IncrementalSource, MouseInteractionType, MediaInteractionType } from './browserSessionReplay';
export { WireframeType } from './mobileSessionReplay';
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
