import React, { memo } from 'react';

const DestinationMarker = memo(({ Marker, coordinate }) => {
  if (!Marker || !coordinate) return null;

  return (
    <Marker
      coordinate={coordinate}
      title="Destino del servicio"
      description="Punto de entrega"
      identifier="destination"
      pinColor="red"
      flat={true} //evita renderizar
      tracksViewChanges={false}
    />
  );
});

DestinationMarker.displayName = 'DestinationMarker';

export default DestinationMarker;