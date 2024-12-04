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
export class PromiseTask extends AsyncTask {
    constructor(promise) {
        super();
        this._promise = promise;
    }
    _promise;
    /**
     * The result of the promise.
     *
     * @langversion 3.0
     * @productversion Royale 0.9.10
     */
    result;
    /**
     * The error of the promise.
     *
     * @langversion 3.0
     * @productversion Royale 0.9.10
     */
    error;
    run(data) {
        if (data != null)
            this.data = data;
        this._promise.then((res) => {
            this.result = res;
            this.complete();
        }, (err) => {
            this.error = err;
            this.fail();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvbWlzZVRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9taXNlVGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnRkFBZ0Y7QUFDaEYsRUFBRTtBQUNGLHNFQUFzRTtBQUN0RSx5RUFBeUU7QUFDekUsdUVBQXVFO0FBQ3ZFLDJFQUEyRTtBQUMzRSx3RUFBd0U7QUFDeEUseURBQXlEO0FBQ3pELEVBQUU7QUFDRixrREFBa0Q7QUFDbEQsRUFBRTtBQUNGLHVFQUF1RTtBQUN2RSxxRUFBcUU7QUFDckUsNEVBQTRFO0FBQzVFLHVFQUF1RTtBQUN2RSxrQ0FBa0M7QUFDbEMsRUFBRTtBQUNGLGdGQUFnRjtBQUVoRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhDOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxPQUFPLFdBQVksU0FBUSxTQUFTO0lBRXRDLFlBQVksT0FBb0I7UUFFNUIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBQ08sUUFBUSxDQUFjO0lBRTlCOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFLO0lBRWxCOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFLO0lBRVIsR0FBRyxDQUFDLElBQVk7UUFFckIsSUFBRyxJQUFJLElBQUksSUFBSTtZQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRXJCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNkLENBQUMsR0FBTyxFQUFDLEVBQUU7WUFFUCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxFQUNELENBQUMsR0FBTyxFQUFDLEVBQUU7WUFFUCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==