/* eslint-disable */
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
  readonly records: MobileRecord[]
}
/**
 * Mobile-specific. Schema of a Session Replay Segment metadata.
 */
export type MobileSegmentMetadata = SegmentContext &
  CommonSegmentMetadataSchema & {
    /**
     * The source of this record
     */
    source: 'android' | 'ios' | 'flutter' | 'react-native'
  }
/**
 * Mobile-specific. Schema of a Session Replay Record.
 */
export type MobileRecord =
  | MobileFullSnapshotRecord
  | MobileIncrementalSnapshotRecord
  | MetaRecord
  | FocusRecord
  | ViewEndRecord
  | VisualViewportRecord
/**
 * Mobile-specific. Schema of a Record type which contains the full snapshot of a screen.
 */
export type MobileFullSnapshotRecord = CommonRecordSchema & {
  /**
   * The type of this Record.
   */
  readonly type: 10
  readonly data: {
    /**
     * The Wireframes contained by this Record.
     */
    readonly wireframes: Wireframe[]
  }
}
/**
 * Schema of a Wireframe type.
 */
export type Wireframe = ShapeWireframe | TextWireframe
/**
 * Schema of all properties of a ShapeWireframe.
 */
export type ShapeWireframe = CommonShapeWireframe & {
  /**
   * The type of the wireframe.
   */
  readonly type: 'shape'
}
/**
 * Schema of common properties for ShapeWireframe events type and all its sub - types.
 */
export type CommonShapeWireframe = CommonWireframe & {
  shapeStyle?: ShapeStyle
  border?: ShapeBorder
}
/**
 * The style of this wireframe.
 */
export type ShapeStyle = {
  /**
   * The background color for this wireframe as a String hexadecimal. Follows the #RRGGBBAA color format with the alpha value as optional. The default value is #FFFFFF00.
   */
  readonly backgroundColor?: string
  /**
   * The opacity of this wireframe. Takes values from 0 to 1, default value is 1.
   */
  readonly opacity?: number
  /**
   * The corner(border) radius of this wireframe in pixels. The default value is 0.
   */
  readonly cornerRadius?: number
}
/**
 * The border properties of this wireframe. The default value is null (no-border).
 */
export type ShapeBorder = {
  /**
   * The border color as a String hexadecimal. Follows the #RRGGBBAA color format with the alpha value as optional.
   */
  readonly color: string
  /**
   * The width of the border in pixels.
   */
  readonly width: number
}
/**
 * Schema of all properties of a TextWireframe.
 */
export type TextWireframe = CommonShapeWireframe & {
  /**
   * The type of the wireframe.
   */
  readonly type: 'text'
  /**
   * The text value of the wireframe.
   */
  text: string
  textStyle: TextStyle
  textPosition?: TextPosition
}
/**
 * Schema of all properties of a TextStyle.
 */
export type TextStyle = {
  /**
   * The preferred font family collection, ordered by preference and formatted as a String list: e.g. Century Gothic, Verdana, sans-serif
   */
  readonly family: string
  /**
   * The font size in pixels.
   */
  readonly size: number
  /**
   * The font color as a string hexadecimal. Follows the #RRGGBBAA color format with the alpha value as optional.
   */
  readonly color: string
}
/**
 * Schema of all properties of a TextPosition.
 */
export type TextPosition = {
  readonly padding?: {
    /**
     * The top padding in pixels. The default value is 0.
     */
    readonly top?: number
    /**
     * The bottom padding in pixels. The default value is 0.
     */
    readonly bottom?: number
    /**
     * The left padding in pixels. The default value is 0.
     */
    readonly left?: number
    /**
     * The right padding in pixels. The default value is 0.
     */
    readonly right?: number
  }
  readonly alignment?: {
    /**
     * The horizontal text alignment. The default value is `left`.
     */
    readonly horizontal?: 'left' | 'right' | 'center'
    /**
     * The vertical text alignment. The default value is `top`.
     */
    readonly vertical?: 'top' | 'bottom' | 'center'
  }
}
/**
 * Mobile-specific. Schema of a Record type which contains mutations of a screen.
 */
export type MobileIncrementalSnapshotRecord = CommonRecordSchema & {
  /**
   * The type of this Record.
   */
  readonly type: 11
  data: MobileIncrementalData
}
/**
 * Mobile-specific. Schema of a Session Replay IncrementalData type.
 */
export type MobileIncrementalData = MobileMutationData | TouchData | ViewportResizeData
/**
 * Mobile-specific. Schema of a MutationData.
 */
export type MobileMutationData = {
  /**
   * The source of this type of incremental data.
   */
  readonly source: 0
} & MobileMutationPayload
/**
 * Mobile-specific. Schema of a MutationPayload.
 */
export type MobileMutationPayload = {
  /**
   * Contains the newly added wireframes.
   */
  readonly adds?: {
    /**
     * The previous wireframe id next or after which this new wireframe is drawn or attached to, respectively.
     */
    previousId?: number
    wireframe: Wireframe
  }[]
  /**
   * Contains the removed wireframes as an array of ids.
   */
  readonly removes?: {
    /**
     * The id of the wireframe that needs to be removed.
     */
    id: number
  }[]
  /**
   * Contains the updated wireframes mutations.
   */
  readonly updates?: WireframeUpdateMutation[]
}
/**
 * Schema of a WireframeUpdateMutation type.
 */
export type WireframeUpdateMutation = TextWireframeUpdate | ShapeWireframeUpdate
/**
 * Schema of all properties of a TextWireframeUpdate.
 */
export type TextWireframeUpdate = CommonShapeWireframeUpdate & {
  /**
   * The type of the wireframe.
   */
  readonly type: 'text'
  /**
   * The text value of the wireframe.
   */
  text?: string
  textStyle?: TextStyle
  textPosition?: TextPosition
}
/**
 * Schema of common properties for ShapeWireframeUpdate events type and all its sub - types.
 */
export type CommonShapeWireframeUpdate = CommonWireframeUpdate & {
  shapeStyle?: ShapeStyle
  border?: ShapeBorder
}
/**
 * Schema of a ShapeWireframeUpdate.
 */
export type ShapeWireframeUpdate = CommonShapeWireframeUpdate & {
  /**
   * The type of the wireframe.
   */
  readonly type: 'shape'
}
/**
 * Schema of a TouchData.
 */
export type TouchData = {
  /**
   * The source of this type of incremental data.
   */
  readonly source?: 2
  /**
   * Contains the positions of the finger on the screen during the touchDown/touchUp event lifecycle.
   */
  readonly positions?: {
    /**
     * The touch id of the touch event this position corresponds to. In mobile it is possible to have multiple touch events (fingers touching the screen) happening at the same time.
     */
    readonly id: number
    /**
     * The x coordinate value of the position.
     */
    readonly x: number
    /**
     * The y coordinate value of the position.
     */
    readonly y: number
    /**
     * The UTC timestamp in milliseconds corresponding to the moment the position change was recorded. Each timestamp is computed as the UTC interval since 00:00:00.000 01.01.1970.
     */
    readonly timestamp: number
  }[]
}
/**
 * Schema of a ViewportResizeData.
 */
export type ViewportResizeData = {
  /**
   * The source of this type of incremental data.
   */
  readonly source: 4
} & ViewportResizeDimension
/**
 * Schema of a Record which contains the screen properties.
 */
export type MetaRecord = CommonRecordSchema & {
  /**
   * The type of this Record.
   */
  readonly type: 4
  /**
   * The data contained by this record.
   */
  data: {
    /**
     * The width of the screen in pixels, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the normalized width is the current width divided by 2.
     */
    width: number
    /**
     * The height of the screen in pixels, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the normalized height is the current height divided by 2.
     */
    height: number
    /**
     * Browser-specific. URL of the view described by this record.
     */
    href?: string
  }
}
/**
 * Schema of a Record type which contains focus information.
 */
export type FocusRecord = CommonRecordSchema & {
  /**
   * The type of this Record.
   */
  readonly type: 6
  data: {
    /**
     * Whether this screen has a focus or not. For now it will always be true for mobile.
     */
    readonly has_focus: boolean
  }
}
/**
 * Schema of a Record which signifies that view lifecycle ended.
 */
export type ViewEndRecord = CommonRecordSchema & {
  /**
   * The type of this Record.
   */
  readonly type: 7
}
/**
 * Schema of a Record which signifies that the viewport properties have changed.
 */
export type VisualViewportRecord = CommonRecordSchema & {
  data: {
    height: number
    offsetLeft: number
    offsetTop: number
    pageLeft: number
    pageTop: number
    scale: number
    width: number
  }
  /**
   * The type of this Record.
   */
  readonly type: 8
}

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
    id: string
  }
  /**
   * Session properties
   */
  session: {
    /**
     * UUID of the session
     */
    id: string
  }
  /**
   * View properties
   */
  view: {
    /**
     * UUID of the view
     */
    id: string
  }
}
/**
 * Schema of common properties for a Segment Metadata type.
 */
export interface CommonSegmentMetadataSchema {
  /**
   * The start UTC timestamp in milliseconds corresponding to the first record in the Segment data. Each timestamp is computed as the UTC interval since 00:00:00.000 01.01.1970.
   */
  start: number
  /**
   * The end UTC timestamp in milliseconds corresponding to the last record in the Segment data. Each timestamp is computed as the UTC interval since 00:00:00.000 01.01.1970.
   */
  end: number
  /**
   * The number of records in this Segment.
   */
  records_count: number
  /**
   * The index of this Segment in the segments list that was recorded for this view ID. Starts from 0.
   */
  index_in_view: number
  /**
   * Whether this Segment contains a full snapshot record or not.
   */
  has_full_snapshot?: boolean
}
/**
 * Schema of common properties for a Record event type.
 */
export interface CommonRecordSchema {
  /**
   * Defines the UTC time in milliseconds when this Record was performed.
   */
  timestamp: number
}
/**
 * Schema of common properties for Wireframe events type.
 */
export interface CommonWireframe {
  /**
   * Defines the unique ID of the wireframe. This is persistent throughout the view lifetime.
   */
  readonly id: number
  /**
   * The position in pixels on X axis of the UI element in absolute coordinates. The anchor point is always the top-left corner of the wireframe.
   */
  readonly x: number
  /**
   * The position in pixels on Y axis of the UI element in absolute coordinates. The anchor point is always the top-left corner of the wireframe.
   */
  readonly y: number
  /**
   * The width in pixels of the UI element, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the width of all UI elements is divided by 2 to get a normalized width.
   */
  readonly width: number
  /**
   * The height in pixels of the UI element, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the height of all UI elements is divided by 2 to get a normalized height.
   */
  readonly height: number
}
/**
 * Schema of common properties for WireframeUpdate events type.
 */
export interface CommonWireframeUpdate {
  /**
   * Defines the unique ID of the wireframe. This is persistent throughout the view lifetime.
   */
  readonly id: number
  /**
   * The position in pixels on X axis of the UI element in absolute coordinates. The anchor point is always the top-left corner of the wireframe.
   */
  readonly x?: number
  /**
   * The position in pixels on Y axis of the UI element in absolute coordinates. The anchor point is always the top-left corner of the wireframe.
   */
  readonly y?: number
  /**
   * The width in pixels of the UI element, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the width of all UI elements is divided by 2 to get a normalized width.
   */
  readonly width?: number
  /**
   * The height in pixels of the UI element, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the height of all UI elements is divided by 2 to get a normalized height.
   */
  readonly height?: number
}
/**
 * Schema of a ViewportResizeDimension.
 */
export interface ViewportResizeDimension {
  /**
   * The new width of the screen in pixels, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the width is divided by 2 to get a normalized width.
   */
  width: number
  /**
   * The new height of the screen in pixels, normalized based on the device pixels per inch density (DPI). Example: if a device has a DPI = 2, the height is divided by 2 to get a normalized height.
   */
  height: number
}
