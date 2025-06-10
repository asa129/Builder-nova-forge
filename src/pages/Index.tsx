import { useState, useMemo } from "react";
import { SearchFilters } from "@/components/SearchFilters";
import { ProductCard } from "@/components/ProductCard";
import { AboutSection } from "@/components/AboutSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Wine,
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react";

// Mock data for demonstration - realistic alcohol products
const mockProducts = [
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
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Filters
      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.every((filter) => {
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

          // Skip 'all' manufacturer filter as it means no filter
          if (filter === "all") {
            return true;
          }

          return true;
        });

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, selectedFilters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50" />
                <div className="relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Wine className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  AlcoholSearch
                </h1>
                <p className="text-gray-600 text-sm">
                  成分表示で安心・安全なお酒選び
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-full">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  アレルギー対応
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-full">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {mockProducts.length}商品
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Search and Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              検索結果
            </h2>
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700 font-semibold px-3 py-1"
            >
              {filteredProducts.length}件見つかりました
            </Badge>
          </div>

          {(searchQuery || selectedFilters.length > 0) && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <Search className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                フィルター適用中
              </span>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center mb-12 bg-gradient-to-br from-gray-50 to-blue-50/30 border-0 shadow-lg">
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl flex items-center justify-center">
                <Filter className="h-10 w-10 text-gray-400" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  検索結果が見つかりませんでした
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  検索条件を変更するか、フィルターを調整して再度お試しください
                </p>
              </div>
              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>検索のヒント</span>
                </div>
                <div className="space-y-2">
                  <p>• 別のキーワードや短いキーワードを試してみてください</p>
                  <p>• フィルターの条件を緩めてみてください</p>
                  <p>• すべてのフィルターをクリアしてみてください</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilters([]);
                }}
                variant="outline"
                className="rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
              >
                すべての条件をクリア
              </Button>
            </div>
          </Card>
        )}

        {/* About Section */}
        <AboutSection />
      </main>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white mt-16">
        <div className="container-custom py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Wine className="h-8 w-8" />
              <h3 className="text-2xl font-bold">AlcoholSearch</h3>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              アレルギーや体質に合わせて安心してお酒を選べる、
              次世代の成分検索プラットフォームです。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="border-white/20 text-white">
                AI搭載検索
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white">
                アレルギー対応
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white">
                成分詳細表示
              </Badge>
            </div>
            <div className="border-t border-white/10 pt-6 space-y-2">
              <p className="text-gray-400 text-sm">
                © 2024 AlcoholSearch. すべての権利を留保します。
              </p>
              <p className="text-yellow-300 text-sm font-medium">
                ⚠️ 20歳未満の方の飲酒は法律で禁止されています。お酒は適量を。
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
