import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from './search-service/search.service';
import { ActivatedRoute } from '@angular/router';
import { RemoteData } from '../core/data/remote-data';
import { SearchResult } from './search-result.model';
import { DSpaceObject } from '../core/shared/dspace-object.model';
import { SortOptions } from '../core/cache/models/sort-options.model';
import { PaginationComponentOptions } from '../shared/pagination/pagination-component-options.model';
import { SearchOptions } from './search-options.model';
import { CommunityDataService } from '../core/data/community-data.service';
import { isNotEmpty } from '../shared/empty.util';
import { Community } from '../core/shared/community.model';
import { Observable } from 'rxjs/Observable';
import { slideInOut } from '../shared/animations/slide';
import { HostWindowService } from '../shared/host-window.service';
import { SearchSidebarService } from './search-sidebar/search-sidebar.service';

/**
 * This component renders a simple item page.
 * The route parameter 'id' is used to request the item it represents.
 * All fields of the item that should be displayed, are defined in its template.
 */

@Component({
  selector: 'ds-search-page',
  styleUrls: ['./search-page.component.scss'],
  templateUrl: './search-page.component.html',
  animations: [slideInOut]
})
export class SearchPageComponent implements OnInit, OnDestroy {

  private sub;
  private scope: string;

  query: string;
  scopeObject: RemoteData<DSpaceObject>;
  results: RemoteData<Array<SearchResult<DSpaceObject>>>;
  currentParams = {};
  searchOptions: SearchOptions;
  scopeList: RemoteData<Community[]>;
  isMobileView: Observable<boolean>;

  constructor(private service: SearchService,
              private route: ActivatedRoute,
              private communityService: CommunityDataService,
              private sidebarService: SearchSidebarService,
              private windowService: HostWindowService) {
    this.isMobileView = this.windowService.isXs();
    this.scopeList = communityService.findAll();
    // Initial pagination config
    this.searchOptions = this.service.searchOptions;
  }

  ngOnInit(): void {
    this.sub = this.route
      .queryParams
      .subscribe((params) => {
          // Save current parameters
          this.currentParams = params;
          this.query = params.query || '';
          this.scope = params.scope;
          const page = +params.page || this.searchOptions.pagination.currentPage;
          const pageSize = +params.pageSize || this.searchOptions.pagination.pageSize;
          const sortDirection = +params.sortDirection || this.searchOptions.sort.direction;
          const pagination = Object.assign({},
            this.searchOptions.pagination,
            { currentPage: page, pageSize: pageSize }
          );
          const sort = Object.assign({},
            this.searchOptions.sort,
            { direction: sortDirection, field: params.sortField }
          );
          this.updateSearchResults({
            pagination: pagination,
            sort: sort
          });
          if (isNotEmpty(this.scope)) {
            this.scopeObject = this.communityService.findById(this.scope);
          } else {
            this.scopeObject = undefined;
          }
        }
      );
  }

  private updateSearchResults(searchOptions) {
    // Resolve search results
    this.results = this.service.search(this.query, this.scope, searchOptions);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public closeSidebar(): void {
    this.sidebarService.collapse()
  }

  public openSidebar(): void {
    this.sidebarService.expand();
  }

  public isSidebarCollapsed(): Observable<boolean> {
    return this.sidebarService.isCollapsed;
  }
}
