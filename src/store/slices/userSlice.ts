import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserPreferences {
  favoriteProducts: string[];
  allergenRestrictions: string[];
  preferredCategories: string[];
  theme: "light" | "dark" | "auto";
  language: "ja" | "en";
}

interface UserState {
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  displayName: string | null;
  preferences: UserPreferences;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  userId: null,
  email: null,
  displayName: null,
  preferences: {
    favoriteProducts: [],
    allergenRestrictions: [],
    preferredCategories: [],
    theme: "auto",
    language: "ja",
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        userId: string;
        email: string;
        displayName: string;
      }>,
    ) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.error = null;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.email = null;
      state.displayName = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleFavoriteProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (state.preferences.favoriteProducts.includes(productId)) {
        state.preferences.favoriteProducts =
          state.preferences.favoriteProducts.filter((id) => id !== productId);
      } else {
        state.preferences.favoriteProducts.push(productId);
      }
    },
    setAllergenRestrictions: (state, action: PayloadAction<string[]>) => {
      state.preferences.allergenRestrictions = action.payload;
    },
    setPreferredCategories: (state, action: PayloadAction<string[]>) => {
      state.preferences.preferredCategories = action.payload;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark" | "auto">) => {
      state.preferences.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<"ja" | "en">) => {
      state.preferences.language = action.payload;
    },
    updatePreferences: (
      state,
      action: PayloadAction<Partial<UserPreferences>>,
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setError,
  toggleFavoriteProduct,
  setAllergenRestrictions,
  setPreferredCategories,
  setTheme,
  setLanguage,
  updatePreferences,
} = userSlice.actions;

export default userSlice.reducer;
