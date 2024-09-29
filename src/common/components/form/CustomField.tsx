import React from 'react';
import { useField } from 'formik';

interface MyTextInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  id?: string;
}

interface MyCheckboxProps {
  name: string;
  children: React.ReactNode;
  id?: string;
}

interface MySelectProps {
  label: string;
  name: string;
  id?: string;
  children: React.ReactNode;
}

export const MyTextInput: React.FC<MyTextInputProps> = ({
  label,
  ...props
}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className="mb-2.5 block font-medium text-black dark:text-white"
      >
        {label}
      </label>
      <input
        className={
          `w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input  border-stroke` +
          (meta.touched && meta.error
            ? `focus:border-red-500 dark:focus:border-red-500 border-red-500`
            : `focus:border-primary dark:focus:border-primary`)
        }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div
          className={`text-red-500 text-sm block transition-all duration-300 ease-in-out transform opacity-100 translate-y-0 min-h-[20px]`}
        >
          {meta.error}
        </div>
      ) : (
        <div
          className={`text-red-500 text-sm block transition-all duration-300 ease-in-out transform opacity-0 -translate-y-2 min-h-[20px]`}
        >
          {/* Invisible placeholder to maintain space */}
        </div>
      )}
    </>
  );
};

export const MyCheckbox: React.FC<MyCheckboxProps> = ({
  children,
  ...props
}) => {
  // React treats radios and checkbox inputs differently from other input types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div
          className={`text-red-500 text-sm block transition-all duration-300 ease-in-out transform opacity-100 translate-y-0 min-h-[20px]`}
        >
          {meta.error}
        </div>
      ) : (
        <div
          className={`text-red-500 text-sm block transition-all duration-300 ease-in-out transform opacity-0 -translate-y-2 min-h-[20px]`}
        >
          {/* Invisible placeholder to maintain space */}
        </div>
      )}
    </div>
  );
};

export const MySelect: React.FC<MySelectProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div
          className={`text-red-500 text-sm block transition-all duration-300 ease-in-out transform opacity-100 translate-y-0 min-h-[20px]`}
        >
          {meta.error}
        </div>
      ) : (
        <div
          className={`text-red-500 text-sm block transition-all duration-300 ease-in-out transform opacity-0 -translate-y-2 min-h-[20px]`}
        >
          {/* Invisible placeholder to maintain space */}
        </div>
      )}
    </div>
  );
};
