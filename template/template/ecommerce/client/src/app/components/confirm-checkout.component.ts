import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CartStore } from '../cart.store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Order } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit, OnDestroy{

  // TODO Task 3

  private cartStore= inject(CartStore)
  private fb = inject(FormBuilder)
  private productSvc = inject(ProductService)
  private destroy$ = new Subject<void>();
  private router = inject(Router)
  
  checkoutForm!: FormGroup 
  cart$!: Observable<any>
  total$!: Observable<number>
  orderSubmitted: boolean = false

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })
    this.cart$ = this.cartStore.getCart
    this.cart$.subscribe(
      items => {
        const totalPrice = items.reduce((acc: number, p: { price: number; quantity: number; }) => acc + (p.price * p.quantity), 0)
        this.total$ = totalPrice
        console.log(`>>>Total Price of items in cart: ${totalPrice}`)
        console.log(">>>checkout page, this is your cart: ", items)
      }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(){    
    this.cartStore.getCartObj.pipe(takeUntil(this.destroy$)).subscribe(
      cart => {
        const mappedLineItems = cart.lineItems.map((item: any) => ({
          ...item, productId: item.prodId
        }));
  
        const order: Order = {
          name: this.checkoutForm.value['name'],
          address: this.checkoutForm.value['address'],
          priority: this.checkoutForm.value['priority'],
          comments: this.checkoutForm.value['comments'],
          cart: { ...cart, lineItems: mappedLineItems }
        };
  
        this.productSvc.checkout(order).subscribe({
          next: resp => {
            console.log(">>> Order submitted:", order)
            alert("Order submitted, your order ID: " + (resp as any).orderId)
            this.checkoutForm.reset()
            this.cartStore.clearCart()
            this.router.navigate(['/'])
            this.orderSubmitted = true
          },
          error: err => {
            console.log(">>> Could not submit order: ", err)
            alert("Could not submit order")
          }
        });
      }
    );
  }


}
