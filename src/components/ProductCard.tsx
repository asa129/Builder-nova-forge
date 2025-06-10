import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Info } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  brand?: string;
  image: string;
  alcoholContent?: string;
  category: string;
  allergens?: string[];
  isAllergenFree?: boolean;
  description?: string;
}

export function ProductCard({
  name,
  brand,
  image,
  alcoholContent,
  category,
  allergens = [],
  isAllergenFree = false,
  description,
}: ProductCardProps) {
  return (
    <Card className="card-hover h-full">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="aspect-square w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg overflow-hidden relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `data:image/svg+xml;base64,${btoa(`
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                  <rect width="200" height="200" fill="#f3f4f6"/>
                  <circle cx="100" cy="100" r="40" fill="#e5e7eb"/>
                  <text x="100" y="140" text-anchor="middle" font-family="system-ui" font-size="12" fill="#6b7280">No Image</text>
                </svg>
              `)}`;
            }}
          />
          {isAllergenFree && (
            <div className="absolute top-2 right-2">
              <Badge className="text-xs bg-success text-white shadow-sm">
                添加物なし
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>

          {/* Product Name */}
          <div>
            <h3 className="font-medium text-gray-900 leading-snug line-clamp-2">
              {name}
            </h3>
            {brand && <p className="text-sm text-gray-600 mt-1">{brand}</p>}
          </div>

          {/* Alcohol Content */}
          {alcoholContent && (
            <div className="text-sm text-gray-600">
              アルコール度数: {alcoholContent}
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}

          {/* Allergens */}
          {allergens.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-gray-500">成分:</p>
              <div className="flex flex-wrap gap-1">
                {allergens.slice(0, 3).map((allergen) => (
                  <span
                    key={allergen}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-md"
                  >
                    {allergen}
                  </span>
                ))}
                {allergens.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-md">
                    +{allergens.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
              <Info className="h-3 w-3 mr-1" />
              詳細
            </Button>
            <Button variant="default" size="sm" className="flex-1 text-xs h-8">
              <ExternalLink className="h-3 w-3 mr-1" />
              購入
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
