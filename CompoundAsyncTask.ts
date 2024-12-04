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
import { IAsyncTask } from "./IAsyncTask";

/**
 * The CompoundAsyncTask class allows running a number of AsyncTasks in parallel and resolves when they are done.
 *  @langversion 3.0
 *  @playerversion Flash 10.2
 *  @playerversion AIR 2.6
 *  @productversion Royale 0.9.6
 */
export class CompoundAsyncTask extends AsyncTask
{
    constructor(tasks:Array<any>=null)
    {
        super();
        if(!tasks){
            tasks = [];
        }
        this.tasks = tasks;
        this.completedTasks = [];
        this.failedTasks = [];
    }

    protected tasks:Array<any>;

    private _failEarly:Boolean;
    /**
     * If <code>failEarly</code> is true, the task will fail as soon as the first subtask fails.
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    public get failEarly():Boolean
    {
        return this._failEarly;
    }

    public set failEarly(value:Boolean)
    {
        this._failEarly = value;
    }
    /**
     * Adds a task to the task list.
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     */
    public addTask(task:IAsyncTask):void{
        this.tasks.push(task);
    }
    
    protected pendingTasks:Array<any>;

    /**
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     *  @royalesuppresspublicvarwarning
     */
    public completedTasks:Array<IAsyncTask>;
    /**
     *  @langversion 3.0
     *  @playerversion Flash 10.2
     *  @playerversion AIR 2.6
     *  @productversion Royale 0.9.6
     *  @royalesuppresspublicvarwarning
     */
    public failedTasks:Array<IAsyncTask>;

    override run(data:Object=null):void
    {
        if(this._status == "pending"){// don't allow running twice
            return;
        }
        this._status = "pending";

        this.pendingTasks = this.tasks.slice();

        for (var name in this.tasks){
            var task:IAsyncTask = this.tasks[name];
            task.done(this.handleDone);
            task.run();
        }
    }
    protected handleDone(task:IAsyncTask):void
    {
        if(this._status != "pending")
        {
            return;
        }
        var idx:number = this.pendingTasks.indexOf(task);
        this.pendingTasks.splice(idx,1);
        switch(task.status){
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
                if(this.failEarly)
                {
                    this.fail();
                    this.cancelTasks();
                    return;
                }
                break;
            default:// not sure why this would happen
                throw new Error("Unknown task status");
        }
        if(this.pendingTasks.length == 0)
        {
            this.setFinalStatus();
        }
    }
    protected cancelTasks():void
    {
        while(this.pendingTasks.length)
        {
            var pending:IAsyncTask = this.pendingTasks.pop();
            pending.cancel();
            this.failedTasks.push(pending);
        }

    }
    override cancel():void
    {
        this.cancelTasks();
        super.cancel();
    }
    protected setFinalStatus():void
    {
        if(this.failedTasks.length == 0)
        {
            this.complete();
        }
        else if(this.completedTasks.length == 0)
        {
            this.fail();
        }
        else
        {// Some passed and some failed -- Does this make sense?
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
    public static execute(tasks:Array<IAsyncTask>,callback:Function,failEarly:Boolean=false):void{
        var task:CompoundAsyncTask = new CompoundAsyncTask(tasks);
        task.failEarly = failEarly;
        task.done(function():void{
            callback(task);
        });
        task.run();
    }    
}