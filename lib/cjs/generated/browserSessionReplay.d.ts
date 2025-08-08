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
export declare type CreationReason = 'init' | 'segment_duration_limit' | 'segment_bytes_limit' | 'view_change' | 'before_unload' | 'visibility_hidden' | 'page_frozen';
/**
 * Browser-specific. Schema of a Session Replay Record.
 */
export declare type BrowserRecord = BrowserFullSnapshotRecord | BrowserIncrementalSnapshotRecord | MetaRecord | FocusRecord | ViewEndRecord | VisualViewportRecord | FrustrationRecord | BrowserChangeRecord;
/**
 * Browser-specific. Schema of a Record type which contains the full snapshot of a screen.
 */
export declare type BrowserFullSnapshotRecord = SlotSupportedCommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 2;
    data: BrowserNode;
};
/**
 * Schema of common properties for a Record event type that is supported by slots.
 */
export declare type SlotSupportedCommonRecordSchema = CommonRecordSchema & {
    /**
     * Unique ID of the slot that generated this record.
     */
    readonly slotId?: string;
};
/**
 * Serialized node contained by this Record.
 */
export declare type SerializedNodeWithId = {
    id: number;
} & SerializedNode;
/**
 * Serialized node contained by this Record.
 */
export declare type SerializedNode = DocumentNode | DocumentFragmentNode | DocumentTypeNode | ElementNode | TextNode | CDataNode;
/**
 * Browser-specific. Schema of a Record type which contains mutations of a screen.
 */
export declare type BrowserIncrementalSnapshotRecord = SlotSupportedCommonRecordSchema & {
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
export declare type BrowserIncrementalData = BrowserMutationData | MousemoveData | MouseInteractionData | ScrollData | InputData | MediaInteractionData | StyleSheetRuleData | ViewportResizeData | PointerInteractionData;
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
 * Browser-specific. Schema of a MouseInteraction.
 */
export declare type MouseInteraction = {
    /**
     * The type of MouseInteraction: 0=mouseup, 1=mousedown, 2=click, 3=contextmenu, 4=dblclick, 7=touchstart, 9=touchend
     */
    readonly type: 0 | 1 | 2 | 3 | 4 | 7 | 9;
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
} | {
    /**
     * The type of MouseInteraction: 5=focus, 6=blur
     */
    readonly type: 5 | 6;
    /**
     * Id for the target node for this MouseInteraction.
     */
    id: number;
};
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
 * Schema of a PointerInteractionData.
 */
export declare type PointerInteractionData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 9;
} & PointerInteraction;
/**
 * Schema of a Record which contains the screen properties.
 */
export declare type MetaRecord = SlotSupportedCommonRecordSchema & {
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
export declare type FocusRecord = SlotSupportedCommonRecordSchema & {
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
export declare type ViewEndRecord = SlotSupportedCommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 7;
};
/**
 * Schema of a Record which signifies that the viewport properties have changed.
 */
export declare type VisualViewportRecord = SlotSupportedCommonRecordSchema & {
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
export declare type FrustrationRecord = SlotSupportedCommonRecordSchema & {
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
 * Browser-specific. Schema of a Record type which represents changes and mutations using a compact encoding. (Experimental.)
 */
export declare type BrowserChangeRecord = SlotSupportedCommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 12;
    data: BrowserChangeData;
    id?: number;
};
/**
 * Browser-specific. Schema of a Session Replay BrowserChangeData type.
 */
export declare type BrowserChangeData = {
    /**
     * Changes to the `adoptedStyleSheets` list of a Document, DocumentFragment, or ShadowRoot node.
     */
    adoptedStyleSheetsChanges?: AdoptedStyleSheetsChange[];
    /**
     * Changes to the attributes of a node.
     */
    attributeChanges?: AttributeChange[];
    /**
     * Newly added nodes.
     */
    nodesAdded?: AddNodeChange[];
    /**
     * Newly removed nodes.
     */
    nodesRemoved?: NodeId[];
    /**
     * Changes to the scroll position of a node.
     */
    scrollChanges?: ScrollPositionChange[];
    /**
     * Newly added strings.
     */
    stringsAdded?: AddStringChange[];
    /**
     * Changes to the text content of a node.
     */
    textChanges?: TextChange[];
};
/**
 * Browser-specific. Schema representing a change to the adopted stylesheets of a document or shadow DOM subtree.
 *
 * @minItems 1
 */
export declare type AdoptedStyleSheetsChange = [NodeId, ...StyleSheet[]];
/**
 * Browser-specific. Schema representing the ID of a DOM node.
 */
export declare type NodeId = number;
/**
 * Browser-specific. Schema representing a change to an node's attributes.
 *
 * @minItems 1
 */
export declare type AttributeChange = [NodeId, ...AttributeAssignmentOrDeletion[]];
/**
 * Browser-specific. Schema representing a change to an attribute, either by assignment of a new value or by deletion of the attribute.
 *
 * @minItems 2
 */
export declare type AttributeAssignmentOrDeletion = [string, string | null];
/**
 * Browser-specific. Schema representing the addition of a new node to the document.
 */
export declare type AddNodeChange = AddCDataSectionNodeChange | AddDocTypeNodeChange | AddDocumentNodeChange | AddDocumentFragmentNodeChange | AddElementNodeChange | AddTextNodeChange | AddShadowRootNodeChange;
/**
 * Browser-specific. Schema representing the addition of a new #cdata-section node to the document.
 *
 * @minItems 2
 */
export declare type AddCDataSectionNodeChange = [InsertionPoint, CDataSectionNodeName];
/**
 * Browser-specific. Schema representing the insertion point of a node which is being added to the document.
 */
export declare type InsertionPoint = RootInsertionPoint | LastChildInsertionPoint | NextSiblingInsertionPoint;
/**
 * A null insertion point, indicating that the node should be inserted at the root of the document.
 */
export declare type RootInsertionPoint = null;
/**
 * A positive integer insertion point. Inserting a node at positive integer N indicates that the node should be inserted as the last child of the node with an id N lower than the new node.
 */
export declare type LastChildInsertionPoint = number;
/**
 * A negative integer insertion point. Inserting a node at negative integer -N indicates that the node should be inserted as the next sibling of the node with an id N lower than the new node.
 */
export declare type NextSiblingInsertionPoint = number;
/**
 * Browser-specific. Schema representing the node name for a #cdata-section node, expressed as either a reference to the string table or a literal string.
 */
export declare type CDataSectionNodeName = number | '#cdata-section';
/**
 * Browser-specific. Schema representing the addition of a new #doctype node to the document.
 *
 * @minItems 5
 */
export declare type AddDocTypeNodeChange = [InsertionPoint, DocTypeNodeName, string, string, string];
/**
 * Browser-specific. Schema representing the node name for a #doctype node, expressed as either a reference to the string table or a literal string.
 */
export declare type DocTypeNodeName = number | '#doctype';
/**
 * Browser-specific. Schema representing the addition of a new #document node to the document.
 *
 * @minItems 2
 */
export declare type AddDocumentNodeChange = [InsertionPoint, DocumentNodeName];
/**
 * Browser-specific. Schema representing the node name for a #document node, expressed as either a reference to the string table or a literal string.
 */
export declare type DocumentNodeName = number | '#document';
/**
 * Browser-specific. Schema representing the addition of a new #document-fragment node to the document.
 *
 * @minItems 2
 */
export declare type AddDocumentFragmentNodeChange = [InsertionPoint, DocumentFragmentNodeName];
/**
 * Browser-specific. Schema representing the node name for a #document-fragment node, expressed as either a reference to the string table or a literal string.
 */
export declare type DocumentFragmentNodeName = number | '#document-fragment';
/**
 * Browser-specific. Schema representing the addition of a new element node to the document.
 *
 * @minItems 2
 */
export declare type AddElementNodeChange = [InsertionPoint, NodeName, ...AttributeAssignment[]];
/**
 * Browser-specific. Schema representing a node name (i.e., Node#nodeName), expressed as either a reference to the string table or a literal string.
 */
export declare type NodeName = number | string;
/**
 * Browser-specific. Schema representing an assignment of a value to an attribute.
 *
 * @minItems 2
 */
export declare type AttributeAssignment = [string, string];
/**
 * Browser-specific. Schema representing the addition of a new #text node to the document.
 *
 * @minItems 3
 */
export declare type AddTextNodeChange = [InsertionPoint, TextNodeName, string];
/**
 * Browser-specific. Schema representing the node name for a #text node, expressed as either a reference to the string table or a literal string.
 */
export declare type TextNodeName = number | '#text';
/**
 * Browser-specific. Schema representing the addition of a new #shadow-root node to the document.
 *
 * @minItems 2
 */
export declare type AddShadowRootNodeChange = [InsertionPoint, ShadowRootNodeName];
/**
 * Browser-specific. Schema representing the node name for a #shadow-root node, expressed as either a reference to the string table or a literal string.
 */
export declare type ShadowRootNodeName = number | '#shadow-root';
/**
 * Browser-specific. Schema representing a scroll position change.
 *
 * @minItems 3
 */
export declare type ScrollPositionChange = [NodeId, number, number];
/**
 * Browser-specific. Schema representing the addition of a string to the string table.
 */
export declare type AddStringChange = string;
/**
 * Browser-specific. Schema representing a change to the text content of a #text node.
 *
 * @minItems 2
 */
export declare type TextChange = [NodeId, string];
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
    /**
     * Stylesheet added dynamically
     */
    readonly adoptedStyleSheets?: StyleSheet[];
    childNodes: SerializedNodeWithId[];
}
/**
 * Browser-specific. Schema of a StyleSheet
 */
export interface StyleSheet {
    /**
     * CSS rules applied (rule.cssText)
     */
    cssRules: string[];
    /**
     * MediaList of the stylesheet
     */
    media?: string[];
    /**
     * Is the stylesheet disabled
     */
    disabled?: boolean;
}
/**
 * Schema of a Document FragmentNode.
 */
export interface DocumentFragmentNode {
    /**
     * The type of this Node.
     */
    readonly type: 11;
    /**
     * Stylesheet added dynamically
     */
    readonly adoptedStyleSheets?: StyleSheet[];
    /**
     * Is this node a shadow root or not
     */
    readonly isShadowRoot: boolean;
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
    /**
     * Is this node a SVG instead of a HTML
     */
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
    nextId: number | null;
    previousId?: number | null;
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
 * Schema of a PointerInteraction.
 */
export interface PointerInteraction {
    /**
     * Schema of an PointerEventType
     */
    readonly pointerEventType: 'down' | 'up' | 'move';
    /**
     * Schema of an PointerType
     */
    readonly pointerType: 'mouse' | 'touch' | 'pen';
    /**
     * Id of the pointer of this PointerInteraction.
     */
    pointerId: number;
    /**
     * X-axis coordinate for this PointerInteraction.
     */
    x: number;
    /**
     * Y-axis coordinate for this PointerInteraction.
     */
    y: number;
}
