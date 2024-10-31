import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';
import { ICategory } from '../../common/interfaces/categories';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
} from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb';
import NoImage from '../../images/product/no-image.jpg';
import { Link } from 'react-router-dom';

const Category = () => {
  const [t, i18n] = useTranslation('global');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<number[]>([]);

  // Lấy danh sách categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get<{
          success: boolean;
          data: ICategory[];
        }>('/category');
        if (response.data.success) {
          setCategories(response.data.data);
          setFilteredCategories(response.data.data); // Thiết lập dữ liệu ban đầu cho bộ lọc
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Cập nhật danh sách category khi có thay đổi từ tìm kiếm
  useEffect(() => {
    const results = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCategories(results);
  }, [searchTerm, categories]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = filteredCategories.map((category) => category.id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.checked) {
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((categoryId) => categoryId !== id));
    }
  };

  return (
    <>
      <Breadcrumb pageName="Category" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center gap-4 p-3 mb-5">
          <input
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder="Search Category ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to={'/category/add'}
            type="submit"
            className="flex justify-center rounded bg-primary py-3 px-6 font-medium text-gray text-sm whitespace-nowrap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                d="M16 25V7m-9 9h18"
              />
            </svg>
            Add Category
          </Link>
        </div>

        <div className="p-3">
          <TableContainer component={Paper} className="">
            <Table>
              <TableHead>
                <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={filteredCategories.length > 0 && selected.length === filteredCategories.length}
                    onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-black dark:text-white">Image</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-black dark:text-white">Name</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-black dark:text-white">
                      Parent Category
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-black dark:text-white">Slug</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-black dark:text-white">
                      Description
                    </p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.indexOf(category.id) !== -1}
                      onChange={(event) => handleSelectOne(event, category.id)}
                    />
                  </TableCell>
                    <TableCell>
                      <div className="h-15.5 w-20 rounded-md overflow-hidden">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt="category"
                            className="w-full h-full"
                            loading="lazy"
                          />
                        ) : (
                          <img
                            src={NoImage}
                            alt="no image"
                            className="w-full h-full"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      {category.parentId
                        ? categories.find(
                            (item) => item.id === category.parentId,
                          )?.name || 'No Parent'
                        : ''}
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>{category.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Category;
