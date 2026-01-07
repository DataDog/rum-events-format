import type * as SessionReplay from '../generated/browserSessionReplay';
export * from '../generated/browserSessionReplay';
/**
 * For backward compatibility reasons, `undefined` should be accepted as a possible value for Browser segments, too.
 **/
export declare const BrowserSource: {
    readonly Browser: "browser";
};
export declare type BrowserSource = typeof BrowserSource[keyof typeof BrowserSource];
export declare const RecordType: {
    FullSnapshot: SessionReplay.BrowserFullSnapshotRecord['type'];
    IncrementalSnapshot: SessionReplay.BrowserIncrementalSnapshotRecord['type'];
    Meta: SessionReplay.MetaRecord['type'];
    Focus: SessionReplay.FocusRecord['type'];
    ViewEnd: SessionReplay.ViewEndRecord['type'];
    VisualViewport: SessionReplay.VisualViewportRecord['type'];
    FrustrationRecord: SessionReplay.FrustrationRecord['type'];
    Change: SessionReplay.BrowserChangeRecord['type'];
};
export declare type RecordType = typeof RecordType[keyof typeof RecordType];
export declare const NodeType: {
    Document: SessionReplay.DocumentNode['type'];
    DocumentType: SessionReplay.DocumentTypeNode['type'];
    Element: SessionReplay.ElementNode['type'];
    Text: SessionReplay.TextNode['type'];
    CDATA: SessionReplay.CDataNode['type'];
    DocumentFragment: SessionReplay.DocumentFragmentNode['type'];
};
export declare type NodeType = typeof NodeType[keyof typeof NodeType];
export declare const IncrementalSource: {
    Mutation: SessionReplay.BrowserMutationData['source'];
    MouseMove: Exclude<SessionReplay.MousemoveData['source'], 6>;
    MouseInteraction: SessionReplay.MouseInteractionData['source'];
    Scroll: SessionReplay.ScrollData['source'];
    ViewportResize: SessionReplay.ViewportResizeData['source'];
    Input: SessionReplay.InputData['source'];
    TouchMove: Exclude<SessionReplay.MousemoveData['source'], 1>;
    MediaInteraction: SessionReplay.MediaInteractionData['source'];
    StyleSheetRule: SessionReplay.StyleSheetRuleData['source'];
    PointerInteraction: SessionReplay.PointerInteractionData['source'];
};
export declare type IncrementalSource = typeof IncrementalSource[keyof typeof IncrementalSource];
export declare const MouseInteractionType: {
    readonly MouseUp: 0;
    readonly MouseDown: 1;
    readonly Click: 2;
    readonly ContextMenu: 3;
    readonly DblClick: 4;
    readonly Focus: 5;
    readonly Blur: 6;
    readonly TouchStart: 7;
    readonly TouchEnd: 9;
};
export declare type MouseInteractionType = typeof MouseInteractionType[keyof typeof MouseInteractionType];
export declare const MediaInteractionType: {
    readonly Play: 0;
    readonly Pause: 1;
};
export declare type MediaInteractionType = typeof MediaInteractionType[keyof typeof MediaInteractionType];
declare type ChangeTypeId<Id, Data> = [Id, ...Data[]] extends SessionReplay.Change ? Id : never;
export declare const ChangeType: {
    AddString: ChangeTypeId<0, SessionReplay.AddStringChange>;
    AddNode: ChangeTypeId<1, SessionReplay.AddNodeChange>;
    RemoveNode: ChangeTypeId<2, SessionReplay.RemoveNodeChange>;
    Attribute: ChangeTypeId<3, SessionReplay.AttributeChange>;
    Text: ChangeTypeId<4, SessionReplay.TextChange>;
    Size: ChangeTypeId<5, SessionReplay.SizeChange>;
    ScrollPosition: ChangeTypeId<6, SessionReplay.ScrollPositionChange>;
    AddStyleSheet: ChangeTypeId<7, SessionReplay.AddStyleSheetChange>;
    AttachedStyleSheets: ChangeTypeId<8, SessionReplay.AttachedStyleSheetsChange>;
    MediaPlaybackState: ChangeTypeId<9, SessionReplay.MediaPlaybackStateChange>;
    VisualViewport: ChangeTypeId<10, SessionReplay.VisualViewportChange>;
};
export declare type ChangeType = typeof ChangeType[keyof typeof ChangeType];
export declare const PlaybackState: {
    Playing: SessionReplay.PlaybackStatePlaying;
    Paused: SessionReplay.PlaybackStatePaused;
};
export declare type PlaybackState = typeof PlaybackState[keyof typeof PlaybackState];
