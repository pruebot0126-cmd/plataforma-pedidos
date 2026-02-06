import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  quantity: number;
}

interface ClientData {
  name: string;
  phone: string;
  latitude: number | null;
  longitude: number | null;
  address: string;
}

interface CartSidebarProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onClose?: () => void;
  clientData?: ClientData | null;
}

export default function CartSidebar({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClose,
  clientData,
}: CartSidebarProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createOrderMutation = trpc.orders.create.useMutation();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitOrder = async () => {
    // Validar que hay items en el carrito
    if (items.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    // Validar que los datos del cliente estén completos
    if (!clientData || !clientData.name || !clientData.phone || clientData.latitude === null || clientData.longitude === null) {
      toast.error("Por favor completa tus datos y ubicación antes de hacer el pedido");
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar los datos del pedido
      const productsData = items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        weight: item.weight,
      }));

      // Crear el pedido
      await createOrderMutation.mutateAsync({
        clientName: clientData.name,
        clientPhone: clientData.phone,
        latitude: clientData.latitude.toString(),
        longitude: clientData.longitude.toString(),
        products: JSON.stringify(productsData),
        total: total.toString(),
      });

      toast.success("¡Pedido enviado exitosamente! El administrador lo revisará pronto.");
      
      // Limpiar carrito
      items.forEach(item => onRemoveItem(item.id));
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error al enviar pedido:", error);
      toast.error("Error al enviar el pedido. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-l-2 border-primary/20 rounded-l-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Tu Carrito
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-primary/20 transition-colors"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        )}
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-12 w-12 text-foreground/30 mb-3" />
            <p className="text-foreground/70 text-sm">Tu carrito está vacío</p>
            <p className="text-foreground/50 text-xs mt-2">Selecciona productos para comenzar</p>
          </div>
        ) : (
          items.map((item) => {
            const itemTotal = item.price * item.quantity;
            const hasDiscount = item.quantity >= 20;
            const discountedPrice = hasDiscount ? item.price * 0.91 : item.price;
            const discountedTotal = discountedPrice * item.quantity;

            return (
              <div key={item.id} className="rounded-lg bg-background p-3 sm:p-4 border-2 border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground">{item.name}</h3>
                    <p className="text-xs text-foreground/60">{item.weight}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-foreground/50 hover:text-red-500 transition-colors ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {hasDiscount && (
                  <div className="mb-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                    ✓ Descuento 9% aplicado
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-primary/20 hover:bg-primary/40 text-foreground text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-primary/20 hover:bg-primary/40 text-foreground text-sm"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    {hasDiscount ? (
                      <div>
                        <p className="text-xs line-through text-foreground/50">${itemTotal.toFixed(2)}</p>
                        <p className="font-bold text-sm text-accent">${discountedTotal.toFixed(2)}</p>
                      </div>
                    ) : (
                      <p className="font-bold text-sm text-foreground">${itemTotal.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t-2 border-primary/20 p-4 sm:p-6 space-y-4 bg-gradient-to-t from-primary/5 to-transparent">
          <Separator className="bg-primary/20" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-foreground/70">
              <span>Subtotal ({itemCount} items):</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Total:</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          {!clientData || !clientData.name || !clientData.phone || clientData.latitude === null || clientData.longitude === null ? (
            <div className="bg-accent/20 border-2 border-accent rounded-lg p-3 text-xs text-accent">
              ⚠️ Completa tus datos y ubicación antes de hacer el pedido
            </div>
          ) : (
            <div className="bg-primary/10 border-2 border-primary rounded-lg p-3 text-xs text-foreground/70">
              ✓ Datos de entrega completados
            </div>
          )}

          <Button
            onClick={handleSubmitOrder}
            disabled={isSubmitting || items.length === 0 || !clientData || !clientData.name || !clientData.phone || clientData.latitude === null || clientData.longitude === null}
            className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-lg text-secondary-foreground font-semibold py-5 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando..." : "Hacer Pedido"}
          </Button>
        </div>
      )}
    </div>
  );
}
