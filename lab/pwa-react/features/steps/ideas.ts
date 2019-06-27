import {
  add,
  currentUserIs,
  focusIs,
  focusWas,
  givenUser,
  select,
  userHadAspect,
  widgetList
} from "../support/actions";

import { Given, Then, When } from "cucumber";

Given(/Focus was (\w+)/, focusWas);
Given(/User (\w+)/, givenUser);
Given(/Current user is (\w+)/, currentUserIs);
Given(/(\w+) had (\w+) (\w+)/g, userHadAspect);
When(/Add (\w+) (\w+)/g, add);
When(/Select (\w+)/, select);
Then(/Focus is (\w+)/, focusIs);
Then(/Widget (\w+) list/, widgetList);
