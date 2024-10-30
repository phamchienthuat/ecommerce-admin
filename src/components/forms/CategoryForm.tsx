import React from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, TextareaAutosize } from '@mui/material';
import { ErrorMessage, Field, Formik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import * as Yup from 'yup';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utils/axiosInstance';



const lstCategory = async () => {
  const { data } = await axiosInstance.get('/api/data1');
  return data;
};

const CategoryForm = () => {
  const [t, i18n] = useTranslation('global');

  const top100Films: any = [];
  const initialValues = {
    name: '',
    parentId: '',
    description: '',
    image: '',
    slug: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const onSubmit = (values: any, props: any) => {
    console.log(values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                {t('title')} <span className="text-meta-1">*</span>
              </label>
              <Field
                as={TextField}
                name="name"
                size="small"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 mt-1 text-sm"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                {t('parent_category')}
              </label>
              <Autocomplete
                disablePortal
                size="small"
                options={top100Films}
                onChange={(event, newValue) => {
                  props.setFieldValue('parentId', newValue);
                }}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField name='categoryId' {...params} />}
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                {t('choose_image')}
              </label>
              <input
                type="file"
                name='image'
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                {t('description')}
              </label>
              <Field
                as={TextareaAutosize}
                minRows={4}
                name="description"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <button
              onClick={() => props.validateForm()}
              type="submit"
              className="flex justify-center rounded bg-primary py-3 px-6 font-medium text-gray"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CategoryForm;
