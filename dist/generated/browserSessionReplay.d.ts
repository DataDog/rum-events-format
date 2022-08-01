/**
 * DO NOT MODIFY IT BY HAND. Run `yarn generate` instead.
 */
/**
 * Browser-specific. Schema of a Session Replay data Segment.
 */
export declare type BrowserSegment = BrowserSegmentMetadata & {
    /**
     * The records contained by this Segment.
     */
    readonly records: BrowserRecord[];
    [k: string]: unknown;
};
/**
 * Browser-specific. Schema of a Session Replay Segment metadata.
 */
export declare type BrowserSegmentMetadata = SegmentContext & CommonSegmentMetadataSchema & {
    /**
     * The source of this record
     */
    source: 'browser';
    creation_reason: CreationReason;
    [k: string]: unknown;
};
/**
 * The reason this Segment was created. For mobile there is only one possible value for this, which is always the default value.
 */
export declare type CreationReason = 'init' | 'segment_duration_limit' | 'segment_bytes_limit' | 'view_change' | 'before_unload' | 'visibility_hidden';
/**
 * Browser-specific. Schema of a Session Replay Record.
 */
export declare type BrowserRecord = BrowserFullSnapshotRecord | BrowserIncrementalSnapshotRecord | MetaRecord | FocusRecord | ViewEndRecord | VisualViewportRecord | FrustrationRecord;
/**
 * Browser-specific. Schema of a Record type which contains the full snapshot of a screen.
 */
export declare type BrowserFullSnapshotRecord = CommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 2;
    data: BrowserNode;
    [k: string]: unknown;
};
/**
 * Serialized node contained by this Record.
 */
export declare type SerializedNodeWithId = {
    id: number;
    [k: string]: unknown;
} & SerializedNode;
/**
 * Serialized node contained by this Record.
 */
export declare type SerializedNode = DocumentNode | DocumentTypeNode | ElementNode | TextNode | CDataNode;
/**
 * Browser-specific. Schema of a Record type which contains mutations of a screen.
 */
export declare type BrowserIncrementalSnapshotRecord = CommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 3;
    data: BrowserIncrementalData;
    id?: number;
    [k: string]: unknown;
};
/**
 * Browser-specific. Schema of a Session Replay IncrementalData type.
 */
export declare type BrowserIncrementalData = BrowserMutationData | MousemoveData | MouseInteractionData | ScrollData | InputData | MediaInteractionData | StyleSheetRuleData | ViewportResizeData;
/**
 * Browser-specific. Schema of a MutationData.
 */
export declare type BrowserMutationData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 0;
    [k: string]: unknown;
} & BrowserMutationPayload;
/**
 * Browser-specific. Schema of a MutationPayload.
 */
export declare type BrowserMutationPayload = {
    /**
     * Contains the newly added nodes.
     */
    adds: AddedNodeMutation[];
    /**
     * Contains the removed nodes.
     */
    removes: RemovedNodeMutation[];
    /**
     * Contains the updated attribute mutations.
     */
    attributes: AttributeMutation[];
    /**
     * Contains the updated text mutations.
     */
    texts: TextMutation[];
    [k: string]: unknown;
};
/**
 * Browser-specific. Schema of a MouseInteractionData.
 */
export declare type MouseInteractionData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 2;
    [k: string]: unknown;
} & MouseInteraction;
/**
 * Browser-specific. Schema of a ScrollData.
 */
export declare type ScrollData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 3;
    [k: string]: unknown;
} & ScrollPosition;
/**
 * Browser-specific. Schema of an InputData.
 */
export declare type InputData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 5;
    /**
     * Id for the target node for this InputData.
     */
    id: number;
    [k: string]: unknown;
} & InputState;
/**
 * Browser-specific. Schema of an InputState.
 */
export declare type InputState = {
    /**
     * Text value for this InputState.
     */
    text: string;
    [k: string]: unknown;
} | {
    /**
     * Checked state for this InputState.
     */
    isChecked: boolean;
    [k: string]: unknown;
};
/**
 * Browser-specific. Schema of a MediaInteractionData.
 */
export declare type MediaInteractionData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 7;
    [k: string]: unknown;
} & MediaInteraction;
/**
 * Browser-specific. Schema of a StyleSheetRuleData.
 */
export declare type StyleSheetRuleData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 8;
    [k: string]: unknown;
} & StyleSheetRule;
/**
 * Schema of a ViewportResizeData.
 */
export declare type ViewportResizeData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 4;
    [k: string]: unknown;
} & ViewportResizeDimension;
/**
 * Schema of a Record which contains the screen properties.
 */
export declare type MetaRecord = CommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 4;
    /**
     * The data contained by this record.
     */
    data: {
        /**
         * The width of the screen in pixels, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the normalized width is the current width divided by 2.
         */
        width: number;
        /**
         * The height of the screen in pixels, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the normalized height is the current height divided by 2.
         */
        height: number;
        /**
         * Browser-specific. URL of the view described by this record.
         */
        href?: string;
        [k: string]: unknown;
    };
    [k: string]: unknown;
};
/**
 * Schema of a Record type which contains focus information.
 */
export declare type FocusRecord = CommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 6;
    data: {
        /**
         * Whether this screen has a focus or not. For now it will always be true for mobile.
         */
        readonly has_focus: boolean;
        [k: string]: unknown;
    };
    [k: string]: unknown;
};
/**
 * Schema of a Record which signifies that view lifecycle ended.
 */
export declare type ViewEndRecord = CommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 7;
    [k: string]: unknown;
};
/**
 * Schema of a Record which signifies that the viewport properties have changed.
 */
export declare type VisualViewportRecord = CommonRecordSchema & {
    data: {
        height: number;
        offsetLeft: number;
        offsetTop: number;
        pageLeft: number;
        pageTop: number;
        scale: number;
        width: number;
        [k: string]: unknown;
    };
    /**
     * The type of this Record.
     */
    readonly type: 8;
    [k: string]: unknown;
};
/**
 * Schema of a Record which signifies a collection of frustration signals.
 */
export declare type FrustrationRecord = CommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 9;
    /**
     * Schema of a Session Replay FrustrationRecord data structure type.
     */
    data: {
        /**
         * Collection of frustration signal types.
         */
        frustrationTypes: ('rage_click' | 'error_click' | 'dead_click')[];
        /**
         * Collection of frustration signal event IDs.
         */
        recordIds: number[];
        [k: string]: unknown;
    };
    [k: string]: unknown;
};
/**
 * Schema of a Session Replay Segment context.
 */
export interface SegmentContext {
    /**
     * Application properties
     */
    application: {
        /**
         * UUID of the application
         */
        id: string;
        [k: string]: unknown;
    };
    /**
     * Session properties
     */
    session: {
        /**
         * UUID of the session
         */
        id: string;
        [k: string]: unknown;
    };
    /**
     * View properties
     */
    view: {
        /**
         * UUID of the view
         */
        id: string;
        [k: string]: unknown;
    };
    [k: string]: unknown;
}
/**
 * Schema of common properties for a Segment Metadata type.
 */
export interface CommonSegmentMetadataSchema {
    /**
     * The start UTC timestamp in milliseconds corresponding to the first record in the Segment data. Each timestamp is computed as the UTC interval since 00:00:00.000 01.01.1970.
     */
    start: number;
    /**
     * The end UTC timestamp in milliseconds corresponding to the last record in the Segment data. Each timestamp is computed as the UTC interval since 00:00:00.000 01.01.1970.
     */
    end: number;
    /**
     * The number of records in this Segment.
     */
    records_count: number;
    /**
     * The index of this Segment in the segments list that was recorded for this view ID. Starts from 0.
     */
    index_in_view: number;
    /**
     * Whether this Segment contains a full snapshot record or not.
     */
    has_full_snapshot?: boolean;
    [k: string]: unknown;
}
/**
 * Schema of common properties for a Record event type.
 */
export interface CommonRecordSchema {
    /**
     * Defines the UTC time in milliseconds when this Record was performed.
     */
    timestamp: number;
    [k: string]: unknown;
}
/**
 * Schema of a Node type.
 */
export interface BrowserNode {
    node: SerializedNodeWithId;
    /**
     * Initial node offset position.
     */
    initialOffset: {
        /**
         * Top position offset for this node.
         */
        top: number;
        /**
         * Left position offset for this node.
         */
        left: number;
        [k: string]: unknown;
    };
    [k: string]: unknown;
}
/**
 * Schema of a Document Node.
 */
export interface DocumentNode {
    /**
     * The type of this Node.
     */
    readonly type: 0;
    childNodes: SerializedNodeWithId[];
    [k: string]: unknown;
}
/**
 * Schema of a Document Type Node.
 */
export interface DocumentTypeNode {
    /**
     * The type of this Node.
     */
    readonly type: 1;
    /**
     * Name for this DocumentType
     */
    name: string;
    /**
     * PublicId for this DocumentType
     */
    publicId: string;
    /**
     * SystemId for this DocumentType
     */
    systemId: string;
    [k: string]: unknown;
}
/**
 * Schema of an Element Node.
 */
export interface ElementNode {
    /**
     * The type of this Node.
     */
    readonly type: 2;
    /**
     * TagName for this Node
     */
    tagName: string;
    attributes: Attributes;
    childNodes: SerializedNodeWithId[];
    isSVG?: true;
    [k: string]: unknown;
}
/**
 * Schema of an Attributes type.
 */
export interface Attributes {
    [k: string]: string | number | boolean;
}
/**
 * Schema of a Text Node.
 */
export interface TextNode {
    /**
     * The type of this Node.
     */
    readonly type: 3;
    /**
     * Text value for this Text Node
     */
    textContent: string;
    isStyle?: true;
    [k: string]: unknown;
}
/**
 * Schema of a CData Node.
 */
export interface CDataNode {
    /**
     * The type of this Node.
     */
    readonly type: 4;
    textContent: '';
    [k: string]: unknown;
}
/**
 * Schema of an AddedNodeMutation.
 */
export interface AddedNodeMutation {
    node: SerializedNodeWithId;
    /**
     * Id for the parent node for this AddedNodeMutation.
     */
    parentId: number;
    nextId: number | null;
    previousId?: number | null;
    [k: string]: unknown;
}
/**
 * Schema of a RemovedNodeMutation.
 */
export interface RemovedNodeMutation {
    /**
     * Id of the mutated node.
     */
    id: number;
    /**
     * Id for the parent node for this RemovedNodeMutation
     */
    parentId: number;
    [k: string]: unknown;
}
/**
 * Schema of an AttributeMutation.
 */
export interface AttributeMutation {
    /**
     * Id of the mutated node.
     */
    id: number;
    /**
     * Attributes for this AttributeMutation
     */
    attributes: {
        [k: string]: string | null;
    };
    [k: string]: unknown;
}
/**
 * Schema of a TextMutation.
 */
export interface TextMutation {
    /**
     * Id of the mutated node.
     */
    id: number;
    /**
     * Value for this TextMutation
     */
    value: null | string;
    [k: string]: unknown;
}
/**
 * Browser-specific. Schema of a MousemoveData.
 */
export interface MousemoveData {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 1 | 6;
    /**
     * Positions reported for this MousemoveData.
     */
    positions: MousePosition[];
    [k: string]: unknown;
}
/**
 * Browser-specific. Schema of a MousePosition.
 */
export interface MousePosition {
    /**
     * X-axis coordinate for this MousePosition.
     */
    x: number;
    /**
     * Y-axis coordinate for this MousePosition.
     */
    y: number;
    /**
     * Id for the target node for this MousePosition.
     */
    id: number;
    /**
     * Observed time offset for this MousePosition.
     */
    timeOffset: number;
    [k: string]: unknown;
}
/**
 * Browser-specific. Schema of a MouseInteraction.
 */
export interface MouseInteraction {
    /**
     * The type of MouseInteraction.
     */
    readonly type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9;
    /**
     * Id for the target node for this MouseInteraction.
     */
    id: number;
    /**
     * X-axis coordinate for this MouseInteraction.
     */
    x: number;
    /**
     * Y-axis coordinate for this MouseInteraction.
     */
    y: number;
    [k: string]: unknown;
}
/**
 * Browser-specific. Schema of a ScrollPosition.
 */
export interface ScrollPosition {
    /**
     * Id for the target node for this ScrollPosition.
     */
    id: number;
    /**
     * X-axis coordinate for this ScrollPosition.
     */
    x: number;
    /**
     * Y-axis coordinate for this ScrollPosition.
     */
    y: number;
    [k: string]: unknown;
}
/**
 * Browser-specific. Schema of a MediaInteraction.
 */
export interface MediaInteraction {
    /**
     * Id for the target node for this MediaInteraction.
     */
    id: number;
    /**
     * The type of MediaInteraction.
     */
    readonly type: 0 | 1;
    [k: string]: unknown;
}
/**
 * Browser-specific. Schema of a StyleSheetRule.
 */
export interface StyleSheetRule {
    /**
     * Id of the owner node for this StyleSheetRule.
     */
    readonly id: number;
    /**
     * Rules added to this StyleSheetRule.
     */
    adds?: StyleSheetAddRule[];
    /**
     * Rules deleted from this StyleSheetRule.
     */
    removes?: StyleSheetDeleteRule[];
    [k: string]: unknown;
}
/**
 * Browser-specific. Schema of a StyleSheetAddRule.
 */
export interface StyleSheetAddRule {
    /**
     * Text content for this StyleSheetAddRule.
     */
    rule: string;
    /**
     * Index of this StyleSheetAddRule in its StyleSheet.
     */
    index?: number | number[];
    [k: string]: unknown;
}
/**
 * Browser-specific. Schema of a StyleSheetDeleteRule.
 */
export interface StyleSheetDeleteRule {
    /**
     * Index of this StyleSheetDeleteRule in its StyleSheet.
     */
    index: number | number[];
    [k: string]: unknown;
}
/**
 * Schema of a ViewportResizeDimension.
 */
export interface ViewportResizeDimension {
    /**
     * The new width of the screen in pixels, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the width is divided by 2 to get a normalized width.
     */
    width: number;
    /**
     * The new height of the screen in pixels, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the height is divided by 2 to get a normalized height.
     */
    height: number;
    [k: string]: unknown;
}
