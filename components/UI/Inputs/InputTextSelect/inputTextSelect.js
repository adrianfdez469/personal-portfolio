// libs
import React, { useRef, useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { escapeRegExp } from '../../../../libs/StringParser';

// TODO: Cuando se aprieta la tecla de flecha hacia abajo enfocar el menu para poder navegar por el, y volver hacia el input
// TODO: Poner el espacio del menu flotante del mismo ancho del field y ver si se le puede dar un poco mas de estilo
// TODO: Declarar un limite de items a mostrar en el menu, despues de eso hacer scroll

const InputTextSelect = (props) => {
  // constants
  const { onAdd, optionsList, excludedOptions } = props;
  // hooks
  const [inputData, setInputData] = useState(null);
  const [open, setOpen] = useState(false);
  const textFieldRef = useRef(null);
  const anchorRef = useRef(null);

  // handlers
  const changeInputHandler = (event) => {
    if (event.target.value === '') {
      setInputData(null);
    } else {
      if (!open) {
        setOpen(true);
      }
      setInputData({ id: null, text: event.target.value });
    }
  };
  const selectMenuItemHandler = (lang) => {
    setInputData(lang);
    textFieldRef.current.focus();
    setOpen(false);
  };

  const addHandler = () => {
    if (inputData) {
      // Search for a item that already exist on the full posibles items array
      const index = optionsList.findIndex(
        (optList) => optList.text.toLowerCase().trim() === inputData.text.toLowerCase().trim()
      );
      if (index > -1) {
        onAdd(optionsList[index]);
      } else {
        onAdd(inputData);
      }
    }
    setInputData(null);
    setOpen(false);
  };
  const onPressKeyHandler = (event) => {
    if (event.key === 'Enter') {
      addHandler();
    }
  };

  // helpers
  const menuItems = optionsList
    .filter(
      (optList) =>
        excludedOptions.findIndex(
          (selectedPL) => optList.text.toLowerCase().trim() === selectedPL.text.toLowerCase().trim()
        ) === -1
    )
    .filter((optList) => {
      if (!inputData) return false;
      const find = inputData.text.toLowerCase().trim();
      return !optList.text.toLowerCase().trim().search(escapeRegExp(find));
    })
    .map((optList, index) => {
      if (index === 0) {
        return (
          <MenuItem key={optList.id} onClick={() => selectMenuItemHandler(optList)}>
            {optList.text}
          </MenuItem>
        );
      }
      return (
        <MenuItem key={optList.id} onClick={() => selectMenuItemHandler(optList)}>
          {optList.text}
        </MenuItem>
      );
    });

  return (
    <div>
      <TextField
        value={inputData && inputData.text ? inputData.text : ''}
        onChange={changeInputHandler}
        ref={anchorRef}
        inputRef={textFieldRef}
        onBlur={() => setOpen(false)}
        onKeyUp={(event) => {
          onPressKeyHandler(event);
        }}
        InputProps={
          inputData !== '' && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={addHandler}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }
        }
        {...props}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 999 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper style={{ width: menuItems.length > 0 ? anchorRef.current.offsetWidth : 0 }}>
              <ClickAwayListener onClickAway={() => {}}>
                <MenuList id="menu-list-grow">{menuItems}</MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

InputTextSelect.propTypes = {
  textFieldProps: PropTypes.objectOf(PropTypes.any),
  optionsList: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, text: PropTypes.string.isRequired })
  ).isRequired,
  excludedOptions: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, text: PropTypes.string.isRequired })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
};

InputTextSelect.defaultProps = {
  textFieldProps: {},
};

export default InputTextSelect;
