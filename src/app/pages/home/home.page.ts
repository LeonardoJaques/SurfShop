import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  private products = new Array<Product>();
  private productsSubscription: Subscription;

  constructor(
    private productsService: ProductService,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.productsSubscription = this.productsService
      .getProducts()
      .subscribe(data => {
        this.products = data;
      });
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    }
  }
  async deleteProduct(id: string) {
    try {
      await this.productsService.deleteProduct(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
