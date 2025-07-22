// utils/showSwal.js
import Swal from 'sweetalert2';

const showSwal = ({
  icon = 'success',
  title = '',
  html = '',
  confirmButtonText = 'OK',
  showConfirmButton = true,
  timer = null,
  timerProgressBar = false,
  didClose = null
} = {}) => {
  return Swal.fire({
    icon,
    title,
    html,
    confirmButtonText,
    showConfirmButton,
    timer,
    timerProgressBar,
    didClose,
  });
};

export default showSwal;
