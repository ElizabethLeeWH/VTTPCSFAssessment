
// TODO Task 2

import { Injectable } from "@angular/core";
import { Cart, LineItem } from "./models";
import { ComponentStore } from "@ngrx/component-store";

// Use the following class to implement your store
const INIT_STORE: Cart = {
    lineItems: []
}

@Injectable()
export class CartStore extends ComponentStore<Cart>{
    constructor(){ super(INIT_STORE)}

    readonly getCart = this.select<LineItem[]>(
        (slice: Cart) => slice.lineItems
    )

    readonly getCartObj = this.select<Cart>(
        (state) => state
    )

    readonly getNumOfProducts = this.select<number>(
        (slice: Cart) => {
            const prodIdArray: string[] = slice.lineItems.map(i => i.prodId);
            const uniqueId = new Set(prodIdArray)
            return uniqueId.size
        }
    )

    readonly addProduct = this.updater<LineItem>(
        (slice: Cart, product: LineItem) => {
            return {
                lineItems: [...slice.lineItems, product]
            }
        }
    )

    readonly clearCart = this.updater(
        (state) => {
        return { ...state, lineItems: [] };
        }
    )
}
