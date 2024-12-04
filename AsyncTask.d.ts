import { EventDispatcher } from "./EventClasses.js";
import { IAsyncTask } from "./IAsyncTask.js";
/**
 * AsyncTask is a base class for AsyncTasks which let the caller know when they are done.
 * AsyncTask is an OOP replacement for Promises and simple callbacks which allows for
 * strongly typed async requests with any kind of payload and behavior.
 * AsyncTask must be subclassed to be used.
 * The subclass must implement the `run` method to define the behavior when the task is "run".
 */
export declare abstract class AsyncTask extends EventDispatcher implements IAsyncTask {
    constructor();
    static INITIALIZED: String;
    static PENDING: String;
    static COMPLETE: String;
    static CANCELED: String;
    static FAILED: String;
    /**
     * Used in compound tasks
     */
    static MIXED: String;
    _status: String;
    /**
     * One of: initialized, pending, complete, failed or mixed (for compound tasks)
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    get status(): String;
    /**
     * completed (and a status of `complete`) means the task completed successfully
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    get completed(): Boolean;
    set completed(value: Boolean);
    /**
     * failed (and a status of `failed`) means the task resolved to a failed state
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    get failed(): Boolean;
    set failed(value: Boolean);
    /**
     * resolves the task as complete
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    complete(): void;
    /**
     * Resolves the task as failed
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    fail(): void;
    protected notifyDone(): void;
    private doneCallbacks;
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
    done(callback: Function): IAsyncTask;
    run(data?: Object): void;
    /**
     * cancel resolves the task as "canceled"
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    cancel(): void;
    private _data;
    /**
     * The data of the task
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    get data(): Object;
    set data(value: Object);
    /**
     * Keep references to event listeners for automatic cleanup
     */
    addEventListener(type: string, handler: Function, useCapture?: boolean, scope?: Object): void;
    private listeners;
    protected destroy(): void;
}
