import { CompoundAsyncTask } from "./CompoundAsyncTask";
import { IAsyncTask } from "./IAsyncTask";
/**
 * The SequentialAsyncTask runs a list of tasks in sequential order.
 * Each sunsequent task is only run once the previous task is done.
 * The previous task is used as the argument for the next task's run method.
 * This enables the chaining of results.
 */
export declare class SequentialAsyncTask extends CompoundAsyncTask {
    /**
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    constructor(tasks?: Array<IAsyncTask>);
    run(data?: Object): void;
    protected handleDone(task: IAsyncTask): void;
    /**
     * Static helper method for invoking the task in a single expression
     *  @langversion 3.0
     *  @productversion Royale 0.9.9
    */
    static execute(tasks: Array<IAsyncTask>, callback: Function, failEarly?: Boolean): void;
}
