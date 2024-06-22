import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryFilterState: {
        q: '',
        cursor: "",
        perPage: "30",
        sortBy: "title",
        sortDirection: "asc",
        user_id: "",
        category_id: "",
        sub_category_id: "",
    },
    categoryFilterSingleState: {
        cursor: "",
        perPage: "30",
        sortBy: "title",
        sortDirection: "asc",
        user_id: "",
        category_id: "",
    },
    documentData: [],
    documentCategorySingle: [],
    documentPagination: [],
    documentCategoryPagination: [],
    documentConfig: {},
    empatyState: false,
    emptyStateDocumentCategory: false,
    tabFormDocuments: 0,
    upload_id: null,
    documentUpload:null,
    ownerOfUpload:{},
};

export const documentSlice = createSlice({
    name: "documents",
    initialState,
    reducers: {
        setCategoryFilterState: (state, action) => {
            state.categoryFilterState = action.payload;
        },
        setPaginationState: (state, action) => {
            state.documentPagination = action.payload;
        },
        setDocumentdata: (state, action) => {
            state.documentData = action.payload;
        },
        setDocumentConfig: (state, action) => {
            state.documentConfig = action.payload;
        },
        setEmpatyState: (state, action) => {
            state.empatyState = action.payload;
        },
        setCategoryFilterSingleState: (state, action) => {
            state.categoryFilterSingleState = action.payload;
        },
        setDocumentCategoryPagination: (state, action) => {
            state.documentCategoryPagination = action.payload;
        },
        setDocumentCategorySingle: (state, action) => {
            state.documentCategorySingle = action.payload;
        },
        setEmptyStateDocumentCategory: (state, action) => {
            state.emptyStateDocumentCategory = action.payload;
        },
        setTabFormatDocument: (state, action) => {
            state.tabFormDocuments = action.payload;
        },
        setDocumentUpload: (state, action) => {
            state.documentUpload = action.payload;
        },
        setUploadId: (state, action) => {
            state.upload_id = action.payload;
        },
        setOwnerOfUpload: (state, action) => {
            state.ownerOfUpload = action.payload;
        },
    },
});

export const {
    setCategoryFilterState,
    setDocumentConfig,
    setDocumentdata,
    setPaginationState,
    setEmpatyState,
    setCategoryFilterSingleState,
    setDocumentCategoryPagination,
    setDocumentCategorySingle,
    setEmptyStateDocumentCategory,
    setTabFormatDocument,
    setDocumentUpload,
    setUploadId,
    setOwnerOfUpload
} = documentSlice.actions;
export const documentReducer = documentSlice.reducer;
