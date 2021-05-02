import React from 'react';
import { useSnackbar } from 'notistack';
import CustomSnackbar from '../components/UI/CustomSnackbar/CustomSnackbar';

const useMessage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const showMessage = (message, type, time, yes, no) => {
    enqueueSnackbar(message, {
      autoHideDuration: time || (yes || no ? null : 3000),
      variant: type,
      content: (key) => <CustomSnackbar message={message} type={type} id={key} yes={yes} no={no} />,
    });
  };

  return [showMessage];
};

export default useMessage;
