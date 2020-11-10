import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { cloneDeep } from 'lodash';
import { PostcodeSearchData } from '../../interfaces/PostcodeSearchData';

export class ServicePostcodeSearchController {

  public get(req: FactRequest, res: Response): void {
    const error = req.query.error as string;
    const hasError: boolean = error === 'blankPostcode' || error === 'invalidPostcode';
    const data: PostcodeSearchData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-search']),
      path: '/search-by-postcode',
      actionUrl: `/services/${req.params.service}/${req.params.serviceArea}/courts/near`,
      error: hasError,
      aol: req.query.aol,
      serviceAreaType: req.query.serviceAreaType
    };
    if (hasError) {
      data.errorType = error;
    }
    data.hint = data.hint.replace('{serviceArea}', req.params.serviceArea);
    res.render('postcode-search', data);
  }
}
