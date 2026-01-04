/**
 * InventoryPage - Page Object Model for SauceDemo Inventory/Products Page
 * Contains all selectors and getter methods for the inventory page elements
 */
class InventoryPage {
  constructor() {
    this.elements = {
      pageTitle: '[data-test="title"]',
      inventoryContainer: '[data-test="inventory-container"]',
      inventoryItem: '[data-test="inventory-item"]',
      inventoryItemPrice: '[data-test="inventory-item-price"]',
      productSortContainer: '[data-test="product-sort-container"]',
    };
  }

  getPageTitle() {
    return this.elements.pageTitle;
  }

  getInventoryContainer() {
    return this.elements.inventoryContainer;
  }

  getInventoryItem() {
    return this.elements.inventoryItem;
  }

  getInventoryItemPrice() {
    return this.elements.inventoryItemPrice;
  }

  getProductSortContainer() {
    return this.elements.productSortContainer;
  }
}

export default InventoryPage;
