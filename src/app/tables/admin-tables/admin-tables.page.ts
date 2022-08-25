/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Table } from '../table';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-admin-tables',
  templateUrl: './admin-tables.page.html',
  styleUrls: ['./admin-tables.page.scss'],
})
export class AdminTablesPage implements OnInit {
  tables: Table[];
  newTable: Table = {
    _id: '',
    name: '',
    capacity: 0,
    status: '',
  };
  showAddTable = false;
  edittingTable = false;

  constructor(
    private tableService: TablesService,
    private loadinCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadTables();
  }

  async loadTables() {
    const loading = await this.loadinCtrl.create({
      message: 'Loading Tables...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.tableService.getTables().subscribe((tables) => {
      this.tables = tables;
      loading.dismiss();
    });
  }

  editTable(table: Table) {
    this.showAddTable = true;
    this.edittingTable = true;
    this.newTable = { ...table };
  }

  async addTable() {
    const loading = await this.loadinCtrl.create({
      message: this.edittingTable ? 'Editing table...' : 'Adding Tables...',
      spinner: 'bubbles',
    });
    await loading.present();

    if (this.edittingTable) {
      this.tableService.updateTable(this.newTable).subscribe((table) => {
        loading.dismiss();
        this.showAddTable = false;
        this.edittingTable = false;
        this.tables = this.tables.map((t) => {
          if (t._id === this.newTable._id) {
            return this.newTable;
          }
          return t;
        });
        this.newTable = {
          _id: '',
          name: '',
          capacity: 0,
          status: '',
        };
      });
    } else {
      this.tableService.addTable(this.newTable).subscribe((table) => {
        this.tables.push(table);
        this.newTable = {
          _id: '',
          name: '',
          capacity: 0,
          status: '',
        };
        loading.dismiss();
      });
    }
  }

  async deleteTable(table: Table) {
    const loading = await this.loadinCtrl.create({
      message: 'Deleting Table...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.tableService.deleteTable(table).subscribe(() => {
      this.tables = this.tables.filter((t) => t._id !== table._id);
      loading.dismiss();
    });
  }

  onClickFab() {
    this.showAddTable = !this.showAddTable;
    if (!this.showAddTable) {
      this.edittingTable = false;
      this.newTable = {
        _id: '',
        name: '',
        capacity: 0,
        status: '',
      };
    }
  }

  doRefresh(event) {
    this.tableService.getTables().subscribe((tables) => {
      this.tables = tables;
      event.target.complete();
    });
  }
}
