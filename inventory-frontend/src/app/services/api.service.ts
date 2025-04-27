// gallery.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand, Category, Product, Warehouse } from 'projects/inventory-core/src/lib/inventory-models';
import { ApiData } from 'projects/inventory-core/src/lib/models';
import { environment } from 'src/environments/environment';

const API_ENDPOINT_URL = environment.apiEndPointUrl;
const ROUTES = {
    inventory: {
        product: {
            getAllProduct: (queryStrings: string) => `${API_ENDPOINT_URL}/inventory/api/products${queryStrings}`,
            getSingleProduct: (id: number) => `${API_ENDPOINT_URL}/inventory/api/products/${id}`,
            createProduct: () => `${API_ENDPOINT_URL}/inventory/api/products`,
            updateProduct: () => `${API_ENDPOINT_URL}/inventory/api/products`,
            deleteProduct: (id: number) => `${API_ENDPOINT_URL}/inventory/api/products/${id}`
        },
        brand: {
            getAllBrand: (queryStrings: string) => `${API_ENDPOINT_URL}/api/brands${queryStrings}`,
            getSingleBrand: (id: number) => `${API_ENDPOINT_URL}/api/brands/${id}`,
            createBrand: () => `${API_ENDPOINT_URL}/api/brands`,
            updateBrand: () => `${API_ENDPOINT_URL}/api/brands`,
            deleteBrand: (id: number) => `${API_ENDPOINT_URL}/api/brands/${id}`
        },
        category: {
            getAllCategory: (queryStrings: string) => `${API_ENDPOINT_URL}/api/categories${queryStrings}`,
            getSingleCategory: (id: number) => `${API_ENDPOINT_URL}/api/categories/${id}`,
            createCategory: () => `${API_ENDPOINT_URL}/api/categories`,
            updateCategory: () => `${API_ENDPOINT_URL}/api/categories`,
            deleteCategory: (id: number) => `${API_ENDPOINT_URL}/api/categories/${id}`
        },
        warehouse: {
            getAllWarehouse: (queryStrings: string) => `${API_ENDPOINT_URL}/api/categories${queryStrings}`,
            getSingleWarehouse: (id: number) => `${API_ENDPOINT_URL}/api/categories/${id}`,
            createWarehouse: () => `${API_ENDPOINT_URL}/api/categories`,
            updateWarehouse: () => `${API_ENDPOINT_URL}/api/categories`,
            deleteWarehouse: (id: number) => `${API_ENDPOINT_URL}/api/categories/${id}`
        }
    }
}

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) { }

    // Inventory - product
    getAllProduct = (queryString: string = "") => this.http.get<ApiData<Product[]>>(ROUTES.inventory.product.getAllProduct(queryString))
    getSingleProduct = (id: number) => this.http.get<ApiData<Product>>(ROUTES.inventory.product.getSingleProduct(id))
    createProduct = (body: Product) => this.http.post<ApiData<Product>>(ROUTES.inventory.product.createProduct(), body)
    updateProduct = (body: Product) => this.http.put<ApiData<Product>>(ROUTES.inventory.product.updateProduct(), body)
    deleteProduct = (id: number) => this.http.delete<ApiData<number>>(ROUTES.inventory.product.deleteProduct(id))

    // Inventory - brand
    getAllBrand = (queryString: string = "") => this.http.get<ApiData<Brand[]>>(ROUTES.inventory.brand.getAllBrand(queryString))
    getSingleBrand = (id: number) => this.http.get<ApiData<Brand>>(ROUTES.inventory.brand.getSingleBrand(id))
    createBrand = (body: Brand) => this.http.post<ApiData<Brand>>(ROUTES.inventory.brand.createBrand(), body)
    updateBrand = (body: Brand) => this.http.put<ApiData<Brand>>(ROUTES.inventory.brand.updateBrand(), body)
    deleteBrand = (id: number) => this.http.delete<ApiData<number>>(ROUTES.inventory.brand.deleteBrand(id))

    // Inventory - category
    getAllCategory = (queryString: string = "") => this.http.get<ApiData<Category[]>>(ROUTES.inventory.category.getAllCategory(queryString))
    getSingleCategory = (id: number) => this.http.get<ApiData<Category>>(ROUTES.inventory.category.getSingleCategory(id))
    createCategory = (body: Category) => this.http.post<ApiData<Category>>(ROUTES.inventory.category.createCategory(), body)
    updateCategory = (body: Category) => this.http.put<ApiData<Category>>(ROUTES.inventory.category.updateCategory(), body)
    deleteCategory = (id: number) => this.http.delete<ApiData<number>>(ROUTES.inventory.category.deleteCategory(id))

    // Warehouse
    getAllWarehouse = (queryString: string = "") => this.http.get<ApiData<Warehouse[]>>(ROUTES.inventory.warehouse.getAllWarehouse(queryString))
    getSingleWarehouse = (id: number) => this.http.get<ApiData<Warehouse>>(ROUTES.inventory.warehouse.getSingleWarehouse(id))
    createWarehouse = (body: Warehouse) => this.http.post<ApiData<Warehouse>>(ROUTES.inventory.warehouse.createWarehouse(), body)
    updateWarehouse = (body: Warehouse) => this.http.put<ApiData<Warehouse>>(ROUTES.inventory.warehouse.updateWarehouse(), body)
    deleteWarehouse = (id: number) => this.http.delete<ApiData<number>>(ROUTES.inventory.warehouse.deleteWarehouse(id))
}