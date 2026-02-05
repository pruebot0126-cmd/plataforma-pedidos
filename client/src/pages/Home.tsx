import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import CartSidebar from "@/components/CartSidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/WnN7rj3zQMw3wnM2Ps14cZ/sandbox/q8cAqlar0chh14oVtAZIuP-img-2_1770251353000_na1fn_cHJvZHVjdC1taXgtc2VtaWxsYXM.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV25ON3JqM3pRTXczd25NMlBzMTRjWi9zYW5kYm94L3E4Y0FxbGFyMGNoaDE0b1Z0QVpJdVAtaW1nLTJfMTc3MDI1MTM1MzAwMF9uYTFmbl9jSEp2WkhWamRDMXRhWGd0YzJWdGFXeHNZWE0ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=YPNpE95O5nyEtTrW1fCyuNoEBtCV60k6oyx8Pj8pvgYavGMb58HlS8az50pDVi5vreYkc7GfYTmb7meMgJIkAGTNdOu~kSeJqNcmp6iPYC74z4lAIBtCjuyWB7kU2XYniC4RQVBHrLFk91vRuKu3RdOzTdCpOlcku6L50TOzvU8NhgvbiNxM5u3~7ZjERO8BA5mktsQdC3h7lDBL1ivbkFiqfXBTHJ3RXO4dsNp0p~Cl3eqm-3xQmlSeAXRRpdyfHpOZVbxGRU~1ZcLwd74F0ckwFkIDHFOoRpWDYxMOX3dwPR10bxEl~FRqeTZ60CjR2NZ60aUz0JLt0pnJTiNp4w__",
  },
  {
    id: "girasol-500",
    name: "Semillas de Girasol",
    description: "Semillas de girasol premium, frescas y de excelente calidad",
    price: 24,
    weight: "500gr",
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/WnN7rj3zQMw3wnM2Ps14cZ/sandbox/q8cAqlar0chh14oVtAZIuP-img-1_1770251363000_na1fn_aGVyby1zZW1pbGxhcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV25ON3JqM3pRTXczd25NMlBzMTRjWi9zYW5kYm94L3E4Y0FxbGFyMGNoaDE0b1Z0QVpJdVAtaW1nLTFfMTc3MDI1MTM2MzAwMF9uYTFmbl9hR1Z5YnkxelpXMXBiR3hoY3cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KX3FO6tIBTiY8r9wn-2ltafrb~hAQhS3hgWwgGIdQNzrMTQRZCf5aKuXEXLqmo3nzyaPt2v0P6gAFzdma5-XKIyaWwGGkiQtGpvtqsWe2bRldLVIKKRbEtoRLllzqP-BdBdu-pBOp7UKEKvUZvcrxjgFXmc5vUPnXvZ70YudSE5zjvmfXZXgw0lwE81BnjKGCC0J6XeqK9KIeOqzxmniZ2GEgj8oqFDuBdJoZR35rcrzRSkSQklBSwTHjOApuSQ6pSD9T4hJYjSOpNn291pviJVg4GsL260cCqZyuyffjXPT0uSAd7hr6KH0bqAd6iBO1gB5xV120opIcMzNxuIzWA__",
  },
  {
    id: "calabaza-400",
    name: "Semillas de Calabaza",
    description: "Semillas de calabaza naturales, ricas en nutrientes y proteínas",
    price: 22,
    weight: "400gr",
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/WnN7rj3zQMw3wnM2Ps14cZ/sandbox/q8cAqlar0chh14oVtAZIuP-img-1_1770251363000_na1fn_aGVyby1zZW1pbGxhcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV25ON3JqM3pRTXczd25NMlBzMTRjWi9zYW5kYm94L3E4Y0FxbGFyMGNoaDE0b1Z0QVpJdVAtaW1nLTFfMTc3MDI1MTM2MzAwMF9uYTFmbl9hR1Z5YnkxelpXMXBiR3hoY3cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KX3FO6tIBTiY8r9wn-2ltafrb~hAQhS3hgWwgGIdQNzrMTQRZCf5aKuXEXLqmo3nzyaPt2v0P6gAFzdma5-XKIyaWwGGkiQtGpvtqsWe2bRldLVIKKRbEtoRLllzqP-BdBdu-pBOp7UKEKvUZvcrxjgFXmc5vUPnXvZ70YudSE5zjvmfXZXgw0lwE81BnjKGCC0J6XeqK9KIeOqzxmniZ2GEgj8oqFDuBdJoZR35rcrzRSkSQklBSwTHjOApuSQ6pSD9T4hJYjSOpNn291pviJVg4GsL260cCqZyuyffjXPT0uSAd7hr6KH0bqAd6iBO1gB5xV120opIcMzNxuIzWA__",
  },
  {
    id: "sesamo-300",
    name: "Semillas de Sésamo",
    description: "Sésamo blanco puro, ideal para repostería y cocina asiática",
    price: 28,
    weight: "300gr",
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/WnN7rj3zQMw3wnM2Ps14cZ/sandbox/q8cAqlar0chh14oVtAZIuP-img-1_1770251363000_na1fn_aGVyby1zZW1pbGxhcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV25ON3JqM3pRTXczd25NMlBzMTRjWi9zYW5kYm94L3E4Y0FxbGFyMGNoaDE0b1Z0QVpJdVAtaW1nLTFfMTc3MDI1MTM2MzAwMF9uYTFmbl9hR1Z5YnkxelpXMXBiR3hoY3cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KX3FO6tIBTiY8r9wn-2ltafrb~hAQhS3hgWwgGIdQNzrMTQRZCf5aKuXEXLqmo3nzyaPt2v0P6gAFzdma5-XKIyaWwGGkiQtGpvtqsWe2bRldLVIKKRbEtoRLllzqP-BdBdu-pBOp7UKEKvUZvcrxjgFXmc5vUPnXvZ70YudSE5zjvmfXZXgw0lwE81BnjKGCC0J6XeqK9KIeOqzxmniZ2GEgj8oqFDuBdJoZR35rcrzRSkSQklBSwTHjOApuSQ6pSD9T4hJYjSOpNn291pviJVg4GsL260cCqZyuyffjXPT0uSAd7hr6KH0bqAd6iBO1gB5xV120opIcMzNxuIzWA__",
  },
  {
    id: "lino-350",
    name: "Semillas de Lino",
    description: "Semillas de lino ricas en Omega-3, perfectas para la salud",
    price: 20,
    weight: "350gr",
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/WnN7rj3zQMw3wnM2Ps14cZ/sandbox/q8cAqlar0chh14oVtAZIuP-img-1_1770251363000_na1fn_aGVyby1zZW1pbGxhcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV25ON3JqM3pRTXczd25NMlBzMTRjWi9zYW5kYm94L3E4Y0FxbGFyMGNoaDE0b1Z0QVpJdVAtaW1nLTFfMTc3MDI1MTM2MzAwMF9uYTFmbl9hR1Z5YnkxelpXMXBiR3hoY3cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KX3FO6tIBTiY8r9wn-2ltafrb~hAQhS3hgWwgGIdQNzrMTQRZCf5aKuXEXLqmo3nzyaPt2v0P6gAFzdma5-XKIyaWwGGkiQtGpvtqsWe2bRldLVIKKRbEtoRLllzqP-BdBdu-pBOp7UKEKvUZvcrxjgFXmc5vUPnXvZ70YudSE5zjvmfXZXgw0lwE81BnjKGCC0J6XeqK9KIeOqzxmniZ2GEgj8oqFDuBdJoZR35rcrzRSkSQklBSwTHjOApuSQ6pSD9T4hJYjSOpNn291pviJVg4GsL260cCqZyuyffjXPT0uSAd7hr6KH0bqAd6iBO1gB5xV120opIcMzNxuIzWA__",
  },
  {
    id: "hemp-300",
    name: "Semillas de Cáñamo",
    description: "Semillas de cáñamo descascaradas, proteína completa y natural",
    price: 32,
    weight: "300gr",
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/WnN7rj3zQMw3wnM2Ps14cZ/sandbox/q8cAqlar0chh14oVtAZIuP-img-1_1770251363000_na1fn_aGVyby1zZW1pbGxhcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV25ON3JqM3pRTXczd25NMlBzMTRjWi9zYW5kYm94L3E4Y0FxbGFyMGNoaDE0b1Z0QVpJdVAtaW1nLTFfMTc3MDI1MTM2MzAwMF9uYTFmbl9hR1Z5YnkxelpXMXBiR3hoY3cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KX3FO6tIBTiY8r9wn-2ltafrb~hAQhS3hgWwgGIdQNzrMTQRZCf5aKuXEXLqmo3nzyaPt2v0P6gAFzdma5-XKIyaWwGGkiQtGpvtqsWe2bRldLVIKKRbEtoRLllzqP-BdBdu-pBOp7UKEKvUZvcrxjgFXmc5vUPnXvZ70YudSE5zjvmfXZXgw0lwE81BnjKGCC0J6XeqK9KIeOqzxmniZ2GEgj8oqFDuBdJoZR35rcrzRSkSQklBSwTHjOApuSQ6pSD9T4hJYjSOpNn291pviJVg4GsL260cCqZyuyffjXPT0uSAd7hr6KH0bqAd6iBO1gB5xV120opIcMzNxuIzWA__",
  },
];

const WHATSAPP_NUMBER = "5648708096";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

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

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary p-2">
              <span className="text-xl font-bold text-primary-foreground">🌱</span>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">
                Semillas Mayoreo
              </h1>
              <p className="text-xs text-muted-foreground">Compra al por mayor</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative rounded-lg bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors md:hidden"
          >
            {showCart ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop Cart Button */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative hidden rounded-lg border-2 border-primary bg-transparent px-4 py-2 font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors md:flex items-center gap-2"
          >
            <span>🛒 Ver Carrito</span>
            {cartCount > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-8">
        {/* Hero Section */}
        <section className="relative mb-12 overflow-hidden bg-gradient-to-b from-primary/10 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
                Semillas Premium para tu Negocio
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Compra directamente al mayorista. Productos frescos, de calidad garantizada y precios competitivos para tu negocio.
              </p>
              <Button
                onClick={() => {
                  const productsSection = document.getElementById("products");
                  productsSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                Ver Catálogo
              </Button>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="container mx-auto px-4 pb-12">
          <h3 className="mb-8 font-serif text-3xl font-bold text-foreground">
            Nuestros Productos
          </h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="border-t border-border bg-muted/50 py-12">
          <div className="container mx-auto px-4">
            <h3 className="mb-8 font-serif text-2xl font-bold text-foreground">
              ¿Por qué comprar con nosotros?
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-4 text-4xl">✓</div>
                <h4 className="mb-2 font-serif text-lg font-bold text-foreground">
                  Calidad Garantizada
                </h4>
                <p className="text-sm text-muted-foreground">
                  Todos nuestros productos son frescos y cuidadosamente seleccionados.
                </p>
              </div>

              <div className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-4 text-4xl">💰</div>
                <h4 className="mb-2 font-serif text-lg font-bold text-foreground">
                  Precios Mayoristas
                </h4>
                <p className="text-sm text-muted-foreground">
                  Obtén los mejores precios al comprar directamente al productor.
                </p>
              </div>

              <div className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-4 text-4xl">⚡</div>
                <h4 className="mb-2 font-serif text-lg font-bold text-foreground">
                  Pedidos Rápidos
                </h4>
                <p className="text-sm text-muted-foreground">
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
        />
      </div>
    </div>
  );
}
