/**
 * @fileoverview added by tsickle
 * Generated from: messaging.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import firebase from 'firebase/app';
import { concat, EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, defaultIfEmpty, map, mergeMap, observeOn, switchMap, switchMapTo, shareReplay, subscribeOn } from 'rxjs/operators';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS, ɵAngularFireSchedulers, ɵfirebaseAppFactory, ɵlazySDKProxy, ɵapplyMixins } from '@angular/fire';
import { isPlatformServer } from '@angular/common';
import { proxyPolyfillCompat } from './base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
// WARNING: interface has both a type and a value, skipping emit
export class AngularFireMessaging {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(options, nameOrConfig, 
    // tslint:disable-next-line:ban-types
    platformId, zone) {
        /** @type {?} */
        const schedulers = new ɵAngularFireSchedulers(zone);
        /** @type {?} */
        const messaging = of(undefined).pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap((/**
         * @return {?}
         */
        () => isPlatformServer(platformId) ? EMPTY : import('firebase/messaging'))), map((/**
         * @return {?}
         */
        () => ɵfirebaseAppFactory(options, zone, nameOrConfig))), map((/**
         * @param {?} app
         * @return {?}
         */
        app => app.messaging())), shareReplay({ bufferSize: 1, refCount: false }));
        this.requestPermission = messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), 
        // tslint:disable-next-line
        switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        messaging => firebase.messaging.isSupported() ? messaging.requestPermission() : throwError('Not supported.'))));
        this.getToken = messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        messaging => firebase.messaging.isSupported() && Notification.permission === 'granted' ? messaging.getToken() : EMPTY)), defaultIfEmpty(null));
        /** @type {?} */
        const tokenChanges = messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        messaging => firebase.messaging.isSupported() ? new Observable((/**
         * @param {?} emitter
         * @return {?}
         */
        emitter => messaging.onTokenRefresh(emitter.next, emitter.error, emitter.complete))) : EMPTY)), switchMapTo(this.getToken));
        this.tokenChanges = messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        messaging => firebase.messaging.isSupported() ? concat(this.getToken, tokenChanges) : EMPTY)));
        this.messages = messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        messaging => firebase.messaging.isSupported() ? new Observable((/**
         * @param {?} emitter
         * @return {?}
         */
        emitter => messaging.onMessage((/**
         * @param {?} next
         * @return {?}
         */
        next => emitter.next(next)), (/**
         * @param {?} err
         * @return {?}
         */
        err => emitter.error(err)), (/**
         * @return {?}
         */
        () => emitter.complete())))) : EMPTY)));
        this.requestToken = of(undefined).pipe(switchMap((/**
         * @return {?}
         */
        () => this.requestPermission)), catchError((/**
         * @return {?}
         */
        () => of(null))), mergeMap((/**
         * @return {?}
         */
        () => this.tokenChanges)));
        this.deleteToken = (/**
         * @param {?} token
         * @return {?}
         */
        (token) => messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap((/**
         * @param {?} messaging
         * @return {?}
         */
        messaging => messaging.deleteToken(token))), defaultIfEmpty(false)));
        return ɵlazySDKProxy(this, messaging, zone);
    }
}
AngularFireMessaging.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireMessaging.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];
/** @nocollapse */ AngularFireMessaging.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireMessaging_Factory() { return new AngularFireMessaging(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireMessaging, providedIn: "any" });
if (false) {
    /** @type {?} */
    AngularFireMessaging.prototype.requestPermission;
    /** @type {?} */
    AngularFireMessaging.prototype.getToken;
    /** @type {?} */
    AngularFireMessaging.prototype.tokenChanges;
    /** @type {?} */
    AngularFireMessaging.prototype.messages;
    /** @type {?} */
    AngularFireMessaging.prototype.requestToken;
    /** @type {?} */
    AngularFireMessaging.prototype.deleteToken;
}
ɵapplyMixins(AngularFireMessaging, [proxyPolyfillCompat]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnaW5nLmpzIiwic291cmNlUm9vdCI6Ii93b3Jrc3BhY2Uvc3JjL21lc3NhZ2luZy8iLCJzb3VyY2VzIjpbIm1lc3NhZ2luZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sUUFBUSxNQUFNLGNBQWMsQ0FBQztBQUNwQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUM1RSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBVSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoSixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUdoQixzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLGFBQWEsRUFFYixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sUUFBUSxDQUFDOzs7O0FBUTdDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7Ozs7SUFTL0IsWUFDNEIsT0FBd0IsRUFDWCxZQUEyRDtJQUNsRyxxQ0FBcUM7SUFDaEIsVUFBa0IsRUFDdkMsSUFBWTs7Y0FFTixVQUFVLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUM7O2NBRTdDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUNsQyxXQUFXLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUN0QyxTQUFTLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUNu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dEMsTUFBTSxTQUFDLFdBQVc7WUFyQ00sTUFBTTs7Ozs7SUEwQmpDLGlEQUFvRDs7SUFDcEQsd0NBQW9EOztJQUNwRCw0Q0FBd0Q7O0lBQ3hELHdDQUF5Qzs7SUFDekMsNENBQXdEOztJQUN4RCwyQ0FBb0U7O0FBNEV0RSxZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IGNvbmNhdCwgRU1QVFksIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlZmF1bHRJZkVtcHR5LCBtYXAsIG1lcmdlTWFwLCBvYnNlcnZlT24sIHN3aXRjaE1hcCwgc3dpdGNoTWFwVG8sIHNoYXJlUmVwbGF5LCBmaWx0ZXIsIHN1YnNjcmliZU9uIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgRklSRUJBU0VfQVBQX05BTUUsXG4gIEZJUkVCQVNFX09QVElPTlMsXG4gIEZpcmViYXNlQXBwQ29uZmlnLFxuICBGaXJlYmFzZU9wdGlvbnMsXG4gIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLFxuICDJtWZpcmViYXNlQXBwRmFjdG9yeSxcbiAgybVsYXp5U0RLUHJveHksXG4gIMm1UHJvbWlzZVByb3h5LFxuICDJtWFwcGx5TWl4aW5zXG59IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBwcm94eVBvbHlmaWxsQ29tcGF0IH0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlyZU1lc3NhZ2luZyBleHRlbmRzIE9taXQ8ybVQcm9taXNlUHJveHk8ZmlyZWJhc2UubWVzc2FnaW5nLk1lc3NhZ2luZz4sICdkZWxldGVUb2tlbicgfCAnZ2V0VG9rZW4nIHwgJ3JlcXVlc3RQZXJtaXNzaW9uJz4ge1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlTWVzc2FnaW5nIHtcblxuICBwdWJsaWMgcmVhZG9ubHkgcmVxdWVzdFBlcm1pc3Npb246IE9ic2VydmFibGU8dm9pZD47XG4gIHB1YmxpYyByZWFkb25seSBnZXRUb2tlbjogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPjtcbiAgcHVibGljIHJlYWRvbmx5IHRva2VuQ2hhbmdlczogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPjtcbiAgcHVibGljIHJlYWRvbmx5IG1lc3NhZ2VzOiBPYnNlcnZhYmxlPHt9PjtcbiAgcHVibGljIHJlYWRvbmx5IHJlcXVlc3RUb2tlbjogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPjtcbiAgcHVibGljIHJlYWRvbmx5IGRlbGV0ZVRva2VuOiAodG9rZW46IHN0cmluZykgPT4gT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEZJUkVCQVNFX09QVElPTlMpIG9wdGlvbnM6IEZpcmViYXNlT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEZJUkVCQVNFX0FQUF9OQU1FKSBuYW1lT3JDb25maWc6IHN0cmluZyB8IEZpcmViYXNlQXBwQ29uZmlnIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICBjb25zdCBzY2hlZHVsZXJzID0gbmV3IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzKHpvbmUpO1xuXG4gICAgY29uc3QgbWVzc2FnaW5nID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgc3Vic2NyaWJlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5pbnNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiBpc1BsYXRmb3JtU2VydmVyKHBsYXRmb3JtSWQpID8gRU1QVFkgOiBpbXBvcnQoJ2ZpcmViYXNlL21lc3NhZ2luZycpKSxcbiAgICAgIG1hcCgoKSA9PiDJtWZpcmViYXNlQXBwRmFjdG9yeShvcHRpb25zLCB6b25lLCBuYW1lT3JDb25maWcpKSxcbiAgICAgIG1hcChhcHAgPT4gYXBwLm1lc3NhZ2luZygpKSxcbiAgICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IGZhbHNlIH0pXG4gICAgKTtcblxuICAgIHRoaXMucmVxdWVzdFBlcm1pc3Npb24gPSBtZXNzYWdpbmcucGlwZShcbiAgICAgIHN1YnNjcmliZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMuaW5zaWRlQW5ndWxhciksXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIHN3aXRjaE1hcChtZXNzYWdpbmcgPT4gZmlyZWJhc2UubWVzc2FnaW5nLmlzU3VwcG9ydGVkKCkgPyBtZXNzYWdpbmcucmVxdWVzdFBlcm1pc3Npb24oKSA6IHRocm93RXJyb3IoJ05vdCBzdXBwb3J0ZWQuJykpXG4gICAgKTtcblxuICAgIHRoaXMuZ2V0VG9rZW4gPSBtZXNzYWdpbmcucGlwZShcbiAgICAgIHN1YnNjcmliZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMuaW5zaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAobWVzc2FnaW5nID0+IGZpcmViYXNlLm1lc3NhZ2luZy5pc1N1cHBvcnRlZCgpICYmIE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uID09PSAnZ3JhbnRlZCcgPyBtZXNzYWdpbmcuZ2V0VG9rZW4oKSA6IEVNUFRZKSxcbiAgICAgIGRlZmF1bHRJZkVtcHR5KG51bGwpXG4gICAgKTtcblxuICAgIGNvbnN0IHRva2VuQ2hhbmdlcyA9IG1lc3NhZ2luZy5waXBlKFxuICAgICAgc3Vic2NyaWJlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5pbnNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcChtZXNzYWdpbmcgPT4gZmlyZWJhc2UubWVzc2FnaW5nLmlzU3VwcG9ydGVkKCkgPyBuZXcgT2JzZXJ2YWJsZTxzdHJpbmc+KGVtaXR0ZXIgPT5cbiAgICAgICAgbWVzc2FnaW5nLm9uVG9rZW5SZWZyZXNoKGVtaXR0ZXIubmV4dCwgZW1pdHRlci5lcnJvciwgZW1pdHRlci5jb21wbGV0ZSlcbiAgICAgICkgOiBFTVBUWSksXG4gICAgICBzd2l0Y2hNYXBUbyh0aGlzLmdldFRva2VuKVxuICAgICk7XG5cbiAgICB0aGlzLnRva2VuQ2hhbmdlcyA9IG1lc3NhZ2luZy5waXBlKFxuICAgICAgc3Vic2NyaWJlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5pbnNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcChtZXNzYWdpbmcgPT4gZmlyZWJhc2UubWVzc2FnaW5nLmlzU3VwcG9ydGVkKCkgPyBjb25jYXQodGhpcy5nZXRUb2tlbiwgdG9rZW5DaGFuZ2VzKSA6IEVNUFRZKVxuICAgICk7XG5cblxuICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdpbmcucGlwZShcbiAgICAgIHN1YnNjcmliZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMuaW5zaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAobWVzc2FnaW5nID0+IGZpcmViYXNlLm1lc3NhZ2luZy5pc1N1cHBvcnRlZCgpID8gbmV3IE9ic2VydmFibGU8c3RyaW5nPihlbWl0dGVyID0+XG4gICAgICAgIG1lc3NhZ2luZy5vbk1lc3NhZ2UobmV4dCA9PiBlbWl0dGVyLm5leHQobmV4dCksIGVyciA9PiBlbWl0dGVyLmVycm9yKGVyciksICgpID0+IGVtaXR0ZXIuY29tcGxldGUoKSlcbiAgICAgICkgOiBFTVBUWSksXG4gICAgKTtcblxuICAgIHRoaXMucmVxdWVzdFRva2VuID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMucmVxdWVzdFBlcm1pc3Npb24pLFxuICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZihudWxsKSksXG4gICAgICBtZXJnZU1hcCgoKSA9PiB0aGlzLnRva2VuQ2hhbmdlcylcbiAgICApO1xuXG4gICAgdGhpcy5kZWxldGVUb2tlbiA9ICh0b2tlbjogc3RyaW5nKSA9PiBtZXNzYWdpbmcucGlwZShcbiAgICAgIHN1YnNjcmliZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMuaW5zaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAobWVzc2FnaW5nID0+IG1lc3NhZ2luZy5kZWxldGVUb2tlbih0b2tlbikpLFxuICAgICAgZGVmYXVsdElmRW1wdHkoZmFsc2UpXG4gICAgKTtcblxuICAgIHJldHVybiDJtWxhenlTREtQcm94eSh0aGlzLCBtZXNzYWdpbmcsIHpvbmUpO1xuICB9XG5cbn1cblxuybVhcHBseU1peGlucyhBbmd1bGFyRmlyZU1lc3NhZ2luZywgW3Byb3h5UG9seWZpbGxDb21wYXRdKTtcbiJdfQ==