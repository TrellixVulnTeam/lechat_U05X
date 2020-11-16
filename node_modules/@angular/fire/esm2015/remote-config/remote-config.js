/**
 * @fileoverview added by tsickle
 * Generated from: remote-config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { concat, EMPTY, Observable, of, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, groupBy, map, mergeMap, observeOn, scan, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS, ɵAngularFireSchedulers, ɵfirebaseAppFactory, ɵkeepUnstableUntilFirstFactory, ɵlazySDKProxy, ɵapplyMixins } from '@angular/fire';
import { isPlatformBrowser } from '@angular/common';
import firebase from 'firebase/app';
import { proxyPolyfillCompat } from './base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/**
 * @record
 */
export function ConfigTemplate() { }
/** @type {?} */
export const SETTINGS = new InjectionToken('angularfire2.remoteConfig.settings');
/** @type {?} */
export const DEFAULTS = new InjectionToken('angularfire2.remoteConfig.defaultConfig');
// WARNING: interface has both a type and a value, skipping emit
/** @type {?} */
const AS_TO_FN = { strings: 'asString', numbers: 'asNumber', booleans: 'asBoolean' };
/** @type {?} */
const STATIC_VALUES = { numbers: 0, booleans: false, strings: undefined };
// TODO look into the types here, I don't like the anys
/** @type {?} */
const proxyAll = (/**
 * @param {?} observable
 * @param {?} as
 * @return {?}
 */
(observable, as) => (/** @type {?} */ (new Proxy(observable.pipe(mapToObject((/** @type {?} */ (as)))), {
    get: (/**
     * @param {?} self
     * @param {?} name
     * @return {?}
     */
    (self, name) => self[name] || observable.pipe(map((/**
     * @param {?} all
     * @return {?}
     */
    all => all.find((/**
     * @param {?} p
     * @return {?}
     */
    p => p.key === name)))), map((/**
     * @param {?} param
     * @return {?}
     */
    param => param ? param[AS_TO_FN[as]]() : STATIC_VALUES[as])), distinctUntilChanged()))
}))));
const ɵ0 = proxyAll;
// TODO export as implements Partial<...> so minor doesn't break us
export class Value {
    // tslint:disable-next-line:variable-name
    /**
     * @param {?} _source
     * @param {?} _value
     */
    constructor(_source, _value) {
        this._source = _source;
        this._value = _value;
    }
    /**
     * @return {?}
     */
    asBoolean() {
        return ['1', 'true', 't', 'y', 'yes', 'on'].indexOf(this._value.toLowerCase()) > -1;
    }
    /**
     * @return {?}
     */
    asString() {
        return this._value;
    }
    /**
     * @return {?}
     */
    asNumber() {
        return Number(this._value) || 0;
    }
    /**
     * @return {?}
     */
    getSource() {
        return this._source;
    }
}
if (false) {
    /** @type {?} */
    Value.prototype._source;
    /** @type {?} */
    Value.prototype._value;
}
// SEMVER use ConstructorParameters when we can support Typescript 3.6
export class Parameter extends Value {
    /**
     * @param {?} key
     * @param {?} fetchTimeMillis
     * @param {?} source
     * @param {?} value
     */
    constructor(key, fetchTimeMillis, source, value) {
        super(source, value);
        this.key = key;
        this.fetchTimeMillis = fetchTimeMillis;
    }
}
if (false) {
    /** @type {?} */
    Parameter.prototype.key;
    /** @type {?} */
    Parameter.prototype.fetchTimeMillis;
}
// If it's a Parameter array, test any, else test the individual Parameter
/** @type {?} */
const filterTest = (/**
 * @param {?} fn
 * @return {?}
 */
(fn) => filter((/**
 * @param {?} it
 * @return {?}
 */
it => Array.isArray(it) ? it.some(fn) : fn(it))));
const ɵ1 = filterTest;
// Allow the user to bypass the default values and wait till they get something from the server, even if it's a cached copy;
// if used in conjuntion with first() it will only fetch RC values from the server if they aren't cached locally
/** @type {?} */
export const filterRemote = (/**
 * @return {?}
 */
() => filterTest((/**
 * @param {?} p
 * @return {?}
 */
p => p.getSource() === 'remote')));
// filterFresh allows the developer to effectively set up a maximum cache time
/** @type {?} */
export const filterFresh = (/**
 * @param {?} howRecentInMillis
 * @return {?}
 */
(howRecentInMillis) => filterTest((/**
 * @param {?} p
 * @return {?}
 */
p => p.fetchTimeMillis + howRecentInMillis >= new Date().getTime())));
// I ditched loading the defaults into RC and a simple map for scan since we already have our own defaults implementation.
// The idea here being that if they have a default that never loads from the server, they will be able to tell via fetchTimeMillis
// on the Parameter. Also if it doesn't come from the server it won't emit again in .changes, due to the distinctUntilChanged,
// which we can simplify to === rather than deep comparison
/** @type {?} */
const scanToParametersArray = (/**
 * @param {?} remoteConfig
 * @return {?}
 */
(remoteConfig) => pipe(withLatestFrom(remoteConfig), scan((/**
 * @param {?} existing
 * @param {?} __1
 * @return {?}
 */
(existing, [all, rc]) => {
    // SEMVER use "new Set" to unique once we're only targeting es6
    // at the scale we expect remote config to be at, we probably won't see a performance hit from this unoptimized uniqueness
    // implementation.
    // const allKeys = [...new Set([...existing.map(p => p.key), ...Object.keys(all)])];
    /** @type {?} */
    const allKeys = [...existing.map((/**
         * @param {?} p
         * @return {?}
         */
        p => p.key)), ...Object.keys(all)].filter((/**
     * @param {?} v
     * @param {?} i
     * @param {?} a
     * @return {?}
     */
    (v, i, a) => a.indexOf(v) === i));
    return allKeys.map((/**
     * @param {?} key
     * @return {?}
     */
    key => {
        /** @type {?} */
        const updatedValue = all[key];
        return updatedValue ? new Parameter(key, rc ? rc.fetchTimeMillis : -1, updatedValue.getSource(), updatedValue.asString())
            : existing.find((/**
             * @param {?} p
             * @return {?}
             */
            p => p.key === key));
    }));
}), (/** @type {?} */ ([])))));
const ɵ2 = scanToParametersArray;
export class AngularFireRemoteConfig {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} settings
     * @param {?} defaultConfig
     * @param {?} zone
     * @param {?} platformId
     */
    constructor(options, nameOrConfig, settings, defaultConfig, zone, 
    // tslint:disable-next-line:ban-types
    platformId) {
        this.zone = zone;
        /** @type {?} */
        const schedulers = new ɵAngularFireSchedulers(zone);
        /** @type {?} */
        const remoteConfig$ = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
         * @return {?}
         */
        () => isPlatformBrowser(platformId) ? import('firebase/remote-config') : EMPTY)), switchMap((/**
         * @return {?}
         */
        () => import('@firebase/remote-config'))), tap((/**
         * @param {?} rc
         * @return {?}
         */
        rc => rc.registerRemoteConfig && rc.registerRemoteConfig((/** @type {?} */ (firebase))))), map((/**
         * @return {?}
         */
        () => ɵfirebaseAppFactory(options, zone, nameOrConfig))), map((/**
         * @param {?} app
         * @return {?}
         */
        app => app.remoteConfig())), tap((/**
         * @param {?} rc
         * @return {?}
         */
        rc => {
            if (settings) {
                rc.settings = settings;
            }
            if (defaultConfig) {
                rc.defaultConfig = defaultConfig;
            }
        })), 
        // tslint:disable-next-line
        startWith(undefined), shareReplay({ bufferSize: 1, refCount: false }));
        /** @type {?} */
        const loadedRemoteConfig$ = remoteConfig$.pipe(filter((/**
         * @param {?} rc
         * @return {?}
         */
        rc => !!rc)));
        /** @type {?} */
        const default$ = of(Object.keys(defaultConfig || {}).reduce((/**
         * @param {?} c
         * @param {?} k
         * @return {?}
         */
        (c, k) => (Object.assign(Object.assign({}, c), { [k]: new Value('default', defaultConfig[k].toString()) }))), {}));
        // we should filter out the defaults we provided to RC, since we have our own implementation
        // that gives us a -1 for fetchTimeMillis (so filterFresh can filter them out)
        /** @type {?} */
        const filterOutDefaults = map((/**
         * @param {?} all
         * @return {?}
         */
        all => Object.keys(all)
            .filter((/**
         * @param {?} key
         * @return {?}
         */
        key => all[key].getSource() !== 'default'))
            .reduce((/**
         * @param {?} acc
         * @param {?} key
         * @return {?}
         */
        (acc, key) => (Object.assign(Object.assign({}, acc), { [key]: all[key] }))), {})));
        /** @type {?} */
        const existing$ = loadedRemoteConfig$.pipe(switchMap((/**
         * @param {?} rc
         * @return {?}
         */
        rc => rc.activate()
            .then((/**
         * @return {?}
         */
        () => rc.ensureInitialized()))
            .then((/**
         * @return {?}
         */
        () => rc.getAll())))), filterOutDefaults);
        /** @type {?} */
        const fresh$ = loadedRemoteConfig$.pipe(switchMap((/**
         * @param {?} rc
         * @return {?}
         */
        rc => zone.runOutsideAngular((/**
         * @return {?}
         */
        () => rc.fetchAndActivate()
            .then((/**
         * @return {?}
         */
        () => rc.ensureInitialized()))
            .then((/**
         * @return {?}
         */
        () => rc.getAll())))))), filterOutDefaults);
        this.parameters = concat(default$, existing$, fresh$).pipe(scanToParametersArray(remoteConfig$), ɵkeepUnstableUntilFirstFactory(schedulers), shareReplay({ bufferSize: 1, refCount: true }));
        this.changes = this.parameters.pipe(switchMap((/**
         * @param {?} params
         * @return {?}
         */
        params => of(...params))), groupBy((/**
         * @param {?} param
         * @return {?}
         */
        param => param.key)), mergeMap((/**
         * @param {?} group
         * @return {?}
         */
        group => group.pipe(distinctUntilChanged()))));
        this.strings = proxyAll(this.parameters, 'strings');
        this.booleans = proxyAll(this.parameters, 'booleans');
        this.numbers = proxyAll(this.parameters, 'numbers');
        return ɵlazySDKProxy(this, loadedRemoteConfig$, zone);
    }
}
AngularFireRemoteConfig.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireRemoteConfig.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [SETTINGS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DEFAULTS,] }] },
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
/** @nocollapse */ AngularFireRemoteConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireRemoteConfig_Factory() { return new AngularFireRemoteConfig(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(SETTINGS, 8), i0.ɵɵinject(DEFAULTS, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.PLATFORM_ID)); }, token: AngularFireRemoteConfig, providedIn: "any" });
if (false) {
    /** @type {?} */
    AngularFireRemoteConfig.prototype.changes;
    /** @type {?} */
    AngularFireRemoteConfig.prototype.parameters;
    /** @type {?} */
    AngularFireRemoteConfig.prototype.numbers;
    /** @type {?} */
    AngularFireRemoteConfig.prototype.booleans;
    /** @type {?} */
    AngularFireRemoteConfig.prototype.strings;
    /**
     * @type {?}
     * @private
     */
    AngularFireRemoteConfig.prototype.zone;
}
/** @type {?} */
export const budget = (/**
 * @template T
 * @param {?} interval
 * @return {?}
 */
(interval) => (/**
 * @param {?} source
 * @return {?}
 */
(source) => new Observable((/**
 * @param {?} observer
 * @return {?}
 */
observer => {
    /** @type {?} */
    let timedOut = false;
    // TODO use scheduler task rather than settimeout
    /** @type {?} */
    const timeout = setTimeout((/**
     * @return {?}
     */
    () => {
        observer.complete();
        timedOut = true;
    }), interval);
    return source.subscribe({
        /**
         * @param {?} val
         * @return {?}
         */
        next(val) {
            if (!timedOut) {
                observer.next(val);
            }
        },
        /**
         * @param {?} err
         * @return {?}
         */
        error(err) {
            if (!timedOut) {
                clearTimeout(timeout);
                observer.error(err);
            }
        },
        /**
         * @return {?}
         */
        complete() {
            if (!timedOut) {
                clearTimeout(timeout);
                observer.complete();
            }
        }
    });
}))));
/** @type {?} */
const typedMethod = (/**
 * @param {?} it
 * @return {?}
 */
(it) => {
    switch (typeof it) {
        case 'string':
            return 'asString';
        case 'boolean':
            return 'asBoolean';
        case 'number':
            return 'asNumber';
        default:
            return 'asString';
    }
});
const ɵ3 = typedMethod;
/**
 * @template T
 * @param {?=} to
 * @return {?}
 */
export function scanToObject(to = 'strings') {
    return pipe(
    // TODO cleanup
    scan((/**
     * @param {?} c
     * @param {?} p
     * @return {?}
     */
    (c, p) => (Object.assign(Object.assign({}, c), { [p.key]: typeof to === 'object' ?
            p[typedMethod(to[p.key])]() :
            p[AS_TO_FN[to]]() }))), typeof to === 'object' ?
        (/** @type {?} */ (to)) :
        (/** @type {?} */ ({}))), debounceTime(1), budget(10), distinctUntilChanged((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    (a, b) => JSON.stringify(a) === JSON.stringify(b))));
}
/**
 * @template T
 * @param {?=} to
 * @return {?}
 */
export function mapToObject(to = 'strings') {
    return pipe(
    // TODO this is getting a little long, cleanup
    map((/**
     * @param {?} params
     * @return {?}
     */
    (params) => params.reduce((/**
     * @param {?} c
     * @param {?} p
     * @return {?}
     */
    (c, p) => (Object.assign(Object.assign({}, c), { [p.key]: typeof to === 'object' ?
            p[typedMethod(to[p.key])]() :
            p[AS_TO_FN[to]]() }))), typeof to === 'object' ?
        (/** @type {?} */ (to)) :
        (/** @type {?} */ ({}))))), distinctUntilChanged((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    (a, b) => JSON.stringify(a) === JSON.stringify(b))));
}
ɵapplyMixins(AngularFireRemoteConfig, [proxyPolyfillCompat]);
export { ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIvd29ya3NwYWNlL3NyYy9yZW1vdGUtY29uZmlnLyIsInNvdXJjZXMiOlsicmVtb3RlLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBNEIsVUFBVSxFQUFFLEVBQUUsRUFBb0IsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZHLE9BQU8sRUFDTCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixPQUFPLEVBQ1AsR0FBRyxFQUNILFFBQVEsRUFDUixTQUFTLEVBQ1QsSUFBSSxFQUNKLFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxFQUNULEdBQUcsRUFDSCxjQUFjLEVBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUdoQixzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLDhCQUE4QixFQUM5QixhQUFhLEVBRWIsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sUUFBUSxNQUFNLGNBQWMsQ0FBQztBQUVwQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxRQUFRLENBQUM7Ozs7OztBQUU3QyxvQ0FFQzs7QUFFRCxNQUFNLE9BQU8sUUFBUSxHQUFHLElBQUksY0FBYyxDQUFXLG9DQUFvQyxDQUFDOztBQUMxRixNQUFNLE9BQU8sUUFBUSxHQUFHLElBQUksY0FBYyxDQUFpQix5Q0FBeUMsQ0FBQzs7O01BSy9GLFFBQVEsR0FBRyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFOztNQUM5RSxhQUFhLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTs7O01BR25FLFFBQVE7Ozs7O0FBQUcsQ0FBQyxVQUFtQyxFQUFFLEVBQXNDLEVBQUUsRUFBRSxDQUFDLG1CQUFBLElBQUksS0FBSyxDQUN6RyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBQSxFQUFFLEVBQU8sQ0FBQyxDQUFDLEVBQUU7SUFDdkMsR0FBRzs7Ozs7SUFBRSxDQUFDLElBQUksRUFBRSxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUN4RCxHQUFHOzs7O0lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSTs7OztJQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUMsRUFBQyxFQUN6QyxHQUFHOzs7O0lBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFDL0Qsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQTtDQUNGLENBQ0YsRUFBTyxDQUFBOzs7QUFHUixNQUFNLE9BQU8sS0FBSzs7Ozs7O0lBa0JoQixZQUFtQixPQUEwQyxFQUFTLE1BQWM7UUFBakUsWUFBTyxHQUFQLE9BQU8sQ0FBbUM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3BGLENBQUM7Ozs7SUFsQkQsU0FBUztRQUNQLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Q0FLRjs7O0lBRmEsd0JBQWlEOztJQUFFLHVCQUFxQjs7O0FBS3RGLE1BQU0sT0FBTyxTQUFVLFNBQVEsS0FBSzs7Ozs7OztJQUNsQyxZQUFtQixHQUFXLEVBQVMsZUFBdUIsRUFBRSxNQUF5QyxFQUFFLEtBQWE7UUFDdEgsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQURKLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFBUyxvQkFBZSxHQUFmLGVBQWUsQ0FBUTtJQUU5RCxDQUFDO0NBQ0Y7OztJQUhhLHdCQUFrQjs7SUFBRSxvQ0FBOEI7Ozs7TUFNMUQsVUFBVTs7OztBQUFHLENBQUMsRUFBaUMsRUFBRSxFQUFFLENBQUMsTUFBTTs7OztBQUEwQixFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFBOzs7OztBQUl6SSxNQUFNLE9BQU8sWUFBWTs7O0FBQUcsR0FBRyxFQUFFLENBQUMsVUFBVTs7OztBQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxLQUFLLFFBQVEsRUFBQyxDQUFBOzs7QUFHN0UsTUFBTSxPQUFPLFdBQVc7Ozs7QUFBRyxDQUFDLGlCQUF5QixFQUFFLEVBQUUsQ0FBQyxVQUFVOzs7O0FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFHLGlCQUFpQixJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUMsQ0FBQTs7Ozs7O01BT2xJLHFCQUFxQjs7OztBQUFHLENBQzVCLFlBQXdFLEVBQ08sRUFBRSxDQUFDLElBQUksQ0FDdEYsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUM1QixJQUFJOzs7OztBQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Ozs7OztVQUtyQixPQUFPLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTTs7Ozs7O0lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUM7SUFDMUcsT0FBTyxPQUFPLENBQUMsR0FBRzs7OztJQUFDLEdBQUcsQ0FBQyxFQUFFOztjQUNqQixZQUFZLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUM3QixPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2SCxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUk7Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFDLENBQUM7SUFDeEMsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDLEdBQUUsbUJBQUEsRUFBRSxFQUFvQixDQUFDLENBQzNCLENBQUE7O0FBTUQsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7Ozs7O0lBUWxDLFlBQzRCLE9BQXdCLEVBQ1gsWUFBMkQsRUFDcEUsUUFBeUIsRUFDekIsYUFBb0MsRUFDMUQsSUFBWTtJQUNwQixxQ0FBcUM7SUFDaEIsVUFBa0I7UUFGL0IsU0FBSSxHQUFKLElBQUksQ0FBUTs7Y0FLZCxVQUFVLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUM7O2NBRTdDLGFBQWEsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUN0QyxTQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUNwQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQyxFQUN6RixTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsRUFBQyxFQUNsRCxHQUFHOzs7O1FBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDLG1CQUFBLFFBQVEsRUFBTyxDQUFDLEVBQUMsRUFDOUUsR0FBRzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsRUFBQyxFQUMzRCxHQUFHOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUMsRUFDOUIsR0FBRzs7OztRQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ1AsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osRUFBRSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7YUFDeEI7WUFDRCxJQUFJLGFBQWEsRUFBRTtnQkFDakIsRUFBRSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7YUFDbEM7UUFDSCxDQUFDLEVBQUM7UUFDRiwyQkFBMkI7UUFDM0IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUNwQixXQUFXLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUNoRDs7Y0FFSyxtQkFBbUIsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUM1QyxNQUFNOzs7O1FBQXFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxDQUN2RDs7Y0FFSyxRQUFRLEdBQStELEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNOzs7OztRQUNySCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLGlDQUFNLENBQUMsS0FBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBRyxHQUFFLEVBQUUsQ0FDakYsQ0FBQzs7OztjQUlJLGlCQUFpQixHQUFHLEdBQUc7Ozs7UUFBaUcsR0FBRyxDQUFDLEVBQUUsQ0FDbEksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDYixNQUFNOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEtBQUssU0FBUyxFQUFDO2FBQ2pELE1BQU07Ozs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxpQ0FBTSxHQUFHLEtBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUcsR0FBRSxFQUFFLENBQUMsRUFDM0Q7O2NBRUssU0FBUyxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FDeEMsU0FBUzs7OztRQUFDLEVBQUUsQ0FBQyxFQUFFLENBQ2IsRUFBRSxDQUFDLFFBQVEsRUFBRTthQUNWLElBQUk7OztRQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFDO2FBQ2xDLElBQUk7OztRQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBQyxFQUMzQixFQUNELGlCQUFpQixDQUNsQjs7Y0FFSyxNQUFNLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUNyQyxTQUFTOzs7O1FBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUUsQ0FDMUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO2FBQ2xCLElBQUk7OztRQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFDO2FBQ2xDLElBQUk7OztRQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBQyxFQUMzQixFQUFDLEVBQ0YsaUJBQWlCLENBQ2xCO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQ3hELHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxFQUNwQyw4QkFBOEIsQ0FBQyxVQUFVLENBQUMsRUFDMUMsV0FBVyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDL0MsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ2pDLFNBQVM7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFDLEVBQ2xDLE9BQU87Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsRUFDM0IsUUFBUTs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDMUIsb0JBQW9CLEVBQUUsQ0FDdkIsRUFBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVwRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7O1lBaEdGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsS0FBSzthQUNsQjs7Ozs0Q0FVSSxNQUFNLFNBQUMsZ0JBQWdCOzRDQUN2QixRQUFRLFlBQUksTUFBTSxTQUFDLGlCQUFpQjs0Q0FDcEMsUUFBUSxZQUFJLE1BQU0sU0FBQyxRQUFROzRDQUMzQixRQUFRLFlBQUksTUFBTSxTQUFDLFFBQVE7WUF6SWEsTUFBTTtZQTRJZCxNQUFNLHVCQUF0QyxNQUFNLFNBQUMsV0FBVzs7Ozs7SUFickIsMENBQXdDOztJQUN4Qyw2Q0FBNkM7O0lBQzdDLDBDQUE0Rzs7SUFDNUcsMkNBQStHOztJQUMvRywwQ0FBd0g7Ozs7O0lBT3RILHVDQUFvQjs7O0FBcUZ4QixNQUFNLE9BQU8sTUFBTTs7Ozs7QUFBRyxDQUFJLFFBQWdCLEVBQStCLEVBQUU7Ozs7QUFBQyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLElBQUksVUFBVTs7OztBQUFJLFFBQVEsQ0FBQyxFQUFFOztRQUM5SCxRQUFRLEdBQUcsS0FBSzs7O1VBRWQsT0FBTyxHQUFHLFVBQVU7OztJQUFDLEdBQUcsRUFBRTtRQUM5QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDLEdBQUUsUUFBUSxDQUFDO0lBQ1osT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDOzs7OztRQUN0QixJQUFJLENBQUMsR0FBRztZQUNOLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtRQUNILENBQUM7Ozs7O1FBQ0QsS0FBSyxDQUFDLEdBQUc7WUFDUCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyQjtRQUNILENBQUM7Ozs7UUFDRCxRQUFRO1lBQ04sSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNyQjtRQUNILENBQUM7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLEVBQUMsQ0FBQSxDQUFBOztNQUVJLFdBQVc7Ozs7QUFBRyxDQUFDLEVBQU8sRUFBRSxFQUFFO0lBQzlCLFFBQVEsT0FBTyxFQUFFLEVBQUU7UUFDakIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxVQUFVLENBQUM7UUFDcEIsS0FBSyxTQUFTO1lBQ1osT0FBTyxXQUFXLENBQUM7UUFDckIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxVQUFVLENBQUM7UUFDcEI7WUFDRSxPQUFPLFVBQVUsQ0FBQztLQUNyQjtBQUNILENBQUMsQ0FBQTs7Ozs7OztBQVNELE1BQU0sVUFBVSxZQUFZLENBQTJCLEtBQTZDLFNBQVM7SUFDM0csT0FBTyxJQUFJO0lBQ1QsZUFBZTtJQUNmLElBQUk7Ozs7O0lBQ0YsQ0FBQyxDQUFDLEVBQUUsQ0FBWSxFQUFFLEVBQUUsQ0FBQyxpQ0FDaEIsQ0FBQyxLQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUNuQixHQUNGLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLG1CQUFBLEVBQUUsRUFBNkMsQ0FBQyxDQUFDO1FBQ2pELG1CQUFBLEVBQUUsRUFBZ0QsQ0FDckQsRUFDRCxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQ2YsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUNWLG9CQUFvQjs7Ozs7SUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUN4RSxDQUFDO0FBQ0osQ0FBQzs7Ozs7O0FBU0QsTUFBTSxVQUFVLFdBQVcsQ0FBMkIsS0FBNkMsU0FBUztJQUMxRyxPQUFPLElBQUk7SUFDVCw4Q0FBOEM7SUFDOUMsR0FBRzs7OztJQUFDLENBQUMsTUFBbUIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU07Ozs7O0lBQ3hDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsaUNBQ0wsQ0FBQyxLQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUNuQixHQUNGLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLG1CQUFBLEVBQUUsRUFBNkMsQ0FBQyxDQUFDO1FBQ2pELG1CQUFBLEVBQUUsRUFBZ0QsQ0FDckQsRUFBQyxFQUNGLG9CQUFvQjs7Ozs7SUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUN4RSxDQUFDO0FBQ0osQ0FBQztBQUVELFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb25jYXQsIEVNUFRZLCBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb24sIE9ic2VydmFibGUsIG9mLCBPcGVyYXRvckZ1bmN0aW9uLCBwaXBlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkZWJvdW5jZVRpbWUsXG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIGdyb3VwQnksXG4gIG1hcCxcbiAgbWVyZ2VNYXAsXG4gIG9ic2VydmVPbixcbiAgc2NhbixcbiAgc2hhcmVSZXBsYXksXG4gIHN0YXJ0V2l0aCxcbiAgc3dpdGNoTWFwLFxuICB0YXAsXG4gIHdpdGhMYXRlc3RGcm9tXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIEZJUkVCQVNFX0FQUF9OQU1FLFxuICBGSVJFQkFTRV9PUFRJT05TLFxuICBGaXJlYmFzZUFwcENvbmZpZyxcbiAgRmlyZWJhc2VPcHRpb25zLFxuICDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgybVmaXJlYmFzZUFwcEZhY3RvcnksXG4gIMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3RvcnksXG4gIMm1bGF6eVNES1Byb3h5LFxuICDJtVByb21pc2VQcm94eSxcbiAgybVhcHBseU1peGluc1xufSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgcHJveHlQb2x5ZmlsbENvbXBhdCB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnVGVtcGxhdGUge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgU0VUVElOR1MgPSBuZXcgSW5qZWN0aW9uVG9rZW48U2V0dGluZ3M+KCdhbmd1bGFyZmlyZTIucmVtb3RlQ29uZmlnLnNldHRpbmdzJyk7XG5leHBvcnQgY29uc3QgREVGQVVMVFMgPSBuZXcgSW5qZWN0aW9uVG9rZW48Q29uZmlnVGVtcGxhdGU+KCdhbmd1bGFyZmlyZTIucmVtb3RlQ29uZmlnLmRlZmF1bHRDb25maWcnKTtcblxuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlyZVJlbW90ZUNvbmZpZyBleHRlbmRzIMm1UHJvbWlzZVByb3h5PGZpcmViYXNlLnJlbW90ZUNvbmZpZy5SZW1vdGVDb25maWc+IHtcbn1cblxuY29uc3QgQVNfVE9fRk4gPSB7IHN0cmluZ3M6ICdhc1N0cmluZycsIG51bWJlcnM6ICdhc051bWJlcicsIGJvb2xlYW5zOiAnYXNCb29sZWFuJyB9O1xuY29uc3QgU1RBVElDX1ZBTFVFUyA9IHsgbnVtYmVyczogMCwgYm9vbGVhbnM6IGZhbHNlLCBzdHJpbmdzOiB1bmRlZmluZWQgfTtcblxuLy8gVE9ETyBsb29rIGludG8gdGhlIHR5cGVzIGhlcmUsIEkgZG9uJ3QgbGlrZSB0aGUgYW55c1xuY29uc3QgcHJveHlBbGwgPSAob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxQYXJhbWV0ZXJbXT4sIGFzOiAnbnVtYmVycycgfCAnYm9vbGVhbnMnIHwgJ3N0cmluZ3MnKSA9PiBuZXcgUHJveHkoXG4gIG9ic2VydmFibGUucGlwZShtYXBUb09iamVjdChhcyBhcyBhbnkpKSwge1xuICAgIGdldDogKHNlbGYsIG5hbWU6IHN0cmluZykgPT4gc2VsZltuYW1lXSB8fCBvYnNlcnZhYmxlLnBpcGUoXG4gICAgICBtYXAoYWxsID0+IGFsbC5maW5kKHAgPT4gcC5rZXkgPT09IG5hbWUpKSxcbiAgICAgIG1hcChwYXJhbSA9PiBwYXJhbSA/IHBhcmFtW0FTX1RPX0ZOW2FzXV0oKSA6IFNUQVRJQ19WQUxVRVNbYXNdKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICApXG4gIH1cbikgYXMgYW55O1xuXG4vLyBUT0RPIGV4cG9ydCBhcyBpbXBsZW1lbnRzIFBhcnRpYWw8Li4uPiBzbyBtaW5vciBkb2Vzbid0IGJyZWFrIHVzXG5leHBvcnQgY2xhc3MgVmFsdWUgaW1wbGVtZW50cyBmaXJlYmFzZS5yZW1vdGVDb25maWcuVmFsdWUge1xuICBhc0Jvb2xlYW4oKSB7XG4gICAgcmV0dXJuIFsnMScsICd0cnVlJywgJ3QnLCAneScsICd5ZXMnLCAnb24nXS5pbmRleE9mKHRoaXMuX3ZhbHVlLnRvTG93ZXJDYXNlKCkpID4gLTE7XG4gIH1cblxuICBhc1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBhc051bWJlcigpIHtcbiAgICByZXR1cm4gTnVtYmVyKHRoaXMuX3ZhbHVlKSB8fCAwO1xuICB9XG5cbiAgZ2V0U291cmNlKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2U7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX3NvdXJjZTogZmlyZWJhc2UucmVtb3RlQ29uZmlnLlZhbHVlU291cmNlLCBwdWJsaWMgX3ZhbHVlOiBzdHJpbmcpIHtcbiAgfVxufVxuXG4vLyBTRU1WRVIgdXNlIENvbnN0cnVjdG9yUGFyYW1ldGVycyB3aGVuIHdlIGNhbiBzdXBwb3J0IFR5cGVzY3JpcHQgMy42XG5leHBvcnQgY2xhc3MgUGFyYW1ldGVyIGV4dGVuZHMgVmFsdWUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMga2V5OiBzdHJpbmcsIHB1YmxpYyBmZXRjaFRpbWVNaWxsaXM6IG51bWJlciwgc291cmNlOiBmaXJlYmFzZS5yZW1vdGVDb25maWcuVmFsdWVTb3VyY2UsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzb3VyY2UsIHZhbHVlKTtcbiAgfVxufVxuXG4vLyBJZiBpdCdzIGEgUGFyYW1ldGVyIGFycmF5LCB0ZXN0IGFueSwgZWxzZSB0ZXN0IHRoZSBpbmRpdmlkdWFsIFBhcmFtZXRlclxuY29uc3QgZmlsdGVyVGVzdCA9IChmbjogKHBhcmFtOiBQYXJhbWV0ZXIpID0+IGJvb2xlYW4pID0+IGZpbHRlcjxQYXJhbWV0ZXIgfCBQYXJhbWV0ZXJbXT4oaXQgPT4gQXJyYXkuaXNBcnJheShpdCkgPyBpdC5zb21lKGZuKSA6IGZuKGl0KSk7XG5cbi8vIEFsbG93IHRoZSB1c2VyIHRvIGJ5cGFzcyB0aGUgZGVmYXVsdCB2YWx1ZXMgYW5kIHdhaXQgdGlsbCB0aGV5IGdldCBzb21ldGhpbmcgZnJvbSB0aGUgc2VydmVyLCBldmVuIGlmIGl0J3MgYSBjYWNoZWQgY29weTtcbi8vIGlmIHVzZWQgaW4gY29uanVudGlvbiB3aXRoIGZpcnN0KCkgaXQgd2lsbCBvbmx5IGZldGNoIFJDIHZhbHVlcyBmcm9tIHRoZSBzZXJ2ZXIgaWYgdGhleSBhcmVuJ3QgY2FjaGVkIGxvY2FsbHlcbmV4cG9ydCBjb25zdCBmaWx0ZXJSZW1vdGUgPSAoKSA9PiBmaWx0ZXJUZXN0KHAgPT4gcC5nZXRTb3VyY2UoKSA9PT0gJ3JlbW90ZScpO1xuXG4vLyBmaWx0ZXJGcmVzaCBhbGxvd3MgdGhlIGRldmVsb3BlciB0byBlZmZlY3RpdmVseSBzZXQgdXAgYSBtYXhpbXVtIGNhY2hlIHRpbWVcbmV4cG9ydCBjb25zdCBmaWx0ZXJGcmVzaCA9IChob3dSZWNlbnRJbk1pbGxpczogbnVtYmVyKSA9PiBmaWx0ZXJUZXN0KHAgPT4gcC5mZXRjaFRpbWVNaWxsaXMgKyBob3dSZWNlbnRJbk1pbGxpcyA+PSBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG5cblxuLy8gSSBkaXRjaGVkIGxvYWRpbmcgdGhlIGRlZmF1bHRzIGludG8gUkMgYW5kIGEgc2ltcGxlIG1hcCBmb3Igc2NhbiBzaW5jZSB3ZSBhbHJlYWR5IGhhdmUgb3VyIG93biBkZWZhdWx0cyBpbXBsZW1lbnRhdGlvbi5cbi8vIFRoZSBpZGVhIGhlcmUgYmVpbmcgdGhhdCBpZiB0aGV5IGhhdmUgYSBkZWZhdWx0IHRoYXQgbmV2ZXIgbG9hZHMgZnJvbSB0aGUgc2VydmVyLCB0aGV5IHdpbGwgYmUgYWJsZSB0byB0ZWxsIHZpYSBmZXRjaFRpbWVNaWxsaXNcbi8vIG9uIHRoZSBQYXJhbWV0ZXIuIEFsc28gaWYgaXQgZG9lc24ndCBjb21lIGZyb20gdGhlIHNlcnZlciBpdCB3b24ndCBlbWl0IGFnYWluIGluIC5jaGFuZ2VzLCBkdWUgdG8gdGhlIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuLy8gd2hpY2ggd2UgY2FuIHNpbXBsaWZ5IHRvID09PSByYXRoZXIgdGhhbiBkZWVwIGNvbXBhcmlzb25cbmNvbnN0IHNjYW5Ub1BhcmFtZXRlcnNBcnJheSA9IChcbiAgcmVtb3RlQ29uZmlnOiBPYnNlcnZhYmxlPGZpcmViYXNlLnJlbW90ZUNvbmZpZy5SZW1vdGVDb25maWcgfCB1bmRlZmluZWQ+XG4pOiBPcGVyYXRvckZ1bmN0aW9uPHsgW2tleTogc3RyaW5nXTogZmlyZWJhc2UucmVtb3RlQ29uZmlnLlZhbHVlIH0sIFBhcmFtZXRlcltdPiA9PiBwaXBlKFxuICB3aXRoTGF0ZXN0RnJvbShyZW1vdGVDb25maWcpLFxuICBzY2FuKChleGlzdGluZywgW2FsbCwgcmNdKSA9PiB7XG4gICAgLy8gU0VNVkVSIHVzZSBcIm5ldyBTZXRcIiB0byB1bmlxdWUgb25jZSB3ZSdyZSBvbmx5IHRhcmdldGluZyBlczZcbiAgICAvLyBhdCB0aGUgc2NhbGUgd2UgZXhwZWN0IHJlbW90ZSBjb25maWcgdG8gYmUgYXQsIHdlIHByb2JhYmx5IHdvbid0IHNlZSBhIHBlcmZvcm1hbmNlIGhpdCBmcm9tIHRoaXMgdW5vcHRpbWl6ZWQgdW5pcXVlbmVzc1xuICAgIC8vIGltcGxlbWVudGF0aW9uLlxuICAgIC8vIGNvbnN0IGFsbEtleXMgPSBbLi4ubmV3IFNldChbLi4uZXhpc3RpbmcubWFwKHAgPT4gcC5rZXkpLCAuLi5PYmplY3Qua2V5cyhhbGwpXSldO1xuICAgIGNvbnN0IGFsbEtleXMgPSBbLi4uZXhpc3RpbmcubWFwKHAgPT4gcC5rZXkpLCAuLi5PYmplY3Qua2V5cyhhbGwpXS5maWx0ZXIoKHYsIGksIGEpID0+IGEuaW5kZXhPZih2KSA9PT0gaSk7XG4gICAgcmV0dXJuIGFsbEtleXMubWFwKGtleSA9PiB7XG4gICAgICBjb25zdCB1cGRhdGVkVmFsdWUgPSBhbGxba2V5XTtcbiAgICAgIHJldHVybiB1cGRhdGVkVmFsdWUgPyBuZXcgUGFyYW1ldGVyKGtleSwgcmMgPyByYy5mZXRjaFRpbWVNaWxsaXMgOiAtMSwgdXBkYXRlZFZhbHVlLmdldFNvdXJjZSgpLCB1cGRhdGVkVmFsdWUuYXNTdHJpbmcoKSlcbiAgICAgICAgOiBleGlzdGluZy5maW5kKHAgPT4gcC5rZXkgPT09IGtleSk7XG4gICAgfSk7XG4gIH0sIFtdIGFzIEFycmF5PFBhcmFtZXRlcj4pXG4pO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVSZW1vdGVDb25maWcge1xuXG4gIHJlYWRvbmx5IGNoYW5nZXM6IE9ic2VydmFibGU8UGFyYW1ldGVyPjtcbiAgcmVhZG9ubHkgcGFyYW1ldGVyczogT2JzZXJ2YWJsZTxQYXJhbWV0ZXJbXT47XG4gIHJlYWRvbmx5IG51bWJlcnM6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfCB1bmRlZmluZWQgfT4gJiB7IFtrZXk6IHN0cmluZ106IE9ic2VydmFibGU8bnVtYmVyPiB9O1xuICByZWFkb25seSBib29sZWFuczogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfCB1bmRlZmluZWQgfT4gJiB7IFtrZXk6IHN0cmluZ106IE9ic2VydmFibGU8Ym9vbGVhbj4gfTtcbiAgcmVhZG9ubHkgc3RyaW5nczogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZCB9PiAmIHsgW2tleTogc3RyaW5nXTogT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+IH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChGSVJFQkFTRV9PUFRJT05TKSBvcHRpb25zOiBGaXJlYmFzZU9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChGSVJFQkFTRV9BUFBfTkFNRSkgbmFtZU9yQ29uZmlnOiBzdHJpbmcgfCBGaXJlYmFzZUFwcENvbmZpZyB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChTRVRUSU5HUykgc2V0dGluZ3M6IFNldHRpbmdzIHwgbnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERFRkFVTFRTKSBkZWZhdWx0Q29uZmlnOiBDb25maWdUZW1wbGF0ZSB8IG51bGwsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcblxuICAgIGNvbnN0IHNjaGVkdWxlcnMgPSBuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSk7XG5cbiAgICBjb25zdCByZW1vdGVDb25maWckID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpID8gaW1wb3J0KCdmaXJlYmFzZS9yZW1vdGUtY29uZmlnJykgOiBFTVBUWSksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gaW1wb3J0KCdAZmlyZWJhc2UvcmVtb3RlLWNvbmZpZycpKSxcbiAgICAgIHRhcChyYyA9PiByYy5yZWdpc3RlclJlbW90ZUNvbmZpZyAmJiByYy5yZWdpc3RlclJlbW90ZUNvbmZpZyhmaXJlYmFzZSBhcyBhbnkpKSxcbiAgICAgIG1hcCgoKSA9PiDJtWZpcmViYXNlQXBwRmFjdG9yeShvcHRpb25zLCB6b25lLCBuYW1lT3JDb25maWcpKSxcbiAgICAgIG1hcChhcHAgPT4gYXBwLnJlbW90ZUNvbmZpZygpKSxcbiAgICAgIHRhcChyYyA9PiB7XG4gICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgIHJjLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZmF1bHRDb25maWcpIHtcbiAgICAgICAgICByYy5kZWZhdWx0Q29uZmlnID0gZGVmYXVsdENvbmZpZztcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIHN0YXJ0V2l0aCh1bmRlZmluZWQpLFxuICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogZmFsc2UgfSlcbiAgICApO1xuXG4gICAgY29uc3QgbG9hZGVkUmVtb3RlQ29uZmlnJCA9IHJlbW90ZUNvbmZpZyQucGlwZShcbiAgICAgIGZpbHRlcjxmaXJlYmFzZS5yZW1vdGVDb25maWcuUmVtb3RlQ29uZmlnPihyYyA9PiAhIXJjKVxuICAgICk7XG5cbiAgICBjb25zdCBkZWZhdWx0JDogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IGZpcmViYXNlLnJlbW90ZUNvbmZpZy5WYWx1ZSB9PiA9IG9mKE9iamVjdC5rZXlzKGRlZmF1bHRDb25maWcgfHwge30pLnJlZHVjZShcbiAgICAgIChjLCBrKSA9PiAoeyAuLi5jLCBba106IG5ldyBWYWx1ZSgnZGVmYXVsdCcsIGRlZmF1bHRDb25maWdba10udG9TdHJpbmcoKSkgfSksIHt9XG4gICAgKSk7XG5cbiAgICAvLyB3ZSBzaG91bGQgZmlsdGVyIG91dCB0aGUgZGVmYXVsdHMgd2UgcHJvdmlkZWQgdG8gUkMsIHNpbmNlIHdlIGhhdmUgb3VyIG93biBpbXBsZW1lbnRhdGlvblxuICAgIC8vIHRoYXQgZ2l2ZXMgdXMgYSAtMSBmb3IgZmV0Y2hUaW1lTWlsbGlzIChzbyBmaWx0ZXJGcmVzaCBjYW4gZmlsdGVyIHRoZW0gb3V0KVxuICAgIGNvbnN0IGZpbHRlck91dERlZmF1bHRzID0gbWFwPHsgW2tleTogc3RyaW5nXTogZmlyZWJhc2UucmVtb3RlQ29uZmlnLlZhbHVlIH0sIHsgW2tleTogc3RyaW5nXTogZmlyZWJhc2UucmVtb3RlQ29uZmlnLlZhbHVlIH0+KGFsbCA9PlxuICAgICAgT2JqZWN0LmtleXMoYWxsKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBhbGxba2V5XS5nZXRTb3VyY2UoKSAhPT0gJ2RlZmF1bHQnKVxuICAgICAgICAucmVkdWNlKChhY2MsIGtleSkgPT4gKHsgLi4uYWNjLCBba2V5XTogYWxsW2tleV0gfSksIHt9KVxuICAgICk7XG5cbiAgICBjb25zdCBleGlzdGluZyQgPSBsb2FkZWRSZW1vdGVDb25maWckLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocmMgPT5cbiAgICAgICAgcmMuYWN0aXZhdGUoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHJjLmVuc3VyZUluaXRpYWxpemVkKCkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gcmMuZ2V0QWxsKCkpXG4gICAgICApLFxuICAgICAgZmlsdGVyT3V0RGVmYXVsdHNcbiAgICApO1xuXG4gICAgY29uc3QgZnJlc2gkID0gbG9hZGVkUmVtb3RlQ29uZmlnJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHJjID0+IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgICAgcmMuZmV0Y2hBbmRBY3RpdmF0ZSgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gcmMuZW5zdXJlSW5pdGlhbGl6ZWQoKSlcbiAgICAgICAgICAudGhlbigoKSA9PiByYy5nZXRBbGwoKSlcbiAgICAgICkpLFxuICAgICAgZmlsdGVyT3V0RGVmYXVsdHNcbiAgICApO1xuXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gY29uY2F0KGRlZmF1bHQkLCBleGlzdGluZyQsIGZyZXNoJCkucGlwZShcbiAgICAgIHNjYW5Ub1BhcmFtZXRlcnNBcnJheShyZW1vdGVDb25maWckKSxcbiAgICAgIMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3Rvcnkoc2NoZWR1bGVycyksXG4gICAgICBzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlIH0pXG4gICAgKTtcblxuICAgIHRoaXMuY2hhbmdlcyA9IHRoaXMucGFyYW1ldGVycy5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBhcmFtcyA9PiBvZiguLi5wYXJhbXMpKSxcbiAgICAgIGdyb3VwQnkocGFyYW0gPT4gcGFyYW0ua2V5KSxcbiAgICAgIG1lcmdlTWFwKGdyb3VwID0+IGdyb3VwLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgICkpXG4gICAgKTtcblxuICAgIHRoaXMuc3RyaW5ncyA9IHByb3h5QWxsKHRoaXMucGFyYW1ldGVycywgJ3N0cmluZ3MnKTtcbiAgICB0aGlzLmJvb2xlYW5zID0gcHJveHlBbGwodGhpcy5wYXJhbWV0ZXJzLCAnYm9vbGVhbnMnKTtcbiAgICB0aGlzLm51bWJlcnMgPSBwcm94eUFsbCh0aGlzLnBhcmFtZXRlcnMsICdudW1iZXJzJyk7XG5cbiAgICByZXR1cm4gybVsYXp5U0RLUHJveHkodGhpcywgbG9hZGVkUmVtb3RlQ29uZmlnJCwgem9uZSk7XG4gIH1cblxufVxuXG5cbmV4cG9ydCBjb25zdCBidWRnZXQgPSA8VD4oaW50ZXJ2YWw6IG51bWJlcik6IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbjxUPiA9PiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBuZXcgT2JzZXJ2YWJsZTxUPihvYnNlcnZlciA9PiB7XG4gIGxldCB0aW1lZE91dCA9IGZhbHNlO1xuICAvLyBUT0RPIHVzZSBzY2hlZHVsZXIgdGFzayByYXRoZXIgdGhhbiBzZXR0aW1lb3V0XG4gIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIHRpbWVkT3V0ID0gdHJ1ZTtcbiAgfSwgaW50ZXJ2YWwpO1xuICByZXR1cm4gc291cmNlLnN1YnNjcmliZSh7XG4gICAgbmV4dCh2YWwpIHtcbiAgICAgIGlmICghdGltZWRPdXQpIHtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWwpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IoZXJyKSB7XG4gICAgICBpZiAoIXRpbWVkT3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBsZXRlKCkge1xuICAgICAgaWYgKCF0aW1lZE91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG5jb25zdCB0eXBlZE1ldGhvZCA9IChpdDogYW55KSA9PiB7XG4gIHN3aXRjaCAodHlwZW9mIGl0KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiAnYXNTdHJpbmcnO1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuICdhc0Jvb2xlYW4nO1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gJ2FzTnVtYmVyJztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICdhc1N0cmluZyc7XG4gIH1cbn07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYW5Ub09iamVjdCgpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlciwgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQgfT47XG5leHBvcnQgZnVuY3Rpb24gc2NhblRvT2JqZWN0KHRvOiAnbnVtYmVycycpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlciwgeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfCB1bmRlZmluZWQgfT47XG5leHBvcnQgZnVuY3Rpb24gc2NhblRvT2JqZWN0KHRvOiAnYm9vbGVhbnMnKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXIsIHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9Pjtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp1bmlmaWVkLXNpZ25hdHVyZXNcbmV4cG9ydCBmdW5jdGlvbiBzY2FuVG9PYmplY3QodG86ICdzdHJpbmdzJyk6IE9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyLCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZCB9PjtcbmV4cG9ydCBmdW5jdGlvbiBzY2FuVG9PYmplY3Q8VCBleHRlbmRzIENvbmZpZ1RlbXBsYXRlPih0ZW1wbGF0ZTogVCk6IE9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyLCBUICYgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQgfT47XG5leHBvcnQgZnVuY3Rpb24gc2NhblRvT2JqZWN0PFQgZXh0ZW5kcyBDb25maWdUZW1wbGF0ZT4odG86ICdudW1iZXJzJyB8ICdib29sZWFucycgfCAnc3RyaW5ncycgfCBUID0gJ3N0cmluZ3MnKSB7XG4gIHJldHVybiBwaXBlKFxuICAgIC8vIFRPRE8gY2xlYW51cFxuICAgIHNjYW4oXG4gICAgICAoYywgcDogUGFyYW1ldGVyKSA9PiAoe1xuICAgICAgICAuLi5jLCBbcC5rZXldOiB0eXBlb2YgdG8gPT09ICdvYmplY3QnID9cbiAgICAgICAgICBwW3R5cGVkTWV0aG9kKHRvW3Aua2V5XSldKCkgOlxuICAgICAgICAgIHBbQVNfVE9fRk5bdG9dXSgpXG4gICAgICB9KSxcbiAgICAgIHR5cGVvZiB0byA9PT0gJ29iamVjdCcgP1xuICAgICAgICB0byBhcyBUICYgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQgfSA6XG4gICAgICAgIHt9IGFzIHsgW2tleTogc3RyaW5nXTogbnVtYmVyIHwgYm9vbGVhbiB8IHN0cmluZyB9XG4gICAgKSxcbiAgICBkZWJvdW5jZVRpbWUoMSksXG4gICAgYnVkZ2V0KDEwKSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoYSwgYikgPT4gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9PYmplY3QoKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXJbXSwgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQgfT47XG5leHBvcnQgZnVuY3Rpb24gbWFwVG9PYmplY3QodG86ICdudW1iZXJzJyk6IE9wZXJhdG9yRnVuY3Rpb248UGFyYW1ldGVyW10sIHsgW2tleTogc3RyaW5nXTogbnVtYmVyIHwgdW5kZWZpbmVkIH0+O1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvT2JqZWN0KHRvOiAnYm9vbGVhbnMnKTogT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXJbXSwgeyBba2V5OiBzdHJpbmddOiBib29sZWFuIHwgdW5kZWZpbmVkIH0+O1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVuaWZpZWQtc2lnbmF0dXJlc1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvT2JqZWN0KHRvOiAnc3RyaW5ncycpOiBPcGVyYXRvckZ1bmN0aW9uPFBhcmFtZXRlcltdLCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZCB9PjtcbmV4cG9ydCBmdW5jdGlvbiBtYXBUb09iamVjdDxUIGV4dGVuZHMgQ29uZmlnVGVtcGxhdGU+KHRlbXBsYXRlOiBUKTpcbiAgT3BlcmF0b3JGdW5jdGlvbjxQYXJhbWV0ZXJbXSwgVCAmIHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgdW5kZWZpbmVkIH0+O1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvT2JqZWN0PFQgZXh0ZW5kcyBDb25maWdUZW1wbGF0ZT4odG86ICdudW1iZXJzJyB8ICdib29sZWFucycgfCAnc3RyaW5ncycgfCBUID0gJ3N0cmluZ3MnKSB7XG4gIHJldHVybiBwaXBlKFxuICAgIC8vIFRPRE8gdGhpcyBpcyBnZXR0aW5nIGEgbGl0dGxlIGxvbmcsIGNsZWFudXBcbiAgICBtYXAoKHBhcmFtczogUGFyYW1ldGVyW10pID0+IHBhcmFtcy5yZWR1Y2UoXG4gICAgICAoYywgcCkgPT4gKHtcbiAgICAgICAgLi4uYywgW3Aua2V5XTogdHlwZW9mIHRvID09PSAnb2JqZWN0JyA/XG4gICAgICAgICAgcFt0eXBlZE1ldGhvZCh0b1twLmtleV0pXSgpIDpcbiAgICAgICAgICBwW0FTX1RPX0ZOW3RvXV0oKVxuICAgICAgfSksXG4gICAgICB0eXBlb2YgdG8gPT09ICdvYmplY3QnID9cbiAgICAgICAgdG8gYXMgVCAmIHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgdW5kZWZpbmVkIH0gOlxuICAgICAgICB7fSBhcyB7IFtrZXk6IHN0cmluZ106IG51bWJlciB8IGJvb2xlYW4gfCBzdHJpbmcgfVxuICAgICkpLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChhLCBiKSA9PiBKU09OLnN0cmluZ2lmeShhKSA9PT0gSlNPTi5zdHJpbmdpZnkoYikpXG4gICk7XG59XG5cbsm1YXBwbHlNaXhpbnMoQW5ndWxhckZpcmVSZW1vdGVDb25maWcsIFtwcm94eVBvbHlmaWxsQ29tcGF0XSk7XG4iXX0=