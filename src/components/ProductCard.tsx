import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Info, Star, Heart } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavoriteProduct } from "@/store/slices/userSlice";
import { AlcoholProduct } from "@/store/slices/alcoholSlice";

type ProductCardProps = AlcoholProduct;

export function ProductCard({
  id,
  name,
  brand,
  image,
  alcoholContent,
  category,
  allergens = [],
  isAllergenFree = false,
  description,
  rating = 4.0,
  reviewCount = 127,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { preferences } = useAppSelector((state) => state.user);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = preferences.favoriteProducts.includes(id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteProduct(id));
  };

  return (
    <Card
      className="card-hover h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="aspect-square w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 rounded-t-xl overflow-hidden relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-6 transition-all duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `data:image/svg+xml;base64,${btoa(`
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <rect width="200" height="200" fill="url(#grad)"/>
                  <circle cx="100" cy="100" r="40" fill="#d1d5db"/>
                  <text x="100" y="140" text-anchor="middle" font-family="system-ui" font-size="12" fill="#6b7280">No Image</text>
                </svg>
              `)}`;
            }}
          />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <Badge
              variant="secondary"
              className="bg-white/90 backdrop-blur-sm text-gray-700 border-0 shadow-lg text-xs font-semibold"
            >
              {category}
            </Badge>
            {isAllergenFree && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg text-xs font-semibold">
                添加物なし
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isFavorited
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
            } ${isHovered ? "scale-110" : ""}`}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
          </button>

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-4">
          {/* Product Name & Brand */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
              {name}
            </h3>
            {brand && (
              <p className="text-sm text-gray-600 font-medium">{brand}</p>
            )}
          </div>

          {/* Alcohol Content */}
          {alcoholContent && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className="text-sm text-gray-600 font-medium">
                アルコール度数:{" "}
                <span className="text-blue-600 font-semibold">
                  {alcoholContent}
                </span>
              </span>
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Allergens */}
          {allergens.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                含有成分
              </p>
              <div className="flex flex-wrap gap-1.5">
                {allergens.slice(0, 3).map((allergen) => (
                  <span
                    key={allergen}
                    className="text-xs px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-md font-medium"
                  >
                    {allergen}
                  </span>
                ))}
                {allergens.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-md font-medium">
                    +{allergens.length - 3}件
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs h-9 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
            >
              <Info className="h-3 w-3 mr-1.5" />
              詳細
            </Button>
            <Button
              size="sm"
              className="flex-1 text-xs h-9 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <ExternalLink className="h-3 w-3 mr-1.5" />
              購入
            </Button>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">{rating}</span>
            </div>
            <span className="text-xs text-gray-500">
              レビュー: {reviewCount}件
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
