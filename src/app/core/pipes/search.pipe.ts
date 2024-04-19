import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], term:string): Product[] {
    return value.filter((ele)=>ele.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
  }

}
