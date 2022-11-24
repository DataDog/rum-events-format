export * from '../generated/mobileSessionReplay';
export var MobileSource = {
    Android: 'android',
    Ios: 'ios',
    Flutter: 'flutter',
    ReactNative: 'react-native',
};
export var RecordType = {
    FullSnapshot: 10,
    IncrementalSnapshot: 11,
    Meta: 4,
    Focus: 6,
    ViewEnd: 7,
    VisualViewport: 8,
};
export var WireframeType = {
    Shape: 'shape',
    Text: 'text',
};
export var IncrementalSource = {
    Mutation: 0,
    Touch: 2,
    ViewportResize: 4,
    PointerInteraction: 9,
};
