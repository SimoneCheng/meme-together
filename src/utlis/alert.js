import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import 'animate.css';

const MySwal = withReactContent(Swal);

function alertSuccess(text) {
    MySwal.fire({
        text: text,
        icon: 'success',
        confirmButtonColor: '#056',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

export { alertSuccess };