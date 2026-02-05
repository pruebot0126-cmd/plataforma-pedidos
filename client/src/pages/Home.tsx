import { useState } from "react";
import ProductListItem from "@/components/ProductListItem";
import CartSidebar from "@/components/CartSidebar";
import ClientForm, { ClientData } from "@/components/ClientForm";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, Zap, Award } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  quantity: number;
}

const PRODUCTS = [
  {
    id: "mix-semillas-45",
    name: "Mix de Semillas",
    description: "Mezcla premium de semillas variadas: girasol, calabaza, sésamo y más",
    price: 16,
    weight: "45gr",
  },
  {
    id: "girasol-500",
    name: "Semillas de Girasol",
    description: "Semillas de girasol premium, frescas y de excelente calidad",
    price: 24,
    weight: "500gr",
  },
  {
    id: "calabaza-400",
    name: "Semillas de Calabaza",
    description: "Semillas de calabaza naturales, ricas en nutrientes y proteínas",
    price: 22,
    weight: "400gr",
  },
  {
    id: "sesamo-300",
    name: "Semillas de Sésamo",
    description: "Sésamo blanco puro, ideal para repostería y cocina asiática",
    price: 28,
    weight: "300gr",
  },
  {
    id: "lino-350",
    name: "Semillas de Lino",
    description: "Semillas de lino ricas en Omega-3, perfectas para la salud",
    price: 20,
    weight: "350gr",
  },
  {
    id: "hemp-300",
    name: "Semillas de Cáñamo",
    description: "Semillas de cáñamo descascaradas, proteína completa y natural",
    price: 32,
    weight: "300gr",
  },
];

const WHATSAPP_NUMBER = "5648708096";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleAddToCart = (product: {
    id: string;
    name: string;
    price: number;
    weight: string;
    quantity: number;
  }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, product];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleClientFormSubmit = (data: ClientData) => {
    setClientData(data);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-card shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="rounded-full bg-gradient-to-br from-primary to-primary/80 p-1.5 sm:p-2 flex-shrink-0 shadow-md">
              <span className="text-lg sm:text-xl font-bold text-primary-foreground"></span>
            </div>
            <div className="min-w-0">
              <h1 className="font-serif text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
                Semillas Mayoreo
              </h1>
              <p className="text-xs text-muted-foreground">Compra al por mayor</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative rounded-lg bg-gradient-to-r from-primary to-primary/80 p-2 text-primary-foreground hover:shadow-lg transition-all md:hidden flex-shrink-0 transform hover:scale-105"
          >
            {showCart ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop Cart Button */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative hidden rounded-lg border-2 border-primary bg-transparent px-3 sm:px-4 py-2 font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all md:flex items-center gap-2 text-sm transform hover:scale-105"
          >
            <span>🛒 Ver Carrito</span>
            {cartCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 sm:pt-20 pb-8">
        {/* Hero Section */}
        <section className="relative mb-8 sm:mb-12 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-12 sm:py-20">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-3 sm:px-4 relative z-10">
            <div className="max-w-2xl">
              <h2 className="mb-3 sm:mb-4 font-serif text-3xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Semillas Premium para tu Negocio
              </h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-lg text-foreground/80 leading-relaxed">
                Productos frescos, de calidad garantizada y precios competitivos para tu negocio.
              </p>
              <Button
                onClick={() => {
                  const productsSection = document.getElementById("products");
                  productsSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-lg text-secondary-foreground font-semibold text-sm sm:text-base transform hover:scale-105 transition-all"
              >
                Ver Catálogo →
              </Button>
            </div>
          </div>
        </section>

        {/* Discount Banner */}
        <section className="bg-gradient-to-r from-accent/20 to-primary/20 border-b-2 border-accent py-4 sm:py-5 mb-8">
          <div className="container mx-auto px-3 sm:px-4">
            <p className="text-xs sm:text-sm text-foreground text-center font-bold flex items-center justify-center gap-2">
              <span className="text-lg">💰</span>
              ¡Descuento del 9% a partir de 20 unidades del mismo producto!
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="container mx-auto px-3 sm:px-4 py-8 sm:pb-12">
          <div className="mb-8">
            <h3 className="mb-6 sm:mb-8 font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Nuestros Productos
            </h3>
            <p className="text-foreground/70 text-sm sm:text-base mb-6">
              Selecciona los productos que necesitas y agrega al carrito
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="transform transition-all hover:scale-102">
                <ProductListItem
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Client Form Section */}
        <section className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="mb-8">
            <h3 className="mb-4 font-serif text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              📍Datos de Entrega
            </h3>
            <p className="text-foreground/70 text-sm">Completa tu información para procesar tu pedido</p>
          </div>
          <ClientForm onSubmit={handleClientFormSubmit} />
          {clientData && (
            <div className="mt-6 p-4 sm:p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary rounded-lg text-sm text-foreground animate-in fade-in slide-in-from-bottom-4">
              <p className="font-bold text-primary mb-2">✓ Datos guardados exitosamente</p>
              <p className="text-foreground/80">{clientData.name} • {clientData.phone}</p>
            </div>
          )}
        </section>

        {/* Info Section */}
        <section className="border-t-2 border-primary/20 bg-gradient-to-b from-primary/5 to-secondary/5 py-12 sm:py-16">
          <div className="container mx-auto px-3 sm:px-4">
            <h3 className="mb-8 sm:mb-12 font-serif text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ¿Por qué comprar con nosotros?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="rounded-xl bg-card p-6 sm:p-8 shadow-lg border-2 border-primary/20 hover:border-primary/50 transform hover:scale-105 transition-all hover:shadow-xl">
                <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="mb-3 font-serif text-lg sm:text-xl font-bold text-foreground">
                  Calidad Garantizada
                </h4>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Todos nuestros productos son frescos y cuidadosamente seleccionados.
                </p>
              </div>

              <div className="rounded-xl bg-card p-6 sm:p-8 shadow-lg border-2 border-secondary/20 hover:border-secondary/50 transform hover:scale-105 transition-all hover:shadow-xl">
                <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg">
                  <span className="text-xl">💰</span>
                </div>
                <h4 className="mb-3 font-serif text-lg sm:text-xl font-bold text-foreground">
                  Precios Mayoristas
                </h4>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Obtén los mejores precios al comprar directamente al productor.
                </p>
              </div>

              <div className="rounded-xl bg-card p-6 sm:p-8 shadow-lg border-2 border-accent/20 hover:border-accent/50 transform hover:scale-105 transition-all hover:shadow-xl">
                <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-accent to-accent/80 rounded-lg">
                  <Zap className="h-6 w-6 text-accent-foreground" style={{borderStyle: 'double'}} />
                </div>
                <h4 className="mb-3 font-serif text-lg sm:text-xl font-bold text-foreground">
                  Pedidos Rápidos
                </h4>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Realiza tu pedido por WhatsApp y recibe confirmación inmediata.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setShowCart(false)} />
      )}
      <div className={`fixed right-0 top-0 h-screen w-full max-w-sm transform transition-transform duration-300 md:relative md:transform-none ${
        showCart ? "translate-x-0" : "translate-x-full md:translate-x-0"
      } z-40 md:z-auto`}>
        <CartSidebar
          items={cartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
          whatsappNumber={WHATSAPP_NUMBER}
          onClose={() => setShowCart(false)}
          clientData={clientData}
        />
      </div>
    </div>
  );
}
