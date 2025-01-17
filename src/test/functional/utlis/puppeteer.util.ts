import Axios from 'axios';
import { launchBrowser } from '../support/hooks';

const scope = require('../support/scope');

export const newPage = async () => {
  scope.page = await scope.browser.newPage();
};

export const newBrowser = async () => {
  await scope.browser.close();
  await launchBrowser();
};

export async function makeAnApiCallTo(url: string) {
  scope.response = await Axios.get(url);
}

export async function getTheJsonResponse() {
  return scope.response;
}

export const goTo = async (url: string) => {
  await scope.page.goto(url);
};

export const getPageTitle = async () => {
  return await scope.page.title();
};

export const click = async (selector: string) => {
  await scope.page.click(selector);
};

export const fillField = async (selector: string, value: string) => {
  await scope.page.type(selector, value);
};

export const checkElement = async (selector: string) => {
  try {
    await scope.page.waitForSelector(selector);
    return true;
  } catch (error) {
    console.log("The element didn't appear.");
    return false;
  }
};

export const getElement = async (selector: string) => {
  try {
    await scope.page.waitForSelector(selector);
    return await scope.page.$(selector);
  } catch (error) {
    console.log('Could not get element.');
    return null;
  }
};

export const getElementText = async (el: any) => {
  try {
    return await scope.page.evaluate((element: HTMLElement) => element.innerText, el);
  } catch (error) {
    console.log("The element didn't appear.");
    return false;
  }
};

export const checkElementIsAnchor = async (el: any) => {
  try {
    const tagName = await scope.page.evaluate((element: HTMLElement) => element.tagName, el);
    return tagName === 'A';
  } catch (error) {
    console.log("The anchor element didn't appear.");
    return false;
  }
};

export const checkElementLength = async (selector: string) => {
  try {
    await scope.page.waitForSelector(selector);
    const el = await scope.page.$$(selector);
    return el.length;
  } catch (error) {
    console.log("The element didn't appear.");
    return false;
  }
};

export const getTextFromElements = async (el: string) => {
  try {
    return await scope.page.$$eval(el, (elements: any) => elements.map((e: any) => e.innerText));
  } catch (error) {
    console.log("The element didn't appear.");
    return [];
  }
};

export const getDataLayer = async () => {
  const dataLayer = await scope.page.evaluate('dataLayer');
  if (!dataLayer) {
    throw new Error('no datalayer found');
  }
  return dataLayer;
};
