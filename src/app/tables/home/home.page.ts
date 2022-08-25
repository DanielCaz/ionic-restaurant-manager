import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Table } from '../table';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tables: Table[];

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

  openTable(table: Table) {
    console.log(table);
  }

  signOut() {
    window.location.href = '/login';
  }
}
