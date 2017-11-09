import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ItemSearchResultListElementComponent } from '../object-list/search-result-list-element/item-search-result/item-search-result-list-element.component';
import { CollectionSearchResultListElementComponent } from '../object-list/search-result-list-element/collection-search-result/collection-search-result-list-element.component';
import { CommunitySearchResultListElementComponent } from '../object-list/search-result-list-element/community-search-result/community-search-result-list-element.component';
import { SearchService } from './search-service/search.service';
import { SearchSidebarComponent } from './search-sidebar/search-sidebar.component';
import { SearchSidebarService } from './search-sidebar/search-sidebar.service';
import { SearchSidebarEffects } from './search-sidebar/search-sidebar.effects';
import { SearchSettingsComponent } from './search-settings/search-settings.component';
import { EffectsModule } from '@ngrx/effects';

const effects = [
  SearchSidebarEffects
];

@NgModule({
  imports: [
    SearchPageRoutingModule,
    CommonModule,
    SharedModule,
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    SearchPageComponent,
    SearchResultsComponent,
    SearchSidebarComponent,
    SearchSettingsComponent,
    ItemSearchResultListElementComponent,
    CollectionSearchResultListElementComponent,
    CommunitySearchResultListElementComponent
  ],
  providers: [
    SearchService,
    SearchSidebarService
  ],
  entryComponents: [
    ItemSearchResultListElementComponent,
    CollectionSearchResultListElementComponent,
    CommunitySearchResultListElementComponent
  ]
})
export class SearchPageModule { }
