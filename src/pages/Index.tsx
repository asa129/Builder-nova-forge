import { useState, useMemo } from "react";
import { SearchFilters } from "@/components/SearchFilters";
import { ProductCard } from "@/components/ProductCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wine, Search, Filter } from "lucide-react";

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
    allergens: ["糖類", "香料", "酸味料", "着色���"],
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
    allergens: ["ブルーベリー", "糖質"],
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
    allergens: ["グレープフルーツ", "糖質"],
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
    allergens: ["糖質", "香料"],
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

      // Category filter
      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.some((filter) => {
          switch (filter) {
            case "アルコール低め":
              return (
                parseFloat(product.alcoholContent?.replace("%", "") || "0") <= 4
              );
            case "ビール":
              return product.category === "ビール";
            case "カクテル":
              return product.category === "カクテル";
            case "チューハイ":
              return product.category === "チューハイ";
            case "添加物なし":
              return product.isAllergenFree;
            case "糖質":
              return product.allergens.some((a) => a.includes("糖質"));
            default:
              return true;
          }
        });

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, selectedFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-custom py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Wine className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              成分表示でお酒を検索
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            アレルギーや体質に合わせて、安心してお酒を選べる検索サイトです
          </p>
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">検索結果</h2>
            <Badge variant="outline" className="font-normal">
              {filteredProducts.length}件
            </Badge>
          </div>

          {(searchQuery || selectedFilters.length > 0) && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Search className="h-4 w-4" />
              <span>絞り込み中</span>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  検索結果が見つかりませんでした
                </h3>
                <p className="text-gray-600 mb-4">
                  検索条件を変更して再度お試しください
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>• 別のキーワードで検索してみてください</p>
                  <p>• フィルターの条件を緩めてみてください</p>
                  <p>• すべてのフィルターをクリアしてみてください</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Information Card */}
        <Card className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              🍷 お酒選びのお手伝い
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              ア��ルギーや体質、嗜好に合わせて安心してお酒を選んでいただけるよう、
              詳細な成分情報と検索機能を提供しています。
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Badge variant="outline">アレルギー対応</Badge>
              <Badge variant="outline">成分詳細</Badge>
              <Badge variant="outline">カテゴリー検索</Badge>
              <Badge variant="outline">アルコール度数</Badge>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container-custom py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2024 成分表示でお酒を検索. すべての権利を留保します。</p>
            <p className="mt-2">
              ※ 20歳未満の方の飲酒は法律で禁止されています。お酒は適量を。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
