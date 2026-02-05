import { Button } from "@/components/ui/button";
import { ShoppingCart, Sparkles } from "lucide-react";
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

  // Calcular descuento: 9% después de 20 unidades
  const hasDiscount = quantity >= 20;
  const discountPercent = hasDiscount ? 9 : 0;
  const discountedPrice = hasDiscount ? price * (1 - discountPercent / 100) : price;
  const totalPrice = discountedPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart({
      id,
      name,
      price: discountedPrice,
      weight,
      quantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Colores alternados para cada producto
  const colors = [
    { border: "border-primary/30", bg: "bg-primary/5", accent: "from-primary to-primary/80" },
    { border: "border-secondary/30", bg: "bg-secondary/5", accent: "from-secondary to-secondary/80" },
    { border: "border-accent/30", bg: "bg-accent/5", accent: "from-accent to-accent/80" },
  ];
  const colorIndex = id.charCodeAt(0) % colors.length;
  const color = colors[colorIndex];

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-xl border-2 ${color.border} ${color.bg} p-4 sm:p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/60 transform hover:scale-102`}>
      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-2 flex-wrap">
          <h3 className="font-serif text-base sm:text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {name}
          </h3>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
            {weight}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-foreground/70 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Price and Discount */}
      <div className="flex flex-col items-start sm:items-end gap-1">
        <div className="flex items-center gap-2">
          <span className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${color.accent} bg-clip-text text-transparent`}>
            ${discountedPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <div className="flex items-center gap-1 text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-lg animate-pulse">
              <Sparkles className="h-3 w-3" />
              -9%
            </div>
          )}
        </div>
        {quantity > 1 && (
          <span className="text-xs sm:text-sm font-semibold text-foreground/60">
            Total: <span className="text-primary font-bold">${totalPrice.toFixed(2)}</span>
          </span>
        )}
      </div>

      {/* Quantity and Add Button */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="flex items-center rounded-lg border-2 border-primary/30 bg-background hover:border-primary/50 transition-all">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-2 py-1 text-sm font-bold text-foreground hover:bg-primary/10 transition-colors"
          >
            −
          </button>
          <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold text-foreground min-w-8 text-center bg-primary/5">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-2 py-1 text-sm font-bold text-foreground hover:bg-primary/10 transition-colors"
          >
            +
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          className={`transition-all duration-300 flex-1 sm:flex-none font-bold shadow-md hover:shadow-lg transform hover:scale-105 ${
            isAdded
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              : `bg-gradient-to-r ${color.accent} hover:shadow-lg`
          }`}
          size="sm"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">{isAdded ? "¡Agregado!" : "Agregar"}</span>
        </Button>
      </div>
    </div>
  );
}
