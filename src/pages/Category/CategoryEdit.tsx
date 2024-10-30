import { useTranslation } from 'react-i18next';
import Breadcrumb from '../../components/Breadcrumb';
import CategoryForm from '../../components/forms/CategoryForm';

const CategoryEdit = () => {
    const [t, i18n] = useTranslation('global');

  return (
    <>
      <Breadcrumb pageName="Add Category" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          <div className="flex flex-col gap-9">
            <div className="bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white capitalize">
                  {t('category.add_category')}
                </h3>
              </div>
              <CategoryForm></CategoryForm>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryEdit;