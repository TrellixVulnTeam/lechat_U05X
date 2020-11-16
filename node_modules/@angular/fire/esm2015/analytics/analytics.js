/**
 * @fileoverview added by tsickle
 * Generated from: analytics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __awaiter } from "tslib";
import { Inject, Injectable, InjectionToken, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { map, tap, shareReplay, switchMap, observeOn } from 'rxjs/operators';
import { ɵAngularFireSchedulers, ɵlazySDKProxy, FIREBASE_OPTIONS, FIREBASE_APP_NAME, ɵfirebaseAppFactory, ɵapplyMixins } from '@angular/fire';
import { proxyPolyfillCompat } from './base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/**
 * @record
 */
export function Config() { }
/** @type {?} */
export const COLLECTION_ENABLED = new InjectionToken('angularfire2.analytics.analyticsCollectionEnabled');
/** @type {?} */
export const APP_VERSION = new InjectionToken('angularfire2.analytics.appVersion');
/** @type {?} */
export const APP_NAME = new InjectionToken('angularfire2.analytics.appName');
/** @type {?} */
export const DEBUG_MODE = new InjectionToken('angularfire2.analytics.debugMode');
/** @type {?} */
export const CONFIG = new InjectionToken('angularfire2.analytics.config');
/** @type {?} */
const APP_NAME_KEY = 'app_name';
/** @type {?} */
const APP_VERSION_KEY = 'app_version';
/** @type {?} */
const DEBUG_MODE_KEY = 'debug_mode';
/** @type {?} */
const ANALYTICS_ID_FIELD = 'measurementId';
/** @type {?} */
const GTAG_CONFIG_COMMAND = 'config';
/** @type {?} */
const GTAG_FUNCTION_NAME = 'gtag';
/** @type {?} */
const DATA_LAYER_NAME = 'dataLayer';
// WARNING: interface has both a type and a value, skipping emit
/** @type {?} */
let gtag;
/** @type {?} */
let analyticsInitialized;
/** @type {?} */
const analyticsInstanceCache = {};
export class AngularFireAnalytics {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} analyticsCollectionEnabled
     * @param {?} providedAppVersion
     * @param {?} providedAppName
     * @param {?} debugModeEnabled
     * @param {?} providedConfig
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(options, nameOrConfig, analyticsCollectionEnabled, providedAppVersion, providedAppName, debugModeEnabled, providedConfig, 
    // tslint:disable-next-line:ban-types
    platformId, zone) {
        this.options = options;
        if (!analyticsInitialized) {
            if (isPlatformBrowser(platformId)) {
                window[DATA_LAYER_NAME] = window[DATA_LAYER_NAME] || [];
                /**
                 * According to the gtag documentation, this function that defines a custom data layer cannot be
                 * an arrow function because 'arguments' is not an array. It is actually an object that behaves
                 * like an array and contains more information then just indexes. Transforming this into arrow function
                 * caused issue #2505 where analytics no longer sent any data.
                 */
                // tslint:disable-next-line: only-arrow-functions
                gtag = ((/** @type {?} */ (window[GTAG_FUNCTION_NAME]))) || ((/**
                 * @param {...?} _args
                 * @return {?}
                 */
                function (..._args) {
                    ((/** @type {?} */ (window[DATA_LAYER_NAME]))).push(arguments);
                }));
                analyticsInitialized = zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => new Promise((/**
                 * @param {?} resolve
                 * @return {?}
                 */
                resolve => {
                    window[GTAG_FUNCTION_NAME] = (/**
                     * @param {...?} args
                     * @return {?}
                     */
                    (...args) => {
                        if (args[0] === 'js') {
                            resolve();
                        }
                        gtag(...args);
                    });
                }))));
            }
            else {
                gtag = (/**
                 * @return {?}
                 */
                () => {
                });
                analyticsInitialized = Promise.resolve();
            }
        }
        /** @type {?} */
        let analytics = analyticsInstanceCache[options[ANALYTICS_ID_FIELD]];
        if (!analytics) {
            analytics = of(undefined).pipe(observeOn(new ɵAngularFireSchedulers(zone).outsideAngular), switchMap((/**
             * @return {?}
             */
            () => isPlatformBrowser(platformId) ? import('firebase/analytics') : EMPTY)), map((/**
             * @return {?}
             */
            () => ɵfirebaseAppFactory(options, zone, nameOrConfig))), map((/**
             * @param {?} app
             * @return {?}
             */
            app => app.analytics())), tap((/**
             * @param {?} analytics
             * @return {?}
             */
            analytics => {
                if (analyticsCollectionEnabled === false) {
                    analytics.setAnalyticsCollectionEnabled(false);
                }
            })), shareReplay({ bufferSize: 1, refCount: false }));
            analyticsInstanceCache[options[ANALYTICS_ID_FIELD]] = analytics;
        }
        if (providedConfig) {
            this.updateConfig(providedConfig);
        }
        if (providedAppName) {
            this.updateConfig({ [APP_NAME_KEY]: providedAppName });
        }
        if (providedAppVersion) {
            this.updateConfig({ [APP_VERSION_KEY]: providedAppVersion });
        }
        if (debugModeEnabled) {
            this.updateConfig({ [DEBUG_MODE_KEY]: 1 });
        }
        return ɵlazySDKProxy(this, analytics, zone);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    updateConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            yield analyticsInitialized;
            gtag(GTAG_CONFIG_COMMAND, this.options[ANALYTICS_ID_FIELD], Object.assign(Object.assign({}, config), { update: true }));
        });
    }
}
AngularFireAnalytics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireAnalytics.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [COLLECTION_ENABLED,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_VERSION,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_NAME,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DEBUG_MODE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CONFIG,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];
/** @nocollapse */ AngularFireAnalytics.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireAnalytics_Factory() { return new AngularFireAnalytics(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(COLLECTION_ENABLED, 8), i0.ɵɵinject(APP_VERSION, 8), i0.ɵɵinject(APP_NAME, 8), i0.ɵɵinject(DEBUG_MODE, 8), i0.ɵɵinject(CONFIG, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireAnalytics, providedIn: "any" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    AngularFireAnalytics.prototype.options;
}
ɵapplyMixins(AngularFireAnalytics, [proxyPolyfillCompat]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6Ii93b3Jrc3BhY2Uvc3JjL2FuYWx5dGljcy8iLCJzb3VyY2VzIjpbImFuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RSxPQUFPLEVBR0wsc0JBQXNCLEVBQ3RCLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUVuQixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7QUFFN0MsNEJBRUM7O0FBRUQsTUFBTSxPQUFPLGtCQUFrQixHQUFHLElBQUksY0FBYyxDQUFVLG1EQUFtRCxDQUFDOztBQUNsSCxNQUFNLE9BQU8sV0FBVyxHQUFHLElBQUksY0FBYyxDQUFTLG1DQUFtQyxDQUFDOztBQUMxRixNQUFNLE9BQU8sUUFBUSxHQUFHLElBQUksY0FBYyxDQUFTLGdDQUFnQyxDQUFDOztBQUNwRixNQUFNLE9BQU8sVUFBVSxHQUFHLElBQUksY0FBYyxDQUFVLGtDQUFrQyxDQUFDOztBQUN6RixNQUFNLE9BQU8sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFTLCtCQUErQixDQUFDOztNQUUzRSxZQUFZLEdBQUcsVUFBVTs7TUFDekIsZUFBZSxHQUFHLGFBQWE7O01BQy9CLGNBQWMsR0FBRyxZQUFZ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O1lBRU8sTUFBTSx1QkFBdEMsTUFBTSxTQUFDLFdBQVc7WUE5RHNCLE1BQU07Ozs7Ozs7O0lBc0QvQyx1Q0FBMEQ7O0FBOEU5RCxZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBtYXAsIHRhcCwgc2hhcmVSZXBsYXksIHN3aXRjaE1hcCwgb2JzZXJ2ZU9uIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgRmlyZWJhc2VBcHBDb25maWcsXG4gIEZpcmViYXNlT3B0aW9ucyxcbiAgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsXG4gIMm1bGF6eVNES1Byb3h5LFxuICBGSVJFQkFTRV9PUFRJT05TLFxuICBGSVJFQkFTRV9BUFBfTkFNRSxcbiAgybVmaXJlYmFzZUFwcEZhY3RvcnksXG4gIMm1UHJvbWlzZVByb3h5LFxuICDJtWFwcGx5TWl4aW5zXG59IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBwcm94eVBvbHlmaWxsQ29tcGF0IH0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWcge1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBjb25zdCBDT0xMRUNUSU9OX0VOQUJMRUQgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ2FuZ3VsYXJmaXJlMi5hbmFseXRpY3MuYW5hbHl0aWNzQ29sbGVjdGlvbkVuYWJsZWQnKTtcbmV4cG9ydCBjb25zdCBBUFBfVkVSU0lPTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdhbmd1bGFyZmlyZTIuYW5hbHl0aWNzLmFwcFZlcnNpb24nKTtcbmV4cG9ydCBjb25zdCBBUFBfTkFNRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdhbmd1bGFyZmlyZTIuYW5hbHl0aWNzLmFwcE5hbWUnKTtcbmV4cG9ydCBjb25zdCBERUJVR19NT0RFID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdhbmd1bGFyZmlyZTIuYW5hbHl0aWNzLmRlYnVnTW9kZScpO1xuZXhwb3J0IGNvbnN0IENPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb25maWc+KCdhbmd1bGFyZmlyZTIuYW5hbHl0aWNzLmNvbmZpZycpO1xuXG5jb25zdCBBUFBfTkFNRV9LRVkgPSAnYXBwX25hbWUnO1xuY29uc3QgQVBQX1ZFUlNJT05fS0VZID0gJ2FwcF92ZXJzaW9uJztcbmNvbnN0IERFQlVHX01PREVfS0VZID0gJ2RlYnVnX21vZGUnO1xuY29uc3QgQU5BTFlUSUNTX0lEX0ZJRUxEID0gJ21lYXN1cmVtZW50SWQnO1xuY29uc3QgR1RBR19DT05GSUdfQ09NTUFORCA9ICdjb25maWcnO1xuY29uc3QgR1RBR19GVU5DVElPTl9OQU1FID0gJ2d0YWcnO1xuY29uc3QgREFUQV9MQVlFUl9OQU1FID0gJ2RhdGFMYXllcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpcmVBbmFseXRpY3MgZXh0ZW5kcyDJtVByb21pc2VQcm94eTxmaXJlYmFzZS5hbmFseXRpY3MuQW5hbHl0aWNzPiB7XG59XG5cbmxldCBndGFnOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQ7XG5sZXQgYW5hbHl0aWNzSW5pdGlhbGl6ZWQ6IFByb21pc2U8dm9pZD47XG5jb25zdCBhbmFseXRpY3NJbnN0YW5jZUNhY2hlOiB7IFtrZXk6IHN0cmluZ106IE9ic2VydmFibGU8ZmlyZWJhc2UuYW5hbHl0aWNzLkFuYWx5dGljcz4gfSA9IHt9O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlQW5hbHl0aWNzIHtcblxuICBhc3luYyB1cGRhdGVDb25maWcoY29uZmlnOiBDb25maWcpIHtcbiAgICBhd2FpdCBhbmFseXRpY3NJbml0aWFsaXplZDtcbiAgICBndGFnKEdUQUdfQ09ORklHX0NPTU1BTkQsIHRoaXMub3B0aW9uc1tBTkFMWVRJQ1NfSURfRklFTERdLCB7IC4uLmNvbmZpZywgdXBkYXRlOiB0cnVlIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChGSVJFQkFTRV9PUFRJT05TKSBwcml2YXRlIG9wdGlvbnM6IEZpcmViYXNlT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEZJUkVCQVNFX0FQUF9OQU1FKSBuYW1lT3JDb25maWc6IHN0cmluZyB8IEZpcmViYXNlQXBwQ29uZmlnIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KENPTExFQ1RJT05fRU5BQkxFRCkgYW5hbHl0aWNzQ29sbGVjdGlvbkVuYWJsZWQ6IGJvb2xlYW4gfCBudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQVBQX1ZFUlNJT04pIHByb3ZpZGVkQXBwVmVyc2lvbjogc3RyaW5nIHwgbnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFQUF9OQU1FKSBwcm92aWRlZEFwcE5hbWU6IHN0cmluZyB8IG51bGwsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChERUJVR19NT0RFKSBkZWJ1Z01vZGVFbmFibGVkOiBib29sZWFuIHwgbnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KENPTkZJRykgcHJvdmlkZWRDb25maWc6IENvbmZpZyB8IG51bGwsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICB6b25lOiBOZ1pvbmVcbiAgKSB7XG5cbiAgICBpZiAoIWFuYWx5dGljc0luaXRpYWxpemVkKSB7XG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcbiAgICAgICAgd2luZG93W0RBVEFfTEFZRVJfTkFNRV0gPSB3aW5kb3dbREFUQV9MQVlFUl9OQU1FXSB8fCBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFjY29yZGluZyB0byB0aGUgZ3RhZyBkb2N1bWVudGF0aW9uLCB0aGlzIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyBhIGN1c3RvbSBkYXRhIGxheWVyIGNhbm5vdCBiZVxuICAgICAgICAgKiBhbiBhcnJvdyBmdW5jdGlvbiBiZWNhdXNlICdhcmd1bWVudHMnIGlzIG5vdCBhbiBhcnJheS4gSXQgaXMgYWN0dWFsbHkgYW4gb2JqZWN0IHRoYXQgYmVoYXZlc1xuICAgICAgICAgKiBsaWtlIGFuIGFycmF5IGFuZCBjb250YWlucyBtb3JlIGluZm9ybWF0aW9uIHRoZW4ganVzdCBpbmRleGVzLiBUcmFuc2Zvcm1pbmcgdGhpcyBpbnRvIGFycm93IGZ1bmN0aW9uXG4gICAgICAgICAqIGNhdXNlZCBpc3N1ZSAjMjUwNSB3aGVyZSBhbmFseXRpY3Mgbm8gbG9uZ2VyIHNlbnQgYW55IGRhdGEuXG4gICAgICAgICAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9ubHktYXJyb3ctZnVuY3Rpb25zXG4gICAgICAgIGd0YWcgPSAod2luZG93W0dUQUdfRlVOQ1RJT05fTkFNRV0gYXMgYW55KSB8fCAoZnVuY3Rpb24oLi4uX2FyZ3M6IGFueVtdKSB7XG4gICAgICAgICAgKHdpbmRvd1tEQVRBX0xBWUVSX05BTUVdIGFzIGFueSkucHVzaChhcmd1bWVudHMpO1xuICAgICAgICB9KTtcbiAgICAgICAgYW5hbHl0aWNzSW5pdGlhbGl6ZWQgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+XG4gICAgICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB3aW5kb3dbR1RBR19GVU5DVElPTl9OQU1FXSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoYXJnc1swXSA9PT0gJ2pzJykge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBndGFnKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3RhZyA9ICgpID0+IHtcbiAgICAgICAgfTtcbiAgICAgICAgYW5hbHl0aWNzSW5pdGlhbGl6ZWQgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYW5hbHl0aWNzID0gYW5hbHl0aWNzSW5zdGFuY2VDYWNoZVtvcHRpb25zW0FOQUxZVElDU19JRF9GSUVMRF1dO1xuICAgIGlmICghYW5hbHl0aWNzKSB7XG4gICAgICBhbmFseXRpY3MgPSBvZih1bmRlZmluZWQpLnBpcGUoXG4gICAgICAgIG9ic2VydmVPbihuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSkub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkgPyBpbXBvcnQoJ2ZpcmViYXNlL2FuYWx5dGljcycpIDogRU1QVFkpLFxuICAgICAgICBtYXAoKCkgPT4gybVmaXJlYmFzZUFwcEZhY3Rvcnkob3B0aW9ucywgem9uZSwgbmFtZU9yQ29uZmlnKSksXG4gICAgICAgIG1hcChhcHAgPT4gYXBwLmFuYWx5dGljcygpKSxcbiAgICAgICAgdGFwKGFuYWx5dGljcyA9PiB7XG4gICAgICAgICAgaWYgKGFuYWx5dGljc0NvbGxlY3Rpb25FbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgYW5hbHl0aWNzLnNldEFuYWx5dGljc0NvbGxlY3Rpb25FbmFibGVkKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiBmYWxzZSB9KVxuICAgICAgKTtcbiAgICAgIGFuYWx5dGljc0luc3RhbmNlQ2FjaGVbb3B0aW9uc1tBTkFMWVRJQ1NfSURfRklFTERdXSA9IGFuYWx5dGljcztcbiAgICB9XG5cbiAgICBpZiAocHJvdmlkZWRDb25maWcpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29uZmlnKHByb3ZpZGVkQ29uZmlnKTtcbiAgICB9XG4gICAgaWYgKHByb3ZpZGVkQXBwTmFtZSkge1xuICAgICAgdGhpcy51cGRhdGVDb25maWcoeyBbQVBQX05BTUVfS0VZXTogcHJvdmlkZWRBcHBOYW1lIH0pO1xuICAgIH1cbiAgICBpZiAocHJvdmlkZWRBcHBWZXJzaW9uKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbmZpZyh7IFtBUFBfVkVSU0lPTl9LRVldOiBwcm92aWRlZEFwcFZlcnNpb24gfSk7XG4gICAgfVxuICAgIGlmIChkZWJ1Z01vZGVFbmFibGVkKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbmZpZyh7IFtERUJVR19NT0RFX0tFWV06IDEgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIMm1bGF6eVNES1Byb3h5KHRoaXMsIGFuYWx5dGljcywgem9uZSk7XG5cbiAgfVxuXG59XG5cbsm1YXBwbHlNaXhpbnMoQW5ndWxhckZpcmVBbmFseXRpY3MsIFtwcm94eVBvbHlmaWxsQ29tcGF0XSk7XG4iXX0=