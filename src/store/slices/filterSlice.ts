import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  selectedAdditives: string[];
  additiveFilter: "あり" | "なし" | "ありでない" | "指定しない";
  selectedManufacturer: string;
  selectedGenres: string[];
  isAdvancedOpen: boolean;
  activeFilters: string[];
}

const initialState: FilterState = {
  selectedAdditives: [],
  additiveFilter: "指定しない",
  selectedManufacturer: "",
  selectedGenres: [],
  isAdvancedOpen: false,
  activeFilters: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedAdditives: (state, action: PayloadAction<string[]>) => {
      state.selectedAdditives = action.payload;
    },
    setAdditiveFilter: (
      state,
      action: PayloadAction<"あり" | "なし" | "ありでない" | "指定しない">,
    ) => {
      state.additiveFilter = action.payload;
    },
    setSelectedManufacturer: (state, action: PayloadAction<string>) => {
      state.selectedManufacturer = action.payload;
    },
    setSelectedGenres: (state, action: PayloadAction<string[]>) => {
      state.selectedGenres = action.payload;
    },
    toggleGenre: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      if (state.selectedGenres.includes(genre)) {
        state.selectedGenres = state.selectedGenres.filter((g) => g !== genre);
      } else {
        state.selectedGenres.push(genre);
      }
    },
    setIsAdvancedOpen: (state, action: PayloadAction<boolean>) => {
      state.isAdvancedOpen = action.payload;
    },
    applyFilters: (state) => {
      const filters: string[] = [];

      // Add additive filter
      if (state.additiveFilter === "なし") {
        filters.push("添加物なし");
      } else if (
        state.additiveFilter === "あり" &&
        state.selectedAdditives.length > 0
      ) {
        filters.push(...state.selectedAdditives);
      }

      // Add manufacturer filter
      if (state.selectedManufacturer && state.selectedManufacturer !== "all") {
        filters.push(state.selectedManufacturer);
      }

      // Add genre filters
      filters.push(...state.selectedGenres);

      state.activeFilters = filters;
    },
    clearAllFilters: (state) => {
      state.selectedAdditives = [];
      state.additiveFilter = "指定しない";
      state.selectedManufacturer = "";
      state.selectedGenres = [];
      state.activeFilters = [];
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      const filterToRemove = action.payload;

      // Remove from active filters
      state.activeFilters = state.activeFilters.filter(
        (f) => f !== filterToRemove,
      );

      // Update corresponding filter states
      if (filterToRemove === "添加物なし") {
        state.additiveFilter = "指定しない";
      } else if (state.selectedAdditives.includes(filterToRemove)) {
        state.selectedAdditives = state.selectedAdditives.filter(
          (a) => a !== filterToRemove,
        );
      } else if (state.selectedManufacturer === filterToRemove) {
        state.selectedManufacturer = "";
      } else if (state.selectedGenres.includes(filterToRemove)) {
        state.selectedGenres = state.selectedGenres.filter(
          (g) => g !== filterToRemove,
        );
      }
    },
  },
});

export const {
  setSelectedAdditives,
  setAdditiveFilter,
  setSelectedManufacturer,
  setSelectedGenres,
  toggleGenre,
  setIsAdvancedOpen,
  applyFilters,
  clearAllFilters,
  removeFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
