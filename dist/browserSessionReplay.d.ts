import type * as SessionReplay from './generated/browserSessionReplay.js';
export * from './generated/browserSessionReplay.js';
export declare const RecordType: {
    FullSnapshot: SessionReplay.BrowserFullSnapshotRecord['type'];
    IncrementalSnapshot: SessionReplay.BrowserIncrementalSnapshotRecord['type'];
    Meta: SessionReplay.MetaRecord['type'];
    Focus: SessionReplay.FocusRecord['type'];
    ViewEnd: SessionReplay.ViewEndRecord['type'];
    VisualViewport: SessionReplay.VisualViewportRecord['type'];
    FrustrationRecord: SessionReplay.FrustrationRecord['type'];
};
export declare type RecordType = typeof RecordType[keyof typeof RecordType];
export declare const NodeType: {
    Document: SessionReplay.DocumentNode['type'];
    DocumentType: SessionReplay.DocumentTypeNode['type'];
    Element: SessionReplay.ElementNode['type'];
    Text: SessionReplay.TextNode['type'];
    CDATA: SessionReplay.CDataNode['type'];
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
