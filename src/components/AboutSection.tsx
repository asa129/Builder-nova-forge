import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, Heart, Users } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: "安心・安全",
      description: "詳細な成分表示でアレルギー対応",
      color: "text-green-600 bg-green-50",
    },
    {
      icon: Search,
      title: "簡単検索",
      description: "カテゴリーや成分で絞り込み検索",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: Heart,
      title: "体質配慮",
      description: "糖質やプリン体の情報も充実",
      color: "text-red-600 bg-red-50",
    },
    {
      icon: Users,
      title: "みんなで使える",
      description: "性別・年齢問わず親しみやすいデザイン",
      color: "text-purple-600 bg-purple-50",
    },
  ];

  return (
    <Card className="mt-12 p-8 bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            🍷 お酒選びをもっと安心に
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            アレルギーや体質、嗜好に合わせて安心してお酒を選んでいただけるよう、
            詳細な成分情報と使いやすい検索機能を提��しています。
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div
                className={`inline-flex p-3 rounded-lg ${feature.color} mb-3`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="font-normal">
            アレルギー対応
          </Badge>
          <Badge variant="outline" className="font-normal">
            成分詳細表示
          </Badge>
          <Badge variant="outline" className="font-normal">
            カテゴリー検索
          </Badge>
          <Badge variant="outline" className="font-normal">
            アルコール度数表示
          </Badge>
          <Badge variant="outline" className="font-normal">
            糖質・プリン体情報
          </Badge>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800 text-center">
            <strong>ご注意：</strong>
            20歳未満の方の飲酒は法律で禁止されています。
            お酒は適量を心がけ、飲酒運転は絶対におやめください。
          </p>
        </div>
      </div>
    </Card>
  );
}
