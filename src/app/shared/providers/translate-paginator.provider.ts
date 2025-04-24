import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable()
export class TranslatePaginatorIntl extends MatPaginatorIntl {
  private _translateService: TranslateService;

  constructor(translateService: TranslateService) {
    super();
    this._translateService = translateService;
    this.translateLabels();

    // Subscribe to language changes
    this._translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });
  }

  translateLabels(): void {
    this.itemsPerPageLabel = this._translateService.instant('ACTIVITIES.PAGINATOR.ITEMS_PER_PAGE');
    this.nextPageLabel = this._translateService.instant('ACTIVITIES.PAGINATOR.NEXT_PAGE');
    this.previousPageLabel = this._translateService.instant('ACTIVITIES.PAGINATOR.PREVIOUS_PAGE');
    this.firstPageLabel = this._translateService.instant('ACTIVITIES.PAGINATOR.FIRST_PAGE');
    this.lastPageLabel = this._translateService.instant('ACTIVITIES.PAGINATOR.LAST_PAGE');
    this.changes.next();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0) {
      return '0 ' + this._translateService.instant('ACTIVITIES.PAGINATOR.OF') + ' 0';
    }

    const amountPages = Math.ceil(length / pageSize);

    return ((page * pageSize) + 1) + ' - ' +
      (page + 1 < amountPages ?
        ((page + 1) * pageSize) :
        length) + ' ' +
      this._translateService.instant('ACTIVITIES.PAGINATOR.OF') + ' ' + length;
  }
}
