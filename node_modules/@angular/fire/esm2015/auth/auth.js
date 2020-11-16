/**
 * @fileoverview added by tsickle
 * Generated from: auth.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Optional, NgZone, PLATFORM_ID } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, observeOn, shareReplay, first } from 'rxjs/operators';
import { FIREBASE_OPTIONS, FIREBASE_APP_NAME, ɵlazySDKProxy, ɵfirebaseAppFactory, ɵAngularFireSchedulers, ɵkeepUnstableUntilFirstFactory, ɵapplyMixins } from '@angular/fire';
import { isPlatformServer } from '@angular/common';
import { proxyPolyfillCompat } from './base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
// WARNING: interface has both a type and a value, skipping emit
export class AngularFireAuth {
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
        const keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(schedulers);
        /** @type {?} */
        const auth = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        () => zone.runOutsideAngular((/**
         * @return {?}
         */
        () => import('firebase/auth'))))), map((/**
         * @return {?}
         */
        () => ɵfirebaseAppFactory(options, zone, nameOrConfig))), map((/**
         * @param {?} app
         * @return {?}
         */
        app => zone.runOutsideAngular((/**
         * @return {?}
         */
        () => app.auth())))), shareReplay({ bufferSize: 1, refCount: false }));
        if (isPlatformServer(platformId)) {
            this.authState = this.user = this.idToken = this.idTokenResult = of(null);
        }
        else {
            // HACK, as we're exporting auth.Auth, rather than auth, developers importing firebase.auth
            //       (e.g, `import { auth } from 'firebase/app'`) are getting an undefined auth object unexpectedly
            //       as we're completely lazy. Let's eagerly load the Auth SDK here.
            //       There could potentially be race conditions still... but this greatly decreases the odds while
            //       we reevaluate the API.
            /** @type {?} */
            const _ = auth.pipe(first()).subscribe();
            this.authState = auth.pipe(switchMap((/**
             * @param {?} auth
             * @return {?}
             */
            auth => auth.getRedirectResult().then((/**
             * @return {?}
             */
            () => auth), (/**
             * @return {?}
             */
            () => auth)))), switchMap((/**
             * @param {?} auth
             * @return {?}
             */
            auth => zone.runOutsideAngular((/**
             * @return {?}
             */
            () => new Observable(auth.onAuthStateChanged.bind(auth)))))), keepUnstableUntilFirst);
            this.user = auth.pipe(switchMap((/**
             * @param {?} auth
             * @return {?}
             */
            auth => auth.getRedirectResult().then((/**
             * @return {?}
             */
            () => auth), (/**
             * @return {?}
             */
            () => auth)))), switchMap((/**
             * @param {?} auth
             * @return {?}
             */
            auth => zone.runOutsideAngular((/**
             * @return {?}
             */
            () => new Observable(auth.onIdTokenChanged.bind(auth)))))), keepUnstableUntilFirst);
            this.idToken = this.user.pipe(switchMap((/**
             * @param {?} user
             * @return {?}
             */
            user => user ? from(user.getIdToken()) : of(null))));
            this.idTokenResult = this.user.pipe(switchMap((/**
             * @param {?} user
             * @return {?}
             */
            user => user ? from(user.getIdTokenResult()) : of(null))));
        }
        return ɵlazySDKProxy(this, auth, zone);
    }
}
AngularFireAuth.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireAuth.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];
/** @nocollapse */ AngularFireAuth.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireAuth_Factory() { return new AngularFireAuth(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireAuth, providedIn: "any" });
if (false) {
    /**
     * Observable of authentication state; as of Firebase 4.0 this is only triggered via sign-in/out
     * @type {?}
     */
    AngularFireAuth.prototype.authState;
    /**
     * Observable of the currently signed-in user's JWT token used to identify the user to a Firebase service (or null).
     * @type {?}
     */
    AngularFireAuth.prototype.idToken;
    /**
     * Observable of the currently signed-in user (or null).
     * @type {?}
     */
    AngularFireAuth.prototype.user;
    /**
     * Observable of the currently signed-in user's IdTokenResult object which contains the ID token JWT string and other
     * helper properties for getting different data associated with the token as well as all the decoded payload claims
     * (or null).
     * @type {?}
     */
    AngularFireAuth.prototype.idTokenResult;
}
ɵapplyMixins(AngularFireAuth, [proxyPolyfillCompat]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvd29ya3NwYWNlL3NyYy9hdXRoLyIsInNvdXJjZXMiOlsiYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9FLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBSWpCLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsc0JBQXNCLEVBQ3RCLDhCQUE4QixFQUM5QixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sUUFBUSxDQUFDOzs7O0FBTzdDLE1BQU0sT0FBTyxlQUFlOzs7Ozs7O0lBd0IxQixZQUM0QixPQUF3QixFQUNYLFlBQXFEO0lBQzVGLHFDQUFxQztJQUNoQixVQUFrQixFQUN2QyxJQUFZOztjQUVOLFVBQVUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQzs7Y0FDN0Msc0JBQXNCLEdBQUcsOEJBQThCLENBQUMsVUFBVSxDQUFDOztjQUVuRSxJQUFJLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDN0IsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFDcEMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQjs7O1FBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxF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VztZQXBEZ0IsTUFBTTs7Ozs7Ozs7SUE2QjNDLG9DQUEwRDs7Ozs7SUFLMUQsa0NBQWlEOzs7OztJQUtqRCwrQkFBcUQ7Ozs7Ozs7SUFPckQsd0NBQTRFOztBQTZEOUUsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwsIE5nWm9uZSwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIG1hcCwgb2JzZXJ2ZU9uLCBzaGFyZVJlcGxheSwgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBGSVJFQkFTRV9PUFRJT05TLFxuICBGSVJFQkFTRV9BUFBfTkFNRSxcbiAgRmlyZWJhc2VPcHRpb25zLFxuICBGaXJlYmFzZUFwcENvbmZpZyxcbiAgybVQcm9taXNlUHJveHksXG4gIMm1bGF6eVNES1Byb3h5LFxuICDJtWZpcmViYXNlQXBwRmFjdG9yeSxcbiAgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsXG4gIMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3RvcnksXG4gIMm1YXBwbHlNaXhpbnNcbn0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgcHJveHlQb2x5ZmlsbENvbXBhdCB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpcmVBdXRoIGV4dGVuZHMgybVQcm9taXNlUHJveHk8ZmlyZWJhc2UuYXV0aC5BdXRoPiB7fVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlQXV0aCB7XG5cbiAgLyoqXG4gICAqIE9ic2VydmFibGUgb2YgYXV0aGVudGljYXRpb24gc3RhdGU7IGFzIG9mIEZpcmViYXNlIDQuMCB0aGlzIGlzIG9ubHkgdHJpZ2dlcmVkIHZpYSBzaWduLWluL291dFxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGF1dGhTdGF0ZTogT2JzZXJ2YWJsZTxmaXJlYmFzZS5Vc2VyfG51bGw+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSBjdXJyZW50bHkgc2lnbmVkLWluIHVzZXIncyBKV1QgdG9rZW4gdXNlZCB0byBpZGVudGlmeSB0aGUgdXNlciB0byBhIEZpcmViYXNlIHNlcnZpY2UgKG9yIG51bGwpLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGlkVG9rZW46IE9ic2VydmFibGU8c3RyaW5nfG51bGw+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSBjdXJyZW50bHkgc2lnbmVkLWluIHVzZXIgKG9yIG51bGwpLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHVzZXI6IE9ic2VydmFibGU8ZmlyZWJhc2UuVXNlcnxudWxsPjtcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgY3VycmVudGx5IHNpZ25lZC1pbiB1c2VyJ3MgSWRUb2tlblJlc3VsdCBvYmplY3Qgd2hpY2ggY29udGFpbnMgdGhlIElEIHRva2VuIEpXVCBzdHJpbmcgYW5kIG90aGVyXG4gICAqIGhlbHBlciBwcm9wZXJ0aWVzIGZvciBnZXR0aW5nIGRpZmZlcmVudCBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgdG9rZW4gYXMgd2VsbCBhcyBhbGwgdGhlIGRlY29kZWQgcGF5bG9hZCBjbGFpbXNcbiAgICogKG9yIG51bGwpLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGlkVG9rZW5SZXN1bHQ6IE9ic2VydmFibGU8ZmlyZWJhc2UuYXV0aC5JZFRva2VuUmVzdWx0fG51bGw+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRklSRUJBU0VfT1BUSU9OUykgb3B0aW9uczogRmlyZWJhc2VPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRklSRUJBU0VfQVBQX05BTUUpIG5hbWVPckNvbmZpZzogc3RyaW5nfEZpcmViYXNlQXBwQ29uZmlnfG51bGx8dW5kZWZpbmVkLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgem9uZTogTmdab25lXG4gICkge1xuICAgIGNvbnN0IHNjaGVkdWxlcnMgPSBuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSk7XG4gICAgY29uc3Qga2VlcFVuc3RhYmxlVW50aWxGaXJzdCA9IMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3Rvcnkoc2NoZWR1bGVycyk7XG5cbiAgICBjb25zdCBhdXRoID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gaW1wb3J0KCdmaXJlYmFzZS9hdXRoJykpKSxcbiAgICAgIG1hcCgoKSA9PiDJtWZpcmViYXNlQXBwRmFjdG9yeShvcHRpb25zLCB6b25lLCBuYW1lT3JDb25maWcpKSxcbiAgICAgIG1hcChhcHAgPT4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBhcHAuYXV0aCgpKSksXG4gICAgICBzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiBmYWxzZSB9KSxcbiAgICApO1xuXG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCkpIHtcblxuICAgICAgdGhpcy5hdXRoU3RhdGUgPSB0aGlzLnVzZXIgPSB0aGlzLmlkVG9rZW4gPSB0aGlzLmlkVG9rZW5SZXN1bHQgPSBvZihudWxsKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIEhBQ0ssIGFzIHdlJ3JlIGV4cG9ydGluZyBhdXRoLkF1dGgsIHJhdGhlciB0aGFuIGF1dGgsIGRldmVsb3BlcnMgaW1wb3J0aW5nIGZpcmViYXNlLmF1dGhcbiAgICAgIC8vICAgICAgIChlLmcsIGBpbXBvcnQgeyBhdXRoIH0gZnJvbSAnZmlyZWJhc2UvYXBwJ2ApIGFyZSBnZXR0aW5nIGFuIHVuZGVmaW5lZCBhdXRoIG9iamVjdCB1bmV4cGVjdGVkbHlcbiAgICAgIC8vICAgICAgIGFzIHdlJ3JlIGNvbXBsZXRlbHkgbGF6eS4gTGV0J3MgZWFnZXJseSBsb2FkIHRoZSBBdXRoIFNESyBoZXJlLlxuICAgICAgLy8gICAgICAgVGhlcmUgY291bGQgcG90ZW50aWFsbHkgYmUgcmFjZSBjb25kaXRpb25zIHN0aWxsLi4uIGJ1dCB0aGlzIGdyZWF0bHkgZGVjcmVhc2VzIHRoZSBvZGRzIHdoaWxlXG4gICAgICAvLyAgICAgICB3ZSByZWV2YWx1YXRlIHRoZSBBUEkuXG4gICAgICBjb25zdCBfID0gYXV0aC5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgpO1xuXG4gICAgICB0aGlzLmF1dGhTdGF0ZSA9IGF1dGgucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGF1dGggPT4gYXV0aC5nZXRSZWRpcmVjdFJlc3VsdCgpLnRoZW4oKCkgPT4gYXV0aCwgKCkgPT4gYXV0aCkpLFxuICAgICAgICBzd2l0Y2hNYXAoYXV0aCA9PiB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IG5ldyBPYnNlcnZhYmxlPGZpcmViYXNlLlVzZXJ8bnVsbD4oYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZWQuYmluZChhdXRoKSkpKSxcbiAgICAgICAga2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICAgKTtcblxuICAgICAgdGhpcy51c2VyID0gYXV0aC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoYXV0aCA9PiBhdXRoLmdldFJlZGlyZWN0UmVzdWx0KCkudGhlbigoKSA9PiBhdXRoLCAoKSA9PiBhdXRoKSksXG4gICAgICAgIHN3aXRjaE1hcChhdXRoID0+IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gbmV3IE9ic2VydmFibGU8ZmlyZWJhc2UuVXNlcnxudWxsPihhdXRoLm9uSWRUb2tlbkNoYW5nZWQuYmluZChhdXRoKSkpKSxcbiAgICAgICAga2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICAgKTtcblxuICAgICAgdGhpcy5pZFRva2VuID0gdGhpcy51c2VyLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCh1c2VyID0+IHVzZXIgPyBmcm9tKHVzZXIuZ2V0SWRUb2tlbigpKSA6IG9mKG51bGwpKVxuICAgICAgKTtcblxuICAgICAgdGhpcy5pZFRva2VuUmVzdWx0ID0gdGhpcy51c2VyLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCh1c2VyID0+IHVzZXIgPyBmcm9tKHVzZXIuZ2V0SWRUb2tlblJlc3VsdCgpKSA6IG9mKG51bGwpKVxuICAgICAgKTtcblxuICAgIH1cblxuICAgIHJldHVybiDJtWxhenlTREtQcm94eSh0aGlzLCBhdXRoLCB6b25lKTtcblxuICB9XG5cbn1cblxuybVhcHBseU1peGlucyhBbmd1bGFyRmlyZUF1dGgsIFtwcm94eVBvbHlmaWxsQ29tcGF0XSk7XG4iXX0=