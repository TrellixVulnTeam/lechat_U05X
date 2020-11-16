/**
 * @fileoverview added by tsickle
 * Generated from: functions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, NgZone, Optional } from '@angular/core';
import { from, of } from 'rxjs';
import { map, observeOn, shareReplay, switchMap, tap } from 'rxjs/operators';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS, ɵAngularFireSchedulers, ɵfirebaseAppFactory, ɵlazySDKProxy, ɵapplyMixins } from '@angular/fire';
import { proxyPolyfillCompat } from './base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/** @type {?} */
export const ORIGIN = new InjectionToken('angularfire2.functions.origin');
/** @type {?} */
export const REGION = new InjectionToken('angularfire2.functions.region');
// WARNING: interface has both a type and a value, skipping emit
export class AngularFireFunctions {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} zone
     * @param {?} region
     * @param {?} origin
     */
    constructor(options, nameOrConfig, zone, region, origin) {
        /** @type {?} */
        const schedulers = new ɵAngularFireSchedulers(zone);
        /** @type {?} */
        const functions = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        () => import('firebase/functions'))), map((/**
         * @return {?}
         */
        () => ɵfirebaseAppFactory(options, zone, nameOrConfig))), map((/**
         * @param {?} app
         * @return {?}
         */
        app => app.functions(region || undefined))), tap((/**
         * @param {?} functions
         * @return {?}
         */
        functions => {
            if (origin) {
                functions.useFunctionsEmulator(origin);
            }
        })), shareReplay({ bufferSize: 1, refCount: false }));
        this.httpsCallable = (/**
         * @template T, R
         * @param {?} name
         * @return {?}
         */
        (name) => (/**
         * @param {?} data
         * @return {?}
         */
        (data) => from(functions).pipe(observeOn(schedulers.insideAngular), switchMap((/**
         * @param {?} functions
         * @return {?}
         */
        functions => functions.httpsCallable(name)(data))), map((/**
         * @param {?} r
         * @return {?}
         */
        r => (/** @type {?} */ (r.data)))))));
        return ɵlazySDKProxy(this, functions, zone);
    }
}
AngularFireFunctions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireFunctions.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [REGION,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ORIGIN,] }] }
];
/** @nocollapse */ AngularFireFunctions.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireFunctions_Factory() { return new AngularFireFunctions(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(REGION, 8), i0.ɵɵinject(ORIGIN, 8)); }, token: AngularFireFunctions, providedIn: "any" });
if (false) {
    /** @type {?} */
    AngularFireFunctions.prototype.httpsCallable;
}
ɵapplyMixins(AngularFireFunctions, [proxyPolyfillCompat]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Ii93b3Jrc3BhY2Uvc3JjL2Z1bmN0aW9ucy8iLCJzb3VyY2VzIjpbImZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxJQUFJLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0UsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFHaEIsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQixhQUFhLEVBRWIsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7OztBQUU3QyxNQUFNLE9BQU8sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFTLCtCQUErQixDQUFDOztBQUNqRixNQUFNLE9BQU8sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFTLCtCQUErQixDQUFDOztBQVNqRixNQUFNLE9BQU8sb0JBQW9COzs7Ozs7OztJQUkvQixZQUM0QixPQUF3QixFQUNYLFlBQTJELEVBQ2xHLElBQVksRUFDZ0IsTUFBcUIsRUFDckIsTUFBcUI7O2NBRTNDLFVBQVUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQzs7Y0FFN0MsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQ2xDLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQ3BDLFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFDLEVBQzdDLEdBQUc7OztRQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLEVBQUMsRUFDM0QsR0FBRzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLEVBQUMsRUFDOUMsR0FBRzs7OztRQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQyxFQUFDLEVBQ0YsV0FBVyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FDaEQ7UUFFRCxJQUFJLENBQUMsYUFBYTs7Ozs7UUFBRyxDQUFtQixJQUFZLEVBQUUsRUFBRTs7OztRQUN0RCxDQUFDLElBQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDL0IsU0FBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFDbkMsU0FBUzs7OztRQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUMzRCxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxtQkFBQSxDQUFDLENBQUMsSUFBSSxFQUFLLEVBQUMsQ0FDdEIsQ0FBQSxDQUFBLENBQUM7UUFFSixPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTlDLENBQUM7OztZQXRDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLEtBQUs7YUFDbEI7Ozs7NENBTUksTUFBTSxTQUFDLGdCQUFnQjs0Q0FDdkIsUUFBUSxZQUFJLE1BQU0sU0FBQyxpQkFBaUI7WUFqQ0ksTUFBTTs0Q0FtQzlDLFFBQVEsWUFBSSxNQUFNLFNBQUMsTUFBTTs0Q0FDekIsUUFBUSxZQUFJLE1BQU0sU0FBQyxNQUFNOzs7OztJQVA1Qiw2Q0FBOEY7O0FBcUNoRyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBvYnNlcnZlT24sIHNoYXJlUmVwbGF5LCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIEZJUkVCQVNFX0FQUF9OQU1FLFxuICBGSVJFQkFTRV9PUFRJT05TLFxuICBGaXJlYmFzZUFwcENvbmZpZyxcbiAgRmlyZWJhc2VPcHRpb25zLFxuICDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgybVmaXJlYmFzZUFwcEZhY3RvcnksXG4gIMm1bGF6eVNES1Byb3h5LFxuICDJtVByb21pc2VQcm94eSxcbiAgybVhcHBseU1peGluc1xufSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgcHJveHlQb2x5ZmlsbENvbXBhdCB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBPUklHSU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignYW5ndWxhcmZpcmUyLmZ1bmN0aW9ucy5vcmlnaW4nKTtcbmV4cG9ydCBjb25zdCBSRUdJT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignYW5ndWxhcmZpcmUyLmZ1bmN0aW9ucy5yZWdpb24nKTtcblxuLy8gb3ZlcnJpZGUgaHR0cHNDYWxsYWJsZSBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIDUueFxuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlyZUZ1bmN0aW9ucyBleHRlbmRzIE9taXQ8ybVQcm9taXNlUHJveHk8ZmlyZWJhc2UuZnVuY3Rpb25zLkZ1bmN0aW9ucz4sICdodHRwc0NhbGxhYmxlJz4ge1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlRnVuY3Rpb25zIHtcblxuICBwdWJsaWMgcmVhZG9ubHkgaHR0cHNDYWxsYWJsZTogPFQgPSBhbnksIFIgPSBhbnk+KG5hbWU6IHN0cmluZykgPT4gKGRhdGE6IFQpID0+IE9ic2VydmFibGU8Uj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChGSVJFQkFTRV9PUFRJT05TKSBvcHRpb25zOiBGaXJlYmFzZU9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChGSVJFQkFTRV9BUFBfTkFNRSkgbmFtZU9yQ29uZmlnOiBzdHJpbmcgfCBGaXJlYmFzZUFwcENvbmZpZyB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgem9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoUkVHSU9OKSByZWdpb246IHN0cmluZyB8IG51bGwsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChPUklHSU4pIG9yaWdpbjogc3RyaW5nIHwgbnVsbFxuICApIHtcbiAgICBjb25zdCBzY2hlZHVsZXJzID0gbmV3IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzKHpvbmUpO1xuXG4gICAgY29uc3QgZnVuY3Rpb25zID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IGltcG9ydCgnZmlyZWJhc2UvZnVuY3Rpb25zJykpLFxuICAgICAgbWFwKCgpID0+IMm1ZmlyZWJhc2VBcHBGYWN0b3J5KG9wdGlvbnMsIHpvbmUsIG5hbWVPckNvbmZpZykpLFxuICAgICAgbWFwKGFwcCA9PiBhcHAuZnVuY3Rpb25zKHJlZ2lvbiB8fCB1bmRlZmluZWQpKSxcbiAgICAgIHRhcChmdW5jdGlvbnMgPT4ge1xuICAgICAgICBpZiAob3JpZ2luKSB7XG4gICAgICAgICAgZnVuY3Rpb25zLnVzZUZ1bmN0aW9uc0VtdWxhdG9yKG9yaWdpbik7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogZmFsc2UgfSlcbiAgICApO1xuXG4gICAgdGhpcy5odHRwc0NhbGxhYmxlID0gPFQgPSBhbnksIFIgPSBhbnk+KG5hbWU6IHN0cmluZykgPT5cbiAgICAgIChkYXRhOiBUKSA9PiBmcm9tKGZ1bmN0aW9ucykucGlwZShcbiAgICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMuaW5zaWRlQW5ndWxhciksXG4gICAgICAgIHN3aXRjaE1hcChmdW5jdGlvbnMgPT4gZnVuY3Rpb25zLmh0dHBzQ2FsbGFibGUobmFtZSkoZGF0YSkpLFxuICAgICAgICBtYXAociA9PiByLmRhdGEgYXMgUilcbiAgICAgICk7XG5cbiAgICByZXR1cm4gybVsYXp5U0RLUHJveHkodGhpcywgZnVuY3Rpb25zLCB6b25lKTtcblxuICB9XG5cbn1cblxuybVhcHBseU1peGlucyhBbmd1bGFyRmlyZUZ1bmN0aW9ucywgW3Byb3h5UG9seWZpbGxDb21wYXRdKTtcbiJdfQ==