/**
 * DO NOT MODIFY IT BY HAND. Run `yarn generate` instead.
 */
/**
 * Schema of all properties of a RUM event stored in Events store
 */
export declare type RumStoredEvent = RumStoredActionEvent | RumStoredViewEvent;
/**
 * Schema of all properties of a stored Action event
 */
export declare type RumStoredActionEvent = StoredEventCommonProperties & {
    /**
     * Custom properties of the event
     */
    custom: {
        /**
         * RUM event type
         */
        type: 'action';
        /**
         * Action properties
         */
        action: {
            /**
             * Type of the action
             */
            type: 'custom' | 'click' | 'tap' | 'scroll' | 'swipe' | 'application_start' | 'back';
            /**
             * UUID of the action
             */
            id?: string;
            /**
             * Duration in ns to the action is considered loaded
             */
            loading_time?: number;
            /**
             * Action target properties
             */
            target?: {
                /**
                 * Target name
                 */
                name: string;
            };
            /**
             * Action frustration properties
             */
            frustration?: {
                /**
                 * Action frustration types
                 */
                type: ('rage_click' | 'dead_click' | 'error_click' | 'rage_tap' | 'error_tap')[];
            };
            /**
             * Properties of the errors of the action
             */
            error?: {
                /**
                 * Number of errors that occurred on the action
                 */
                count: number;
            };
            /**
             * Properties of the crashes of the action
             */
            crash?: {
                /**
                 * Number of crashes that occurred on the action
                 */
                count: number;
            };
            /**
             * Properties of the long tasks of the action
             */
            long_task?: {
                /**
                 * Number of long tasks that occurred on the action
                 */
                count: number;
            };
            /**
             * Properties of the resources of the action
             */
            resource?: {
                /**
                 * Number of resources that occurred on the action
                 */
                count: number;
            };
        };
        /**
         * View properties
         */
        view?: {
            /**
             * Is the action starting in the foreground (focus in browser)
             */
            in_foreground?: boolean;
        };
        /**
         * Internal properties
         */
        _dd?: {
            /**
             * Action properties
             */
            action?: {
                /**
                 * Action position properties
                 */
                position?: {
                    /**
                     * X coordinate relative to the target element of the action (in pixels)
                     */
                    x: number;
                    /**
                     * Y coordinate relative to the target element of the action (in pixels)
                     */
                    y: number;
                };
                /**
                 * Target properties
                 */
                target?: {
                    /**
                     * CSS selector path of the target element
                     */
                    selector?: string;
                    /**
                     * Width of the target element (in pixels)
                     */
                    width?: number;
                    /**
                     * Height of the target element (in pixels)
                     */
                    height?: number;
                };
            };
        };
        /**
         * View Container properties (view wrapping the current view)
         */
        container?: {
            /**
             * Attributes of the view's container
             */
            view: {
                /**
                 * ID of the parent view
                 */
                id: string;
            };
            /**
             * Source of the parent view
             */
            source: 'android' | 'ios' | 'browser' | 'flutter' | 'react-native' | 'roku' | 'unity' | 'kotlin-multiplatform';
        };
    };
};
/**
 * Schema of all properties of a stored View event
 */
export declare type RumStoredViewEvent = StoredEventCommonProperties & {
    /**
     * Custom properties of the event
     */
    custom: {
        /**
         * RUM event type
         */
        type: 'view';
        /**
         * View properties
         */
        view: {
            /**
             * Duration in ns to the view is considered loaded
             */
            loading_time?: number;
            /**
             * Type of the loading of the view
             */
            loading_type?: 'initial_load' | 'route_change' | 'activity_display' | 'activity_redisplay' | 'fragment_display' | 'fragment_redisplay' | 'view_controller_display' | 'view_controller_redisplay';
            /**
             * Time spent on the view in ns
             */
            time_spent: number;
            /**
             * Duration in ns to the first rendering
             */
            first_contentful_paint?: number;
            /**
             * Duration in ns to the largest contentful paint
             */
            largest_contentful_paint?: number;
            /**
             * CSS selector path of the largest contentful paint element
             */
            largest_contentful_paint_target_selector?: string;
            /**
             * Duration in ns of the first input event delay
             */
            first_input_delay?: number;
            /**
             * Duration in ns to the first input
             */
            first_input_time?: number;
            /**
             * CSS selector path of the first input target element
             */
            first_input_target_selector?: string;
            /**
             * Longest duration in ns between an interaction and the next paint
             */
            interaction_to_next_paint?: number;
            /**
             * Duration in ns between start of the view and start of the INP
             */
            interaction_to_next_paint_time?: number;
            /**
             * CSS selector path of the interacted element corresponding to INP
             */
            interaction_to_next_paint_target_selector?: string;
            /**
             * Total layout shift score that occurred on the view
             */
            cumulative_layout_shift?: number;
            /**
             * Duration in ns between start of the view and start of the largest layout shift contributing to CLS
             */
            cumulative_layout_shift_time?: number;
            /**
             * CSS selector path of the first element (in document order) of the largest layout shift contributing to CLS
             */
            cumulative_layout_shift_target_selector?: string;
            /**
             * Duration in ns to the complete parsing and loading of the document and its sub resources
             */
            dom_complete?: number;
            /**
             * Duration in ns to the complete parsing and loading of the document without its sub resources
             */
            dom_content_loaded?: number;
            /**
             * Duration in ns to the end of the parsing of the document
             */
            dom_interactive?: number;
            /**
             * Duration in ns to the end of the load event handler execution
             */
            load_event?: number;
            /**
             * Duration in ns to the response start of the document request
             */
            first_byte?: number;
            /**
             * User custom timings of the view. As timing name is used as facet path, it must contain only letters, digits, or the characters - _ . @ $
             */
            custom_timings?: {
                [k: string]: number | undefined;
            };
            /**
             * Whether the View corresponding to this event is considered active
             */
            is_active?: boolean;
            /**
             * Whether the View had a low average refresh rate
             */
            is_slow_rendered?: boolean;
            /**
             * Properties of the actions of the view
             */
            action: {
                /**
                 * Number of actions that occurred on the view
                 */
                count: number;
            };
            /**
             * Properties of the errors of the view
             */
            error: {
                /**
                 * Number of errors that occurred on the view
                 */
                count: number;
            };
            /**
             * Properties of the crashes of the view
             */
            crash?: {
                /**
                 * Number of crashes that occurred on the view
                 */
                count: number;
            };
            /**
             * Properties of the long tasks of the view
             */
            long_task?: {
                /**
                 * Number of long tasks that occurred on the view
                 */
                count: number;
            };
            /**
             * Properties of the frozen frames of the view
             */
            frozen_frame?: {
                /**
                 * Number of frozen frames that occurred on the view
                 */
                count: number;
            };
            /**
             * Properties of the resources of the view
             */
            resource: {
                /**
                 * Number of resources that occurred on the view
                 */
                count: number;
            };
            /**
             * Properties of the frustrations of the view
             */
            frustration?: {
                /**
                 * Number of frustrations that occurred on the view
                 */
                count: number;
            };
            /**
             * List of the periods of time the user had the view in foreground (focused in the browser)
             */
            in_foreground_periods?: {
                /**
                 * Duration in ns between start of the view and start of foreground period
                 */
                start: number;
                /**
                 * Duration in ns of the view foreground period
                 */
                duration: number;
            }[];
            /**
             * Average memory used during the view lifetime (in bytes)
             */
            memory_average?: number;
            /**
             * Peak memory used during the view lifetime (in bytes)
             */
            memory_max?: number;
            /**
             * Total number of cpu ticks during the view’s lifetime
             */
            cpu_ticks_count?: number;
            /**
             * Average number of cpu ticks per second during the view’s lifetime
             */
            cpu_ticks_per_second?: number;
            /**
             * Average refresh rate during the view’s lifetime (in frames per second)
             */
            refresh_rate_average?: number;
            /**
             * Minimum refresh rate during the view’s lifetime (in frames per second)
             */
            refresh_rate_min?: number;
            /**
             * Time taken for Flutter 'build' methods.
             */
            flutter_build_time?: RumStoredPerfMetric;
            /**
             * Time taken for Flutter to rasterize the view.
             */
            flutter_raster_time?: RumStoredPerfMetric;
            /**
             * The JavaScript refresh rate for React Native
             */
            js_refresh_rate?: RumStoredPerfMetric;
        };
        /**
         * Session properties
         */
        session?: {
            /**
             * Whether this session is currently active. Set to false to manually stop a session
             */
            is_active?: boolean;
            /**
             * Whether this session has been sampled for replay
             */
            sampled_for_replay?: boolean;
        };
        /**
         * Feature flags properties
         */
        feature_flags?: {
            [k: string]: unknown | undefined;
        };
        /**
         * Privacy properties
         */
        privacy?: {
            /**
             * The replay privacy level
             */
            replay_level: 'allow' | 'mask' | 'mask-user-input';
        };
        /**
         * Internal properties
         */
        _dd: {
            /**
             * Version of the update of the view event
             */
            document_version: number;
            /**
             * List of the page states during the view
             */
            page_states?: {
                /**
                 * Page state name
                 */
                state: 'active' | 'passive' | 'hidden' | 'frozen' | 'terminated';
                /**
                 * Duration in ns between start of the view and start of the page state
                 */
                start: number;
            }[];
            /**
             * Debug metadata for Replay Sessions
             */
            replay_stats?: {
                /**
                 * The number of records produced during this view lifetime
                 */
                records_count?: number;
                /**
                 * The number of segments sent during this view lifetime
                 */
                segments_count?: number;
                /**
                 * The total size in bytes of the segments sent during this view lifetime
                 */
                segments_total_raw_size?: number;
            };
            /**
             * Subset of the SDK configuration options in use during its execution
             */
            configuration?: {
                /**
                 * Whether session replay recording configured to start manually
                 */
                start_session_replay_recording_manually?: boolean;
            };
        };
        /**
         * Display properties
         */
        display?: {
            /**
             * Scroll properties
             */
            scroll?: {
                /**
                 * Distance between the top and the lowest point reached on this view (in pixels)
                 */
                max_depth: number;
                /**
                 * Page scroll top (scrolled distance) when the maximum scroll depth was reached for this view (in pixels)
                 */
                max_depth_scroll_top: number;
                /**
                 * Maximum page scroll height (total height) for this view (in pixels)
                 */
                max_scroll_height: number;
                /**
                 * Duration between the view start and the time the max scroll height was reached for this view (in nanoseconds)
                 */
                max_scroll_height_time: number;
            };
        };
    };
};
/**
 * Schema of common properties of stored RUM events
 */
export interface StoredEventCommonProperties {
    client_time?: number;
    'datadog.index'?: string;
    discovery_timestamp?: number;
    event_id?: string;
    hashes?: {
        session?: HashId;
        view?: HashId;
        usr?: HashId;
    };
    id?: string;
    ingest_size_in_bytes?: number;
    intake_time?: number;
    random_draw?: number;
    service?: string;
    source?: string;
    source_fragment_id?: string;
    tag?: {
        /**
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` ".*".
         */
        [k: string]: string | {
            /**
             * This interface was referenced by `undefined`'s JSON-Schema definition
             * via the `patternProperty` ".*".
             */
            [k: string]: string;
        };
    };
    tags?: string[];
    tiebreaker?: number;
    timeline?: {
        token?: string;
    };
    timestamp?: string;
}
export interface HashId {
    id: number;
}
/**
 * Schema of properties for a technical performance metric
 */
export interface RumStoredPerfMetric {
    /**
     * The minimum value seen for this metric during the view's lifetime.
     */
    min: number;
    /**
     * The maximum value seen for this metric during the view's lifetime.
     */
    max: number;
    /**
     * The average value for this metric during the view's lifetime.
     */
    average: number;
    /**
     * The maximum possible value we could see for this metric, if such a max is relevant and can vary from session to session.
     */
    metric_max?: number;
}
