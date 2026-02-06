import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, MessageCircle, X, ShoppingBag } from "lucide-react";
import { useState } from "react";

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
  whatsappNumber?: string;
  onClose?: () => void;
  clientData?: ClientData | null;
}

export default function CartSidebar({
  items,
  onRemoveItem,
  onUpdateQuantity,
  whatsappNumber = "5648708096",
  onClose,
  clientData,
}: CartSidebarProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitOrder = async () => {
    if (items.length === 0) return;

    setIsSubmitting(true);

    let message = "";
    
    if (clientData?.name) {
      message += `¡Hola! Soy *${clientData.name}*\n`;
      message += `📱 Teléfono: ${clientData.phone || "No proporcionado"}\n`;
      message += `📍 Ubicación: ${clientData.address || "No especificada"}\n`;
      if (clientData.latitude && clientData.longitude) {
        message += `🗺️ Coordenadas: ${clientData.latitude.toFixed(4)}, ${clientData.longitude.toFixed(4)}\n`;
      }
      message += `\n*PEDIDO:*\n`;
    } else {
      message = `¡Hola! Me gustaría hacer un pedido:\n\n`;
    }

    const orderText = items
      .map((item) => `• ${item.name} (${item.weight}) x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    message += `${orderText}\n\n*Total: $${total.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    setIsSubmitting(false);
  };

  return (
    <aside className="fixed right-0 top-0 h-screen w-full max-w-sm border-l-4 border-primary bg-gradient-to-b from-card to-background shadow-2xl overflow-y-auto">
      <div className="sticky top-0 border-b-2 border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
            <ShoppingBag className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tu Pedido
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {itemCount} {itemCount === 1 ? "producto" : "productos"}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-primary/20 transition-all transform hover:scale-110 flex-shrink-0"
            title="Cerrar carrito"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        )}
      </div>

      <div className="p-4 sm:p-5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-6">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Tu carrito está vacío. Selecciona productos para comenzar.
            </p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-lg border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-3 sm:p-4 hover:border-primary/50 transition-all transform hover:scale-102 hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground text-sm sm:text-base truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground font-medium">
                        {item.weight}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-2 rounded-lg p-2 hover:bg-destructive/20 transition-all transform hover:scale-110 flex-shrink-0"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center rounded-lg border-2 border-primary/30 bg-background hover:border-primary/50 transition-all">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="px-2 py-1 text-xs sm:text-sm font-bold hover:bg-primary/10 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-2 py-1 text-xs sm:text-sm font-bold min-w-8 text-center bg-primary/5">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 text-xs sm:text-sm font-bold hover:bg-primary/10 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Separator */}
            <Separator className="my-4 sm:my-5 bg-primary/20" />

            {/* Total */}
            <div className="mb-6 sm:mb-8 space-y-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground font-medium">Subtotal:</span>
                <span className="font-bold text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t-2 border-primary/20 pt-3">
                <span className="font-serif text-base sm:text-lg font-bold text-foreground">
                  Total:
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmitOrder}
              disabled={isSubmitting || items.length === 0}
              className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-lg text-secondary-foreground font-bold py-5 sm:py-6 text-sm sm:text-base transform hover:scale-105 transition-all shadow-md"
            >
              <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {isSubmitting ? "Enviando..." : "Enviar por WhatsApp"}
            </Button>

            <p className="mt-3 sm:mt-4 text-center text-xs text-muted-foreground font-medium">
              Se abrirá WhatsApp con tu pedido listo para enviar
            </p>
          </>
        )}
      </div>
    </aside>
  );
}
