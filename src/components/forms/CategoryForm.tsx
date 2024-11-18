import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel, TextareaAutosize } from '@mui/material';
import { ErrorMessage, Field, Formik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import * as Yup from 'yup';
import { axiosInstance } from '../../utils/axiosInstance';
import { ICategory, ICategoryInput } from '../../common/interfaces/categories';

const CategoryForm = () => {
  const [t, i18n] = useTranslation('global');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // lay danh sach categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get<{ success: boolean; data: ICategory[] }>('/category');
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const initialValues = {
    name: '',
    parentId: '',
    description: '',
    image: '',
    slug: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    slug: Yup.string().required('Slug is required'),
  });

  const onSubmit = async (values: any, props: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('parentId', values.parentId);
    formData.append('description', values.description);
    formData.append('slug', values.slug);
    if (file) {
      formData.append('image', file);
    }
    console.log(formData)
    try {
      const response = await axiosInstance.post<{ success: boolean; data: ICategoryInput[] }>('/category',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
      if (response.data.success) {
        alert('success')
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
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
                {t('slug')} <span className="text-meta-1">*</span>
              </label>
              <Field
                as={TextField}
                name="slug"
                size="small"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              <ErrorMessage
                name="slug"
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
                options={categories} 
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  props.setFieldValue('parentId', newValue ? newValue.id : null);
                }}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                {t('choose_image')}
              </label>
              <input
                type="file"
                name='image'
                onChange={handleFile}
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
