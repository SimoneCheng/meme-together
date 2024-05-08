import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import 'animate.css';

const MySwal = withReactContent(Swal);

export function alertSuccess(text) {
  MySwal.fire({
    text: text,
    icon: 'success',
    confirmButtonColor: '#056',
  })
}

export function alertError(title, text) {
  MySwal.fire({
    title: title,
    text: text,
    icon: 'error',
    confirmButtonColor: '#056',
  })
}

export function alertWarning(title, text) {
  MySwal.fire({
    title: title,
    text: text,
    icon: 'warning',
    confirmButtonColor: '#056',
  })
}

export function alertDelete(callback) {
  MySwal.fire({
    title: '確定要刪除帳戶嗎？',
    text: "刪除後無法復原，考慮清楚惹嗎？",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '刪除帳戶',
    cancelButtonText: '不要刪除帳戶'
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
      MySwal.fire({
        title: '帳戶刪除中，請稍後',
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
        didDestroy: () => {
          Swal.hideLoading();
        }
      })
    }
  });
}
