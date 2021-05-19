import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from './product'
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    // if component specific
    // providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy {
    private TITLE: string = 'Product List'
    pageTitle: string = this.TITLE;
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    productSubscription!: Subscription;
    private _listFilter: string = '';

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    constructor(private productService: ProductService) {

    }
    ngOnInit(): void {
        console.log('in onInit')
        this.productSubscription = this.productService.getProducts()
            .subscribe({
                next: products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                error: err => this.errorMessage = err
            });
        this.filteredProducts = this.products;
    }

    ngOnDestroy() {
        this.productSubscription.unsubscribe();
    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    performFilter(filterBy: string): IProduct[] {
        const filter = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLowerCase().includes(filter)
        );
    }

    onRatingClicked(message: string): void {
        this.pageTitle = `${this.TITLE} - Rating ${message}`
    }
}