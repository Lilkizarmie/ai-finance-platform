'use client'

import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { BarLoader } from 'react-spinners'
import { Upload, TrendingUp, AlertTriangle, Lightbulb, ShoppingCart } from 'lucide-react'
import { ProductOverview } from './_components/product-overview'
import { PerformanceMetrics } from './_components/performance-metrics'
import { SalesTrends } from './_components/sales-trends'
import { CustomerInsights } from './_components/customer-insights'
import { AnomalyDetection } from './_components/anomaly-detection'
import { ImportDataModal } from './_components/import-data-modal'
import { useState } from 'react'

export default function ProductPage() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  return (
    <div className="space-y-8 p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight gradient-title">
            Product Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered insights and analytics for your products
          </p>
        </div>
        <Button onClick={() => setIsImportModalOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Import Data
        </Button>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <TrendingUp className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="trends">
            <Lightbulb className="mr-2 h-4 w-4" />
            Trends & Forecasts
          </TabsTrigger>
          <TabsTrigger value="customers">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Customer Insights
          </TabsTrigger>
          <TabsTrigger value="anomalies">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Anomalies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<BarLoader width="100%" color="#32AE4C" />}>
            <ProductOverview />
          </Suspense>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Suspense fallback={<BarLoader width="100%" color="#32AE4C" />}>
            <PerformanceMetrics />
          </Suspense>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Suspense fallback={<BarLoader width="100%" color="#32AE4C" />}>
            <SalesTrends />
          </Suspense>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Suspense fallback={<BarLoader width="100%" color="#32AE4C" />}>
            <CustomerInsights />
          </Suspense>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Suspense fallback={<BarLoader width="100%" color="#32AE4C" />}>
            <AnomalyDetection />
          </Suspense>
        </TabsContent>
      </Tabs>

      {/* Import Data Modal */}
      <ImportDataModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />
    </div>
  )
}
