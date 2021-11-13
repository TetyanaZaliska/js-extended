'use strict';

import { sayHi, sayBye, goOffline } from "./scexport";

import * as says from "./scexport";

import { sayAll as say} from "./exports";


sayHi('Alex');

says.goOffline();
says.sayBye();
says.sayHi('Coco');

say();
// sayAll();
