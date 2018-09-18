import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class NotifService {

  constructor() { }

  success(mtitle: any) {
    const toast = swal['mixin']({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'success',
      title: mtitle
    });
  }

  info(mtitle: any) {
    const toast = swal['mixin']({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'info',
      title: mtitle
    });
  }

  error(mtitle: any) {
    const toast = swal['mixin']({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'error',
      title: mtitle
    });
  }

  warning(mtitle: any) {
    const toast = swal['mixin']({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'warning',
      title: mtitle
    });
  }

  question(mtitle: any) {
    const toast = swal['mixin']({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'question',
      title: mtitle
    });
  }

}
