import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  /**
   Truncate Pipe with optional params:

  * limit - string max length
  * completeWords - Flag to truncate at the nearest complete word, instead of character
  * ellipsis - appended trailing suffix

   */
  transform(value: string, limit = 25, showEllipses = true, completeWords = false) {

    let ellipsis = showEllipses? "..." : "";
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }

}
