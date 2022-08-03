import type { RecordType as BrowserRecordType } from './browserSessionReplay';
import type { RecordType as MobileRecordType } from './mobileSessionReplay';
export * from './generated/sessionReplay';
export { NodeType, IncrementalSource, MouseInteractionType, MediaInteractionType } from './browserSessionReplay';
export { WireframeType } from './mobileSessionReplay';
export declare const RecordType: {
    BrowserFullSnapshot: typeof BrowserRecordType.FullSnapshot;
    BrowserIncrementalSnapshot: typeof BrowserRecordType.IncrementalSnapshot;
    Meta: typeof BrowserRecordType.Meta;
    Focus: typeof BrowserRecordType.Focus;
    ViewEnd: typeof BrowserRecordType.ViewEnd;
    VisualViewport: typeof BrowserRecordType.VisualViewport;
    FrustrationRecord: typeof BrowserRecordType.FrustrationRecord;
    MobileFullSnapshot: typeof MobileRecordType.FullSnapshot;
    MobileIncrementalSnapshot: typeof MobileRecordType.IncrementalSnapshot;
};
export declare type RecordType = typeof RecordType[keyof typeof RecordType];
