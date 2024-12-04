import { AsyncTask } from "./AsyncTask";
import { IAsyncTask } from "./IAsyncTask";
/**
 * The CompoundAsyncTask class allows running a number of AsyncTasks in parallel and resolves when they are done.
 *  @langversion 3.0
 *  @playerversion Flash 10.2
 *  @playerversion AIR 2.6
 *  @productversion Royale 0.9.6
 */
export declare class CompoundAsyncTask extends AsyncTask {
    constructor(tasks?: Array<any>);
    protected tasks: Array<any>;
    private _failEarly;
    /**
     * If <code>failEarly</code> is true, the task will fail as soon as the first subtask fails.
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    get failEarly(): Boolean;
    set failEarly(value: Boolean);
    /**
     * Adds a task to the task list.
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    addTask(task: IAsyncTask): void;
    protected pendingTasks: Array<any>;
    /**
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     *  @royalesuppresspublicvarwarning
     */
    completedTasks: Array<IAsyncTask>;
    /**
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     *  @royalesuppresspublicvarwarning
     */
    failedTasks: Array<IAsyncTask>;
    run(data?: Object): void;
    protected handleDone(task: IAsyncTask): void;
    protected cancelTasks(): void;
    cancel(): void;
    protected setFinalStatus(): void;
    /**
     * Static helper method for invoking the task in a single expression
     *  @langversion 3.0
     *  @productversion Royale 0.9.9
     */
    static execute(tasks: Array<IAsyncTask>, callback: Function, failEarly?: Boolean): void;
}
