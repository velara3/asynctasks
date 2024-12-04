import { IAsyncTask } from "./IAsyncTask";
/**
 * Utility function which takes a IAsyncTask and returns a Promise which
 * resolves when the task completes or rejects if the task fails.
 *
 * Useful for converting IAsyncTask to Promise based APIs.
 *
 * @langversion 3.0
 * @productversion Royale 0.9.10
 *
 */
export declare function taskToPromise(task: IAsyncTask): Promise<unknown>;
