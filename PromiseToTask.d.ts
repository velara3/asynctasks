import { PromiseTask } from "./PromiseTask";
/**
 * Utility function which takes a Promise and returns a PromiseTask
 * The task completes when the Promise resolves and fails when the Promise rejects.
 *
 * Useful for using Promises in task based code.
 *
 * @langversion 3.0
 * @productversion Royale 0.9.10
 *
 */
export declare function promiseToTask(promise: Promise<any>): PromiseTask;
