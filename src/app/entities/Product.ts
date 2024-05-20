import { Category } from "./Category"
import { Review } from "./Review"

export interface Product {
  productID: number
  urlImage: string
  name: string
  description: string
  price: number
  quantityInStock: number
  category: Category
  orderItems: any[]
  reviews: Review[]
}
