import { ForumFilterTypes } from '../enums/forum-filter-types.enum';

export class ForumFilters {
  filterType: ForumFilterTypes;

  public constructor() {
    this.filterType = ForumFilterTypes.Subscribed;
  }
}
