export interface ICategory {
    id: number;
    parentId: number | null;
    name: string;
    description: string;
    image: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
  }


  export interface ICategoryInput {
    id: number;
    parentId: number | null;
    name: string;
    description: string;
    image: object;
    slug: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
  }