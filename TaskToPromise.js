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
export function taskToPromise(task) {
    var promise = new Promise((resolve, reject) => {
        task.done(function (task) {
            if (task.completed) {
                resolve(task.data);
            }
            else {
                reject(task.data);
            }
        });
    });
    return promise;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza1RvUHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRhc2tUb1Byb21pc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0ZBQWdGO0FBQ2hGLEVBQUU7QUFDRixzRUFBc0U7QUFDdEUseUVBQXlFO0FBQ3pFLHVFQUF1RTtBQUN2RSwyRUFBMkU7QUFDM0Usd0VBQXdFO0FBQ3hFLHlEQUF5RDtBQUN6RCxFQUFFO0FBQ0Ysa0RBQWtEO0FBQ2xELEVBQUU7QUFDRix1RUFBdUU7QUFDdkUscUVBQXFFO0FBQ3JFLDRFQUE0RTtBQUM1RSx1RUFBdUU7QUFDdkUsa0NBQWtDO0FBQ2xDLEVBQUU7QUFDRixnRkFBZ0Y7QUFJaEY7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUFlO0lBRXpDLElBQUksT0FBTyxHQUFnQixJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQVcsRUFBRSxNQUFVLEVBQUMsRUFBRTtRQUU5RCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVMsSUFBZTtZQUU5QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQ2xCLENBQUM7Z0JBQ0csT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDO2lCQUVELENBQUM7Z0JBQ0csTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMifQ==