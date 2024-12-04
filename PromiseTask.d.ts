import { AsyncTask } from "./AsyncTask";
/**
 * A PromiseTask takes a promise and only resolves the promise when
 * run is called on the task.	This is useful for deferring the
 * resolution of a promise until some other event occurs.
 *
 * It's also usefult for converting a Promise for task-based code.
 * The PromiseTask can be used in a Compound or SequentialTask
 * which normally would not work with promises.
 *
 * @langversion 3.0
 * @productversion Royale 0.9.10
 */
export declare class PromiseTask extends AsyncTask {
    constructor(promise: Promise<any>);
    private _promise;
    /**
     * The result of the promise.
     *
     * @langversion 3.0
     * @productversion Royale 0.9.10
     */
    result: any;
    /**
     * The error of the promise.
     *
     * @langversion 3.0
     * @productversion Royale 0.9.10
     */
    error: any;
    run(data?: Object): void;
}
