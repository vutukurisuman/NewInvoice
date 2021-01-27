import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  
  transform(items: any[], searchText: string, max: number): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
        var some = [];
        some.push(it.clientname,
            it.email,
            it.attnto,
            it.title,
            it.invoice,
            it.payment,
            // it.assetName,                
            );
        return some.toString().toLowerCase().includes(searchText);
    });
}

}
