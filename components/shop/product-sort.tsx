"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductSortProps {
  sortBy: string
  onSortChange: (value: string) => void
}

export function ProductSort({ sortBy, onSortChange }: ProductSortProps) {
  return (
    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name">Name (A-Z)</SelectItem>
        <SelectItem value="price-low">Price (Low to High)</SelectItem>
        <SelectItem value="price-high">Price (High to Low)</SelectItem>
        <SelectItem value="rating">Highest Rated</SelectItem>
      </SelectContent>
    </Select>
  )
}
