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
import { AsyncTask } from "./AsyncTask";
/**
 * The CompoundAsyncTask class allows running a number of AsyncTasks in parallel and resolves when they are done.
 *  @langversion 3.0
 *  @playerversion Flash 10.2
 *  @playerversion AIR 2.6
 *  @productversion Royale 0.9.6
 */
export class CompoundAsyncTask extends AsyncTask {
    constructor(tasks = null) {
        super();
        if (!tasks) {
            tasks = [];
        }
        this.tasks = tasks;
        this.completedTasks = [];
        this.failedTasks = [];
    }
    tasks;
    _failEarly;
    /**
     * If <code>failEarly</code> is true, the task will fail as soon as the first subtask fails.
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    get failEarly() {
        return this._failEarly;
    }
    set failEarly(value) {
        this._failEarly = value;
    }
    /**
     * Adds a task to the task list.
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    addTask(task) {
        this.tasks.push(task);
    }
    pendingTasks;
    /**
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     *  @royalesuppresspublicvarwarning
     */
    completedTasks;
    /**
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     *  @royalesuppresspublicvarwarning
     */
    failedTasks;
    run(data = null) {
        if (this._status == "pending") { // don't allow running twice
            return;
        }
        this._status = "pending";
        this.pendingTasks = this.tasks.slice();
        for (var name in this.tasks) {
            var task = this.tasks[name];
            task.done(this.handleDone);
            task.run();
        }
    }
    handleDone(task) {
        if (this._status != "pending") {
            return;
        }
        var idx = this.pendingTasks.indexOf(task);
        this.pendingTasks.splice(idx, 1);
        switch (task.status) {
            case "complete":
                this.completedTasks.push(task);
                break;
            // what to do for "mixed?
            // We're assuming this is "failed" and adding the result to the failed tasks.
            case "mixed":
            // canceled tasks are also added to failed tasks
            case "canceled":
            case "failed":
                this.failedTasks.push(task);
                if (this.failEarly) {
                    this.fail();
                    this.cancelTasks();
                    return;
                }
                break;
            default: // not sure why this would happen
                throw new Error("Unknown task status");
        }
        if (this.pendingTasks.length == 0) {
            this.setFinalStatus();
        }
    }
    cancelTasks() {
        while (this.pendingTasks.length) {
            var pending = this.pendingTasks.pop();
            pending.cancel();
            this.failedTasks.push(pending);
        }
    }
    cancel() {
        this.cancelTasks();
        super.cancel();
    }
    setFinalStatus() {
        if (this.failedTasks.length == 0) {
            this.complete();
        }
        else if (this.completedTasks.length == 0) {
            this.fail();
        }
        else { // Some passed and some failed -- Does this make sense?
            this._status = "mixed";
            dispatchEvent(new Event("failed"));
            dispatchEvent(new Event("complete"));
            this.notifyDone();
        }
    }
    /**
     * Static helper method for invoking the task in a single expression
     *  @langversion 3.0
     *  @productversion Royale 0.9.9
     */
    static execute(tasks, callback, failEarly = false) {
        var task = new CompoundAsyncTask(tasks);
        task.failEarly = failEarly;
        task.done(function () {
            callback(task);
        });
        task.run();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG91bmRBc3luY1Rhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDb21wb3VuZEFzeW5jVGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnRkFBZ0Y7QUFDaEYsRUFBRTtBQUNGLHNFQUFzRTtBQUN0RSx5RUFBeUU7QUFDekUsdUVBQXVFO0FBQ3ZFLDJFQUEyRTtBQUMzRSx3RUFBd0U7QUFDeEUseURBQXlEO0FBQ3pELEVBQUU7QUFDRixrREFBa0Q7QUFDbEQsRUFBRTtBQUNGLHVFQUF1RTtBQUN2RSxxRUFBcUU7QUFDckUsNEVBQTRFO0FBQzVFLHVFQUF1RTtBQUN2RSxrQ0FBa0M7QUFDbEMsRUFBRTtBQUNGLGdGQUFnRjtBQUVoRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3hDOzs7Ozs7R0FNRztBQUNILE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxTQUFTO0lBRTVDLFlBQVksUUFBaUIsSUFBSTtRQUU3QixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUcsQ0FBQyxLQUFLLEVBQUMsQ0FBQztZQUNQLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVTLEtBQUssQ0FBWTtJQUVuQixVQUFVLENBQVM7SUFDM0I7Ozs7OztPQU1HO0lBQ0gsSUFBVyxTQUFTO1FBRWhCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxTQUFTLENBQUMsS0FBYTtRQUU5QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksT0FBTyxDQUFDLElBQWU7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMs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