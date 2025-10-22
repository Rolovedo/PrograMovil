// components/locationSelector/markers/DestinationMarker.js
import React, { memo } from 'react';

const DestinationMarker = memo(({ Marker, coordinate }) => {
  if (!Marker || !coordinate) return null;

  return (
    <Marker
      coordinate={coordinate}
      title="Destino del servicio"
      description="Punto de entrega"
      identifier="destination"
      // ✅ Usar marcador nativo rojo
      pinColor="red"
      // ✅ Optimizaciones para evitar parpadeo
      flat={true}
      tracksViewChanges={false}
    />
  );
});

DestinationMarker.displayName = 'DestinationMarker';

export default DestinationMarker;