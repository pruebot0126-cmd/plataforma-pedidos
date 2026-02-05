import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, MessageCircle } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  quantity: number;
}

interface CartSidebarProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  whatsappNumber: string;
}

export default function CartSidebar({
  items,
  onRemoveItem,
  onUpdateQuantity,
  whatsappNumber,
}: CartSidebarProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitOrder = async () => {
    if (items.length === 0) return;

    setIsSubmitting(true);

    // Construir mensaje para WhatsApp
    const orderText = items
      .map((item) => `• ${item.name} (${item.weight}) x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    const message = `¡Hola! Me gustaría hacer un pedido:\n\n${orderText}\n\n*Total: $${total.toFixed(2)}*`;

    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);

    // URL de WhatsApp Web (sin el +)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp en nueva ventana
    window.open(whatsappUrl, "_blank");

    setIsSubmitting(false);
  };

  return (
    <aside className="fixed right-0 top-0 h-screen w-full max-w-sm border-l border-border bg-card shadow-lg overflow-y-auto">
      <div className="sticky top-0 border-b border-border bg-card p-4">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Tu Pedido
        </h2>
        <p className="text-sm text-muted-foreground">
          {itemCount} {itemCount === 1 ? "producto" : "productos"}
        </p>
      </div>

      <div className="p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Tu carrito está vacío. Selecciona productos para comenzar.
            </p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-border bg-background p-3"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.weight}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-2 rounded p-1 hover:bg-muted transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded border border-border">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="px-2 py-1 text-sm hover:bg-muted transition-colors"
                      >
                        −
                      </button>
                      <span className="px-2 py-1 text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 text-sm hover:bg-muted transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold text-accent">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Separator */}
            <Separator className="my-4" />

            {/* Total */}
            <div className="mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-semibold text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="font-serif text-lg font-bold text-foreground">
                  Total:
                </span>
                <span className="font-serif text-2xl font-bold text-accent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmitOrder}
              disabled={isSubmitting || items.length === 0}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-6 text-base"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {isSubmitting ? "Enviando..." : "Enviar por WhatsApp"}
            </Button>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Se abrirá WhatsApp con tu pedido listo para enviar
            </p>
          </>
        )}
      </div>
    </aside>
  );
}
