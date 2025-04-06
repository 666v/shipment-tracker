import type { ShipmentStatus } from "./types"

// This is a mock service that simulates tracking SMSA shipments
// In a real application, this would make API calls to the SMSA tracking API
export async function trackShipments(trackingNumbers: string[]): Promise<ShipmentStatus[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return trackingNumbers.map((number) => generateMockShipmentStatus(number))
}

function generateMockShipmentStatus(trackingNumber: string): ShipmentStatus {
  // Generate deterministic but seemingly random data based on the tracking number
  const hash = hashString(trackingNumber)

  // Use the hash to determine the shipment status
  const statusOptions = ["Delivered", "In Transit", "Pending", "Exception"]
  const statusIndex = hash % statusOptions.length
  const status = statusOptions[statusIndex]

  // Generate origin and destination cities - using Saudi cities in Arabic
  const cities = ["الرياض", "جدة", "الدمام", "مكة", "المدينة المنورة", "تبوك", "أبها", "الطائف", "الخبر", "الظهران"]
  const originIndex = (hash * 3) % cities.length
  const destIndex = (hash * 7) % cities.length

  // Generate dates
  const now = new Date()
  const dayOffset = (hash % 10) - 5 // -5 to +4 days
  const lastUpdateDate = new Date(now)
  lastUpdateDate.setDate(lastUpdateDate.getDate() + (dayOffset < 0 ? dayOffset : -1))

  const estimatedDeliveryDate = status === "Delivered" ? null : new Date(now)
  if (estimatedDeliveryDate) {
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + (hash % 5) + 1)
  }

  // Generate description based on status in Arabic
  let description = ""
  switch (status) {
    case "Delivered":
      description = "تم تسليم الشحنة"
      break
    case "In Transit":
      description = "الشحنة قيد النقل إلى الوجهة"
      break
    case "Pending":
      description = "تمت معالجة الشحنة للتسليم"
      break
    case "Exception":
      description = "استثناء في التسليم - يرجى الاتصال بخدمة العملاء"
      break
  }

  // Generate history events
  const history = generateShipmentHistory(trackingNumber, status, cities[originIndex], cities[destIndex])

  return {
    trackingNumber,
    status,
    description,
    origin: cities[originIndex],
    destination: cities[destIndex],
    lastUpdate: formatDate(lastUpdateDate),
    estimatedDelivery: estimatedDeliveryDate ? formatDate(estimatedDeliveryDate) : null,
    history,
  }
}

function generateShipmentHistory(trackingNumber: string, status: string, origin: string, destination: string) {
  const hash = hashString(trackingNumber)
  const now = new Date()
  const events = []

  // Shipment created
  const createdDate = new Date(now)
  createdDate.setDate(createdDate.getDate() - (hash % 10) - 1)
  events.push({
    date: formatDate(createdDate),
    location: origin,
    status: "Created",
    description: "تم استلام معلومات الشحنة",
  })

  // Picked up
  const pickedUpDate = new Date(createdDate)
  pickedUpDate.setHours(pickedUpDate.getHours() + 4 + (hash % 8))
  events.push({
    date: formatDate(pickedUpDate),
    location: origin,
    status: "Picked Up",
    description: "تم استلام الشحنة من قبل مندوب التوصيل",
  })

  // In transit events
  if (status !== "Pending") {
    const transitDate = new Date(pickedUpDate)
    transitDate.setHours(transitDate.getHours() + 12 + (hash % 24))
    events.push({
      date: formatDate(transitDate),
      location: "مركز الفرز",
      status: "In Transit",
      description: "يتم معالجة الشحنة في مركز الفرز",
    })

    // Add more transit events for longer shipments
    if (hash % 4 > 1) {
      const transitDate2 = new Date(transitDate)
      transitDate2.setHours(transitDate2.getHours() + 8 + (hash % 10))
      events.push({
        date: formatDate(transitDate2),
        location: "المركز الإقليمي",
        status: "In Transit",
        description: "الشحنة في طريقها إلى الوجهة",
      })
    }
  }

  // Out for delivery / delivered
  if (status === "Delivered" || status === "In Transit") {
    const outForDeliveryDate = new Date(now)
    outForDeliveryDate.setHours(outForDeliveryDate.getHours() - 4 - (hash % 6))

    events.push({
      date: formatDate(outForDeliveryDate),
      location: destination,
      status: "Out for Delivery",
      description: "الشحنة خرجت للتسليم",
    })

    if (status === "Delivered") {
      const deliveredDate = new Date(outForDeliveryDate)
      deliveredDate.setHours(deliveredDate.getHours() + 2 + (hash % 4))

      events.push({
        date: formatDate(deliveredDate),
        location: destination,
        status: "Delivered",
        description: "تم تسليم الشحنة",
      })
    }
  }

  // Exception
  if (status === "Exception") {
    const exceptionDate = new Date(now)
    exceptionDate.setHours(exceptionDate.getHours() - 12)

    events.push({
      date: formatDate(exceptionDate),
      location: destination,
      status: "Exception",
      description: "استثناء في التسليم - العنوان غير قابل للوصول",
    })
  }

  return events
}

// Simple string hash function
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Format date to readable string
function formatDate(date: Date): string {
  return date.toLocaleString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

