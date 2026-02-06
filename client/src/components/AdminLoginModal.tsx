import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  onLogin,
}: AdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validar credenciales
    if (username === "admin" && password === "admin123") {
      onLogin(username, password);
      setUsername("");
      setPassword("");
    } else {
      setError("Usuario o contraseña incorrectos");
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-primary/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-2xl font-bold text-black">
            Iniciar Sesión
          </h2>
          <button
            onClick={onClose}
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-background text-foreground"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-background text-foreground"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 border-2 border-red-300 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg text-primary-foreground font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
          </div>
        </form>


      </div>
    </div>
  );
}
