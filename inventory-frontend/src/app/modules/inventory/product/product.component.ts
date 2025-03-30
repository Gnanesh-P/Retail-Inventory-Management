import { Component, OnInit } from '@angular/core';
import { Product } from 'projects/inventory-core/src/lib/inventory-models';
import { CoreGridColumn, DATA_TYPE } from 'projects/inventory-core/src/lib/models';
import { CoreLazyGridInstance } from 'src/app/core/components/lazy-grid/lazy-grid';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    this.grid.setData({
      total: 100, data: [
        { productName: "Product 1", productCode: "P001", description: "Description 1", sku: 'SKU001', createdDate: new Date(), barcode: "", brand: 1, brandName: "Sku S", category: 1, categoryName: "Category S", quantity: 1, price: 100, createdBy: "User 1", productImage: "https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=" },
        { productName: "Product 2", productCode: "P001", description: "Description 1", sku: 'SKU001', createdDate: new Date(), barcode: "", brand: 1, brandName: "Sku S", category: 1, categoryName: "Category S", quantity: 1, price: 100, createdBy: "User 1", productImage: "https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=" },
        { productName: "Product 3", productCode: "P001", description: "Description 1", sku: 'SKU001', createdDate: new Date(), barcode: "", brand: 1, brandName: "Sku S", category: 1, categoryName: "Category S", quantity: 1, price: 100, createdBy: "User 1", productImage: "https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=" },
        { productName: "Product 4", productCode: "P001", description: "Description 1", sku: 'SKU001', createdDate: new Date(), barcode: "", brand: 1, brandName: "Sku S", category: 1, categoryName: "Category S", quantity: 1, price: 100, createdBy: "User 1", productImage: "https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=" },
        { productName: "Product 5", productCode: "P001", description: "Description 1", sku: 'SKU001', createdDate: new Date(), barcode: "", brand: 1, brandName: "Sku S", category: 1, categoryName: "Category S", quantity: 1, price: 100, createdBy: "User 1", productImage: "https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=" },
        { productName: "Product 6", productCode: "P001", description: "Description 1", sku: 'SKU001', createdDate: new Date(), barcode: "", brand: 1, brandName: "Sku S", category: 1, categoryName: "Category S", quantity: 1, price: 100, createdBy: "User 1", productImage: "https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=" },
        { productName: "Product 7", productCode: "P001", description: "Description 1", sku: 'SKU001', createdDate: new Date(), barcode: "", brand: 1, brandName: "Sku S", category: 1, categoryName: "Category S", quantity: 1, price: 100, createdBy: "User 1", productImage: "https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=" },
        { productName: "Product 8", productCode: "P001", description: "Description 1", sku: 'SKU001', createdDate: new Date(), barcode: "", brand: 1, brandName: "Sku S", category: 1, categoryName: "Category S", quantity: 1, price: 100, createdBy: "User 1", productImage: "https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=" },
        { productName: "Product 9", productCode: "P001", description: "Description 1", sku: 'SKU001', createdDate: new Date(), barcode: "", brand: 1, brandName: "Sku S", category: 1, categoryName: "Category S", quantity: 1, price: 100, createdBy: "User 1", productImage: "https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=" },
        { productName: "Product 10", productCode: "P001", description: "Description 1", sku: 'SKU001', createdDate: new Date(), barcode: "", brand: 1, brandName: "Sku S", category: 1, categoryName: "Category S", quantity: 1, price: 100, createdBy: "User 1", productImage: "https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=" },
      ]
    })
  }

  grid = new CoreLazyGridInstance<Product>({
    title: "Products",
    checkBox: true,
    columns: [
      new CoreGridColumn({ name: "productCode", displayName: "Code", dataType: DATA_TYPE.STRING, width: 80 }),
      new CoreGridColumn({ name: "productImage", displayName: "Image", dataType: DATA_TYPE.STRING, width: 80, isImage: true }),
      new CoreGridColumn({ name: "productName", displayName: "Product Name", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "sku", displayName: "SKU", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "createdDate", displayName: "Created Date", dataType: DATA_TYPE.DATETIME }),
      new CoreGridColumn({ name: "categoryName", displayName: "Category", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "categoryName", displayName: "Category", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "categoryName", displayName: "Category", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "categoryName", displayName: "Category", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "categoryName", displayName: "Category", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "categoryName", displayName: "Category", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "categoryName", displayName: "Category", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "createdAt", displayName: "Created At", dataType: DATA_TYPE.DATETIME }),
      new CoreGridColumn({ name: "createdBy", displayName: "Created By", dataType: DATA_TYPE.STRING }),
    ],
    topIconAction: [
      { icon: "add_circle", toolTip: "Add New City", callBack: this.openInsUpdPopup.bind(this) },
      { icon: "delete_forever", toolTip: "Delete City Records", callBack: this.onDelete.bind(this) as any }
    ],
    rowIconAction: [
      { icon: "edit", name: "Edit", callBack: this.onEdit.bind(this) },
      { icon: "delete_forever", name: "Delete", callBack: this.onDelete.bind(this) },
    ]
  })

  openInsUpdPopup() { }
  onDelete() { }
  onEdit() { }
}
