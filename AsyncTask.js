////////////////////////////////////////////////////////////////////////////////
//
//  Licensed to the Apache Software Foundation (ASF) under one or more
//  contributor license agreements.  See the NOTICE file distributed with
//  this work for additional information regarding copyright ownership.
//  The ASF licenses this file to You under the Apache License, Version 2.0
//  (the "License"); you may not use this file except in compliance with
//  the License.  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//
////////////////////////////////////////////////////////////////////////////////
import { EventDispatcher } from "./EventClasses.js";
/**
 * AsyncTask is a base class for AsyncTasks which let the caller know when they are done.
 * AsyncTask is an OOP replacement for Promises and simple callbacks which allows for
 * strongly typed async requests with any kind of payload and behavior.
 * AsyncTask must be subclassed to be used.
 * The subclass must implement the `run` method to define the behavior when the task is "run".
 */
export class AsyncTask extends EventDispatcher {
    constructor() {
        super();
    }
    static INITIALIZED = "initialized";
    static PENDING = "pending";
    static COMPLETE = "complete";
    static CANCELED = "canceled";
    static FAILED = "failed";
    /**
     * Used in compound tasks
     */
    static MIXED = "mixed";
    _status = "initialized";
    /**
     * One of: initialized, pending, complete, failed or mixed (for compound tasks)
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    get status() {
        return this._status;
    }
    /**
     * completed (and a status of `complete`) means the task completed successfully
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    get completed() {
        return this._status == "complete";
    }
    set completed(value) {
        this._status = "complete";
    }
    /**
     * failed (and a status of `failed`) means the task resolved to a failed state
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    get failed() {
        return this._status == "failed";
    }
    set failed(value) {
        this._status = "failed";
    }
    /**
     * resolves the task as complete
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    complete() {
        this._status = "complete";
        dispatchEvent(new Event("complete"));
        this.notifyDone();
    }
    /**
     * Resolves the task as failed
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    fail() {
        this._status = "failed";
        dispatchEvent(new Event("failed"));
        this.notifyDone();
    }
    notifyDone() {
        dispatchEvent(new Event("done"));
        if (this.doneCallbacks) {
            for (var i = 0; i < this.doneCallbacks.length; i++) {
                this.doneCallbacks[i](this);
            }
        }
        this.destroy();
    }
    doneCallbacks;
    /**
     * done accepts a callback which is called when the task is resolved.
     * The callback is resolved whether the task is successfully completed or not.
     * The properties of the task should be examined in the callback to determine the results.
     * The `done` event can be listened too as well.
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    done(callback) {
        if (!this.doneCallbacks) {
            this.doneCallbacks = [];
        }
        this.doneCallbacks.push(callback);
        return this;
    }
    run(data) {
    }
    /**
     * cancel resolves the task as "canceled"
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    cancel() {
        this._status = "canceled";
        this.notifyDone();
    }
    _data;
    /**
     * The data of the task
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    /**
     * Keep references to event listeners for automatic cleanup
     */
    addEventListener(type, handler, useCapture = false, scope) {
        super.addEventListener(type, handler, useCapture, scope);
        if (!this.listeners) {
            this.listeners = [];
        }
        this.listeners.push({
            type: type,
            handler: handler,
            useCapture: useCapture
        });
    }
    listeners;
    // Clean up the instance for garbage collection
    destroy() {
        this.doneCallbacks = null;
        if (this.listeners) {
            for (var i = 0; i < this.listeners.length; i++) {
                var l = this.listeners[i];
                removeEventListener(l.type, l.handler, l.useCapture);
            }
            this.listeners = null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXN5bmNUYXNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXN5bmNUYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdGQUFnRjtBQUNoRixFQUFFO0FBQ0Ysc0VBQXNFO0FBQ3RFLHlFQUF5RTtBQUN6RSx1RUFBdUU7QUFDdkUsMkVBQTJFO0FBQzNFLHdFQUF3RTtBQUN4RSx5REFBeUQ7QUFDekQsRUFBRTtBQUNGLGtEQUFrRDtBQUNsRCxFQUFFO0FBQ0YsdUVBQXVFO0FBQ3ZFLHFFQUFxRTtBQUNyRSw0RUFBNEU7QUFDNUUsdUVBQXVFO0FBQ3ZFLGtDQUFrQztBQUNsQyxFQUFFO0FBQ0YsZ0ZBQWdGO0FBRWhGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUduRDs7Ozs7O0dBTUc7QUFHSCxNQUFNLE9BQWdCLFNBQVUsU0FBUSxlQUFlO0lBQ25EO1FBQ0ksS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ00sTUFBTSxDQUFDLFdBQVcsR0FBVSxhQUFhLENBQUM7SUFDMUMsTUFBTSxDQUFDLE9BQU8sR0FBVSxTQUFTLENBQUM7SUFDbEMsTUFBTSxDQUFDLFFBQVEsR0FBVSxVQUFVLENBQUM7SUFDcEMsTUFBTSxDQUFDLFFBQVEsR0FBVSxVQUFVLENBQUM7SUFDcEMsTUFBTSxDQUFDLE1BQU0sR0FBVSxRQUFRLENBQUM7SUFDdkM7O09BRUc7SUFDSSxNQUFNLENBQUMsS0FBSyxHQUFVLE9BQU8sQ0FBQztJQUM5QixPQUFPLEdBQVUsYUFBYSxDQUFDO0lBQ3RDOzs7Ozs7T0FNRztJQUNILElBQVcsTUFBTTtRQUViLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsSUFBVyxTQUFTO1FBRWhCLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUM7SUFDdEMsQ0FBQztJQUNELElBQVcsU0FBUyxDQUFDLEtBQWE7UUFFOUIsSUFBSSxDQUFDLE9BQU8s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