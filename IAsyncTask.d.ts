export interface IAsyncTask {
    done(callback: Function): IAsyncTask;
    run(data?: Object): void;
    complete(): void;
    fail(): void;
    cancel(): void;
    get status(): String;
    get completed(): Boolean;
    get failed(): Boolean;
    get data(): Object;
}
