
import { toast } from "react-toastify";

export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};
