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
export class PromiseTask extends AsyncTask
{
    constructor(promise:Promise<any>)
    {
        super();
        this._promise = promise;
    }
    private _promise:Promise<any>;

    /**
     * The result of the promise.
     * 
     * @langversion 3.0
     * @productversion Royale 0.9.10
     */
    public result:any;

    /**
     * The error of the promise.
     * 
     * @langversion 3.0
     * @productversion Royale 0.9.10
     */
    public error:any;
    
    override run(data?:Object):void
    {
        if(data != null)
            this.data = data;

        this._promise.then(
            (res:any)=>
            {
                this.result = res;
                this.complete();
            },
            (err:any)=>
            {
                this.error = err;
                this.fail();
            }
        );
    }
}