import { Logger } from '../interfaces/Logger';
import { AxiosInstance } from 'axios';
import { SearchResult } from '../interfaces/SearchResultsData';
import { CourtDetailsResult } from '../interfaces/CourtDetailsData';
import { CourtWithDistance } from '../interfaces/PostcodeResultsData';
import { ServiceResult } from '../interfaces/ServicesData';
import { ServiceAreaResult } from '../interfaces/ServiceAreasData';
import { PostcodeSearchResultsData } from '../interfaces/PostcodeResultsData';

export class FactApi {

  constructor(
    private readonly axios: AxiosInstance,
    private readonly logger: Logger
  ) { }

  public search(query: string, lng: string): Promise<SearchResult[]> {
    return this.axios
      .get(`/courts?q=${query}`, {  headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

  public court(slug: string, lng: string): Promise<CourtDetailsResult> {
    return this.axios
      .get(`/courts/${slug}`,{  headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {};
      });
  }

  public services(lng: string): Promise<ServiceResult[]> {
    return this.axios
      .get('/services', {  headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

  public getService(slug: string, lng: string): Promise<ServiceResult> {
    return this.axios
      .get(`/services/${slug}`, {  headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {};
      });
  }

  public serviceAreas(service: string, lng: string): Promise<ServiceAreaResult[]> {
    return this.axios
      .get(`/services/${service}/service-areas`, {  headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

  public getServiceArea(serviceArea: string, lng: string): Promise<ServiceAreaResult> {
    return this.axios
      .get(`/service-areas/${serviceArea}`, {  headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return [];
      });
  }

  public postcodeServiceAreaSearch(postcode: string, serviceAreaSlug: string, lng: string): Promise<PostcodeSearchResultsData> {
    return this.axios
      .get(`search/results?postcode=${postcode}&serviceArea=${serviceAreaSlug}`, {  headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          courts: []
        };
      });
  }

  public postcodeAreaSearch(postcode: string, lng: string): Promise<Array<CourtWithDistance>> {
    return this.axios
      .get(`search/results/${postcode}`, {  headers: {'Accept-Language': lng}})
      .then(results => results.data)
      .catch(err => {
        this.logger.error(err);
        return {
          courts: []
        };
      });
  }

}
