import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import 'animate.css';

const MySwal = withReactContent(Swal);

function alertSuccess(text) {
    MySwal.fire({
        text: text,
        icon: 'success',
        confirmButtonColor: '#056',
    })
}

function alertError(title, text) {
    MySwal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonColor: '#056',
    })
}

function alertWarning(title, text) {
    MySwal.fire({
        title: title,
        text: text,
        icon: 'warning',
        confirmButtonColor: '#056',
    })
}

export {
    alertSuccess,
    alertError,
    alertWarning
};