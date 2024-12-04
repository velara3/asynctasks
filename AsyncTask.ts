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

import { EventDispatcher } from "./EventClasses.js"
import { IAsyncTask } from "./IAsyncTask.js";

/**
 * AsyncTask is a base class for AsyncTasks which let the caller know when they are done.
 * AsyncTask is an OOP replacement for Promises and simple callbacks which allows for
 * strongly typed async requests with any kind of payload and behavior.
 * AsyncTask must be subclassed to be used.
 * The subclass must implement the `run` method to define the behavior when the task is "run".
 */


export abstract class AsyncTask extends EventDispatcher implements IAsyncTask {
    constructor() {
        super();
    }
    public static INITIALIZED:String = "initialized";
    public static PENDING:String = "pending";
    public static COMPLETE:String = "complete";
    public static CANCELED:String = "canceled";
    public static FAILED:String = "failed";
    /**
     * Used in compound tasks
     */
    public static MIXED:String = "mixed";
    public _status:String = "initialized";
    /**
     * One of: initialized, pending, complete, failed or mixed (for compound tasks)
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    public get status():String
    {
        return this._status;
    }

    /**
     * completed (and a status of `complete`) means the task completed successfully
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    public get completed():Boolean
    {
        return this._status == "complete";
    }
    public set completed(value:Boolean)
    {
        this._status = "complete";
    }

    /**
     * failed (and a status of `failed`) means the task resolved to a failed state
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    public get failed():Boolean
    {
        return this._status == "failed";
    }
    public set failed(value:Boolean)
    {
        this._status = "failed";
    }
    /**
     * resolves the task as complete
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    public complete():void{
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
    public fail():void{
        this._status = "failed";
        dispatchEvent(new Event("failed"));
        this.notifyDone();
    }
    protected notifyDone():void{
        dispatchEvent(new Event("done"));
        if(this.doneCallbacks) {
            for(var i:number=0;i<this.doneCallbacks.length;i++){
                this.doneCallbacks[i](this);
            }
        }
        this.destroy();
    }
    private doneCallbacks:Array<any>;

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
    public done(callback:Function):IAsyncTask{
        if(!this.doneCallbacks){
            this.doneCallbacks = [];
        }
        this.doneCallbacks.push(callback);
        return this;
    }

    public run(data?:Object):void {

    }

    /**
     * cancel resolves the task as "canceled"
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    public cancel():void
    {
        this._status = "canceled";
        this.notifyDone();
    }

    private _data:Object;
    /**
     * The data of the task
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    public get data():Object
    {
        return this._data;
    }

    public set data(value:Object)
    {
        this._data = value;
    }
    /**
     * Keep references to event listeners for automatic cleanup
     */
    override addEventListener(type: string, handler: Function, useCapture: boolean = false, scope?: Object):void
    {
        super.addEventListener(type, handler, useCapture, scope);
        if(!this.listeners){
            this.listeners = [];
        }
        this.listeners.push({
            type:type,
            handler:handler,
            useCapture:useCapture
        });
    }
    private listeners:Array<any>;

    // Clean up the instance for garbage collection
    protected destroy():void
    {
        
        this.doneCallbacks = null;
        if(this.listeners) {
            for(var i:number=0;i<this.listeners.length;i++) {
                var l:any = this.listeners[i];
                removeEventListener(l.type, l.handler, l.useCapture);
            }
            this.listeners = null;
        }
    }
}