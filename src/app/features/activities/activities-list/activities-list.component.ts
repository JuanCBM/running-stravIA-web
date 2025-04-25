import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SHARED_IMPORTS} from '../../../shared/shared';
import {Activity} from '../../../core/models/activity.model';
import {ActivityService} from '../../../core/services/activity.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslatePaginatorIntl} from '../../../shared/providers/translate-paginator.provider';

@Component({
  selector: 'app-activities-list',
  standalone: true,
  imports: [...SHARED_IMPORTS, TranslateModule],
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: TranslatePaginatorIntl }
  ]
})
export class ActivitiesListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Activity>([]);
  selection = new SelectionModel<Activity>(true, []);
  displayedColumns: string[] = ['select', 'name', 'startDate', 'type', 'distance', 'duration', 'elevationGain'];
  loading = true;
  error = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private activityService: ActivityService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadActivities();
  }

  loadActivities(): void {
    this.activityService.getActivities().subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
      },
      error: (error) => {
        this.error = this.translate.instant('ACTIVITIES.LOAD_ERROR');
        this.loading = false;
        console.error('Error loading activities:', error);
      }
    });
  }

  getActivityTypeClass(type: string): string {
    switch (type) {
      case 'RUN':
        return 'activity-type-run';
      case 'WALK':
        return 'activity-type-walk';
      default:
        return 'activity-type-other';
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
}
