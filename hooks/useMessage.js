import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Clear } from '@material-ui/icons';
import CustomSnackbar from '../components/UI/CustomSnackbar/CustomSnackbar';

const useMessage = () => {
  // const [Id, setId] = useState(null);
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // let messageKey = null;
  // const showMessage = (title, message, type, duration) => {
  //   messageKey = enqueueSnackbar(message, {
  //     autoHideDuration: duration > 0 ? duration : null,
  //     persist: duration === 0,
  //     content: (key) => <CustomSnackbar title={title} message={message} type={type} id={key} />,
  //   });
  //   setId(messageKey);
  //   return messageKey;
  // };

  // const closeMessage = () => {
  //   closeSnackbar(Id);
  // };

  // return [showMessage, closeMessage];

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const showMessage = (message, type) => {
    enqueueSnackbar(message, {
      autoHideDuration: 5000,
      variant: type,
      // action: (key) => <Clear onClick={() => closeSnackbar(key)} />,
      content: (key) => <CustomSnackbar message={message} type={type} id={key} />,
    });
  };

  return [showMessage];
};

export default useMessage;
