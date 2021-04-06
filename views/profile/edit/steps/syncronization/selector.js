/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  Grid,
} from '@material-ui/core';
import { isStringEmpty as empty } from '../../../../../libs/helpers';
import { useLang } from '../../../../../store/contexts/langContext';
// eslint-disable-next-line import/no-named-as-default
import AvatarPhoto from '../../../../../components/UI/Avatar/AvatarPhoto';
import SelectableAvatarPhoto from '../../../../../components/UI/Avatar/SelectableAvatarPhoto';

const SelectCmp = ({ userData, providerData, fieldText, field, change }) => {
  if (!empty(userData) && !empty(providerData) && userData !== providerData) {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{fieldText}</FormLabel>
        <RadioGroup aria-label="position" name="position" defaultValue={userData}>
          <FormControlLabel
            value={userData}
            control={<Radio color="secondary" />}
            label={userData}
            onChange={() => {
              change(field, userData);
            }}
          />
          <FormControlLabel
            value={providerData}
            control={<Radio color="secondary" />}
            label={providerData}
            onChange={() => {
              change(field, providerData);
            }}
          />
        </RadioGroup>
      </FormControl>
    );
  }
  if (empty(userData) && !empty(providerData)) {
    change(field, providerData);
  }
  return null;
};

const SelectAvatar = ({ userAvatar, providerAvatar, fieldText, change }) => {
  // const styles = useStyles();

  const [selected, setSelected] = useState('current');

  const changeSelected = (sel) => {
    setSelected(sel);
    if (sel === 'current') {
      change('avatarUrl', userAvatar);
    } else {
      change('avatarUrl', providerAvatar);
    }
  };

  if (!empty(userAvatar) && !empty(providerAvatar) && userAvatar !== providerAvatar) {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{fieldText}</FormLabel>
        <RadioGroup row aria-label="position" name="avatar" defaultValue={userAvatar}>
          <div style={{ margin: 8 }}>
            <SelectableAvatarPhoto
              selected={selected === 'current'}
              onClick={() => changeSelected('current')}
            >
              <AvatarPhoto size="small" src={userAvatar} />
            </SelectableAvatarPhoto>
          </div>
          <div style={{ margin: 8 }}>
            <SelectableAvatarPhoto
              selected={selected === 'provider'}
              onClick={() => changeSelected('provider')}
            >
              <AvatarPhoto size="small" src={providerAvatar} />
            </SelectableAvatarPhoto>
          </div>
        </RadioGroup>
      </FormControl>
    );
  }
  return null;
};

const SelectData = ({ user, provider, change }) => {
  const { lang } = useLang();
  return (
    <Grid container justify="space-evenly" alignContent="center">
      <SelectAvatar
        userAvatar={user.image}
        providerAvatar={provider.avatarUrl}
        fieldText="Avatar"
        change={change}
      />
      <SelectCmp
        userData={user.name}
        providerData={provider.name}
        fieldText={lang.personalDataStep.form.inputName.label}
        field="name"
        change={change}
      />
      <SelectCmp
        userData={user.title}
        providerData={provider.title}
        fieldText={lang.personalDataStep.form.title.label}
        field="title"
        change={change}
      />

      <SelectCmp
        userData={user.email}
        providerData={provider.email}
        fieldText={lang.contactDataStep.form.email.label}
        field="email"
        change={change}
      />
      <SelectCmp
        userData={user.phone}
        providerData={provider.phone}
        fieldText={lang.contactDataStep.form.phone.label}
        field="phone"
        change={change}
      />
      <SelectCmp
        userData={user.githubLink}
        providerData={provider.githubUrl}
        fieldText={lang.contactDataStep.form.githubLink.label}
        field="githubUrl"
        change={change}
      />
      <SelectCmp
        userData={user.gitlabLink}
        providerData={provider.gitlabUrl}
        fieldText={lang.contactDataStep.form.gitlabLink.label}
        field="gitlabUrl"
        change={change}
      />
      <SelectCmp
        userData={user.linkedinLink}
        providerData={provider.linkedinUrl}
        fieldText={lang.contactDataStep.form.linkedinLink.label}
        field="linkedinUrl"
        change={change}
      />
      <SelectCmp
        userData={user.twitterLink}
        providerData={provider.twitterUrl}
        fieldText={lang.contactDataStep.form.twitterLink.label}
        field="twitterUrl"
        change={change}
      />
      <SelectCmp
        userData={user.description}
        providerData={provider.about}
        fieldText={lang.personalDataStep.form.description.label}
        field="about"
        change={change}
      />
    </Grid>
  );
};

export default SelectData;
