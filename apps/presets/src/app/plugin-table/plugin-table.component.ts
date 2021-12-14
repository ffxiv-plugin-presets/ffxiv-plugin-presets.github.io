import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataService, FFXIVPlugin, FFXIVPluginPreset } from "../data.service";
import { BehaviorSubject, takeWhile } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'presets-plugin-table',
  templateUrl: './plugin-table.component.html',
  styleUrls: ['./plugin-table.component.scss']
})
export class PluginTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    // 'author',
    // 'description',
    // 'originalMessage',
    'code',
    // 'preset',
    'screenshots',
  ];
  selectedPlugin = new BehaviorSubject<FFXIVPlugin | null>(null);
  presetsDataSource = new MatTableDataSource<FFXIVPluginPreset>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FFXIVPluginPreset>;

  @Output() imageSelect = new EventEmitter<string>();
  filterString = '';
  faDiscord = faDiscord;

  constructor(public data: DataService, public snackBar: MatSnackBar) {
  }

  selectPlugin(plugin: FFXIVPlugin): void {
    this.selectedPlugin.next(plugin);
    this.presetsDataSource.data = plugin.presets;
  }


  ngAfterViewInit() {
    this.presetsDataSource.paginator = this.paginator;
    this.presetsDataSource.sort = this.sort;

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    const subscription1 = this.data.plugins$
      .pipe(takeWhile(() => this.selectedPlugin.value === null))
      .subscribe(x => {
        if(x.plugins.length > 0) {
          this.selectPlugin(x.plugins[0]);
          subscription1.unsubscribe();
        }
      });
  }

  applyFilter(): void {
    // if(!this.presetsDataSource) return;
    this.presetsDataSource.filterPredicate = (data, filter) => (data.name + data.author + data.description).toLowerCase().indexOf(filter) >= 0;
    this.presetsDataSource.filter = this.filterString.trim().toLowerCase();
    if (this.presetsDataSource.paginator) {
      this.presetsDataSource.paginator.firstPage();
    }
  }

  setFilterFromValue(val: string): void {
    this.filterString = val;
    this.applyFilter();
  }

  setFilterFromEvent(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.setFilterFromValue(filterValue);
  }

  async copyToClipboard(text: string): Promise<void> {
    await navigator.clipboard.writeText(text);
  }
}
