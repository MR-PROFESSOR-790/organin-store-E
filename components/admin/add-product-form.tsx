"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"

interface ProductFormData {
  name: string
  description: string
  shortDescription: string
  price: string
  comparePrice: string
  category: string
  subcategory: string
  brand: string
  sku: string
  stock: string
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  tags: string[]
  images: string[]
  isOrganic: boolean
  isFeatured: boolean
  isActive: boolean
  nutritionFacts: {
    calories: string
    protein: string
    carbs: string
    fat: string
    fiber: string
  }
  allergens: string[]
  origin: string
  expiryDate: string
  storageInstructions: string
}

const categories = [
  "Fresh Produce",
  "Pantry",
  "Dairy & Eggs",
  "Meat & Seafood",
  "Beverages",
  "Snacks",
  "Frozen Foods",
  "Health & Wellness",
  "Baby & Kids",
  "Household",
]

const subcategories: Record<string, string[]> = {
  "Fresh Produce": ["Fruits", "Vegetables", "Herbs", "Salads"],
  Pantry: ["Grains", "Legumes", "Oils", "Spices", "Condiments"],
  "Dairy & Eggs": ["Milk", "Cheese", "Yogurt", "Eggs", "Butter"],
  "Meat & Seafood": ["Chicken", "Beef", "Fish", "Seafood"],
  Beverages: ["Juices", "Tea", "Coffee", "Water", "Smoothies"],
  Snacks: ["Nuts", "Dried Fruits", "Crackers", "Bars"],
  "Frozen Foods": ["Vegetables", "Fruits", "Meals", "Desserts"],
  "Health & Wellness": ["Supplements", "Superfoods", "Protein"],
  "Baby & Kids": ["Baby Food", "Snacks", "Drinks"],
  Household: ["Cleaning", "Personal Care", "Kitchen"],
}

const commonAllergens = ["Gluten", "Dairy", "Nuts", "Soy", "Eggs", "Fish", "Shellfish", "Sesame"]

export function AddProductForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentTag, setCurrentTag] = useState("")
  const [currentAllergen, setCurrentAllergen] = useState("")

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    shortDescription: "",
    price: "",
    comparePrice: "",
    category: "",
    subcategory: "",
    brand: "",
    sku: "",
    stock: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    tags: [],
    images: [],
    isOrganic: false,
    isFeatured: false,
    isActive: true,
    nutritionFacts: {
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      fiber: "",
    },
    allergens: [],
    origin: "",
    expiryDate: "",
    storageInstructions: "",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedInputChange = (parent: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof ProductFormData] as any),
        [field]: value,
      },
    }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addAllergen = () => {
    if (currentAllergen && !formData.allergens.includes(currentAllergen)) {
      setFormData((prev) => ({
        ...prev,
        allergens: [...prev.allergens, currentAllergen],
      }))
      setCurrentAllergen("")
    }
  }

  const removeAllergen = (allergenToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      allergens: prev.allergens.filter((allergen) => allergen !== allergenToRemove),
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      // For now, we'll create placeholder URLs
      const newImages = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(file.name)}`,
      )
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }))
    }
  }

  const removeImage = (imageToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== imageToRemove),
    }))
  }

  const generateSKU = () => {
    const prefix = formData.category.substring(0, 2).toUpperCase()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    const sku = `${prefix}-${random}`
    setFormData((prev) => ({ ...prev, sku }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.category || !formData.stock) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }

      // In a real app, you'd send this to your API
      console.log("Product data to submit:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Success!",
        description: "Product has been created successfully",
      })

      // Redirect back to products page
      router.push("/admin/products")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                    placeholder="Brief product description"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Detailed product description"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                      placeholder="Product brand"
                    />
                  </div>
                  <div>
                    <Label htmlFor="origin">Origin</Label>
                    <Input
                      id="origin"
                      value={formData.origin}
                      onChange={(e) => handleInputChange("origin", e.target.value)}
                      placeholder="Country/region of origin"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="comparePrice">Compare Price ($)</Label>
                    <Input
                      id="comparePrice"
                      type="number"
                      step="0.01"
                      value={formData.comparePrice}
                      onChange={(e) => handleInputChange("comparePrice", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleInputChange("stock", e.target.value)}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <div className="flex gap-2">
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => handleInputChange("sku", e.target.value)}
                        placeholder="Product SKU"
                      />
                      <Button type="button" variant="outline" onClick={generateSKU}>
                        Generate
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories & Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Categories & Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Select
                      value={formData.subcategory}
                      onValueChange={(value) => handleInputChange("subcategory", value)}
                      disabled={!formData.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.category &&
                          subcategories[formData.category]?.map((subcategory) => (
                            <SelectItem key={subcategory} value={subcategory}>
                              {subcategory}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">Weight (g)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Dimensions (cm)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      type="number"
                      value={formData.dimensions.length}
                      onChange={(e) => handleNestedInputChange("dimensions", "length", e.target.value)}
                      placeholder="Length"
                    />
                    <Input
                      type="number"
                      value={formData.dimensions.width}
                      onChange={(e) => handleNestedInputChange("dimensions", "width", e.target.value)}
                      placeholder="Width"
                    />
                    <Input
                      type="number"
                      value={formData.dimensions.height}
                      onChange={(e) => handleNestedInputChange("dimensions", "height", e.target.value)}
                      placeholder="Height"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="storageInstructions">Storage Instructions</Label>
                  <Textarea
                    id="storageInstructions"
                    value={formData.storageInstructions}
                    onChange={(e) => handleInputChange("storageInstructions", e.target.value)}
                    placeholder="How to store this product"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Nutrition & Allergens */}
            <Card>
              <CardHeader>
                <CardTitle>Nutrition & Allergens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Nutrition Facts (per 100g)</Label>
                  <div className="grid grid-cols-5 gap-2">
                    <Input
                      type="number"
                      value={formData.nutritionFacts.calories}
                      onChange={(e) => handleNestedInputChange("nutritionFacts", "calories", e.target.value)}
                      placeholder="Calories"
                    />
                    <Input
                      type="number"
                      value={formData.nutritionFacts.protein}
                      onChange={(e) => handleNestedInputChange("nutritionFacts", "protein", e.target.value)}
                      placeholder="Protein (g)"
                    />
                    <Input
                      type="number"
                      value={formData.nutritionFacts.carbs}
                      onChange={(e) => handleNestedInputChange("nutritionFacts", "carbs", e.target.value)}
                      placeholder="Carbs (g)"
                    />
                    <Input
                      type="number"
                      value={formData.nutritionFacts.fat}
                      onChange={(e) => handleNestedInputChange("nutritionFacts", "fat", e.target.value)}
                      placeholder="Fat (g)"
                    />
                    <Input
                      type="number"
                      value={formData.nutritionFacts.fiber}
                      onChange={(e) => handleNestedInputChange("nutritionFacts", "fiber", e.target.value)}
                      placeholder="Fiber (g)"
                    />
                  </div>
                </div>

                <div>
                  <Label>Allergens</Label>
                  <div className="flex gap-2 mb-2">
                    <Select value={currentAllergen} onValueChange={setCurrentAllergen}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select allergen" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonAllergens.map((allergen) => (
                          <SelectItem key={allergen} value={allergen}>
                            {allergen}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="outline" onClick={addAllergen}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.allergens.map((allergen) => (
                      <Badge key={allergen} variant="destructive" className="flex items-center gap-1">
                        {allergen}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeAllergen(allergen)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Status */}
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Active</Label>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isFeatured">Featured</Label>
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isOrganic">Organic</Label>
                  <Switch
                    id="isOrganic"
                    checked={formData.isOrganic}
                    onCheckedChange={(checked) => handleInputChange("isOrganic", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="images">Upload Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("images")?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Images
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">Upload up to 10 images (JPG, PNG, WebP)</p>
                  </div>
                </div>

                {formData.images.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Images</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product ${index + 1}`}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => removeImage(image)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Creating Product..." : "Create Product"}
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
