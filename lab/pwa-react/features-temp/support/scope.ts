import * as puppeteer from "puppeteer";

export interface IContext {
    currentPage?: puppeteer.Page;
}

export interface IScope {
    context: IContext;
    host: string;
    
    driver: typeof puppeteer;
    browser?: puppeteer.Browser;
}

const obj: IScope = {
} as IScope;

export default obj;
