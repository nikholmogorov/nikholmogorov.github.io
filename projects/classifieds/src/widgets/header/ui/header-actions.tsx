import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function HeaderActions() {
  return (
    <div className={`flex items-center gap-1`}>
      <Button variant="ghost" size="icon" aria-label="Избранное">
        <Heart className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Корзина">
        <ShoppingCart className="h-5 w-5" />
      </Button>
    </div>
  );
}
