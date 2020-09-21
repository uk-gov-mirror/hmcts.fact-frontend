import { Request, Response } from 'express';
import { FactRequest } from '../utils/interfaces/express';
import { PageData, SearchResultsData } from '../utils/interfaces/pageData';

export const getSearchOption = (req: FactRequest, res: Response): void => {
  res.render('search/option', req.i18n.getDataByLanguage(req.lng).search.option);
};

export const postSearchOption = (req: Request, res: Response): void => {
  const { knowLocation } = req.body;
  if (knowLocation === 'yes') {
    return res.redirect('/location-search');
  }
  // TODO story if the user doesnt know the name
  return res.redirect('/');
};

export const getLocationSearch = (req: FactRequest, res: Response): void => {
  const data: PageData = {
    ...req.i18n.getDataByLanguage(req.lng).search.location,
    path: '/location-search',
  };
  res.render('search/location', data);
};

export const postLocationSearch = (req: Request, res: Response): void => {
  const { search } = req.body;
  console.log(search);
  return res.redirect('/search-for-location');
};

export const getSearchResults = (req: FactRequest, res: Response): void => {
  const data: SearchResultsData = {
    ...req.i18n.getDataByLanguage(req.lng).search.results,
    path: '/search-for-location',
    search: 'london',
    results: [],
  };
  if (data.results.length > 0) {
    data.foundResults = data.foundResults.replace('{total}', data.results.length.toString());
    data.foundResults = data.foundResults.replace('{search}', data.search);
  }
  res.render('search/location', data);
};
