/**
 * @fileoverview added by tsickle
 * Generated from: performance.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { FirebaseApp, ɵapplyMixins, ɵlazySDKProxy } from '@angular/fire';
import { isPlatformBrowser } from '@angular/common';
import { proxyPolyfillCompat } from './base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
// SEMVER @ v6, drop and move core ng metrics to a service
/** @type {?} */
export const AUTOMATICALLY_TRACE_CORE_NG_METRICS = new InjectionToken('angularfire2.performance.auto_trace');
/** @type {?} */
export const INSTRUMENTATION_ENABLED = new InjectionToken('angularfire2.performance.instrumentationEnabled');
/** @type {?} */
export const DATA_COLLECTION_ENABLED = new InjectionToken('angularfire2.performance.dataCollectionEnabled');
// WARNING: interface has both a type and a value, skipping emit
export class AngularFirePerformance {
    /**
     * @param {?} app
     * @param {?} instrumentationEnabled
     * @param {?} dataCollectionEnabled
     * @param {?} zone
     * @param {?} platformId
     */
    constructor(app, instrumentationEnabled, dataCollectionEnabled, zone, 
    // tslint:disable-next-line:ban-types
    platformId) {
        this.zone = zone;
        this.performance = of(undefined).pipe(switchMap((/**
         * @return {?}
         */
        () => isPlatformBrowser(platformId) ? zone.runOutsideAngular((/**
         * @return {?}
         */
        () => import('firebase/performance'))) : EMPTY)), map((/**
         * @return {?}
         */
        () => zone.runOutsideAngular((/**
         * @return {?}
         */
        () => app.performance())))), tap((/**
         * @param {?} performance
         * @return {?}
         */
        performance => {
            if (instrumentationEnabled === false) {
                performance.instrumentationEnabled = false;
            }
            if (dataCollectionEnabled === false) {
                performance.dataCollectionEnabled = false;
            }
        })), shareReplay({ bufferSize: 1, refCount: false }));
        return ɵlazySDKProxy(this, this.performance, zone);
    }
}
AngularFirePerformance.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFirePerformance.ctorParameters = () => [
    { type: FirebaseApp },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INSTRUMENTATION_ENABLED,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DATA_COLLECTION_ENABLED,] }] },
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
/** @nocollapse */ AngularFirePerformance.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFirePerformance_Factory() { return new AngularFirePerformance(i0.ɵɵinject(i1.FirebaseApp), i0.ɵɵinject(INSTRUMENTATION_ENABLED, 8), i0.ɵɵinject(DATA_COLLECTION_ENABLED, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.PLATFORM_ID)); }, token: AngularFirePerformance, providedIn: "any" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    AngularFirePerformance.prototype.performance;
    /**
     * @type {?}
     * @private
     */
    AngularFirePerformance.prototype.zone;
}
/** @type {?} */
const trace$ = (/**
 * @param {?} traceId
 * @return {?}
 */
(traceId) => {
    if (typeof window !== 'undefined' && window.performance) {
        /** @type {?} */
        const entries = window.performance.getEntriesByName(traceId, 'measure') || [];
        /** @type {?} */
        const startMarkName = `_${traceId}Start[${entries.length}]`;
        /** @type {?} */
        const endMarkName = `_${traceId}End[${entries.length}]`;
        return new Observable((/**
         * @param {?} emitter
         * @return {?}
         */
        emitter => {
            window.performance.mark(startMarkName);
            emitter.next();
            return {
                unsubscribe: (/**
                 * @return {?}
                 */
                () => {
                    window.performance.mark(endMarkName);
                    window.performance.measure(traceId, startMarkName, endMarkName);
                })
            };
        }));
    }
    else {
        return EMPTY;
    }
});
const ɵ0 = trace$;
/** @type {?} */
export const traceUntil = (/**
 * @template T
 * @param {?} name
 * @param {?} test
 * @param {?=} options
 * @return {?}
 */
(name, test, options) => (/**
 * @param {?} source$
 * @return {?}
 */
(source$) => new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
subscriber => {
    /** @type {?} */
    const traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @param {?} a
     * @return {?}
     */
    a => test(a) && traceSubscription.unsubscribe()), (/**
     * @return {?}
     */
    () => {
    }), (/**
     * @return {?}
     */
    () => options && options.orComplete && traceSubscription.unsubscribe()))).subscribe(subscriber);
}))));
/** @type {?} */
export const traceWhile = (/**
 * @template T
 * @param {?} name
 * @param {?} test
 * @param {?=} options
 * @return {?}
 */
(name, test, options) => (/**
 * @param {?} source$
 * @return {?}
 */
(source$) => new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
subscriber => {
    /** @type {?} */
    let traceSubscription;
    return source$.pipe(tap((/**
     * @param {?} a
     * @return {?}
     */
    a => {
        if (test(a)) {
            traceSubscription = traceSubscription || trace$(name).subscribe();
        }
        else {
            if (traceSubscription) {
                traceSubscription.unsubscribe();
            }
            traceSubscription = undefined;
        }
    }), (/**
     * @return {?}
     */
    () => {
    }), (/**
     * @return {?}
     */
    () => options && options.orComplete && traceSubscription && traceSubscription.unsubscribe()))).subscribe(subscriber);
}))));
/** @type {?} */
export const traceUntilComplete = (/**
 * @template T
 * @param {?} name
 * @return {?}
 */
(name) => (/**
 * @param {?} source$
 * @return {?}
 */
(source$) => new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
subscriber => {
    /** @type {?} */
    const traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @return {?}
     */
    () => {
    }), (/**
     * @return {?}
     */
    () => {
    }), (/**
     * @return {?}
     */
    () => traceSubscription.unsubscribe()))).subscribe(subscriber);
}))));
/** @type {?} */
export const traceUntilFirst = (/**
 * @template T
 * @param {?} name
 * @return {?}
 */
(name) => (/**
 * @param {?} source$
 * @return {?}
 */
(source$) => new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
subscriber => {
    /** @type {?} */
    const traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @return {?}
     */
    () => traceSubscription.unsubscribe()), (/**
     * @return {?}
     */
    () => {
    }), (/**
     * @return {?}
     */
    () => {
    }))).subscribe(subscriber);
}))));
/** @type {?} */
export const trace = (/**
 * @template T
 * @param {?} name
 * @return {?}
 */
(name) => (/**
 * @param {?} source$
 * @return {?}
 */
(source$) => new Observable((/**
 * @param {?} subscriber
 * @return {?}
 */
subscriber => {
    /** @type {?} */
    const traceSubscription = trace$(name).subscribe();
    return source$.pipe(tap((/**
     * @return {?}
     */
    () => traceSubscription.unsubscribe()), (/**
     * @return {?}
     */
    () => {
    }), (/**
     * @return {?}
     */
    () => traceSubscription.unsubscribe()))).subscribe(subscriber);
}))));
ɵapplyMixins(AngularFirePerformance, [proxyPolyfillCompat]);
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2UuanMiLCJzb3VyY2VSb290IjoiL3dvcmtzcGFjZS9zcmMvcGVyZm9ybWFuY2UvIiwic291cmNlcyI6WyJwZXJmb3JtYW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFHN0MsTUFBTSxPQUFPLG1DQUFtQyxHQUFHLElBQUksY0FBYyxDQUFVLHFDQUFxQyxDQUFDOztBQUNySCxNQUFNLE9BQU8sdUJBQXVCLEdBQUcsSUFBSSxjQUFjLENBQVUsaURBQWlELENBQUM7O0FBQ3JILE1BQU0sT0FBTyx1QkFBdUIsR0FBRyxJQUFJLGNBQWMsQ0FBVSxnREFBZ0QsQ0FBQzs7QUFRcEgsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7Ozs7SUFJakMsWUFDRSxHQUFnQixFQUM2QixzQkFBc0MsRUFDdEMscUJBQXFDLEVBQzFFLElBQVk7SUFDcEIscUNBQXFDO0lBQ2hCLFVBQWtCO1FBRi9CLFNBQUksR0FBSixJQUFJLENBQVE7UUFLcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUNuQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQjs7O1FBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLEVBQ3JILEdBQUc7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxFQUFDLEVBQzFELEdBQUc7Ozs7UUFBQyxXQUFXLENBQUMsRUFBRTtZQUNoQixJQUFJLHNCQUFzQixLQUFLLEtBQUssRUFBRTtnQkFDcEMsV0FBVyxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQzthQUM1QztZQUNELElBQUkscUJBQXFCLEtBQUssS0FBSyxFQUFFO2dCQUNuQyxXQUFXLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO2FBQzNDO1FBQ0gsQ0FBQyxFQUFDLEVBQ0YsV0FBVyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FDaEQsQ0FBQztRQUVGLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRXJELENBQUM7OztZQWhDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLEtBQUs7YUFDbEI7Ozs7WUFkUSxXQUFXOzRDQXFCZixRQUFRLFlBQUksTUFBTSxTQUFDLHVCQUF1Qjs0Q0FDMUMsUUFBUSxZQUFJLE1BQU0sU0FBQyx1QkFBdUI7WUExQkYsTUFBTTtZQTZCZCxNQUFNLHVCQUF0QyxNQUFNLFNBQUMsV0FBVzs7Ozs7Ozs7SUFSckIsNkNBQTJFOzs7OztJQU16RSxzQ0FBb0I7OztNQXlCbEIsTUFBTTs7OztBQUFHLENBQUMsT0FBZSxFQUFFLEVBQUU7SUFDakMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTs7Y0FDakQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUU7O2NBQ3ZFLGFBQWEsR0FBRyxJQUFJLE9BQU8sU0FBUyxPQUFPLENBQUMsTUFBTSxHQUFHOztjQUNyRCxXQUFXLEdBQUcsSUFBSSxPQUFPLE9BQU8sT0FBTyxDQUFDLE1BQU0sR0FBRztRQUN2RCxPQUFPLElBQUksVUFBVTs7OztRQUFPLE9BQU8sQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLE9BQU87Z0JBQ0wsV0FBVzs7O2dCQUFFLEdBQUcsRUFBRTtvQkFDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ2xFLENBQUMsQ0FBQTthQUNGLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQyxDQUFBOzs7QUFFRCxNQUFNLE9BQU8sVUFBVTs7Ozs7OztBQUFHLENBQ3hCLElBQVksRUFDWixJQUF1QixFQUN2QixPQUFrQyxFQUNsQyxFQUFFOzs7O0FBQUMsQ0FBQyxPQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLFVBQVU7Ozs7QUFBSSxVQUFVLENBQUMsRUFBRTs7VUFDeEQsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTtJQUNsRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQ2pCLEdBQUc7Ozs7SUFDRCxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7OztJQUMvQyxHQUFHLEVBQUU7SUFDTCxDQUFDOzs7SUFDRCxHQUFHLEVBQUUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFDdkUsQ0FDRixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxQixDQUFDLEVBQUMsQ0FBQSxDQUFBOztBQUVGLE1BQU0sT0FBTyxVQUFVOzs7Ozs7O0FBQUcsQ0FDeEIsSUFBWSxFQUNaLElBQXVCLEVBQ3ZCLE9BQWtDLEVBQ2xDLEVBQUU7Ozs7QUFBQyxDQUFDLE9BQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksVUFBVTs7OztBQUFJLFVBQVUsQ0FBQyxFQUFFOztRQUMxRCxpQkFBMkM7SUFDL0MsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUNqQixHQUFHOzs7O0lBQ0QsQ0FBQyxDQUFDLEVBQUU7UUFDRixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNYLGlCQUFpQixHQUFHLGlCQUFpQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNuRTthQUFNO1lBQ0wsSUFBSSxpQkFBaUIsRUFBRTtnQkFDckIsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDakM7WUFFRCxpQkFBaUIsR0FBRyxTQUFTLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7SUFDRCxHQUFHLEVBQUU7SUFDTCxDQUFDOzs7SUFDRCxHQUFHLEVBQUUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFDNUYsQ0FDRixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxQixDQUFDLEVBQUMsQ0FBQSxDQUFBOztBQUVGLE1BQU0sT0FBTyxrQkFBa0I7Ozs7O0FBQUcsQ0FBVSxJQUFZLEVBQUUsRUFBRTs7OztBQUFDLENBQUMsT0FBc0IsRUFBRSxFQUFFLENBQUMsSUFBSSxVQUFVOzs7O0FBQUksVUFBVSxDQUFDLEVBQUU7O1VBQ2hILGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7SUFDbEQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUNqQixHQUFHOzs7SUFDRCxHQUFHLEVBQUU7SUFDTCxDQUFDOzs7SUFDRCxHQUFHLEVBQUU7SUFDTCxDQUFDOzs7SUFDRCxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFDdEMsQ0FDRixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxQixDQUFDLEVBQUMsQ0FBQSxDQUFBOztBQUVGLE1BQU0sT0FBTyxlQUFlOzs7OztBQUFHLENBQVUsSUFBWSxFQUFFLEVBQUU7Ozs7QUFBQyxDQUFDLE9BQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksVUFBVTs7OztBQUFJLFVBQVUsQ0FBQyxFQUFFOztVQUM3RyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFO0lBQ2xELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FDakIsR0FBRzs7O0lBQ0QsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFOzs7SUFDckMsR0FBRyxFQUFFO0lBQ0wsQ0FBQzs7O0lBQ0QsR0FBRyxFQUFFO0lBQ0wsQ0FBQyxFQUNGLENBQ0YsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDMUIsQ0FBQyxFQUFDLENBQUEsQ0FBQTs7QUFFRixNQUFNLE9BQU8sS0FBSzs7Ozs7QUFBRyxDQUFVLElBQVksRUFBRSxFQUFFOzs7O0FBQUMsQ0FBQyxPQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLFVBQVU7Ozs7QUFBSSxVQUFVLENBQUMsRUFBRTs7VUFDbkcsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTtJQUNsRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQ2pCLEdBQUc7OztJQUNELEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRTs7O0lBQ3JDLEdBQUcsRUFBRTtJQUNMLENBQUM7OztJQUNELEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxFQUN0QyxDQUNGLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFCLENBQUMsRUFBQyxDQUFBLENBQUE7QUFFRixZQUFZLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc2hhcmVSZXBsYXksIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBGaXJlYmFzZUFwcCwgybVhcHBseU1peGlucywgybVsYXp5U0RLUHJveHksIMm1UHJvbWlzZVByb3h5IH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBwcm94eVBvbHlmaWxsQ29tcGF0IH0gZnJvbSAnLi9iYXNlJztcblxuLy8gU0VNVkVSIEAgdjYsIGRyb3AgYW5kIG1vdmUgY29yZSBuZyBtZXRyaWNzIHRvIGEgc2VydmljZVxuZXhwb3J0IGNvbnN0IEFVVE9NQVRJQ0FMTFlfVFJBQ0VfQ09SRV9OR19NRVRSSUNTID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdhbmd1bGFyZmlyZTIucGVyZm9ybWFuY2UuYXV0b190cmFjZScpO1xuZXhwb3J0IGNvbnN0IElOU1RSVU1FTlRBVElPTl9FTkFCTEVEID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdhbmd1bGFyZmlyZTIucGVyZm9ybWFuY2UuaW5zdHJ1bWVudGF0aW9uRW5hYmxlZCcpO1xuZXhwb3J0IGNvbnN0IERBVEFfQ09MTEVDVElPTl9FTkFCTEVEID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdhbmd1bGFyZmlyZTIucGVyZm9ybWFuY2UuZGF0YUNvbGxlY3Rpb25FbmFibGVkJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpcmVQZXJmb3JtYW5jZSBleHRlbmRzIMm1UHJvbWlzZVByb3h5PGZpcmViYXNlLnBlcmZvcm1hbmNlLlBlcmZvcm1hbmNlPiB7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVQZXJmb3JtYW5jZSB7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBwZXJmb3JtYW5jZTogT2JzZXJ2YWJsZTxmaXJlYmFzZS5wZXJmb3JtYW5jZS5QZXJmb3JtYW5jZT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgYXBwOiBGaXJlYmFzZUFwcCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KElOU1RSVU1FTlRBVElPTl9FTkFCTEVEKSBpbnN0cnVtZW50YXRpb25FbmFibGVkOiBib29sZWFuIHwgbnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERBVEFfQ09MTEVDVElPTl9FTkFCTEVEKSBkYXRhQ29sbGVjdGlvbkVuYWJsZWQ6IGJvb2xlYW4gfCBudWxsLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgKSB7XG5cbiAgICB0aGlzLnBlcmZvcm1hbmNlID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCgpID0+IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpID8gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBpbXBvcnQoJ2ZpcmViYXNlL3BlcmZvcm1hbmNlJykpIDogRU1QVFkpLFxuICAgICAgbWFwKCgpID0+IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gYXBwLnBlcmZvcm1hbmNlKCkpKSxcbiAgICAgIHRhcChwZXJmb3JtYW5jZSA9PiB7XG4gICAgICAgIGlmIChpbnN0cnVtZW50YXRpb25FbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgIHBlcmZvcm1hbmNlLmluc3RydW1lbnRhdGlvbkVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YUNvbGxlY3Rpb25FbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgIHBlcmZvcm1hbmNlLmRhdGFDb2xsZWN0aW9uRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IGZhbHNlIH0pXG4gICAgKTtcblxuICAgIHJldHVybiDJtWxhenlTREtQcm94eSh0aGlzLCB0aGlzLnBlcmZvcm1hbmNlLCB6b25lKTtcblxuICB9XG5cbn1cblxuY29uc3QgdHJhY2UkID0gKHRyYWNlSWQ6IHN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnBlcmZvcm1hbmNlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lKHRyYWNlSWQsICdtZWFzdXJlJykgfHwgW107XG4gICAgY29uc3Qgc3RhcnRNYXJrTmFtZSA9IGBfJHt0cmFjZUlkfVN0YXJ0WyR7ZW50cmllcy5sZW5ndGh9XWA7XG4gICAgY29uc3QgZW5kTWFya05hbWUgPSBgXyR7dHJhY2VJZH1FbmRbJHtlbnRyaWVzLmxlbmd0aH1dYDtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8dm9pZD4oZW1pdHRlciA9PiB7XG4gICAgICB3aW5kb3cucGVyZm9ybWFuY2UubWFyayhzdGFydE1hcmtOYW1lKTtcbiAgICAgIGVtaXR0ZXIubmV4dCgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdW5zdWJzY3JpYmU6ICgpID0+IHtcbiAgICAgICAgICB3aW5kb3cucGVyZm9ybWFuY2UubWFyayhlbmRNYXJrTmFtZSk7XG4gICAgICAgICAgd2luZG93LnBlcmZvcm1hbmNlLm1lYXN1cmUodHJhY2VJZCwgc3RhcnRNYXJrTmFtZSwgZW5kTWFya05hbWUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBFTVBUWTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHRyYWNlVW50aWwgPSA8VCA9IGFueT4oXG4gIG5hbWU6IHN0cmluZyxcbiAgdGVzdDogKGE6IFQpID0+IGJvb2xlYW4sXG4gIG9wdGlvbnM/OiB7IG9yQ29tcGxldGU/OiBib29sZWFuIH1cbikgPT4gKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IG5ldyBPYnNlcnZhYmxlPFQ+KHN1YnNjcmliZXIgPT4ge1xuICBjb25zdCB0cmFjZVN1YnNjcmlwdGlvbiA9IHRyYWNlJChuYW1lKS5zdWJzY3JpYmUoKTtcbiAgcmV0dXJuIHNvdXJjZSQucGlwZShcbiAgICB0YXAoXG4gICAgICBhID0+IHRlc3QoYSkgJiYgdHJhY2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSxcbiAgICAgICgpID0+IHtcbiAgICAgIH0sXG4gICAgICAoKSA9PiBvcHRpb25zICYmIG9wdGlvbnMub3JDb21wbGV0ZSAmJiB0cmFjZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG4gICAgKVxuICApLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgdHJhY2VXaGlsZSA9IDxUID0gYW55PihcbiAgbmFtZTogc3RyaW5nLFxuICB0ZXN0OiAoYTogVCkgPT4gYm9vbGVhbixcbiAgb3B0aW9ucz86IHsgb3JDb21wbGV0ZT86IGJvb2xlYW4gfVxuKSA9PiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gbmV3IE9ic2VydmFibGU8VD4oc3Vic2NyaWJlciA9PiB7XG4gIGxldCB0cmFjZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICByZXR1cm4gc291cmNlJC5waXBlKFxuICAgIHRhcChcbiAgICAgIGEgPT4ge1xuICAgICAgICBpZiAodGVzdChhKSkge1xuICAgICAgICAgIHRyYWNlU3Vic2NyaXB0aW9uID0gdHJhY2VTdWJzY3JpcHRpb24gfHwgdHJhY2UkKG5hbWUpLnN1YnNjcmliZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0cmFjZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdHJhY2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0cmFjZVN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgIH0sXG4gICAgICAoKSA9PiBvcHRpb25zICYmIG9wdGlvbnMub3JDb21wbGV0ZSAmJiB0cmFjZVN1YnNjcmlwdGlvbiAmJiB0cmFjZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG4gICAgKVxuICApLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgdHJhY2VVbnRpbENvbXBsZXRlID0gPFQgPSBhbnk+KG5hbWU6IHN0cmluZykgPT4gKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IG5ldyBPYnNlcnZhYmxlPFQ+KHN1YnNjcmliZXIgPT4ge1xuICBjb25zdCB0cmFjZVN1YnNjcmlwdGlvbiA9IHRyYWNlJChuYW1lKS5zdWJzY3JpYmUoKTtcbiAgcmV0dXJuIHNvdXJjZSQucGlwZShcbiAgICB0YXAoXG4gICAgICAoKSA9PiB7XG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgfSxcbiAgICAgICgpID0+IHRyYWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcbiAgICApXG4gICkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xufSk7XG5cbmV4cG9ydCBjb25zdCB0cmFjZVVudGlsRmlyc3QgPSA8VCA9IGFueT4obmFtZTogc3RyaW5nKSA9PiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gbmV3IE9ic2VydmFibGU8VD4oc3Vic2NyaWJlciA9PiB7XG4gIGNvbnN0IHRyYWNlU3Vic2NyaXB0aW9uID0gdHJhY2UkKG5hbWUpLnN1YnNjcmliZSgpO1xuICByZXR1cm4gc291cmNlJC5waXBlKFxuICAgIHRhcChcbiAgICAgICgpID0+IHRyYWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCksXG4gICAgICAoKSA9PiB7XG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgfVxuICAgIClcbiAgKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG59KTtcblxuZXhwb3J0IGNvbnN0IHRyYWNlID0gPFQgPSBhbnk+KG5hbWU6IHN0cmluZykgPT4gKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IG5ldyBPYnNlcnZhYmxlPFQ+KHN1YnNjcmliZXIgPT4ge1xuICBjb25zdCB0cmFjZVN1YnNjcmlwdGlvbiA9IHRyYWNlJChuYW1lKS5zdWJzY3JpYmUoKTtcbiAgcmV0dXJuIHNvdXJjZSQucGlwZShcbiAgICB0YXAoXG4gICAgICAoKSA9PiB0cmFjZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpLFxuICAgICAgKCkgPT4ge1xuICAgICAgfSxcbiAgICAgICgpID0+IHRyYWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcbiAgICApXG4gICkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xufSk7XG5cbsm1YXBwbHlNaXhpbnMoQW5ndWxhckZpcmVQZXJmb3JtYW5jZSwgW3Byb3h5UG9seWZpbGxDb21wYXRdKTtcbiJdfQ==