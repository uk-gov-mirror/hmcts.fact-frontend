import { Then, When } from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import { expect } from 'chai';

When('I select {string} category from the list of categories', async (option: string) => {
  const element = option;
  await I.click(element);
});

Then('I select an {string} of either send documents, get an application update or not listed', async (option: string) => {
  let element;
  switch(option) {
    case 'document court': {
      element = '#document-court';
      break;
    }
    case 'update court': {
      element = '#update-court';
      break;
    }
    default: {
      element = '#not-listed';
      break;
    }
  }
  await I.click(element);
});

Then('I can select that entry via the hyperlink', async () => {
  const element = await I.getElement('#search-result > h2 > a');
  const elementExist = await I.checkElementIsAnchor(element);
  expect(elementExist).equal(true);
});

Then('I can view the selected court or tribunal details', async function() {
  await I.click('#search-result > h2 > a');
  const addressElement = await I.checkElement('#not-in-person');
  expect(addressElement).equal(true);
});
