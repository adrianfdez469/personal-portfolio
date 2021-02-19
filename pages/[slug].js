import React,{useState, useEffect} from 'react';

import {useRecoilValue, useSetRecoilState} from 'recoil'
import {atomLocale, atomButtonLanguage} from '../store/atoms'

import { Profile } from '../views';

const createPropsObject = async (locale)=>{
  const language = {
                locale: locale === 'es' ? 'es' : 'en',
                lang: locale === 'es' ? await(await import('../i18n/locales/es/common.json')).default :await(await import('../i18n/locales/en/common.json')).default
              }
  return { language }
}; 



const Slug = (props) => {  
  
  return (
        <Profile locale={props} edit={false}/>
  );

}
   


export default Slug;
