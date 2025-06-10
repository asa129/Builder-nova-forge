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
      // Check if Firebase is available
      if (!db) {
        // Return mock data for development
        const mockProducts: AlcoholProduct[] = [
          {
            id: "1",
            name: "アサヒスーパードライ",
            brand: "アサヒビール",
            image: "/placeholder.svg",
            alcoholContent: "5.0%",
            category: "ビール",
            allergens: ["大麦", "ホップ", "米"],
            isAllergenFree: false,
            description: "キレの良い辛口ビール。すっきりとした後味。",
            rating: 4.2,
            reviewCount: 245,
          },
          {
            id: "2",
            name: "スミノフアイス ワイルドグレープ",
            brand: "スミノフ",
            image: "/placeholder.svg",
            alcoholContent: "4.0%",
            category: "カクテル",
            allergens: ["糖類", "香料", "酸味料", "着色料"],
            isAllergenFree: false,
            description: "グレープの爽やかな風味。甘酸っぱい味わい。",
            rating: 3.8,
            reviewCount: 189,
          },
          {
            id: "3",
            name: "ほろよい 白いサワー",
            brand: "サントリー",
            image: "/placeholder.svg",
            alcoholContent: "3.0%",
            category: "チューハイ",
            allergens: ["糖類", "酸味料", "香料"],
            isAllergenFree: false,
            description: "まろやかで飲みやすい。低アルコールでやさしい味。",
            rating: 4.1,
            reviewCount: 312,
          },
          {
            id: "4",
            name: "ほろよい ハピクルサワー",
            brand: "サントリー",
            image: "/placeholder.svg",
            alcoholContent: "3.0%",
            category: "チューハイ",
            allergens: ["糖類", "酸味料", "香料", "乳酸"],
            isAllergenFree: false,
            description: "乳酸菌飲料のような爽やかな酸味とまろやかさ。",
            rating: 3.9,
            reviewCount: 156,
          },
          {
            id: "5",
            name: "本条の檸檬酒 オリジナルレモンサワー",
            brand: "本条",
            image: "/placeholder.svg",
            alcoholContent: "7.0%",
            category: "レモンサワー",
            allergens: ["レモン果汁", "糖類", "酸味料"],
            isAllergenFree: false,
            description: "瀬戸内産レモンを使用。本格的な酸味とキレ。",
            rating: 4.3,
            reviewCount: 98,
          },
          {
            id: "6",
            name: "本条の檸檬酒 ブルーベリーサワー",
            brand: "本条",
            image: "/placeholder.svg",
            alcoholContent: "7.0%",
            category: "フルーツサワー",
            allergens: ["ブルーベリー果汁", "糖類", "酸味料"],
            isAllergenFree: false,
            description: "ブルーベリーの甘酸っぱさが楽しめるサワー",
            rating: 4.0,
            reviewCount: 76,
          },
          {
            id: "7",
            name: "アサヒ 贅沢搾り グレープフルーツ",
            brand: "アサヒ",
            image: "/placeholder.svg",
            alcoholContent: "4.0%",
            category: "チューハイ",
            allergens: ["グレープフルーツ果汁", "糖類"],
            isAllergenFree: false,
            description: "贅沢に搾ったグレープフルーツの果汁感",
            rating: 4.1,
            reviewCount: 167,
          },
          {
            id: "8",
            name: "スミノフアイス",
            brand: "スミノフ",
            image: "/placeholder.svg",
            alcoholContent: "4.0%",
            category: "カクテル",
            allergens: ["糖類", "香料"],
            isAllergenFree: false,
            description: "プレミアムウォッカベースのアイスカクテル",
            rating: 3.7,
            reviewCount: 203,
          },
        ];

        console.log("Using mock data for development");
        return mockProducts;
      }

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
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch alcohol products");
    }
  },
);

export const searchAlcoholProducts = createAsyncThunk(
  "alcohol/searchProducts",
  async (searchTerm: string) => {
    try {
      // If Firebase is not available, return empty array
      if (!db) {
        console.log("Firebase not available - skipping search");
        return [];
      }

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
      console.error("Error searching products:", error);
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
