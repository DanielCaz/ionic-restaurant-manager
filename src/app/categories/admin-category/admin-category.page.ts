/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.page.html',
  styleUrls: ['./admin-category.page.scss'],
})
export class AdminCategoryPage implements OnInit {
  categories: Category[] = [];
  newCategory: Category = {
    _id: '',
    name: '',
  };
  showAddCategory = false;
  edittingCategory = false;

  constructor(
    private categoryService: CategoryService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Categories...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      loading.dismiss();
    });
  }

  editCategory(category: Category) {
    this.showAddCategory = true;
    this.edittingCategory = true;
    this.newCategory = { ...category };
  }

  async addCategory() {
    const loading = await this.loadingCtrl.create({
      message: this.edittingCategory
        ? 'Editing category...'
        : 'Adding Category...',
      spinner: 'bubbles',
    });
    await loading.present();

    if (this.edittingCategory) {
      this.categoryService
        .updateCategory(this.newCategory)
        .subscribe((category) => {
          loading.dismiss();
          this.showAddCategory = false;
          this.edittingCategory = false;
          this.categories = this.categories.map((t) => {
            if (t._id === this.newCategory._id) {
              return this.newCategory;
            }
            return t;
          });
          this.newCategory = {
            _id: '',
            name: '',
          };
        });
    } else {
      this.categoryService
        .addCategory(this.newCategory)
        .subscribe((category) => {
          this.categories.push(category);
          this.newCategory = {
            _id: '',
            name: '',
          };
          loading.dismiss();
        });
    }
  }

  async deleteCategory(category: Category) {
    const loading = await this.loadingCtrl.create({
      message: 'Deleting Category...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.categoryService.deleteCategory(category).subscribe(() => {
      this.categories = this.categories.filter((c) => c._id !== category._id);
      loading.dismiss();
    });
  }

  onClickFab() {
    this.showAddCategory = !this.showAddCategory;
    if (!this.showAddCategory) {
      this.edittingCategory = false;
      this.newCategory = {
        _id: '',
        name: '',
      };
    }
  }

  doRefresh(event) {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      event.target.complete();
    });
  }
}
