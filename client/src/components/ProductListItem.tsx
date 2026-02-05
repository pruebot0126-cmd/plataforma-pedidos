import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductListItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  onAddToCart: (product: {
    id: string;
    name: string;
    price: number;
    weight: string;
    quantity: number;
  }) => void;
}

export default function ProductListItem({
  id,
  name,
  description,
  price,
  weight,
  onAddToCart,
}: ProductListItemProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({
      id,
      name,
      price,
      weight,
      quantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent">
      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="font-serif text-lg font-bold text-foreground truncate">
            {name}
          </h3>
          <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
            {weight}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {description}
        </p>
      </div>

      {/* Price */}
      <div className="flex flex-col items-end gap-2">
        <span className="text-2xl font-bold text-accent">${price}</span>
      </div>

      {/* Quantity and Add Button */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-lg border border-border bg-background">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-2 py-1 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            −
          </button>
          <span className="px-3 py-1 text-sm font-semibold text-foreground min-w-8 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-2 py-1 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            +
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          className={`transition-all duration-300 ${
            isAdded
              ? "bg-green-600 hover:bg-green-700"
              : "bg-primary hover:bg-primary/90"
          }`}
          size="sm"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
