import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setSelectedAdditives,
  setAdditiveFilter,
  setSelectedManufacturer,
  setSelectedGenres,
  toggleGenre,
  setIsAdvancedOpen,
  applyFilters,
  clearAllFilters,
  removeFilter,
} from "@/store/slices/filterSlice";
import { setSearchQuery, filterProducts } from "@/store/slices/alcoholSlice";

const additiveOptions = [
  "香料",
  "着色料",
  "保存料",
  "酸味料",
  "甘味料",
  "安定剤",
  "乳化剤",
  "増粘剤",
];

const manufacturerOptions = [
  "アサヒビール",
  "キリンビール",
  "サントリー",
  "サッポロビール",
  "スミノフ",
  "本条",
  "宝酒造",
  "チョーヤ",
];

const alcoholGenres = [
  "チューハイ",
  "カクテル",
  "ビール",
  "日本酒",
  "焼酎",
  "ワイン",
  "ウイスキー",
  "リキュール",
];

export function SearchFilters() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.alcohol);
  const {
    selectedAdditives,
    additiveFilter,
    selectedManufacturer,
    selectedGenres,
    isAdvancedOpen,
    activeFilters,
  } = useAppSelector((state) => state.filters);

  const handleGenreChange = useCallback(
    (genre: string, checked: boolean) => {
      dispatch(toggleGenre(genre));
    },
    [dispatch],
  );

  const handleSearch = useCallback(() => {
    dispatch(applyFilters());
    dispatch(filterProducts({ query: searchQuery, filters: activeFilters }));
  }, [dispatch, searchQuery, activeFilters]);

  const handleClearAllFilters = useCallback(() => {
    dispatch(clearAllFilters());
    dispatch(filterProducts({ query: "", filters: [] }));
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  const handleRemoveFilter = useCallback(
    (filter: string) => {
      dispatch(removeFilter(filter));
      const updatedFilters = activeFilters.filter((f) => f !== filter);
      dispatch(filterProducts({ query: searchQuery, filters: updatedFilters }));
    },
    [dispatch, activeFilters, searchQuery],
  );

  const hasActiveFilters =
    additiveFilter !== "指定しない" ||
    selectedManufacturer !== "" ||
    selectedGenres.length > 0 ||
    selectedAdditives.length > 0;

  return (
    <div className="space-y-6">
      {/* Hero Search Section */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-0 shadow-lg">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative p-8">
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg">
                <Sparkles className="h-4 w-4" />
                AI搭載検索
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                成分表示でお酒を検索
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                アレルギーや体質に合わせて、あなたにぴったりのお酒を見つけましょう
              </p>
            </div>

            {/* Main Search Input */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  type="text"
                  placeholder="お酒の名前、ブランド、成分で検索..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-sm"
                />
              </div>
            </div>

            {/* Quick Search Button */}
            <Button
              onClick={handleSearch}
              size="lg"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Search className="h-5 w-5 mr-2" />
              検索する
            </Button>
          </div>
        </div>
      </Card>

      {/* Advanced Filters */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <div className="p-6">
          <button
            onClick={() => dispatch(setIsAdvancedOpen(!isAdvancedOpen))}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-800">
                詳細フィルター
              </span>
              {hasActiveFilters && (
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  {activeFilters.length}件適用中
                </Badge>
              )}
            </div>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-gray-600 transition-transform duration-300",
                isAdvancedOpen && "rotate-180",
              )}
            />
          </button>

          {isAdvancedOpen && (
            <div className="mt-6 space-y-8 animate-fade-in">
              {/* Additives Section */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  🧪 添加物で絞り込み
                </Label>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      特定の添加物を選択
                    </Label>
                    <Select
                      value={selectedAdditives.join(",")}
                      onValueChange={(value) =>
                        dispatch(
                          setSelectedAdditives(value ? value.split(",") : []),
                        )
                      }
                    >
                      <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500">
                        <SelectValue placeholder="添加物を選んでください" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {additiveOptions.map((additive) => (
                          <SelectItem
                            key={additive}
                            value={additive}
                            className="rounded-lg"
                          >
                            {additive}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      添加物の条件
                    </Label>
                    <RadioGroup
                      value={additiveFilter}
                      onValueChange={(value) =>
                        dispatch(
                          setAdditiveFilter(
                            value as
                              | "あり"
                              | "なし"
                              | "ありでない"
                              | "指定しない",
                          ),
                        )
                      }
                      className="grid grid-cols-2 gap-3"
                    >
                      {[
                        { value: "あり", label: "添加物あり" },
                        { value: "なし", label: "添加物なし" },
                        { value: "ありでない", label: "こだわらない" },
                        { value: "指定しない", label: "指定しない" },
                      ].map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                          />
                          <Label
                            htmlFor={option.value}
                            className="text-sm cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Manufacturer Section */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  🏭 メーカー
                </Label>
                <Select
                  value={selectedManufacturer}
                  onValueChange={(value) =>
                    dispatch(setSelectedManufacturer(value))
                  }
                >
                  <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 max-w-md">
                    <SelectValue placeholder="メーカーを選んでください" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all" className="rounded-lg">
                      すべてのメーカー
                    </SelectItem>
                    {manufacturerOptions.map((manufacturer) => (
                      <SelectItem
                        key={manufacturer}
                        value={manufacturer}
                        className="rounded-lg"
                      >
                        {manufacturer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Genre Section */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  🍶 お酒のジャンル
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {alcoholGenres.map((genre) => (
                    <div
                      key={genre}
                      className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
                    >
                      <Checkbox
                        id={genre}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={(checked) =>
                          handleGenreChange(genre, checked as boolean)
                        }
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label
                        htmlFor={genre}
                        className="text-sm font-medium cursor-pointer flex-1"
                      >
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <Button
                  onClick={handleSearch}
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Search className="h-5 w-5 mr-2" />
                  フィルターを適用
                </Button>
                {hasActiveFilters && (
                  <Button
                    onClick={handleClearAllFilters}
                    variant="outline"
                    className="h-12 px-6 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                  >
                    <X className="h-4 w-4 mr-2" />
                    クリア
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Label className="text-sm font-semibold text-gray-700">
                適用中のフィルター:
              </Label>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter}
                  className="px-3 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200 rounded-full font-medium hover:from-blue-200 hover:to-purple-200 transition-all duration-200 cursor-pointer"
                  onClick={() => handleRemoveFilter(filter)}
                >
                  {filter}
                  <X className="h-3 w-3 ml-2" />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAllFilters}
                className="text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full"
              >
                すべてクリア
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
