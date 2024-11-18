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
  Checkbox,
  Drawer,
  Modal,
  Fade,
  Box,
  Backdrop,
} from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb';
import NoImage from '../../images/product/no-image.jpg';
import SearchIcon from '../../images/icon/icon-search.svg';
import { Link } from 'react-router-dom';
import { formatYMD } from '../../utils/convertDate';

const Category = () => {
  const [t, i18n] = useTranslation('global');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (id: any) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      deleteCategory(selectedId);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await axiosInstance.delete(`/category?ids=${id}`);
      alert('Deleted successfully');
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };


  // Lấy danh sách categories
  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleSelectOne = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (event.target.checked) {
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((categoryId) => categoryId !== id));
    }
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <Breadcrumb pageName="Category" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center gap-4 p-3">
          <div className="relative w-full">
            <input
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 pl-12 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              placeholder="Search Category ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="w-6 h-6 absolute left-3 top-1/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="undefined"
                height="undefined"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M8.195 0c4.527 0 8.196 3.62 8.196 8.084a7.989 7.989 0 0 1-1.977 5.267l5.388 5.473a.686.686 0 0 1-.015.98a.71.71 0 0 1-.993-.014l-5.383-5.47a8.23 8.23 0 0 1-5.216 1.849C3.67 16.169 0 12.549 0 8.084C0 3.62 3.67 0 8.195 0Zm0 1.386c-3.75 0-6.79 2.999-6.79 6.698c0 3.7 3.04 6.699 6.79 6.699s6.791-3 6.791-6.699c0-3.7-3.04-6.698-6.79-6.698Z"
                />
              </svg>
            </span>
          </div>
          <Link
            to={'/category/add'}
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
                strokeWidth="2"
                d="M16 25V7m-9 9h18"
              />
            </svg>
            Add Category
          </Link>
        </div>
        <div className="flex justify-end items-center gap-4 p-3 mb-5">
          <button className="inline-flex items-center justify-center rounded-lg border border-stroke py-2 px-10 text-center font-medium hover:text-white hover:bg-primary lg:px-8 xl:px-5 gap-3 transition-all" onClick={toggleDrawer(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M21.25 12H8.895m-4.361 0H2.75m18.5 6.607h-5.748m-4.361 0H2.75m18.5-13.214h-3.105m-4.361 0H2.75m13.214 2.18a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm-9.25 6.607a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm6.607 6.608a2.18 2.18 0 1 0 0-4.361a2.18 2.18 0 0 0 0 4.36Z"
              />
            </svg>
            Filter
          </button>
        </div>
        <div className="p-3">
          <TableContainer className="shadow-1 rounded-lg">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        filteredCategories.length > 0 &&
                        selected.length === filteredCategories.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-[#353535] text-base">
                      Image
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-[#353535] text-base">
                      Name
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-[#353535] text-base">
                      Parent Category
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-[#353535] text-base">
                      Date
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-[#353535] text-base">
                      Slug
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-[#353535] text-base">
                      Description
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-[#353535] text-base">
                      Action
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
                        onChange={(event) =>
                          handleSelectOne(event, category.id)
                        }
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
                    <TableCell>
                      <span>{category.name}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-500">
                        {category.parentId
                          ? categories.find(
                              (item) => item.id === category.parentId,
                            )?.name || 'No Parent'
                          : ''}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-500">
                        {formatYMD(category.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-500">{category.slug}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-500">
                        {category.description}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <button className="text-slate-500 hover:text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157l3.712 3.712l1.157-1.157a2.625 2.625 0 0 0 0-3.712Zm-2.218 5.93l-3.712-3.712l-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
                            />
                          </svg>
                        </button>
                        <button className="text-slate-500 hover:text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 20 20"
                          >
                            <g fill="currentColor">
                              <path d="M10 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10ZM14 10a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z"
                                clipRule="evenodd"
                              />
                            </g>
                          </svg>
                        </button>
                        <button className="text-slate-500 hover:text-primary" onClick={() => handleOpenModal(category.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="none"
                              d="M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8Z"
                            />
                            <path
                              fill="currentColor"
                              d="M432 96h-96V72a40 40 0 0 0-40-40h-80a40 40 0 0 0-40 40v24H80a16 16 0 0 0 0 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 0 0 0-32ZM192.57 416H192a16 16 0 0 1-16-15.43l-8-224a16 16 0 1 1 32-1.14l8 224A16 16 0 0 1 192.57 416ZM272 400a16 16 0 0 1-32 0V176a16 16 0 0 1 32 0Zm32-304h-96V72a7.91 7.91 0 0 1 8-8h80a7.91 7.91 0 0 1 8 8Zm32 304.57A16 16 0 0 1 320 416h-.58A16 16 0 0 1 304 399.43l8-224a16 16 0 1 1 32 1.14Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {/* Filter */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{ width: 450, padding: '20px' }}
        >
          <div>
          <button onClick={toggleDrawer(false)} className='text-gray'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="none" stroke="#666" strokeLinecap="round" stroke-linejoin="round" strokeWidth="4"><path d="M8 8L40 40"/><path d="M8 40L40 8"/></g></svg></button>
          </div>
        </div>
      </Drawer>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box >
            <div className="top-1/2 left-1/2 absolute -translate-x-2/4 -translate-y-2/4">
              <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-7 px-7 w-125">
                  <div className='w-full flex justify-end'>
                    <button onClick={handleClose} className='text-gray'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="none" stroke="#666" strokeLinecap="round" stroke-linejoin="round" strokeWidth="4"><path d="M8 8L40 40"/><path d="M8 40L40 8"/></g></svg></button>
                  </div>
                  <h3 className="font-medium text-lg text-center text-black dark:text-white mt-6 mb-10">
                    Do you want to delete the item?
                  </h3>
                  <div className="flex justify-center flex-row-reverse gap-4.5">
                    <button onClick={handleClose}
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleConfirmDelete}
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      type="submit"
                    >
                      Confirm
                    </button>
                  </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Category;
