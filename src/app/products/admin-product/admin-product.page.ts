/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Category } from 'src/app/categories/category';
import { CategoryService } from 'src/app/categories/category.service';
import { Provider } from 'src/app/providers/provider';
import { ProviderService } from 'src/app/providers/provider.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.page.html',
  styleUrls: ['./admin-product.page.scss'],
})
export class AdminProductPage implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  providers: Provider[] = [];
  newProduct: Product = {
    _id: '',
    name: '',
    price: 0,
    cost: 0,
    category: undefined,
    provider: undefined,
    description: '',
    image: '',
  };
  showAddProduct = false;
  edittingProduct = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private providerService: ProviderService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts(event?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Products...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      loading.dismiss();
      this.loadCategories(event);
    });
  }

  editProduct(product: Product) {
    this.showAddProduct = true;
    this.edittingProduct = true;
    this.newProduct = { ...product };
  }

  async addProduct() {
    const loading = await this.loadingCtrl.create({
      message: this.edittingProduct
        ? 'Editing product...'
        : 'Adding Product...',
      spinner: 'bubbles',
    });
    await loading.present();

    if (this.edittingProduct) {
      this.productService
        .updateProduct(this.newProduct)
        .subscribe((product) => {
          loading.dismiss();
          this.showAddProduct = false;
          this.edittingProduct = false;
          this.products = this.products.map((p) =>
            p._id === this.newProduct._id ? this.newProduct : p
          );
          this.newProduct = {
            _id: '',
            name: '',
            price: 0,
            cost: 0,
            category: undefined,
            provider: undefined,
            description: '',
            image: '',
          };
        });
    } else {
      this.productService.addProduct(this.newProduct).subscribe((product) => {
        this.products = [product, ...this.products];
        this.newProduct = {
          _id: '',
          name: '',
          price: 0,
          cost: 0,
          category: undefined,
          provider: undefined,
          description: '',
          image: '',
        };
        loading.dismiss();
        this.showAddProduct = false;
      });
    }
  }

  async deleteProduct(product: Product) {
    const loading = await this.loadingCtrl.create({
      message: 'Deleting Product...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.productService.deleteProduct(product).subscribe(() => {
      this.products = this.products.filter((p) => p._id !== product._id);
      loading.dismiss();
    });
  }

  onClickFab() {
    this.showAddProduct = !this.showAddProduct;
    if (!this.showAddProduct) {
      this.edittingProduct = false;
      this.newProduct = {
        _id: '',
        name: '',
        price: 0,
        cost: 0,
        category: undefined,
        provider: undefined,
        description: '',
        image: '',
      };
    }
  }

  private async loadCategories(event?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Categories...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      loading.dismiss();
      this.loadProviders(event);
    });
  }

  private async loadProviders(event?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Providers...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.providerService.getProviders().subscribe((providers) => {
      this.providers = providers;
      loading.dismiss();
      if (event) {
        event.target.complete();
      }
    });
  }
}
