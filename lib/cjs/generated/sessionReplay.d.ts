/**
 * DO NOT MODIFY IT BY HAND. Run `yarn generate` instead.
 */
/**
 * Schema of all properties of Session Replay
 */
export declare type SessionReplay = Segment & SegmentMetadata & Record & FullSnapshotRecord & IncrementalSnapshotRecord & IncrementalData & MutationData & MutationPayload;
/**
 * Schema of a Session Replay data Segment.
 */
export declare type Segment = BrowserSegment | MobileSegment;
/**
 * Browser-specific. Schema of a Session Replay data Segment.
 */
export declare type BrowserSegment = BrowserSegmentMetadata & {
    /**
     * The records contained by this Segment.
     */
    readonly records: BrowserRecord[];
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
};
/**
 * Serialized node contained by this Record.
 */
export declare type SerializedNodeWithId = {
    id: string | number;
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
};
/**
 * Browser-specific. Schema of a MouseInteractionData.
 */
export declare type MouseInteractionData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 2;
} & MouseInteraction;
/**
 * Browser-specific. Schema of a ScrollData.
 */
export declare type ScrollData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 3;
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
} & InputState;
/**
 * Browser-specific. Schema of an InputState.
 */
export declare type InputState = {
    /**
     * Text value for this InputState.
     */
    text: string;
} | {
    /**
     * Checked state for this InputState.
     */
    isChecked: boolean;
};
/**
 * Browser-specific. Schema of a MediaInteractionData.
 */
export declare type MediaInteractionData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 7;
} & MediaInteraction;
/**
 * Browser-specific. Schema of a StyleSheetRuleData.
 */
export declare type StyleSheetRuleData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 8;
} & StyleSheetRule;
/**
 * Schema of a ViewportResizeData.
 */
export declare type ViewportResizeData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 4;
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
    };
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
    };
};
/**
 * Schema of a Record which signifies that view lifecycle ended.
 */
export declare type ViewEndRecord = CommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 7;
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
    };
    /**
     * The type of this Record.
     */
    readonly type: 8;
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
    };
};
/**
 * Mobile-specific. Schema of a Session Replay data Segment.
 */
export declare type MobileSegment = MobileSegmentMetadata & {
    /**
     * The records contained by this Segment.
     */
    readonly records: MobileRecord[];
};
/**
 * Mobile-specific. Schema of a Session Replay Segment metadata.
 */
export declare type MobileSegmentMetadata = SegmentContext & CommonSegmentMetadataSchema & {
    /**
     * The source of this record
     */
    source: 'android' | 'ios' | 'flutter' | 'react-native';
};
/**
 * Mobile-specific. Schema of a Session Replay Record.
 */
export declare type MobileRecord = MobileFullSnapshotRecord | MobileIncrementalSnapshotRecord | MetaRecord | FocusRecord | ViewEndRecord | VisualViewportRecord;
/**
 * Mobile-specific. Schema of a Record type which contains the full snapshot of a screen.
 */
export declare type MobileFullSnapshotRecord = CommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 10;
    readonly data: {
        /**
         * The Wireframes contained by this Record.
         */
        readonly wireframes: Wireframe[];
    };
};
/**
 * Schema of a Wireframe type.
 */
export declare type Wireframe = ShapeWireframe | TextWireframe;
/**
 * Schema of all properties of a ShapeWireframe.
 */
export declare type ShapeWireframe = CommonShapeWireframe & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'shape';
};
/**
 * Schema of common properties for ShapeWireframe events type and all its sub - types.
 */
export declare type CommonShapeWireframe = CommonWireframe & {
    shapeStyle?: ShapeStyle;
    border?: ShapeBorder;
};
/**
 * The style of this wireframe.
 */
export declare type ShapeStyle = {
    /**
     * The background color for this wireframe as a String hexadecimal. Follows the #RRGGBBAA color format with the alpha value as optional. The default value is #FFFFFF00.
     */
    readonly backgroundColor?: string;
    /**
     * The opacity of this wireframe. Takes values from 0 to 1, default value is 1.
     */
    readonly opacity?: number;
    /**
     * The corner(border) radius of this wireframe in pixels. The default value is 0.
     */
    readonly cornerRadius?: number;
};
/**
 * The border properties of this wireframe. The default value is null (no-border).
 */
export declare type ShapeBorder = {
    /**
     * The border color as a String hexadecimal. Follows the #RRGGBBAA color format with the alpha value as optional.
     */
    readonly color: string;
    /**
     * The width of the border in pixels.
     */
    readonly width: number;
};
/**
 * Schema of all properties of a TextWireframe.
 */
export declare type TextWireframe = CommonShapeWireframe & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'text';
    /**
     * The text value of the wireframe.
     */
    text: string;
    textStyle: TextStyle;
    textPosition?: TextPosition;
};
/**
 * Schema of all properties of a TextStyle.
 */
export declare type TextStyle = {
    /**
     * The preferred font family collection, ordered by preference and formatted as a String list: e.g. Century Gothic, Verdana, sans-serif
     */
    readonly family: string;
    /**
     * The font size in pixels.
     */
    readonly size: number;
    /**
     * The font color as a string hexadecimal. Follows the #RRGGBBAA color format with the alpha value as optional.
     */
    readonly color: string;
};
/**
 * Schema of all properties of a TextPosition.
 */
export declare type TextPosition = {
    readonly padding?: {
        /**
         * The top padding in pixels. The default value is 0.
         */
        readonly top?: number;
        /**
         * The bottom padding in pixels. The default value is 0.
         */
        readonly bottom?: number;
        /**
         * The left padding in pixels. The default value is 0.
         */
        readonly left?: number;
        /**
         * The right padding in pixels. The default value is 0.
         */
        readonly right?: number;
    };
    readonly alignment?: {
        /**
         * The horizontal text alignment. The default value is `left`.
         */
        readonly horizontal?: 'left' | 'right' | 'center';
        /**
         * The vertical text alignment. The default value is `top`.
         */
        readonly vertical?: 'top' | 'bottom' | 'center';
    };
};
/**
 * Mobile-specific. Schema of a Record type which contains mutations of a screen.
 */
export declare type MobileIncrementalSnapshotRecord = CommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 11;
    data: MobileIncrementalData;
};
/**
 * Mobile-specific. Schema of a Session Replay IncrementalData type.
 */
export declare type MobileIncrementalData = MobileMutationData | TouchData | ViewportResizeData;
/**
 * Mobile-specific. Schema of a MutationData.
 */
export declare type MobileMutationData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 0;
} & MobileMutationPayload;
/**
 * Mobile-specific. Schema of a MutationPayload.
 */
export declare type MobileMutationPayload = {
    /**
     * Contains the newly added wireframes.
     */
    readonly adds?: {
        /**
         * The previous wireframe id next or after which this new wireframe is drawn or attached to, respectively.
         */
        previousId?: number;
        wireframe: Wireframe;
    }[];
    /**
     * Contains the removed wireframes as an array of ids.
     */
    readonly removes?: {
        /**
         * The id of the wireframe that needs to be removed.
         */
        id: number;
    }[];
    /**
     * Contains the updated wireframes mutations.
     */
    readonly updates?: WireframeUpdateMutation[];
};
/**
 * Schema of a WireframeUpdateMutation type.
 */
export declare type WireframeUpdateMutation = TextWireframeUpdate | ShapeWireframeUpdate;
/**
 * Schema of all properties of a TextWireframeUpdate.
 */
export declare type TextWireframeUpdate = CommonShapeWireframeUpdate & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'text';
    /**
     * The text value of the wireframe.
     */
    text?: string;
    textStyle?: TextStyle;
    textPosition?: TextPosition;
};
/**
 * Schema of common properties for ShapeWireframeUpdate events type and all its sub - types.
 */
export declare type CommonShapeWireframeUpdate = CommonWireframeUpdate & {
    shapeStyle?: ShapeStyle;
    border?: ShapeBorder;
};
/**
 * Schema of a ShapeWireframeUpdate.
 */
export declare type ShapeWireframeUpdate = CommonShapeWireframeUpdate & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'shape';
};
/**
 * Schema of a TouchData.
 */
export declare type TouchData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 2;
    /**
     * Contains the positions of the finger on the screen during the touchDown/touchUp event lifecycle.
     */
    readonly positions?: {
        /**
         * The touch id of the touch event this position corresponds to. In mobile it is possible to have multiple touch events (fingers touching the screen) happening at the same time.
         */
        readonly id: number;
        /**
         * The x coordinate value of the position.
         */
        readonly x: number;
        /**
         * The y coordinate value of the position.
         */
        readonly y: number;
        /**
         * The UTC timestamp in milliseconds corresponding to the moment the position change was recorded. Each timestamp is computed as the UTC interval since 00:00:00.000 01.01.1970.
         */
        readonly timestamp: number;
    }[];
};
/**
 * Schema of a Session Replay SegmentMetadata.
 */
export declare type SegmentMetadata = BrowserSegmentMetadata | MobileSegmentMetadata;
/**
 * Schema of a Session Replay Record.
 */
export declare type Record = BrowserRecord | MobileRecord;
/**
 * Schema of a Record type which contains the full snapshot of a screen.
 */
export declare type FullSnapshotRecord = BrowserFullSnapshotRecord | MobileFullSnapshotRecord;
/**
 * Schema of a Record type which contains mutations of a screen.
 */
export declare type IncrementalSnapshotRecord = BrowserIncrementalSnapshotRecord | MobileIncrementalSnapshotRecord;
/**
 * Schema of a Session Replay IncrementalData type.
 */
export declare type IncrementalData = BrowserIncrementalData | MobileIncrementalData;
/**
 * Schema of a MutationData.
 */
export declare type MutationData = BrowserMutationData | MobileMutationData;
/**
 * Schema of a MutationPayload.
 */
export declare type MutationPayload = BrowserMutationPayload | MobileMutationPayload;
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
    };
    /**
     * Session properties
     */
    session: {
        /**
         * UUID of the session
         */
        id: string;
    };
    /**
     * View properties
     */
    view: {
        /**
         * UUID of the view
         */
        id: string;
    };
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
    index_in_view?: number;
    /**
     * Whether this Segment contains a full snapshot record or not.
     */
    has_full_snapshot?: boolean;
}
/**
 * Schema of common properties for a Record event type.
 */
export interface CommonRecordSchema {
    /**
     * Defines the UTC time in milliseconds when this Record was performed.
     */
    timestamp: number;
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
    };
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
    nextId: number | (string | number);
    previousId?: (string | number) | null;
}
/**
 * Schema of a RemovedNodeMutation.
 */
export interface RemovedNodeMutation {
    /**
     * Id of the mutated node.
     */
    id: string | number;
    /**
     * Id for the parent node for this RemovedNodeMutation
     */
    parentId: string | number;
}
/**
 * Schema of an AttributeMutation.
 */
export interface AttributeMutation {
    /**
     * Id of the mutated node.
     */
    id: string | number;
    /**
     * Attributes for this AttributeMutation
     */
    attributes: {
        [k: string]: string | null;
    };
}
/**
 * Schema of a TextMutation.
 */
export interface TextMutation {
    /**
     * Id of the mutated node.
     */
    id: string | number;
    /**
     * Value for this TextMutation
     */
    value: null | string;
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
}
/**
 * Browser-specific. Schema of a StyleSheetDeleteRule.
 */
export interface StyleSheetDeleteRule {
    /**
     * Index of this StyleSheetDeleteRule in its StyleSheet.
     */
    index: number | number[];
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
}
/**
 * Schema of common properties for Wireframe events type.
 */
export interface CommonWireframe {
    /**
     * Defines the unique ID of the wireframe. This is persistent throughout the view lifetime.
     */
    readonly id: number;
    /**
     * The position in pixels on X axis of the UI element in absolute coordinates. The anchor point is always the top-left corner of the wireframe.
     */
    readonly x: number;
    /**
     * The position in pixels on Y axis of the UI element in absolute coordinates. The anchor point is always the top-left corner of the wireframe.
     */
    readonly y: number;
    /**
     * The width in pixels of the UI element, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the width of all UI elements is divided by 2 to get a normalized width.
     */
    readonly width: number;
    /**
     * The height in pixels of the UI element, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the height of all UI elements is divided by 2 to get a normalized height.
     */
    readonly height: number;
}
/**
 * Schema of common properties for WireframeUpdate events type.
 */
export interface CommonWireframeUpdate {
    /**
     * Defines the unique ID of the wireframe. This is persistent throughout the view lifetime.
     */
    readonly id: number;
    /**
     * The position in pixels on X axis of the UI element in absolute coordinates. The anchor point is always the top-left corner of the wireframe.
     */
    readonly x?: number;
    /**
     * The position in pixels on Y axis of the UI element in absolute coordinates. The anchor point is always the top-left corner of the wireframe.
     */
    readonly y?: number;
    /**
     * The width in pixels of the UI element, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the width of all UI elements is divided by 2 to get a normalized width.
     */
    readonly width?: number;
    /**
     * The height in pixels of the UI element, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the height of all UI elements is divided by 2 to get a normalized height.
     */
    readonly height?: number;
}
