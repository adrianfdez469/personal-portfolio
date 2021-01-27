import { atom } from 'recoil';
import EN from '../../internationalization/en.json';

const idiomAtom = atom({
  key: '',
  default: EN,
});

export default idiomAtom;
