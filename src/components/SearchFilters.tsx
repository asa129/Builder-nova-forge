import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}

const allergenCategories = [
  "添加物なし",
  "添加物少なめ",
  "アルコール低め",
  "糖質",
  "プリン体ゼロ・オフ",
  "カクテル",
  "ビール",
  "日本酒",
  "焼酎",
  "ワイン",
  "ウイスキー",
];

export function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedFilters,
  setSelectedFilters,
}: SearchFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <Card className="p-6 mb-6">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="お酒の名前、ブランドで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input pr-12"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            成分やカテゴリーで絞り込み
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="text-xs"
          >
            {showFilters ? "フィルターを隠す" : "フィルターを表示"}
          </Button>
        </div>

        {/* Active Filters */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <div
                key={filter}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-primary text-white rounded-full"
              >
                {filter}
                <button
                  onClick={() => toggleFilter(filter)}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-6 px-2 text-xs text-muted-foreground"
            >
              すべてクリア
            </Button>
          </div>
        )}

        {/* Filter Categories */}
        {showFilters && (
          <div className="space-y-4 pt-4 border-t animate-fade-in">
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-700">
                成分・特徴で絞り込み
              </h3>
              <div className="flex flex-wrap gap-2">
                {allergenCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleFilter(category)}
                    className={cn(
                      "filter-button",
                      selectedFilters.includes(category) &&
                        "filter-button-active",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
