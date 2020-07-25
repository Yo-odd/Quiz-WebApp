import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'data_skeleton/datamodel';

@Pipe({
  name: 'userfilter'
})
export class FilterPipe implements PipeTransform {

  item:User[];
  transform(items: User[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    // return items.forEach(it => {
    //     return it.toLocaleLowerCase().includes(searchText);
    // });
    // console.log('Items in filter: ',items);
    
    return items.filter(it => {
      return it.userName.toLocaleLowerCase().match(searchText);
    });
  }

}
