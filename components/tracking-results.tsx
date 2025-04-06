"use client"

import { useState } from "react"
import { Package, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ShipmentStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TrackingResultsProps {
  results: ShipmentStatus[]
}

export function TrackingResults({ results }: TrackingResultsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResults = results.filter(
    (result) =>
      result.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">لم يتم العثور على نتائج تتبع.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">نتائج التتبع</h2>
        <Badge variant="outline">{results.length}</Badge>
      </div>

      <div className="relative">
        <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="تصفية النتائج..."
          className="pr-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">الكل ({results.length})</TabsTrigger>
          <TabsTrigger value="delivered">
            تم التسليم ({results.filter((r) => r.status === "Delivered").length})
          </TabsTrigger>
          <TabsTrigger value="in-transit">
            قيد النقل ({results.filter((r) => r.status === "In Transit").length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            قيد الانتظار ({results.filter((r) => r.status === "Pending").length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4">
            {filteredResults.map((shipment) => (
              <ShipmentCard key={shipment.trackingNumber} shipment={shipment} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="delivered" className="mt-4">
          <div className="grid gap-4">
            {filteredResults
              .filter((r) => r.status === "Delivered")
              .map((shipment) => (
                <ShipmentCard key={shipment.trackingNumber} shipment={shipment} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="in-transit" className="mt-4">
          <div className="grid gap-4">
            {filteredResults
              .filter((r) => r.status === "In Transit")
              .map((shipment) => (
                <ShipmentCard key={shipment.trackingNumber} shipment={shipment} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <div className="grid gap-4">
            {filteredResults
              .filter((r) => r.status === "Pending")
              .map((shipment) => (
                <ShipmentCard key={shipment.trackingNumber} shipment={shipment} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ShipmentCard({ shipment }: { shipment: ShipmentStatus }) {
  // Translate status to Arabic
  const translateStatus = (status: string) => {
    switch (status) {
      case "Delivered":
        return "تم التسليم"
      case "In Transit":
        return "قيد النقل"
      case "Pending":
        return "قيد الانتظار"
      case "Exception":
        return "استثناء"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <CardTitle className="text-base">{shipment.trackingNumber}</CardTitle>
          </div>
          <StatusBadge status={shipment.status} />
        </div>
        <CardDescription>{shipment.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="grid grid-cols-2 text-sm">
            <span className="text-muted-foreground">المصدر:</span>
            <span>{shipment.origin}</span>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <span className="text-muted-foreground">الوجهة:</span>
            <span>{shipment.destination}</span>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <span className="text-muted-foreground">آخر تحديث:</span>
            <span>{shipment.lastUpdate}</span>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <span className="text-muted-foreground">التسليم المتوقع:</span>
            <span>{shipment.estimatedDelivery || "غير متاح"}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-start">
          <Button variant="outline" size="sm">
            عرض التفاصيل
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  // Translate status to Arabic
  const translateStatus = (status: string) => {
    switch (status) {
      case "Delivered":
        return "تم التسليم"
      case "In Transit":
        return "قيد النقل"
      case "Pending":
        return "قيد الانتظار"
      case "Exception":
        return "استثناء"
      default:
        return status
    }
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "px-2 py-0.5",
        status === "Delivered" && "bg-green-100 text-green-800 border-green-200",
        status === "In Transit" && "bg-blue-100 text-blue-800 border-blue-200",
        status === "Pending" && "bg-yellow-100 text-yellow-800 border-yellow-200",
        status === "Exception" && "bg-red-100 text-red-800 border-red-200",
      )}
    >
      {translateStatus(status)}
    </Badge>
  )
}

