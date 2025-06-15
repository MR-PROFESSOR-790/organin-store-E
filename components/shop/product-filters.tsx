"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Star } from "lucide-react"

interface Filters {
  category: string
  priceRange: number[]
  rating: number
}

interface ProductFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

const categories = [
  { id: "", label: "All Categories" },
  { id: "fresh-produce", label: "Fresh Produce" },
  { id: "pantry", label: "Pantry Essentials" },
  { id: "dairy", label: "Dairy & Eggs" },
  { id: "snacks", label: "Healthy Snacks" },
]

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const updateFilters = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Category</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.category} onValueChange={(value) => updateFilters("category", value)}>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id} className="text-sm">
                  {category.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Price Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters("priceRange", value)}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={filters.rating.toString()}
            onValueChange={(value) => updateFilters("rating", Number.parseInt(value))}
          >
            {[0, 4, 4.5].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1">
                  {rating === 0 ? (
                    <span className="text-sm">All Ratings</span>
                  ) : (
                    <>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm">& up</span>
                    </>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
