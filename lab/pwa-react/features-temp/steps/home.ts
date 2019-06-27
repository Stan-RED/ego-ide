
// tslint:disable-next-line:ordered-imports
import { Given, When, Then } from "cucumber";

import { shouldSeeText, visitHomepage } from '../support/actions';

Given('I am on the home page', visitHomepage);

Then('I should see {string}', shouldSeeText);
