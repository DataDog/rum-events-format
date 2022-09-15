import type { RecordType as BrowserRecordType } from './session-replay-browser'
import type { RecordType as MobileRecordType } from './session-replay-mobile'

export * from '../generated/sessionReplay'

export {
  BrowserSource,
  NodeType,
  IncrementalSource,
  MouseInteractionType,
  MediaInteractionType,
} from './session-replay-browser'
export { MobileSource, WireframeType } from './session-replay-mobile'

export const RecordType: {
  BrowserFullSnapshot: typeof BrowserRecordType.FullSnapshot
  BrowserIncrementalSnapshot: typeof BrowserRecordType.IncrementalSnapshot
  Meta: typeof BrowserRecordType.Meta
  Focus: typeof BrowserRecordType.Focus
  ViewEnd: typeof BrowserRecordType.ViewEnd
  VisualViewport: typeof BrowserRecordType.VisualViewport
  FrustrationRecord: typeof BrowserRecordType.FrustrationRecord
  MobileFullSnapshot: typeof MobileRecordType.FullSnapshot
  MobileIncrementalSnapshot: typeof MobileRecordType.IncrementalSnapshot
} = {
  BrowserFullSnapshot: 2,
  BrowserIncrementalSnapshot: 3,
  Meta: 4,
  Focus: 6,
  ViewEnd: 7,
  VisualViewport: 8,
  FrustrationRecord: 9,
  MobileFullSnapshot: 10,
  MobileIncrementalSnapshot: 11,
} as const

export type RecordType = typeof RecordType[keyof typeof RecordType]
