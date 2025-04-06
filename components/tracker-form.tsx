"use client"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { TrackingResults } from "@/components/tracking-results"
import { trackShipments } from "@/lib/tracking-service"
import type { ShipmentStatus } from "@/lib/types"

export function TrackerForm() {
  const [trackingNumbers, setTrackingNumbers] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<ShipmentStatus[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingNumbers.trim()) {
      toast({
        title: "لا توجد أرقام تتبع",
        description: "الرجاء إدخال رقم تتبع واحد على الأقل",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Parse tracking numbers (comma or newline separated)
      const numbers = trackingNumbers
        .split(/[\n,]/)
        .map((num) => num.trim())
        .filter((num) => num.length > 0)

      if (numbers.length === 0) {
        toast({
          title: "لا توجد أرقام تتبع صالحة",
          description: "الرجاء إدخال أرقام تتبع صالحة",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const trackingResults = await trackShipments(numbers)
      setResults(trackingResults)
      setHasSearched(true)

      toast({
        title: "اكتمل التتبع",
        description: `تم العثور على معلومات لـ ${trackingResults.length} شحنات`,
      })
    } catch (error) {
      toast({
        title: "خطأ في تتبع الشحنات",
        description: "حدثت مشكلة في تتبع شحناتك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="أدخل أرقام التتبع (واحد في كل سطر أو مفصولة بفواصل)"
          value={trackingNumbers}
          onChange={(e) => setTrackingNumbers(e.target.value)}
          className="min-h-[120px]"
        />
        <div className="flex justify-start">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            تتبع الشحنات
          </Button>
        </div>
      </form>

      {hasSearched && <TrackingResults results={results} />}
    </div>
  )
}

