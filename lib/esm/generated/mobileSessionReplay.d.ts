/**
 * DO NOT MODIFY IT BY HAND. Run `yarn generate` instead.
 */
/**
 * Mobile-specific. Schema of a Session Replay data Segment.
 */
export type MobileSegment = MobileSegmentMetadata & {
    /**
     * The records contained by this Segment.
     */
    readonly records: MobileRecord[];
};
/**
 * Mobile-specific. Schema of a Session Replay Segment metadata.
 */
export type MobileSegmentMetadata = SegmentContext & CommonSegmentMetadataSchema & {
    /**
     * The source of this record
     */
    source: 'android' | 'ios' | 'flutter' | 'react-native' | 'kotlin-multiplatform' | 'maui';
};
/**
 * Mobile-specific. Schema of a Session Replay Record.
 */
export type MobileRecord = MobileFullSnapshotRecord | MobileIncrementalSnapshotRecord | MetaRecord | FocusRecord | ViewEndRecord | VisualViewportRecord;
/**
 * Mobile-specific. Schema of a Record type which contains the full snapshot of a screen.
 */
export type MobileFullSnapshotRecord = SlotSupportedCommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 10;
    readonly data: {
        /**
         * The Wireframes contained by this Record.
         */
        readonly wireframes: Wireframe[];
        readonly compositionTree?: CompositionTree;
    };
};
/**
 * Schema of common properties for a Record event type that is supported by slots.
 */
export type SlotSupportedCommonRecordSchema = CommonRecordSchema & {
    /**
     * Unique ID of the slot that generated this record.
     */
    readonly slotId?: string;
};
/**
 * Schema of a Wireframe type.
 */
export type Wireframe = EmbeddedContentWireframe | ShapeWireframe | TextWireframe | ImageWireframe | PlaceholderWireframe | WebviewWireframe;
/**
 * Schema of all properties of an EmbeddedContentWireframe.
 */
export type EmbeddedContentWireframe = CommonShapeWireframe & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'embedded_content';
    /**
     * Unique Id of the slot containing this embedded content.
     */
    readonly slotId: string;
    /**
     * Whether this embedded content is visible or not.
     */
    readonly isVisible?: boolean;
    /**
     * A globally unique and stable identifier for this UI element, computed as the hash of the element's path. Used to correlate wireframes with RUM action events.
     */
    readonly permanentId?: string;
};
/**
 * Schema of common properties for ShapeWireframe events type and all its sub - types.
 */
export type CommonShapeWireframe = CommonWireframe & {
    shapeStyle?: ShapeStyle;
    border?: ShapeBorder;
};
/**
 * The style of this wireframe.
 */
export type ShapeStyle = {
    /**
     * The background color for this wireframe as a String hexadecimal. Follows the #RRGGBBAA color format with the alpha value as optional. The default value is #FFFFFF00.
     */
    readonly backgroundColor?: string;
    /**
     * The background gradient for this wireframe.
     */
    readonly backgroundGradient?: ShapeGradient;
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
 * A background gradient for a shape wireframe. When backgroundColor is also present, the background color is painted first and the gradient is painted over it. The gradient is clipped to the wireframe shape, the border is painted afterward, and shape opacity applies to the combined result.
 */
export type ShapeGradient = ShapeLinearGradient;
/**
 * The border properties of this wireframe. The default value is null (no-border).
 */
export type ShapeBorder = {
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
 * Schema of all properties of a ShapeWireframe.
 */
export type ShapeWireframe = CommonShapeWireframe & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'shape';
    /**
     * A globally unique and stable identifier for this UI element, computed as the hash of the element's path. Used to correlate wireframes with RUM action events.
     */
    readonly permanentId?: string;
};
/**
 * Schema of all properties of a TextWireframe.
 */
export type TextWireframe = CommonShapeWireframe & {
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
    /**
     * A globally unique and stable identifier for this UI element, computed as the hash of the element's path. Used to correlate wireframes with RUM action events.
     */
    readonly permanentId?: string;
};
/**
 * Schema of all properties of a TextStyle.
 */
export type TextStyle = {
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
    /**
     * Defines how text should be truncated when it exceeds the wireframe bounds. If omitted, text wraps naturally.
     */
    readonly truncationMode?: 'clip' | 'head' | 'tail' | 'middle';
};
/**
 * Schema of all properties of a TextPosition.
 */
export type TextPosition = {
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
 * Schema of all properties of a ImageWireframe.
 */
export type ImageWireframe = CommonShapeWireframe & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'image';
    /**
     * base64 representation of the image. Not required as the ImageWireframe can be initialised without any base64
     */
    base64?: string;
    /**
     * Unique identifier of the image resource
     */
    resourceId?: string;
    /**
     * MIME type of the image file
     */
    mimeType?: string;
    /**
     * Flag describing an image wireframe that should render an empty state placeholder
     */
    isEmpty?: boolean;
    /**
     * A globally unique and stable identifier for this UI element, computed as the hash of the element's path. Used to correlate wireframes with RUM action events.
     */
    readonly permanentId?: string;
};
/**
 * Schema of all properties of a PlaceholderWireframe.
 */
export type PlaceholderWireframe = CommonWireframe & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'placeholder';
    /**
     * Label of the placeholder
     */
    label?: string;
    /**
     * A globally unique and stable identifier for this UI element, computed as the hash of the element's path. Used to correlate wireframes with RUM action events.
     */
    readonly permanentId?: string;
};
/**
 * Schema of all properties of a WebviewWireframe.
 */
export type WebviewWireframe = CommonShapeWireframe & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'webview';
    /**
     * Unique Id of the slot containing this webview.
     */
    readonly slotId: string;
    /**
     * Whether this webview is visible or not.
     */
    readonly isVisible?: boolean;
    /**
     * A globally unique and stable identifier for this UI element, computed as the hash of the element's path. Used to correlate wireframes with RUM action events.
     */
    readonly permanentId?: string;
};
/**
 * A rendering modifier applied to the composed layer output.
 */
export type CompositionLayerModifier = CompositionLayerClipModifier | CompositionLayerOpacityModifier | CompositionLayerColorMatrixModifier | CompositionLayerGaussianBlurModifier | CompositionLayerShadowModifier | CompositionLayerBrightnessBiasModifier | CompositionLayerSaturateModifier | CompositionLayerBackgroundMaterialModifier | CompositionLayerMaskImageModifier;
/**
 * Mobile-specific. Schema of a Record type which contains mutations of a screen.
 */
export type MobileIncrementalSnapshotRecord = SlotSupportedCommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 11;
    data: MobileIncrementalData;
};
/**
 * Mobile-specific. Schema of a Session Replay IncrementalData type.
 */
export type MobileIncrementalData = MobileMutationData | TouchData | ViewportResizeData | PointerInteractionData | CompositionTreeMutationData;
/**
 * Mobile-specific. Schema of a MutationData.
 */
export type MobileMutationData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 0;
} & MobileMutationPayload;
/**
 * Schema of a WireframeUpdateMutation type.
 */
export type WireframeUpdateMutation = EmbeddedContentWireframeUpdate | TextWireframeUpdate | ShapeWireframeUpdate | ImageWireframeUpdate | PlaceholderWireframeUpdate | WebviewWireframeUpdate;
/**
 * Schema of all properties of an EmbeddedContentWireframeUpdate.
 */
export type EmbeddedContentWireframeUpdate = CommonShapeWireframeUpdate & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'embedded_content';
    /**
     * Unique Id of the slot containing this embedded content.
     */
    readonly slotId: string;
    /**
     * Whether this embedded content is visible or not.
     */
    readonly isVisible?: boolean;
};
/**
 * Schema of common properties for ShapeWireframeUpdate events type and all its sub - types.
 */
export type CommonShapeWireframeUpdate = CommonWireframeUpdate & {
    shapeStyle?: ShapeStyle;
    border?: ShapeBorder;
};
/**
 * Schema of all properties of a TextWireframeUpdate.
 */
export type TextWireframeUpdate = CommonShapeWireframeUpdate & {
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
 * Schema of a ShapeWireframeUpdate.
 */
export type ShapeWireframeUpdate = CommonShapeWireframeUpdate & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'shape';
};
/**
 * Schema of all properties of a ImageWireframeUpdate.
 */
export type ImageWireframeUpdate = CommonShapeWireframeUpdate & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'image';
    /**
     * base64 representation of the image. Not required as the ImageWireframe can be initialised without any base64
     */
    base64?: string;
    /**
     * Unique identifier of the image resource
     */
    resourceId?: string;
    /**
     * MIME type of the image file
     */
    mimeType?: string;
    /**
     * Flag describing an image wireframe that should render an empty state placeholder
     */
    isEmpty?: boolean;
};
/**
 * Schema of all properties of a PlaceholderWireframe.
 */
export type PlaceholderWireframeUpdate = CommonWireframeUpdate & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'placeholder';
    /**
     * Label of the placeholder
     */
    label?: string;
};
/**
 * Schema of all properties of a WebviewWireframeUpdate.
 */
export type WebviewWireframeUpdate = CommonShapeWireframeUpdate & {
    /**
     * The type of the wireframe.
     */
    readonly type: 'webview';
    /**
     * Unique Id of the slot containing this webview.
     */
    readonly slotId: string;
    /**
     * Whether this webview is visible or not.
     */
    readonly isVisible?: boolean;
};
/**
 * Schema of a TouchData.
 */
export type TouchData = {
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
 * Schema of a ViewportResizeData.
 */
export type ViewportResizeData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 4;
} & ViewportResizeDimension;
/**
 * Schema of a PointerInteractionData.
 */
export type PointerInteractionData = {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 9;
} & PointerInteraction;
/**
 * Schema of a Record which contains the screen properties.
 */
export type MetaRecord = SlotSupportedCommonRecordSchema & {
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
export type FocusRecord = SlotSupportedCommonRecordSchema & {
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
export type ViewEndRecord = SlotSupportedCommonRecordSchema & {
    /**
     * The type of this Record.
     */
    readonly type: 7;
};
/**
 * Schema of a Record which signifies that the viewport properties have changed.
 */
export type VisualViewportRecord = SlotSupportedCommonRecordSchema & {
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
    clip?: WireframeClip;
}
/**
 * Schema of clipping information for a Wireframe.
 */
export interface WireframeClip {
    /**
     * The amount of space in pixels that needs to be clipped (masked) at the top of the wireframe.
     */
    readonly top?: number;
    /**
     * The amount of space in pixels that needs to be clipped (masked) at the bottom of the wireframe.
     */
    readonly bottom?: number;
    /**
     * The amount of space in pixels that needs to be clipped (masked) at the left of the wireframe.
     */
    readonly left?: number;
    /**
     * The amount of space in pixels that needs to be clipped (masked) at the right of the wireframe.
     */
    readonly right?: number;
}
/**
 * A linear background gradient for a shape wireframe. Colors before the first stop and after the last stop are clamped to the nearest stop color.
 */
export interface ShapeLinearGradient {
    /**
     * The type of the gradient.
     */
    readonly type: 'linear';
    /**
     * Ordered gradient color stops. Positions must be non-decreasing.
     *
     * @minItems 2
     */
    readonly stops: [ShapeGradientStop, ShapeGradientStop, ...ShapeGradientStop[]];
    /**
     * The point where position 0 of the gradient is placed.
     */
    readonly startPoint: ShapeGradientPoint;
    /**
     * The point where position 1 of the gradient is placed.
     */
    readonly endPoint: ShapeGradientPoint;
}
/**
 * A color and its relative position in a shape gradient.
 */
export interface ShapeGradientStop {
    /**
     * The stop color as a hexadecimal string in #RRGGBB or #RRGGBBAA format.
     */
    readonly color: string;
    /**
     * Relative stop position between 0 and 1. Stops must be ordered by non-decreasing position.
     */
    readonly position: number;
}
/**
 * A point in the wireframe's normalized coordinate space. The top-left corner is (0, 0), the bottom-right corner is (1, 1), and values outside this range place the point outside the wireframe bounds.
 */
export interface ShapeGradientPoint {
    /**
     * Horizontal position, where 0 is the left edge and 1 is the right edge.
     */
    readonly x: number;
    /**
     * Vertical position, where 0 is the top edge and 1 is the bottom edge.
     */
    readonly y: number;
}
/**
 * Optional composition tree describing the rendering hierarchy. When present, the player uses this tree for rendering order and group operations.
 */
export interface CompositionTree {
    root: CompositionLayer;
    /**
     * Non-root composition layers referenced by the tree.
     */
    readonly layers?: CompositionLayer[];
}
/**
 * A rendering group that groups child wireframes and child layers. Does not draw pixels itself. Ordered rendering modifiers and compositing are applied to its composed output.
 */
export interface CompositionLayer {
    /**
     * Stable layer identifier, persistent throughout the view lifetime.
     */
    readonly id: number;
    /**
     * The position in pixels on the X axis of the layer in absolute coordinates. Uses the same coordinate space as mobile wireframes.
     */
    readonly x: number;
    /**
     * The position in pixels on the Y axis of the layer in absolute coordinates. Uses the same coordinate space as mobile wireframes.
     */
    readonly y: number;
    /**
     * The width in pixels of the layer. Uses the same coordinate space as mobile wireframes.
     */
    readonly width: number;
    /**
     * The height in pixels of the layer. Uses the same coordinate space as mobile wireframes.
     */
    readonly height: number;
    /**
     * Ordered back-to-front references to child wireframes or child layers.
     */
    readonly children: CompositionLayerChild[];
    /**
     * Ordered list of rendering modifiers applied to the composed layer output in array order.
     */
    readonly modifiers?: CompositionLayerModifier[];
    /**
     * Operation used when compositing the rendered group into its parent.
     */
    readonly compositeOperation?: 'sourceOver' | 'destinationIn' | 'plusDarker';
}
/**
 * A reference to a child wireframe or child layer in a composition layer.
 */
export interface CompositionLayerChild {
    /**
     * The type of the child reference.
     */
    readonly type: 'wireframe' | 'layer';
    /**
     * The id of the referenced wireframe or layer.
     */
    readonly id: number;
}
/**
 * Geometric clipping applied to the composed layer output, in coordinates local to the layer rectangle.
 */
export interface CompositionLayerClipModifier {
    /**
     * The type of the modifier.
     */
    readonly type: 'clip';
    /**
     * SVG path string defining the clip region, in coordinates local to the layer rectangle.
     */
    readonly path: string;
    /**
     * Path fill rule. Defaults to 'nonzero'.
     */
    readonly fillRule?: 'nonzero' | 'evenodd';
}
/**
 * Opacity applied to the composed layer output at this point in the modifier order.
 */
export interface CompositionLayerOpacityModifier {
    /**
     * The type of the modifier.
     */
    readonly type: 'opacity';
    /**
     * Opacity value from 0 to 1.
     */
    readonly value: number;
}
/**
 * Color transformation using a 4x5 matrix applied to the composed layer output.
 */
export interface CompositionLayerColorMatrixModifier {
    /**
     * The type of the modifier.
     */
    readonly type: 'colorMatrix';
    /**
     * 4x5 color matrix encoded as 20 numbers in row-major order. Input and output color channels are normalized to [0, 1]. The transform for each output channel is: R' = m[0]*R + m[1]*G + m[2]*B + m[3]*A + m[4], G' = m[5]*R + m[6]*G + m[7]*B + m[8]*A + m[9], B' = m[10]*R + m[11]*G + m[12]*B + m[13]*A + m[14], A' = m[15]*R + m[16]*G + m[17]*B + m[18]*A + m[19]. Each output channel is clamped to [0, 1] after evaluation.
     *
     * @minItems 20
     * @maxItems 20
     */
    readonly matrix: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
}
/**
 * Gaussian blur applied to the composed layer output.
 */
export interface CompositionLayerGaussianBlurModifier {
    /**
     * The type of the modifier.
     */
    readonly type: 'gaussianBlur';
    /**
     * Gaussian blur radius.
     */
    readonly radius: number;
}
/**
 * Drop shadow drawn behind the composed layer output.
 */
export interface CompositionLayerShadowModifier {
    /**
     * The type of the modifier.
     */
    readonly type: 'shadow';
    /**
     * The shadow color as a String hexadecimal. Follows the #RRGGBBAA color format with the alpha value as optional. SDKs should encode the effective shadow alpha in this color and omit the shadow modifier when the effective alpha is 0.
     */
    readonly color: string;
    /**
     * Horizontal shadow offset in pixels.
     */
    readonly offsetX: number;
    /**
     * Vertical shadow offset in pixels.
     */
    readonly offsetY: number;
    /**
     * Blur radius used to create the shadow.
     */
    readonly radius: number;
    /**
     * Optional SVG path string defining the shadow outline, in coordinates local to the layer rectangle. When present, the path is interpreted using the non-zero winding rule. When omitted, the shadow follows the composed layer alpha.
     */
    readonly path?: string;
}
/**
 * Adds a signed brightness bias to the rendered layer contents.
 */
export interface CompositionLayerBrightnessBiasModifier {
    /**
     * The type of the modifier.
     */
    readonly type: 'brightnessBias';
    /**
     * Brightness bias from -1 to 1 added to each normalized RGB channel (alpha is unchanged). 0 leaves content unchanged. Positive values brighten; negative values darken. Each channel is clamped to [0, 1] after the bias is applied.
     */
    readonly value: number;
}
/**
 * Applies a saturation adjustment to the rendered layer contents.
 */
export interface CompositionLayerSaturateModifier {
    /**
     * The type of the modifier.
     */
    readonly type: 'saturate';
    /**
     * Saturation multiplier. 1 leaves content unchanged. 0 removes saturation.
     */
    readonly value: number;
}
/**
 * Represents a platform background material effect captured as layer rendering state.
 */
export interface CompositionLayerBackgroundMaterialModifier {
    /**
     * The type of the modifier.
     */
    readonly type: 'backgroundMaterial';
    /**
     * Material kind.
     */
    readonly kind: 'glass';
}
/**
 * Image mask applied to the composed layer output at this point in the modifier order. The referenced image is mapped to the layer bounds and interpreted as an alpha mask: transparent pixels hide content, opaque pixels keep content, and partial alpha multiplies content alpha. RGB channels are ignored.
 */
export interface CompositionLayerMaskImageModifier {
    /**
     * The type of the modifier.
     */
    readonly type: 'maskImage';
    /**
     * Unique identifier of the image resource used as a bounds-aligned alpha mask.
     */
    readonly resourceId: string;
}
/**
 * Mobile-specific. Schema of a MutationPayload.
 */
export interface MobileMutationPayload {
    /**
     * Contains the newly added wireframes.
     */
    readonly adds: {
        /**
         * The previous wireframe id next or after which this new wireframe is drawn or attached to, respectively.
         */
        previousId?: number;
        wireframe: Wireframe;
    }[];
    /**
     * Contains the removed wireframes as an array of ids.
     */
    readonly removes: {
        /**
         * The id of the wireframe that needs to be removed.
         */
        id: number;
    }[];
    /**
     * Contains the updated wireframes mutations.
     */
    readonly updates: WireframeUpdateMutation[];
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
    clip?: WireframeClip;
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
/**
 * Mobile-specific. Incremental data carrying composition tree layer mutations.
 */
export interface CompositionTreeMutationData {
    /**
     * The source of this type of incremental data.
     */
    readonly source: 10;
    root?: CompositionLayer;
    /**
     * Full layer definitions for newly added layers.
     */
    readonly adds?: CompositionLayer[];
    /**
     * Ids of layer definitions to remove. Removing a referenced layer also requires updating the parent or root child list.
     */
    readonly removes?: number[];
    /**
     * Sparse updates for existing layers.
     */
    readonly updates?: CompositionLayerUpdate[];
}
/**
 * Sparse update for a composition layer. Omitted fields are unchanged.
 */
export interface CompositionLayerUpdate {
    /**
     * The id of the layer to update.
     */
    readonly id: number;
    /**
     * Updated X position in absolute coordinates. Uses the same coordinate space as mobile wireframes.
     */
    readonly x?: number;
    /**
     * Updated Y position in absolute coordinates. Uses the same coordinate space as mobile wireframes.
     */
    readonly y?: number;
    /**
     * Updated width in pixels. Uses the same coordinate space as mobile wireframes.
     */
    readonly width?: number;
    /**
     * Updated height in pixels. Uses the same coordinate space as mobile wireframes.
     */
    readonly height?: number;
    /**
     * When present, replaces the full child list for this layer.
     */
    readonly children?: CompositionLayerChild[];
    /**
     * When present, replaces the full modifier list for this layer.
     */
    readonly modifiers?: CompositionLayerModifier[];
    /**
     * Updated composite operation for this layer.
     */
    readonly compositeOperation?: 'sourceOver' | 'destinationIn' | 'plusDarker';
}
