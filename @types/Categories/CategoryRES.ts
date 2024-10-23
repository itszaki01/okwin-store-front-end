export interface ICategoryRES {
    _id: string;
    name: string;
    categoryIdx: number;
    iconUrl: string;
    store: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    subCategories: {
        _id: string;
        subCategoryName: string;
        subCategoryIdx: number;
        iconUrl: string;
        category: string;
        store: string;
        id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}
