/**
 * DO NOT MODIFY IT BY HAND. Run `yarn generate` instead.
 */
/**
 * Schema of all properties of a telemetry event
 */
export declare type TelemetryEvent = TelemetryErrorEvent | TelemetryDebugEvent | TelemetryConfigurationEvent;
/**
 * Schema of all properties of a telemetry error event
 */
export declare type TelemetryErrorEvent = CommonTelemetryProperties & {
    /**
     * The telemetry log information
     */
    telemetry: {
        /**
         * Telemetry type
         */
        type?: 'log';
        /**
         * Level/severity of the log
         */
        status: 'error';
        /**
         * Body of the log
         */
        message: string;
        /**
         * Error properties
         */
        error?: {
            /**
             * The stack trace or the complementary information about the error
             */
            stack?: string;
            /**
             * The error type or kind (or code in some cases)
             */
            kind?: string;
            [k: string]: unknown;
        };
        [k: string]: unknown;
    };
    [k: string]: unknown;
};
/**
 * Schema of all properties of a telemetry debug event
 */
export declare type TelemetryDebugEvent = CommonTelemetryProperties & {
    /**
     * The telemetry log information
     */
    telemetry: {
        /**
         * Telemetry type
         */
        type?: 'log';
        /**
         * Level/severity of the log
         */
        status: 'debug';
        /**
         * Body of the log
         */
        message: string;
        [k: string]: unknown;
    };
    [k: string]: unknown;
};
/**
 * Schema of all properties of a telemetry configuration event
 */
export declare type TelemetryConfigurationEvent = CommonTelemetryProperties & {
    /**
     * The telemetry configuration information
     */
    telemetry: {
        /**
         * Telemetry type
         */
        type: 'configuration';
        /**
         * Configuration properties
         */
        configuration: {
            /**
             * The percentage of sessions tracked
             */
            session_sample_rate: number;
            /**
             * The percentage of telemetry events sent
             */
            telemetry_sample_rate: number;
            /**
             * The percentage of requests traced
             */
            trace_sample_rate: number;
            /**
             * The percentage of sessions with Browser RUM & Session Replay pricing tracked
             */
            premium_sample_rate?: number;
            /**
             * Is a proxy configured
             */
            use_proxy: boolean;
            /**
             * Is beforeSend callback function used
             */
            use_before_send?: boolean;
            /**
             * Does initialization fails silently if the SDK is already initialized
             */
            silent_multiple_init?: boolean;
            /**
             * Is session across subdomains for the same site tracked
             */
            track_session_across_subdomains?: boolean;
            /**
             * Is a secure cross-site session cookie used
             */
            use_cross_site_session_cookie?: boolean;
            /**
             * Is a secure session cookie used
             */
            use_secure_session_cookie?: boolean;
            /**
             * Attribute to be used to name actions
             */
            action_name_attribute?: string;
            /**
             * Is the allowed tracing origins list used
             */
            use_allowed_tracing_origins?: boolean;
            /**
             * Session replay default privacy level
             */
            default_privacy_level?: 'mask-user-input' | 'mask' | 'allow';
            /**
             * Is the request origins list used to ignore when computing the page activity
             */
            use_excluded_activity_urls?: boolean;
            /**
             * Are user frustrations tracked
             */
            track_frustrations?: boolean;
            /**
             * Is the RUM views creation handled manually
             */
            track_views_manually?: boolean;
            /**
             * Are user actions tracked
             */
            track_interactions?: boolean;
            /**
             * Are console.* tracked
             */
            forward_console_logs?: boolean;
            /**
             * Are console.error logs, uncaught exceptions and network errors tracked
             */
            forward_errors_to_logs?: boolean;
            /**
             * Are reports from the Reporting API tracked
             */
            forward_reports?: boolean;
            [k: string]: unknown;
        };
        [k: string]: unknown;
    };
    [k: string]: unknown;
};
/**
 * Schema of common properties of Telemetry events
 */
export interface CommonTelemetryProperties {
    /**
     * Internal properties
     */
    _dd: {
        /**
         * Version of the RUM event format
         */
        readonly format_version: 2;
        [k: string]: unknown;
    };
    /**
     * Telemetry event type. Should specify telemetry only.
     */
    readonly type: 'telemetry';
    /**
     * Start of the event in ms from epoch
     */
    date: number;
    /**
     * The SDK generating the telemetry event
     */
    service: string;
    /**
     * The source of this event
     */
    readonly source: 'android' | 'ios' | 'browser' | 'flutter' | 'react-native';
    /**
     * The version of the SDK generating the telemetry event
     */
    version: string;
    /**
     * Application properties
     */
    readonly application?: {
        /**
         * UUID of the application
         */
        id: string;
        [k: string]: unknown;
    };
    /**
     * Session properties
     */
    session?: {
        /**
         * UUID of the session
         */
        id: string;
        [k: string]: unknown;
    };
    /**
     * View properties
     */
    view?: {
        /**
         * UUID of the view
         */
        id: string;
        [k: string]: unknown;
    };
    /**
     * Action properties
     */
    action?: {
        /**
         * UUID of the action
         */
        id: string;
        [k: string]: unknown;
    };
    /**
     * Enabled experimental features
     */
    readonly experimental_features?: string[];
    [k: string]: unknown;
}
