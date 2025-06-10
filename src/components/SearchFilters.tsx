import { useState } from "react";
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
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}

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

export function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedFilters,
  setSelectedFilters,
}: SearchFiltersProps) {
  const [selectedAdditives, setSelectedAdditives] = useState<string[]>([]);
  const [additiveFilter, setAdditiveFilter] = useState("指定しない");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    }
  };

  const handleSearch = () => {
    const filters: string[] = [];

    // Add additive filter
    if (additiveFilter === "なし") {
      filters.push("添加物なし");
    } else if (additiveFilter === "あり" && selectedAdditives.length > 0) {
      filters.push(...selectedAdditives);
    }

    // Add manufacturer filter
    if (selectedManufacturer) {
      filters.push(selectedManufacturer);
    }

    // Add genre filters
    filters.push(...selectedGenres);

    setSelectedFilters(filters);
  };

  return (
    <Card className="p-6 mb-6">
      <div className="space-y-6">
        {/* Main Title */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            成分表示でお酒を検索
          </h2>
        </div>

        {/* Additives Section */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">
              添加物{" "}
              <span className="text-gray-500">添加物を選んでください</span>
            </Label>
            <Select
              value={selectedAdditives.join(",")}
              onValueChange={(value) =>
                setSelectedAdditives(value ? value.split(",") : [])
              }
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="添加物を選んでください" />
              </SelectTrigger>
              <SelectContent>
                {additiveOptions.map((additive) => (
                  <SelectItem key={additive} value={additive}>
                    {additive}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              添加物で検索
            </Label>
            <RadioGroup
              value={additiveFilter}
              onValueChange={setAdditiveFilter}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="あり" id="ari" />
                <Label htmlFor="ari" className="text-sm">
                  添加物あり
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="なし" id="nashi" />
                <Label htmlFor="nashi" className="text-sm">
                  なし
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ありでない" id="aridenai" />
                <Label htmlFor="aridenai" className="text-sm">
                  ありでない
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="指定しない" id="shitei" />
                <Label htmlFor="shitei" className="text-sm">
                  指定しない
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Name Search Section */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            お酒の名前で検索
          </Label>
          <Input
            type="text"
            placeholder="お酒の名前を入力してください"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Manufacturer Section */}
        <div>
          <Label className="text-sm font-medium text-gray-700">
            メーカー{" "}
            <span className="text-gray-500">メーカーを選んでください</span>
          </Label>
          <Select
            value={selectedManufacturer}
            onValueChange={setSelectedManufacturer}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="メーカーを選んでください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">すべてのメーカー</SelectItem>
              {manufacturerOptions.map((manufacturer) => (
                <SelectItem key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSearch}
            className="px-8 py-2 bg-primary text-white hover:bg-primary/90"
          >
            <Search className="h-4 w-4 mr-2" />
            検索
          </Button>
        </div>

        {/* Alcohol Genre Section */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            お酒のジャンル
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {alcoholGenres.map((genre) => (
              <div key={genre} className="flex items-center space-x-2">
                <Checkbox
                  id={genre}
                  checked={selectedGenres.includes(genre)}
                  onCheckedChange={(checked) =>
                    handleGenreChange(genre, checked as boolean)
                  }
                />
                <Label
                  htmlFor={genre}
                  className="text-sm font-normal cursor-pointer"
                >
                  {genre}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters Display */}
        {selectedFilters.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">適用中のフィルター:</span>
              {selectedFilters.map((filter) => (
                <span
                  key={filter}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary text-white rounded-full"
                >
                  {filter}
                  <button
                    onClick={() =>
                      setSelectedFilters(
                        selectedFilters.filter((f) => f !== filter),
                      )
                    }
                    className="hover:bg-white/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFilters([])}
                className="h-6 px-2 text-xs text-gray-600"
              >
                すべてクリア
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
