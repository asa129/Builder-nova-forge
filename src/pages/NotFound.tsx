import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wine, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="space-y-6">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Wine className="h-8 w-8 text-primary" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">
              ページが見つかりません
            </h1>
            <p className="text-gray-600">
              お探しのページは存在しないか、移動された可能性があります。
            </p>
          </div>

          {/* Action */}
          <div className="pt-4">
            <Button onClick={() => navigate("/")} className="w-full" size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ホームに戻る
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>URLを確認してもう一度お試しください</p>
            <p>または検索機能をご利用ください</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
