import React,{useState, useEffect} from 'react';

import {useRecoilValue, useSetRecoilState} from 'recoil'
import {atomLocale, atomButtonLanguage} from '../../store/atoms'

import { Profile } from '../../views';

const createPropsObject = async (locale)=>{
  const language = {
                locale: locale === 'es' ? 'es' : 'en',
                lang: locale === 'es' ? await(await import('../../i18n/locales/es/common.json')).default :await(await import('../../i18n/locales/en/common.json')).default
              }
  return { language }
}; 

export const getStaticProps = async (context) => {
  const { locale } = context;
  const obj = await createPropsObject(locale);

  return {
    props:obj
  }
}; 

const Edit = (props) => {  
  const setButtonLanguage = useSetRecoilState(atomButtonLanguage);  
  const locale = useRecoilValue(atomLocale);
  const [language, setLanguage] = useState(props);
  
  useEffect( async ()=>{          
    const obj = await createPropsObject(locale);          
    setLanguage(obj);   
    setButtonLanguage(obj.language.lang.button) 
  },[locale]);

  return (
        <Profile locale={props} edit={true}/>
  );

}
   


export default Edit;
