import type * as SessionReplay from '../generated/mobileSessionReplay'

export * from '../generated/mobileSessionReplay'

export const MobileSource = {
  Android: 'android',
  Ios: 'ios',
  Flutter: 'flutter',
  ReactNative: 'react-native',
} as const

export type MobileSource = typeof MobileSource[keyof typeof MobileSource]

export const RecordType: {
  FullSnapshot: SessionReplay.MobileFullSnapshotRecord['type']
  IncrementalSnapshot: SessionReplay.MobileIncrementalSnapshotRecord['type']
  Meta: SessionReplay.MetaRecord['type']
  Focus: SessionReplay.FocusRecord['type']
  ViewEnd: SessionReplay.ViewEndRecord['type']
  VisualViewport: SessionReplay.VisualViewportRecord['type']
} = {
  FullSnapshot: 10,
  IncrementalSnapshot: 11,
  Meta: 4,
  Focus: 6,
  ViewEnd: 7,
  VisualViewport: 8,
} as const

export type RecordType = typeof RecordType[keyof typeof RecordType]

export const WireframeType: {
  Shape: SessionReplay.ShapeWireframe['type']
  Text: SessionReplay.TextWireframe['type']
} = {
  Shape: 'shape',
  Text: 'text',
} as const

export type WireframeType = typeof WireframeType[keyof typeof WireframeType]

export const IncrementalSource: {
  Mutation: SessionReplay.MobileMutationData['source']
  Touch: SessionReplay.TouchData['source']
  ViewportResize: SessionReplay.ViewportResizeData['source']
  PointerInteraction: SessionReplay.PointerInteractionData['source']
} = {
  Mutation: 0,
  Touch: 2,
  ViewportResize: 4,
  PointerInteraction: 9,
} as const

export type IncrementalSource = typeof IncrementalSource[keyof typeof IncrementalSource]
