/**
 * @license
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
goog.setTestOnly();
goog.require('goog.testing.jsunit');
goog.require('hr.db');
goog.require('lf.testing.MockSchema');


/**
 * Tests the case where indices exist for a given column.
 */
function testGetIndices() {
  var schema = new lf.testing.MockSchema();
  var table = schema.tables()[0];

  var idIndices = table.id.getIndices();
  assertEquals(1, idIndices.length);
  assertEquals(table.id.getName(), idIndices[0].columns[0].name);

  var nameIndices = table.name.getIndices();
  assertEquals(1, nameIndices.length);
  assertEquals(table.name.getName(), nameIndices[0].columns[0].name);
}


/**
 * Tests the case where no indices exist for a given column.
 */
function testGetIndices_NoIndicesExist() {
  var schema = new lf.testing.MockSchema();
  var tableWithNoIndices = schema.tables()[2];
  assertEquals(0, tableWithNoIndices.id.getIndices().length);
  assertEquals(0, tableWithNoIndices.name.getIndices().length);
}


/**
 * Tests getNormalizedName for the case where an alias for the parent table has
 * been specified.
 */
function testGetNormalizedName() {
  var schema = hr.db.getSchema();
  var jobNoAlias = schema.getJob();
  assertEquals('Job.title', jobNoAlias.title.getNormalizedName());

  var alias = 'OtherJob';
  var jobAlias = jobNoAlias.as(alias);
  assertEquals(alias + '.title', jobAlias.title.getNormalizedName());
}
