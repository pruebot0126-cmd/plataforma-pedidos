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

    // Click en el mapa para colocar marcador
    mapInstance.current.on("click", (event: any) => {
      markerRef.current.setLatLng(event.latlng);
      setClientData((prev) => ({
        ...prev,
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      }));
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setClientData((prev) => ({
            ...prev,
            latitude,
            longitude,
            address: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
          }));

          if (mapInstance.current && markerRef.current) {
            mapInstance.current.setView([latitude, longitude], 15);
            markerRef.current.setLatLng([latitude, longitude]);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("No se pudo obtener tu ubicación. Por favor, coloca el marcador manualmente en el mapa.");
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientData.name.trim()) {
      alert("Por favor ingresa tu nombre");
      return;
    }

    if (!clientData.phone.trim()) {
      alert("Por favor ingresa tu teléfono");
      return;
    }

    if (clientData.latitude === null || clientData.longitude === null) {
      alert("Por favor selecciona tu ubicación en el mapa");
      return;
    }

    onSubmit(clientData);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
      <h3 className="mb-4 font-serif text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
        <User className="h-5 w-5" />
        Tus Datos de Entrega
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            value={clientData.name}
            onChange={(e) =>
              setClientData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Tu nombre"
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
            <Phone className="h-4 w-4" />
            Teléfono *
          </label>
          <input
            type="tel"
            value={clientData.phone}
            onChange={(e) =>
              setClientData((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="Tu teléfono"
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            Ubicación *
          </label>

          <Button
            type="button"
            onClick={() => setShowMap(!showMap)}
            variant="outline"
            className="w-full mb-3 text-xs sm:text-sm"
          >
            {showMap ? "Cerrar Mapa" : "Abrir Mapa"}
          </Button>

          {showMap && (
            <div className="space-y-2">
              <div
                ref={mapRef}
                className="w-full h-80 rounded-lg border border-border overflow-hidden bg-gray-100"
              />
              <Button
                type="button"
                onClick={getCurrentLocation}
                variant="secondary"
                className="w-full text-xs sm:text-sm"
              >
                📍 Usar Mi Ubicación Actual
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Haz clic en el mapa o arrastra el marcador para seleccionar tu ubicación
              </p>
            </div>
          )}

          {clientData.latitude && clientData.longitude && (
            <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-foreground">
              <p>✓ Ubicación seleccionada: {clientData.latitude.toFixed(4)}, {clientData.longitude.toFixed(4)}</p>
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !clientData.name || !clientData.phone || !clientData.latitude}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 sm:py-3 text-sm sm:text-base"
        >
          {isSubmitting ? "Guardando..." : "Guardar Datos"}
        </Button>
      </form>
    </div>
  );
}
