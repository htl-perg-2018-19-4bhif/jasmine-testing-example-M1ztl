import { Component } from '@angular/core';
import { InvoiceLine, InvoiceCalculatorService, Invoice } from './invoice-calculator.service';
import { VatCategory } from './vat-categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  invoiceLines: InvoiceLine[] = [];
  invoice: Invoice;

  product = '';
  priceInclusiveVat = 0;
  vatCategoryString = 'Food';

  vatCategories = VatCategory;

  results = [];
  totalPriceInclusiveVat: string;
  totalPriceExclusiveVat: string;

  constructor(private invoiceCalculator: InvoiceCalculatorService) { }

  addInvoice() {
    let cate;
    if (this.vatCategoryString == "Food") {
      cate = this.vatCategories.Food;
    } else if (this.vatCategoryString == "Drinks") {
      cate = this.vatCategories.Drinks
    } else {
      cate = null;
    }

    this.invoiceLines.push({ vatCategory: cate, priceInclusiveVat: this.priceInclusiveVat, product: this.product });
    this.invoice = this.invoiceCalculator.CalculateInvoice(this.invoiceLines);

    this.invoice.invoiceLines.forEach(val => {
      let exclVat = parseFloat(Math.round(val.priceExclusiveVat * 100) / 100 + '').toFixed(2);
      let inclVat = parseFloat(Math.round(val.priceInclusiveVat * 100) / 100 + '').toFixed(2);
      this.results.push({ vatCategory: val.vatCategory, priceInclusiveVat: inclVat, priceExclusiveVat: exclVat, product: val.product });
    });

    this.totalPriceExclusiveVat = parseFloat(Math.round(this.invoice.totalPriceExclusiveVat * 100) / 100 + '').toFixed(2);
    this.totalPriceInclusiveVat = parseFloat(Math.round(this.invoice.totalPriceInclusiveVat * 100) / 100 + '').toFixed(2);
  }
}
