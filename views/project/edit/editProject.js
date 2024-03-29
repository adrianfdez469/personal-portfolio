// libs
import React, { useReducer, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import StepForm from '../../../components/UI/StepForm';
import { useLang } from '../../../store/contexts/langContext';
import SyncForm from './steps/synchronization';
import SkillCategories from '../../../constants/skillsCategorysConst';
import useUserPage from '../../../hooks/useUserPage';
import useMessage from '../../../hooks/useMessage';
import { isStringEmpty } from '../../../libs/helpers';

const BasicInfoForm = dynamic(() => import('./steps/basicInfo'));
const GalleryForm = dynamic(() => import('./steps/gallery'));
const SkillsForm = dynamic(() => import('./steps/skills'));
const CollaboratorsForm = dynamic(() => import('./steps/collaborators'));
const CustomBackdrop = dynamic(() => import('../../../components/UI/backdrop'));

const saveQueryData = `
  mutation saveProject( $projectId: ID, $project: ProjectParams! ) {
    saveProject( 
        projectId: $projectId, 
        project: $project
    ) {
      code
      success
      message
      project {
        id
        slug
        projectSlug
      }
    }
  }
`;

const initialState = {
  data: {
    basicInfoData: {
      name: '',
      initialDate: null,
      endDate: null,
      description: '',
      otherText: '',
      proyectLink: {
        url: '',
        title: '',
        description: '',
        imageUrl: '',
      },
      devLink: {
        url: '',
        title: '',
        description: '',
        imageUrl: '',
      },
    },
    skillsData: {
      languages: [],
      technologies: [],
    },
    collaborators: [],
    images: [],
    provider: null,
  },
  saving: false,
  error: false,
};

const actions = {
  SET_REPOSITORY_DATA: 'SET_REPOSITORY_DATA',
  START_SAVING: 'START_SAVING',
  END_SAVING: 'END_SAVING',
  ERROR_SAVING: 'ERROR_SAVING',

  CHANGE_BASIC_DATA: 'CHANGE_BASIC_DATA',
  CHANGE_SKILLS_DATA: 'CHANGE_SKILLS_DATA',
  CHANGE_COLLABORATORS_DATA: 'CHANGE_COLLABORATORS_DATA',
  CHANGE_IMAGES_DATA: 'CHANGE_IMAGES_DATA',
};
const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_REPOSITORY_DATA:
      return {
        ...state,
        data: action.data,
      };
    case actions.START_SAVING:
      return {
        ...state,
        saving: true,
      };
    case actions.ERROR_SAVING:
      return {
        ...state,
        error: true,
        saving: false,
      };
    case actions.END_SAVING:
      return {
        ...state,
        saving: false,
        error: false,
        ...(actions.data && { data: actions.data }),
      };
    case actions.CHANGE_BASIC_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          basicInfoData: {
            ...state.data.basicInfoData,
            ...action.data,
          },
        },
      };
    case actions.CHANGE_SKILLS_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          skillsData: {
            ...state.data.skillsData,
            ...action.data,
          },
        },
      };
    case actions.CHANGE_COLLABORATORS_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          collaborators: action.data,
        },
      };
    case actions.CHANGE_IMAGES_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          images: action.data,
        },
      };
    default:
      return state;
  }
};

const EditProjectView = (props) => {
  const { handleClose, projectId, data } = props;
  // Hooks
  const { lang } = useLang();
  const { fetchUri } = useUserPage();
  const [state, dispatch] = useReducer(
    reducer,
    data ? { ...initialState, data: data } : initialState
  );
  const [showMessage] = useMessage();
  const syncRef = useRef();

  const setRepoSyncData = useCallback(
    (data) => {
      if (!data) {
        dispatch({ type: actions.SET_REPOSITORY_DATA, data: initialState.data });
        return;
      }
      const basicInfoData = {
        ...initialState.data.basicInfoData,
        name:
          (data.name && data.name.replaceAll(/[_-]/g, ' '))
            .split(' ')
            .map((text) => `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`)
            .join(' ') || '',
        initialDate: data.createdAt ? new Date(data.createdAt).getTime() : null,
        description: data.description || '',
        devLink: {
          ...initialState.data.basicInfoData.devLink,
          url: data.url || '',
        },
        proyectLink: {
          ...initialState.data.basicInfoData.proyectLink,
          url: data.deploymentUrl || '',
        },
      };
      const skillsData = {
        ...initialState.data.skillsData,
        languages: data.languages.length > 0 ? data.languages.map((lg) => ({ text: lg })) : [],
        technologies: data.topics.length > 0 ? data.topics.map((tech) => ({ text: tech })) : [],
      };
      const collaborators = data.collaborators.length === 0 ? null : data.collaborators;

      const fullData = {
        ...initialState.data,
        basicInfoData: { ...basicInfoData },
        skillsData: { ...skillsData },
        collaborators,
        provider: data.provider,
      };
      dispatch({ type: actions.SET_REPOSITORY_DATA, data: fullData });
    },
    [dispatch]
  );

  const handleChangeBasicInfoData = useCallback(
    (data) => {
      dispatch({ type: actions.CHANGE_BASIC_DATA, data });
    },
    [dispatch]
  );
  const handleChangeSkillsData = useCallback(
    (data) => {
      dispatch({ type: actions.CHANGE_SKILLS_DATA, data });
    },
    [dispatch]
  );
  const handleChangeCollaboratorsData = useCallback(
    (data) => {
      dispatch({ type: actions.CHANGE_COLLABORATORS_DATA, data });
    },
    [dispatch]
  );
  const handleChangeImagesData = useCallback(
    (data) => {
      dispatch({ type: actions.CHANGE_IMAGES_DATA, data });
    },
    [dispatch]
  );

  const isBasicInfoFormValid = () => {
    if (
      isStringEmpty(state.data.basicInfoData.name) ||
      isStringEmpty(state.data.basicInfoData.description) ||
      isStringEmpty(state.data.basicInfoData.initialDate)
    ) {
      return false;
    }
    return true;
  };

  const Steps = [
    {
      cmp: <SyncForm ref={syncRef} selectRepo={setRepoSyncData} />,
      label: lang.step.syncyLabel,
    },
    {
      cmp: <BasicInfoForm data={state.data.basicInfoData} changeData={handleChangeBasicInfoData} />,
      label: lang.step.infoLabel,
      isValid: isBasicInfoFormValid,
    },
    {
      cmp: <SkillsForm data={state.data.skillsData} changeData={handleChangeSkillsData} />,
      label: lang.step.sillsLabel,
    },
    {
      cmp: (
        <CollaboratorsForm
          collaborators={state.data.collaborators}
          changeData={handleChangeCollaboratorsData}
        />
      ),
      label: lang.step.collaboratorsLabel,
    },
    {
      cmp: <GalleryForm images={state.data.images} changeData={handleChangeImagesData} />,
      label: lang.step.galeryLabel,
    },
  ];

  const handleSave = () => {
    dispatch({ type: actions.START_SAVING });
    const proglangs = state.data.skillsData.languages.map((lang) => ({
      id: lang.id || null,
      name: lang.text,
      category: SkillCategories.PROG_LANG,
    }));
    const techs = state.data.skillsData.technologies.map((lang) => ({
      id: lang.id || null,
      name: lang.text,
      category: SkillCategories.PROG_TECH,
    }));
    const skills = [...proglangs, ...techs];
    const images = state.data.images.map((img) => img.url);
    const basicData = state.data.basicInfoData;
    const logoUrl = basicData.proyectLink.imageUrl || basicData.devLink.imageUrl || null;
    const collaborators = state.data.collaborators.map((coll) => ({
      ...(coll.login && { login: coll.login }),
      ...(coll.avatarUrl && { avatarUrl: coll.avatarUrl }),
      ...(coll.email && { email: coll.email }),
      ...(coll.bio && { bio: coll.bio }),
      ...(coll.name && { name: coll.name }),
      ...(coll.url && { url: coll.url }),
      isOwner: coll.isOwner ? true : false,
    }));

    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: saveQueryData,
        variables: {
          projectId,
          project: {
            name: basicData.name,
            description: basicData.description,
            initialDate: basicData.initialDate ? basicData.initialDate.toString() : null,
            finalDate: basicData.endDate ? basicData.endDate.toString() : null,
            otherInfo: basicData.otherText,
            skills,
            projectLink: basicData.proyectLink.url,
            projectDevLink: basicData.devLink.url,
            images,
            collaborators: collaborators,
            logoUrl,
          },
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error saving data');
      })
      .then((resp) => {
        if (resp.data.saveProject.success) {
          showMessage(lang.msg.projectSaved, 'success');

          if (data) {
            dispatch({ type: actions.END_SAVING });
          } else {
            dispatch({ type: actions.END_SAVING, data: initialState.data });
            syncRef.current.clearRepo();
          }

          fetchUri(resp.data.saveProject.slug);
          fetchUri(
            `${resp.data.saveProject.project.slug}/${resp.data.saveProject.project.projectSlug}`
          );
          return;
        }
        if (resp.data.saveProject.code === '409') {
          showMessage(lang.errors.duplicateProject, 'error');
        }
        throw new Error(resp.data.saveProject.message);
      })
      .catch((err) => {
        dispatch({ type: actions.ERROR_SAVING });
        showMessage(lang.errors.saveGeneralError, 'error');
      });
  };

  return (
    <>
      <StepForm
        Steps={Steps}
        lang={lang}
        handleClose={handleClose}
        onSave={handleSave}
        title={data ? lang.editTitle : lang.title}
      />
      <CustomBackdrop open={state.saving} />
    </>
  );
};

EditProjectView.propTypes = {
  handleClose: PropTypes.func.isRequired,
  projectId: PropTypes.number,
};
EditProjectView.defaultProps = {
  projectId: null,
};

export default EditProjectView;
