import * as BrowserProfiling from '../generated/browserProfiling'
import * as MobileProfiling from '../generated/mobileProfiling'

export { BrowserProfiling, MobileProfiling }

export type ProfileEvent = BrowserProfiling.ProfileEvent | MobileProfiling.ProfileEvent
export type ProfileEventAttributes = BrowserProfiling.ProfileEventAttributes | MobileProfiling.ProfileEventAttributes
