import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  image: string;
  onAddToCart: (product: {
    id: string;
    name: string;
    price: number;
    weight: string;
    quantity: number;
  }) => void;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  weight,
  image,
  onAddToCart,
}: ProductCardProps) {
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
    <div className="group relative overflow-hidden rounded-lg bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 font-serif text-lg font-bold text-foreground">
          {name}
        </h3>

        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Weight and Price */}
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
            {weight}
          </span>
          <span className="text-xl font-bold text-accent">${price}</span>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-background">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-semibold text-foreground">
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
            className={`flex-1 transition-all duration-300 ${
              isAdded
                ? "bg-green-600 hover:bg-green-700"
                : "bg-primary hover:bg-primary/90"
            }`}
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAdded ? "¡Agregado!" : "Agregar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
