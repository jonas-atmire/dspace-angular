import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BrowseService } from '../browse/browse.service';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { CoreState } from '../core.reducers';

import { DataService } from './data.service';
import { RequestService } from './request.service';
import { HALEndpointService } from '../shared/hal-endpoint.service';
import { FindAllOptions, GetRequest, RestRequest } from './request.models';
import { ObjectCacheService } from '../cache/object-cache.service';
import { MetadataSchema } from '../metadata/metadataschema.model';
import { NormalizedMetadataSchema } from '../metadata/normalized-metadata-schema.model';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { HttpClient } from '@angular/common/http';
import { ChangeAnalyzer } from './change-analyzer';
import { NormalizedObjectBuildService } from '../cache/builders/normalized-object-build.service';

@Injectable()
export class MetadataSchemaDataService extends DataService<NormalizedMetadataSchema, MetadataSchema> {
  protected linkPath = 'metadataschemas';

  constructor(
    protected requestService: RequestService,
    protected rdbService: RemoteDataBuildService,
    protected store: Store<CoreState>,
    private bs: BrowseService,
    protected halService: HALEndpointService,
    protected objectCache: ObjectCacheService,
    protected dataBuildService: NormalizedObjectBuildService,
    protected notificationsService: NotificationsService,
    protected http: HttpClient,
    protected comparator: ChangeAnalyzer<NormalizedMetadataSchema>) {
    super();
  }

  /**
   * Get the endpoint for browsing metadataschemas
   * @param {FindAllOptions} options
   * @returns {Observable<string>}
   */
  public getBrowseEndpoint(options: FindAllOptions = {}, linkPath: string = this.linkPath): Observable<string> {

    return null;
  }

}
