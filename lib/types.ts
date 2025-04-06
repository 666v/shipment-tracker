export interface ShipmentStatus {
  trackingNumber: string
  status: string
  description: string
  origin: string
  destination: string
  lastUpdate: string
  estimatedDelivery: string | null
  history: ShipmentEvent[]
}

export interface ShipmentEvent {
  date: string
  location: string
  status: string
  description: string
}

