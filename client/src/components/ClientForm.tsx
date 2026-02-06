import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, User } from "lucide-react";

interface ClientFormProps {
  onSubmit: (data: ClientData) => void;
  isSubmitting?: boolean;
}

export interface ClientData {
  name: string;
  phone: string;
  latitude: number | null;
  longitude: number | null;
  address: string;
}

declare global {
  interface Window {
    L: any;
  }
}

export default function ClientForm({ onSubmit, isSubmitting = false }: ClientFormProps) {
  const [clientData, setClientData] = useState<ClientData>({
    name: "",
    phone: "",
    latitude: null,
    longitude: null,
    address: "",
  });

  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Inicializar mapa con Leaflet
  useEffect(() => {
    if (showMap && mapRef.current && !mapInstance.current) {
      // Cargar Leaflet CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);

      // Cargar Leaflet JS
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      script.async = true;
      script.onload = () => {
        initializeMap();
      };
      document.head.appendChild(script);
    }
  }, [showMap]);

  const initializeMap = () => {
    if (!mapRef.current || !window.L) return;

    const defaultLocation = clientData.latitude && clientData.longitude
      ? [clientData.latitude, clientData.longitude]
      : [25.2866, -110.9769]; // Hermosillo, Sonora

    mapInstance.current = window.L.map(mapRef.current).setView(defaultLocation, 15);

    // Agregar capa de OpenStreetMap
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapInstance.current);

    // Crear marcador
    markerRef.current = window.L.marker(defaultLocation, {
      draggable: true,
    }).addTo(mapInstance.current);

    // Actualizar coordenadas al arrastrar
    markerRef.current.on("dragend", () => {
      const position = markerRef.current.getLatLng();
      setClientData((prev) => ({
        ...prev,
        latitude: position.lat,
        longitude: position.lng,
      }));
    });

    // Hacer clic en el mapa para mover el marcador
    mapInstance.current.on("click", (e: any) => {
      markerRef.current.setLatLng(e.latlng);
      setClientData((prev) => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    });
  };

  const handleSave = () => {
    if (!clientData.name || !clientData.phone) {
      alert("Por favor completa nombre y teléfono");
      return;
    }
    onSubmit(clientData);
    setShowMap(false);
  };

  return (
    <div className="rounded-xl bg-card p-6 sm:p-8 shadow-lg border-2 border-primary/20">
      <div className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
            <User className="h-4 w-4" />
            Nombre Completo *
          </label>
          <input
            type="text"
            value={clientData.name}
            onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
            placeholder="Tu nombre"
            className="w-full px-4 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-background text-foreground"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
            <Phone className="h-4 w-4" />
            Teléfono *
          </label>
          <input
            type="tel"
            value={clientData.phone}
            onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
            placeholder="Tu teléfono"
            className="w-full px-4 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-background text-foreground"
          />
        </div>

        {/* Ubicación */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
            <MapPin className="h-4 w-4" />
            Ubicación *
          </label>
          <Button
            onClick={() => setShowMap(!showMap)}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg text-primary-foreground font-semibold transform hover:scale-105 transition-all"
          >
            {showMap ? "Cerrar Mapa" : "Abrir Mapa"}
          </Button>

          {showMap && (
            <div className="mt-4 space-y-4">
              <div
                ref={mapRef}
                className="w-full h-64 rounded-lg border-2 border-primary/20 bg-background"
              />
              <div className="text-sm text-foreground/70">
                {clientData.latitude && clientData.longitude ? (
                  <p>
                    📍 Ubicación: {clientData.latitude.toFixed(4)}, {clientData.longitude.toFixed(4)}
                  </p>
                ) : (
                  <p>Haz clic o arrastra el marcador para seleccionar tu ubicación</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Botón Guardar */}
        <Button
          onClick={handleSave}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-lg text-secondary-foreground font-semibold py-5 transform hover:scale-105 transition-all"
        >
          {isSubmitting ? "Guardando..." : "Guardar Datos"}
        </Button>
      </div>
    </div>
  );
}
