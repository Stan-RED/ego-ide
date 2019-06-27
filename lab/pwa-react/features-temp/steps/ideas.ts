// tslint:disable-next-line:ordered-imports
import { Given, When, Then } from "cucumber";

import { focusIs, shouldSeeText, visitHomepage } from "../support/actions";

Given("^Focus is? (.*)$", focusIs);

// Then("I should see {string}", shouldSeeText);
