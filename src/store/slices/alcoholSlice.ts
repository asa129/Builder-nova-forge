import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export interface AlcoholProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  alcoholContent: string;
  category: string;
  allergens: string[];
  isAllergenFree: boolean;
  description: string;
  price?: number;
  availability?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AlcoholState {
  products: AlcoholProduct[];
  filteredProducts: AlcoholProduct[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  totalCount: number;
}

const initialState: AlcoholState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  searchQuery: "",
  totalCount: 0,
};

// Async thunks
export const fetchAlcoholProducts = createAsyncThunk(
  "alcohol/fetchProducts",
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "alcoholProducts"));
      const products: AlcoholProduct[] = [];

      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
        } as AlcoholProduct);
      });

      return products;
    } catch (error) {
      throw new Error("Failed to fetch alcohol products");
    }
  },
);

export const searchAlcoholProducts = createAsyncThunk(
  "alcohol/searchProducts",
  async (searchTerm: string) => {
    try {
      const q = query(
        collection(db, "alcoholProducts"),
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff"),
      );

      const querySnapshot = await getDocs(q);
      const products: AlcoholProduct[] = [];

      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
        } as AlcoholProduct);
      });

      return products;
    } catch (error) {
      throw new Error("Failed to search alcohol products");
    }
  },
);

const alcoholSlice = createSlice({
  name: "alcohol",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    filterProducts: (
      state,
      action: PayloadAction<{
        query: string;
        filters: string[];
      }>,
    ) => {
      const { query, filters } = action.payload;

      let filtered = [...state.products];

      // Apply search query filter
      if (query) {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        );
      }

      // Apply other filters
      if (filters.length > 0) {
        filtered = filtered.filter((product) => {
          return filters.every((filter) => {
            // Handle additive filters
            if (filter === "添加物なし") {
              return product.isAllergenFree;
            }

            // Handle manufacturer filters
            if (
              [
                "アサヒビール",
                "キリンビール",
                "サントリー",
                "サッポロビール",
                "スミノフ",
                "本条",
                "宝酒造",
                "チョーヤ",
              ].includes(filter)
            ) {
              return product.brand === filter;
            }

            // Handle genre filters
            if (
              [
                "チューハイ",
                "カクテル",
                "ビール",
                "日本酒",
                "焼酎",
                "ワイン",
                "ウイスキー",
                "リキュール",
              ].includes(filter)
            ) {
              return product.category === filter;
            }

            // Handle specific additive filters
            if (
              [
                "香料",
                "着色料",
                "保存料",
                "酸味料",
                "甘味料",
                "安定剤",
                "乳化剤",
                "増粘剤",
              ].includes(filter)
            ) {
              return product.allergens.some((allergen) =>
                allergen.includes(filter),
              );
            }

            return true;
          });
        });
      }

      state.filteredProducts = filtered;
      state.totalCount = filtered.length;
    },
    clearFilters: (state) => {
      state.filteredProducts = [...state.products];
      state.searchQuery = "";
      state.totalCount = state.products.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlcoholProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlcoholProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchAlcoholProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(searchAlcoholProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchAlcoholProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(searchAlcoholProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search products";
      });
  },
});

export const { setSearchQuery, filterProducts, clearFilters } =
  alcoholSlice.actions;
export default alcoholSlice.reducer;
