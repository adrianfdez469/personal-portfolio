import React from 'react';
import { useSnackbar } from 'notistack';
import CustomSnackbar from '../components/UI/CustomSnackbar/CustomSnackbar';

const useMessage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const showMessage = (message, type) => {
    enqueueSnackbar(message, {
      autoHideDuration: null,
      variant: type,
      content: (key) => <CustomSnackbar message={message} type={type} id={key} />,
    });
  };
  return [showMessage];
};

export default useMessage;
