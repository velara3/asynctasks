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
export function promiseToTask(promise) {
    return new PromiseTask(promise);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvbWlzZVRvVGFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByb21pc2VUb1Rhc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0ZBQWdGO0FBQ2hGLEVBQUU7QUFDRixzRUFBc0U7QUFDdEUseUVBQXlFO0FBQ3pFLHVFQUF1RTtBQUN2RSwyRUFBMkU7QUFDM0Usd0VBQXdFO0FBQ3hFLHlEQUF5RDtBQUN6RCxFQUFFO0FBQ0Ysa0RBQWtEO0FBQ2xELEVBQUU7QUFDRix1RUFBdUU7QUFDdkUscUVBQXFFO0FBQ3JFLDRFQUE0RTtBQUM1RSx1RUFBdUU7QUFDdkUsa0NBQWtDO0FBQ2xDLEVBQUU7QUFDRixnRkFBZ0Y7QUFFaEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1Qzs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLE9BQW9CO0lBRTlDLE9BQU8sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMsQ0FBQyJ9