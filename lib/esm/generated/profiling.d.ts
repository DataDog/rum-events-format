/**
 * DO NOT MODIFY IT BY HAND. Run `yarn generate` instead.
 */
/**
 * Schema of RUM Profiling.
 */
export declare type Profiling = BrowserProfileEvent | MobileProfileEvent;
/**
 * Browser SDK profiling payload.
 */
export declare type BrowserProfileEvent = ProfileCommonProperties & {
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
/**
 * Mobile SDK profiling event.
 */
export declare type MobileProfileEvent = ProfileCommonProperties & {
    /**
     * The RUM Vital this profile event is associated with.
     */
    readonly vital: {
        /**
         * Unique identifier of RUM Vital in the UUID format.
         */
        readonly id: string;
        [k: string]: unknown;
    };
    [k: string]: unknown;
};
/**
 * Schema of a Profile Event metadata. Contains attributes shared by all profiles.
 */
export interface ProfileCommonProperties {
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
    readonly session?: {
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
}
