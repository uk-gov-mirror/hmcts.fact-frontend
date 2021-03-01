import { FactRequest } from '../interfaces/FactRequest';
import { NextFunction, Response } from 'express';
import { FactApi } from '../utils/FactApi';
import { decideCatchmentArea } from '../utils/CourtDetailsUtils';
import { isEmpty, isObjectEmpty } from '../utils/validation';
import autobind from 'autobind-decorator';
import { Enquiries } from '../interfaces/Enquiries';
import { CourtDetailsData, CourtDetailsResult } from '../interfaces/CourtDetailsData';
import config from 'config';
import { cloneDeep } from 'lodash';
import { generatePlaceMetadata } from '../utils/SEOMetadata';

@autobind
export class CourtDetailsController {

  //TODO this comes into place when the user comes from a no name court search
  private regionalCentre = false;

  constructor(
      private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response, next: NextFunction) {
    const slug: string = req.params.slug as string;
    if (!isEmpty(slug)) {

      const data: CourtDetailsData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['court-details']),
        path: '/courts/' + slug,
        results: {}
      };
      const courtDetails: CourtDetailsResult = await this.api.court(slug, req.lng);
      data.title = data.title.replace('{courtName}', courtDetails.name);

      if (!isObjectEmpty(courtDetails)) {
        if(!courtDetails.open){
          const data = {
            title: '',
            ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['closed-court']),
            name: courtDetails.name
          };
          data.title = data.title.replace('{courtName}', courtDetails.name);
          return res.render('court-details/closed-court',  data);
        }
        const enquiries: Enquiries = {
          phone: [],
          welshPhone: [],
          emails: [],
          fax: {},
          sendDocumentsEmail: {}
        };
        enquiries.phone = courtDetails.contacts.filter((contact: { description: string }) => contact.description.toLowerCase() === 'enquiries');
        enquiries.welshPhone = courtDetails.contacts.filter((contact: { description: string }) => contact.description.toLowerCase() === 'welsh');
        enquiries.emails = courtDetails.emails.filter((email: { description: string }) => email.description.toLowerCase() === 'enquiries');
        enquiries.fax = courtDetails.contacts.find((contact: { description: string }) => contact.description.toLowerCase() === 'fax');
        enquiries.sendDocumentsEmail =  courtDetails.emails.find((email: { description: string }) => email.description.toLowerCase() === 'send documents');
        if (courtDetails['image_file']) {
          courtDetails['image_file'] = `${config.get('services.image-store.url')}/${courtDetails['image_file']}`;
        }
        data.notInPersonP1 = data.notInPersonP1
          .replace('{catchmentArea}', decideCatchmentArea(this.regionalCentre, data.catchmentArea))
          .replace('{serviceArea}', courtDetails['service_area']);
        const seoMetadata = generatePlaceMetadata(courtDetails);
        data.results = { ...courtDetails, enquiries };
        data.seoMetadata = seoMetadata;
        data.seoMetadataDescription = (data.seoMetadataDescription as string).replace('{courtName}', courtDetails.name);
        if (courtDetails['in_person']) {
          return res.render('court-details/in-person-court', data);
        } else {
          return res.render('court-details/not-in-person-court', data);
        }
      }
    }
    next();
  }
}
