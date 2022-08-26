/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Provider } from '../provider';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-admin-provider',
  templateUrl: './admin-provider.page.html',
  styleUrls: ['./admin-provider.page.scss'],
})
export class AdminProviderPage implements OnInit {
  providers: Provider[] = [];
  newProvider: Provider = {
    _id: '',
    name: '',
    rfc: '',
    phone: '',
    email: '',
  };
  showAddProvider = false;
  edittingProvider = false;

  constructor(
    private providerService: ProviderService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadProviders();
  }

  async loadProviders() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Providers...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.providerService.getProviders().subscribe((providers) => {
      this.providers = providers;
      loading.dismiss();
    });
  }

  editProvider(provider: Provider) {
    this.showAddProvider = true;
    this.edittingProvider = true;
    this.newProvider = { ...provider };
  }

  async addProvider() {
    const loading = await this.loadingCtrl.create({
      message: this.edittingProvider
        ? 'Editing provider...'
        : 'Adding Provider...',
      spinner: 'bubbles',
    });
    await loading.present();

    if (this.edittingProvider) {
      this.providerService
        .updateProvider(this.newProvider)
        .subscribe((provider) => {
          this.providers = this.providers.map((p) =>
            p._id === this.newProvider._id ? this.newProvider : p
          );
          this.showAddProvider = false;
          this.edittingProvider = false;
          this.newProvider = {
            _id: '',
            name: '',
            rfc: '',
            phone: '',
            email: '',
          };
          loading.dismiss();
        });
    } else {
      this.providerService
        .addProvider(this.newProvider)
        .subscribe((provider) => {
          this.providers = [...this.providers, provider];
          this.newProvider = {
            _id: '',
            name: '',
            rfc: '',
            phone: '',
            email: '',
          };
          loading.dismiss();
        });
    }
  }

  async deleteProvider(provider: Provider) {
    const loading = await this.loadingCtrl.create({
      message: 'Deleting Provider...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.providerService.deleteProvider(provider).subscribe(() => {
      this.providers = this.providers.filter((p) => p._id !== provider._id);
      loading.dismiss();
    });
  }

  onClickFab() {
    this.showAddProvider = !this.showAddProvider;
    if (!this.showAddProvider) {
      this.edittingProvider = false;
      this.newProvider = {
        _id: '',
        name: '',
        rfc: '',
        phone: '',
        email: '',
      };
    }
  }

  doRefresh(event) {
    this.providerService.getProviders().subscribe((providers) => {
      this.providers = providers;
      event.target.complete();
    });
  }
}
