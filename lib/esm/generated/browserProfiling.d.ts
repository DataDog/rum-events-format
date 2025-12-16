/**
 * DO NOT MODIFY IT BY HAND. Run `yarn generate` instead.
 */
/**
 * Schema of a Profile Event metadata.
 */
export declare type ProfileEvent = ProfileEventAttributes & {
    /**
     * List of attachment filenames.
     */
    readonly attachments: string[];
    /**
     * Start time as ISO 8601 date string (yyyy-MM-dd'T'HH:mm:ss.SSS'Z').
     */
    readonly start: string;
    /**
     * End time marking when the profile ended, as ISO 8601 date string (yyyy-MM-dd'T'HH:mm:ss.SSS'Z').
     */
    readonly end: string;
    /**
     * Profiler family.
     */
    readonly family: 'android' | 'chrome' | 'ios';
    /**
     * Runtime environment.
     */
    readonly runtime: 'android' | 'chrome' | 'ios';
    /**
     * Profile ingestion event version.
     */
    readonly version: number;
    /**
     * Comma-separated profiler tags.
     */
    readonly tags_profiler: string;
    [k: string]: unknown;
};
/**
 * Schema of the Browser SDK Profile Event payload.
 */
export interface ProfileEventPayload {
    /**
     * Profile event metadata.
     */
    readonly event: ProfileEvent & {
        /**
         * Profile data format.
         */
        readonly format: 'json';
        /**
         * Datadog internal metadata.
         */
        readonly _dd: {
            /**
             * Clock drift value. Used by Browser SDK.
             */
            readonly clock_drift: number;
            [k: string]: unknown;
        };
        [k: string]: unknown;
    };
    readonly 'wall-time.json': RumProfilerTrace;
    [k: string]: unknown;
}
/**
 * Schema of attributes for a Profile Event.
 */
export interface ProfileEventAttributes {
    /**
     * Application properties.
     */
    readonly application: {
        /**
         * Application ID.
         */
        readonly id: string;
        [k: string]: unknown;
    };
    /**
     * Session properties.
     */
    readonly session: {
        /**
         * Session ID.
         */
        readonly id: string;
        [k: string]: unknown;
    };
    /**
     * View properties.
     */
    readonly view?: {
        /**
         * Array of view IDs.
         */
        readonly id: string[];
        /**
         * Array of view names.
         */
        readonly name: string[];
        [k: string]: unknown;
    };
    /**
     * Long task properties.
     */
    readonly long_task?: {
        /**
         * Array of long task IDs.
         */
        readonly id: string[];
        [k: string]: unknown;
    };
    [k: string]: unknown;
}
/**
 * The profiler trace data (wall-time profile).
 */
export interface RumProfilerTrace {
    /**
     * An array of profiler resources.
     */
    readonly resources: string[];
    /**
     * An array of profiler frames.
     */
    readonly frames: ProfilerFrame[];
    /**
     * An array of profiler stacks.
     */
    readonly stacks: ProfilerStack[];
    /**
     * An array of profiler samples.
     */
    readonly samples: ProfilerSample[];
    readonly startClocks: ClocksState;
    readonly endClocks: ClocksState1;
    readonly clocksOrigin: ClocksState2;
    /**
     * Sample interval in milliseconds.
     */
    readonly sampleInterval: number;
    /**
     * List of detected long tasks.
     */
    readonly longTasks: RumProfilerLongTaskEntry[];
    /**
     * List of detected navigation entries.
     */
    readonly views: RumViewEntry[];
    [k: string]: unknown;
}
/**
 * Schema of a profiler frame from the JS Self-Profiling API.
 */
export interface ProfilerFrame {
    /**
     * A function instance name.
     */
    readonly name: string;
    /**
     * Index in the trace.resources array.
     */
    readonly resourceId?: number;
    /**
     * 1-based index of the line.
     */
    readonly line?: number;
    /**
     * 1-based index of the column.
     */
    readonly column?: number;
    [k: string]: unknown;
}
/**
 * Schema of a profiler stack from the JS Self-Profiling API.
 */
export interface ProfilerStack {
    /**
     * Index in the trace.stacks array.
     */
    readonly parentId?: number;
    /**
     * Index in the trace.frames array.
     */
    readonly frameId: number;
    [k: string]: unknown;
}
/**
 * Schema of a profiler sample from the JS Self-Profiling API.
 */
export interface ProfilerSample {
    /**
     * High resolution time relative to the profiling session's time origin.
     */
    readonly timestamp: number;
    /**
     * Index in the trace.stacks array.
     */
    readonly stackId?: number;
    [k: string]: unknown;
}
/**
 * High resolution time when profiler trace started, relative to the profiling session's time origin.
 */
export interface ClocksState {
    /**
     * Time relative to navigation start in milliseconds.
     */
    readonly relative: number;
    /**
     * Epoch time in milliseconds.
     */
    readonly timeStamp: number;
    [k: string]: unknown;
}
/**
 * High resolution time when profiler trace ended, relative to the profiling session's time origin.
 */
export interface ClocksState1 {
    /**
     * Time relative to navigation start in milliseconds.
     */
    readonly relative: number;
    /**
     * Epoch time in milliseconds.
     */
    readonly timeStamp: number;
    [k: string]: unknown;
}
/**
 * Time origin of the profiling session.
 */
export interface ClocksState2 {
    /**
     * Time relative to navigation start in milliseconds.
     */
    readonly relative: number;
    /**
     * Epoch time in milliseconds.
     */
    readonly timeStamp: number;
    [k: string]: unknown;
}
/**
 * Schema of a long task entry recorded during profiling.
 */
export interface RumProfilerLongTaskEntry {
    /**
     * RUM Long Task id.
     */
    readonly id?: string;
    /**
     * Duration in ns of the long task or long animation frame.
     */
    readonly duration: number;
    /**
     * Type of the event: long task or long animation frame
     */
    readonly entryType: 'long-task' | 'long-animation-frame';
    readonly startClocks: ClocksState3;
    [k: string]: unknown;
}
/**
 * RUM Long Task start time.
 */
export interface ClocksState3 {
    /**
     * Time relative to navigation start in milliseconds.
     */
    readonly relative: number;
    /**
     * Epoch time in milliseconds.
     */
    readonly timeStamp: number;
    [k: string]: unknown;
}
/**
 * Schema of a RUM view entry recorded during profiling.
 */
export interface RumViewEntry {
    readonly startClocks: ClocksState4;
    /**
     * RUM view id.
     */
    readonly viewId: string;
    /**
     * RUM view name.
     */
    readonly viewName?: string;
    [k: string]: unknown;
}
/**
 * Detected start time of view.
 */
export interface ClocksState4 {
    /**
     * Time relative to navigation start in milliseconds.
     */
    readonly relative: number;
    /**
     * Epoch time in milliseconds.
     */
    readonly timeStamp: number;
    [k: string]: unknown;
}
