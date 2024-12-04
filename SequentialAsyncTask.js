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
import { CompoundAsyncTask } from "./CompoundAsyncTask";
/**
 * The SequentialAsyncTask runs a list of tasks in sequential order.
 * Each sunsequent task is only run once the previous task is done.
 * The previous task is used as the argument for the next task's run method.
 * This enables the chaining of results.
 */
export class SequentialAsyncTask extends CompoundAsyncTask {
    /**
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    constructor(tasks) {
        super(tasks);
    }
    run(data) {
        this._status = "pending";
        this.pendingTasks = this.tasks.slice();
        var task = this.pendingTasks.shift();
        task.done(this.handleDone);
        task.run();
    }
    handleDone(task) {
        if (this._status != "pending") {
            return;
        }
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
                    this.cancelTasks();
                    this.fail();
                    return;
                }
                break;
            default: // not sure why this would happen
                throw new Error("Unknown task status");
        }
        if (this.pendingTasks.length) {
            var nextTask = this.pendingTasks.shift();
            nextTask.done(this.handleDone);
            nextTask.run(task);
        }
        else {
            this.setFinalStatus();
        }
    }
    /**
     * Static helper method for invoking the task in a single expression
     *  @langversion 3.0
     *  @productversion Royale 0.9.9
    */
    static execute(tasks, callback, failEarly = false) {
        var task = new SequentialAsyncTask(tasks);
        task.failEarly = failEarly;
        task.done(function () {
            callback(task);
        });
        task.run();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VxdWVudGlhbEFzeW5jVGFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNlcXVlbnRpYWxBc3luY1Rhc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0ZBQWdGO0FBQ2hGLEVBQUU7QUFDRixzRUFBc0U7QUFDdEUseUVBQXlFO0FBQ3pFLHVFQUF1RTtBQUN2RSwyRUFBMkU7QUFDM0Usd0VBQXdFO0FBQ3hFLHlEQUF5RDtBQUN6RCxFQUFFO0FBQ0Ysa0RBQWtEO0FBQ2xELEVBQUU7QUFDRix1RUFBdUU7QUFDdkUscUVBQXFFO0FBQ3JFLDRFQUE0RTtBQUM1RSx1RUFBdUU7QUFDdkUsa0NBQWtDO0FBQ2xDLEVBQUU7QUFDRixnRkFBZ0Y7QUFFaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHeEQ7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsaUJBQWlCO0lBRXREOzs7OztPQUtHO0lBQ0gsWUFBWSxLQUF5QjtRQUVqQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUNRLEdBQUcsQ0FBQyxJQUFhO1FBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QyxJQUFJLElBQUksR0FBYyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDa0IsVUFBVSxDQUFDLElBQWU7UUFFekMsSUFBRyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBQyxDQUFDO1lBQzFCLE9BQU87UUFDWCxDQUFDO1FBRUQsUUFBTyxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUM7WUFDaEIsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixNQUFNO1lBQ1YseUJBQXlCO1lBQ3pCLDZFQUE2RTtZQUM3RSxLQUFLLE9BQU8sQ0FBQztZQUNMLGdEQUFnRDtZQUNoRCxLQUFLLFVBQVUsQ0FBQztZQUN4QixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDO29CQUNmLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNaLE9BQU87Z0JBQ1gsQ0FBQztnQkFDRCxNQUFNO1lBQ1YsU0FBUSxpQ0FBaUM7Z0JBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxDQUFDO1lBQ3pCLElBQUksUUFBUSxHQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixDQUFDO2FBQ0ksQ0FBQztZQUNGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O01BSUU7SUFDSyxNQUFNLENBQVUsT0FBTyxDQUFDLEtBQXVCLEVBQUUsUUFBaUIsRUFBRSxZQUFrQixLQUFLO1FBQzlGLElBQUksSUFBSSxHQUF1QixJQUFJLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDTixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0NBQ0oifQ==