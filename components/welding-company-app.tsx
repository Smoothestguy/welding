'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Book, Package, HardHat, Zap, Phone, Search } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { AnimatePresence } from 'framer-motion'
import { productImageConfig } from '@/config/images'
import { ProductImage } from '@/components/product-image'

type Product = {
  id: string
  name: string
  price: number
  category: string
  subcategory: string
  description: string
  sku: string
  inStock: boolean
  image?: string
}

type CartItem = Product & { quantity: number }

type Class = {
  id: string
  name: string
  duration: string
  description: string[]
  ctaText: string
  slug: string
}

export function WeldingCompanyAppComponent() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')
  const router = useRouter()
  const [displayLimit, setDisplayLimit] = useState(6)

  const products: Product[] = [
    {
      id: 'WES001',
      name: 'Pro Stick Welding Kit',
      price: 299.99,
      category: 'Welding Equipment and Supplies',
      subcategory: 'Stick Welding (SMAW) Equipment',
      description: 'Complete kit for professional stick welding, includes electrode holder, ground clamp, and cables.',
      sku: 'SMAW-KIT-001',
      inStock: true,
      image: 'stick-welding-kit.jpg'
    },
    {
      id: 'WES002',
      name: 'Heavy Duty 220V Extension Cord',
      price: 89.99,
      category: 'Welding Equipment and Supplies',
      subcategory: 'Power Supply Accessories',
      description: '50ft heavy-duty extension cord, perfect for high-power welding equipment.',
      sku: 'PWR-CORD-220V',
      inStock: true,
      image: 'extension-cord.jpg'
    },
    {
      id: 'ABR001',
      name: 'Premium Flap Disc Set',
      price: 34.99,
      category: 'Abrasives',
      subcategory: 'Flap Discs',
      description: 'Set of 5 flap discs with varying grits for versatile surface preparation and finishing.',
      sku: 'FLAP-SET-001',
      inStock: true
    },
    {
      id: 'ABR002',
      name: 'Heavy-Duty Grinding Wheel Pack',
      price: 45.99,
      category: 'Abrasives',
      subcategory: 'Grinding Wheels',
      description: 'Pack of 3 durable grinding wheels for tough metal removal tasks.',
      sku: 'GRIND-WHEEL-001',
      inStock: true
    },
    {
      id: 'ABR003',
      name: 'Premium Cut Off Wheel Pack',
      price: 29.99,
      category: 'Abrasives',
      subcategory: 'Cut Off Wheels',
      description: 'Pack of 10 high-performance cut off wheels for precise metal cutting.',
      sku: 'CUT-WHEEL-001',
      inStock: true
    },
    {
      id: 'ABR004',
      name: 'Resin Fiber Disc Set',
      price: 19.99,
      category: 'Abrasives',
      subcategory: 'Resin Fiber Discs',
      description: 'Set of 25 resin fiber discs in various grits for versatile surface preparation.',
      sku: 'FIBER-DISC-001',
      inStock: true
    },
    {
      id: 'ABR005',
      name: 'Mill Scale Removal Flex Cut Disc',
      price: 7.99,
      category: 'Abrasives',
      subcategory: 'Mill Scale Removal',
      description: 'Flexible cutting disc designed specifically for mill scale removal.',
      sku: 'FLEX-CUT-001',
      inStock: true
    },
    {
      id: 'ABR006',
      name: 'Cone Wheel Set',
      price: 34.99,
      category: 'Abrasives',
      subcategory: 'Cone & Plug Wheels',
      description: 'Set of 5 cone wheels for intricate grinding and finishing work.',
      sku: 'CONE-WHEEL-001',
      inStock: true
    },
    {
      id: 'ABR007',
      name: 'Grinder Backing Pad',
      price: 12.99,
      category: 'Abrasives',
      subcategory: 'Grinder Accessories',
      description: 'Universal backing pad for angle grinders, compatible with various disc types.',
      sku: 'BACK-PAD-001',
      inStock: true
    },
    {
      id: 'ABR008',
      name: 'Unmounted Flap Wheel',
      price: 8.99,
      category: 'Abrasives',
      subcategory: 'Unmounted Flap Wheels',
      description: '4-inch unmounted flap wheel for versatile sanding and finishing applications.',
      sku: 'FLAP-UNMOUNT-001',
      inStock: true
    },
    {
      id: 'ABR009',
      name: 'Mounted Flap Wheel',
      price: 11.99,
      category: 'Abrasives',
      subcategory: 'Mounted Flap Wheels',
      description: '3-inch mounted flap wheel with 1/4-inch shank for use with power drills.',
      sku: 'FLAP-MOUNT-001',
      inStock: true
    },
    {
      id: 'ABR010',
      name: 'Knotted Wire Wheel Brush',
      price: 15.99,
      category: 'Abrasives',
      subcategory: 'Wire Brushes',
      description: '4-inch knotted wire wheel brush for heavy-duty cleaning and rust removal.',
      sku: 'WIRE-BRUSH-001',
      inStock: true
    },
    {
      id: 'ABR011',
      name: 'Cup Wire Wheel',
      price: 18.99,
      category: 'Abrasives',
      subcategory: 'Cup Wire Wheels',
      description: '3-inch cup wire wheel for angle grinders, ideal for weld cleaning and paint removal.',
      sku: 'CUP-WIRE-001',
      inStock: true
    },
    {
      id: 'ABR012',
      name: 'Dynafile Belt Pack',
      price: 24.99,
      category: 'Abrasives',
      subcategory: 'Dynafile Belts',
      description: 'Pack of 10 Dynafile belts in assorted grits for precision filing and finishing.',
      sku: 'DYNA-BELT-001',
      inStock: true
    },
    {
      id: 'ABR013',
      name: 'Scotchbrite Pad Set',
      price: 9.99,
      category: 'Abrasives',
      subcategory: 'Scotchbrite Pads',
      description: 'Set of 5 Scotchbrite pads for general purpose cleaning and surface preparation.',
      sku: 'SCOTCH-PAD-001',
      inStock: true
    },
    {
      id: 'ABR014',
      name: 'FX Paint Removal Disc',
      price: 6.99,
      category: 'Abrasives',
      subcategory: 'FX Paint Removal',
      description: 'Specialized disc for quick and efficient paint removal without damaging the substrate.',
      sku: 'FX-PAINT-001',
      inStock: true
    },
    {
      id: 'ABR015',
      name: 'Blendex Linear Drum',
      price: 39.99,
      category: 'Abrasives',
      subcategory: 'Blendex Products',
      description: 'Blendex linear drum for creating consistent linear finishes on metal surfaces.',
      sku: 'BLENDEX-DRUM-001',
      inStock: true
    },
    {
      id: 'ABR016',
      name: 'Stainless Steel Blending Disc',
      price: 8.99,
      category: 'Abrasives',
      subcategory: 'Blendex Products',
      description: 'Blendex stainless steel blending disc for achieving uniform finishes on stainless steel.',
      sku: 'BLENDEX-DISC-001',
      inStock: true
    },
    {
      id: 'ABR017',
      name: 'Metal Finishing Kit',
      price: 49.99,
      category: 'Abrasives',
      subcategory: 'Finishing Kits',
      description: 'Comprehensive metal finishing kit including various abrasives for a perfect finish.',
      sku: 'FINISH-KIT-001',
      inStock: true
    },
    {
      id: 'ABR018',
      name: 'Sandpaper Variety Pack',
      price: 14.99,
      category: 'Abrasives',
      subcategory: 'Sand Paper',
      description: 'Pack of 50 sandpaper sheets in assorted grits for all your sanding needs.',
      sku: 'SAND-PAPER-001',
      inStock: true
    },
    {
      id: 'ABR019',
      name: 'Polishing Wheel',
      price: 22.99,
      category: 'Abrasives',
      subcategory: 'Polishing Wheels',
      description: '6-inch cotton polishing wheel for achieving high-gloss finishes on metals.',
      sku: 'POLISH-WHEEL-001',
      inStock: true
    },
    {
      id: 'ABR020',
      name: 'Metal Polishing Compound',
      price: 16.99,
      category: 'Abrasives',
      subcategory: 'Polishing Paste',
      description: 'High-quality metal polishing compound for use with polishing wheels.',
      sku: 'POLISH-PASTE-001',
      inStock: true
    },
    {
      id: 'ABR021',
      name: 'Linear Finish Belt',
      price: 7.99,
      category: 'Abrasives',
      subcategory: 'Linear Finish Belts',
      description: '1-inch x 42-inch belt for creating professional linear finishes on metal.',
      sku: 'LIN-BELT-001',
      inStock: true
    },
    {
      id: 'ABR022',
      name: 'Instant Polish Belt',
      price: 9.99,
      category: 'Abrasives',
      subcategory: 'Instant Polish Belts',
      description: '2-inch x 72-inch belt for rapid polishing of metal surfaces.',
      sku: 'POLISH-BELT-001',
      inStock: true
    },
    {
      id: 'ABR023',
      name: 'Cloth Drum Sander',
      price: 29.99,
      category: 'Abrasives',
      subcategory: 'Cloth Drum',
      description: '3-inch cloth drum sander with assorted sleeves for wood and metal sanding.',
      sku: 'CLOTH-DRUM-001',
      inStock: true
    },
    {
      id: 'ABR024',
      name: 'Pneumatic Drum Sander',
      price: 79.99,
      category: 'Abrasives',
      subcategory: 'Pneumatic Drums',
      description: 'Air-powered drum sander for efficient large surface sanding and finishing.',
      sku: 'PNEU-DRUM-001',
      inStock: true
    },
    {
      id: 'CTP001',
      name: 'Professional Cutting Torch Kit',
      price: 249.99,
      category: 'Cutting Torch Products',
      subcategory: 'Cutting Torch Kits',
      description: 'Complete oxy-fuel cutting torch kit with regulators, hoses, and cutting tips.',
      sku: 'CUT-KIT-001',
      inStock: true
    },
    {
      id: 'CTP002',
      name: 'Precision Oxygen Regulator',
      price: 129.99,
      category: 'Cutting Torch Products',
      subcategory: 'Oxygen and Acetylene Regulators',
      description: 'High-precision oxygen regulator for accurate gas flow control in cutting operations.',
      sku: 'OXY-REG-001',
      inStock: true
    },
    {
      id: 'CTP003',
      name: 'Quick Connect Torch System',
      price: 89.99,
      category: 'Cutting Torch Products',
      subcategory: 'Torch Quick Connectors',
      description: 'Universal quick connect system for easy torch attachment and removal.',
      sku: 'QUICK-CONN-001',
      inStock: true
    },
    {
      id: 'CTP004',
      name: 'Premium Grade Twin Hose Set',
      price: 129.99,
      category: 'Cutting Torch Products',
      subcategory: 'Hoses',
      description: '25ft twin hose set for oxygen and acetylene with certified connections.',
      sku: 'HOSE-SET-001',
      inStock: true
    },
    {
      id: 'CTP005',
      name: 'Professional Striker Kit',
      price: 24.99,
      category: 'Cutting Torch Products',
      subcategory: 'Strikers',
      description: 'Heavy-duty flint striker with spare flints for torch lighting.',
      sku: 'STRIKER-001',
      inStock: true
    },
    {
      id: 'CTP006',
      name: 'Industrial Soapstone Holder',
      price: 19.99,
      category: 'Cutting Torch Products',
      subcategory: 'Soapstone',
      description: 'Durable metal soapstone holder with marking stones included.',
      sku: 'SOAP-HOLD-001',
      inStock: true
    },
    {
      id: 'CTP007',
      name: 'High-Flow Oxygen Regulator',
      price: 159.99,
      category: 'Cutting Torch Products',
      subcategory: 'Oxygen and Acetylene Regulators',
      description: 'Precision oxygen regulator with dual gauges for accurate flow control.',
      sku: 'OXY-REG-001',
      inStock: true
    },
    {
      id: 'CTP008',
      name: 'Acetylene Regulator',
      price: 149.99,
      category: 'Cutting Torch Products',
      subcategory: 'Oxygen and Acetylene Regulators',
      description: 'Heavy-duty acetylene regulator with protective gauge guards.',
      sku: 'ACET-REG-001',
      inStock: true
    },
    {
      id: 'CTP009',
      name: 'Professional Cutting Head',
      price: 89.99,
      category: 'Cutting Torch Products',
      subcategory: 'Cutting Heads',
      description: 'High-quality cutting head with 75° angle for optimal cutting performance.',
      sku: 'CUT-HEAD-001',
      inStock: true
    },
    {
      id: 'CTP010',
      name: 'Ergonomic Torch Handle',
      price: 79.99,
      category: 'Cutting Torch Products',
      subcategory: 'Torch Handles',
      description: 'Comfortable grip torch handle with built-in safety features.',
      sku: 'TORCH-HAND-001',
      inStock: true
    },
    {
      id: 'CTP011',
      name: 'Replacement Gauge Set',
      price: 69.99,
      category: 'Cutting Torch Products',
      subcategory: 'Replacement Gauges',
      description: 'Pair of high-quality replacement gauges for oxygen regulators.',
      sku: 'GAUGE-SET-001',
      inStock: true
    },
    {
      id: 'CTP012',
      name: 'Flashback Arrestor Set',
      price: 89.99,
      category: 'Cutting Torch Products',
      subcategory: 'Flashback Arrestors',
      description: 'Pair of safety flashback arrestors for oxygen and fuel gas.',
      sku: 'FLASH-ARR-001',
      inStock: true
    },
    {
      id: 'CTP013',
      name: 'Heavy-Duty Cylinder Cap',
      price: 34.99,
      category: 'Cutting Torch Products',
      subcategory: 'Welding Cylinder Caps',
      description: 'Protective steel cap for gas cylinder valve protection.',
      sku: 'CYL-CAP-001',
      inStock: true
    },
    {
      id: 'CTP014',
      name: 'Rosebud Heating Tip',
      price: 59.99,
      category: 'Cutting Torch Products',
      subcategory: 'Torch Tips',
      description: 'Multi-flame rosebud tip for heating applications.',
      sku: 'ROSE-TIP-001',
      inStock: true
    },
    {
      id: 'CTP015',
      name: 'Precision Welding Tip Set',
      price: 79.99,
      category: 'Cutting Torch Products',
      subcategory: 'Torch Tips',
      description: 'Set of 5 welding tips for various material thicknesses.',
      sku: 'WELD-TIP-001',
      inStock: true
    },
    {
      id: 'CTP016',
      name: 'HVAC Brazing Tip Kit',
      price: 49.99,
      category: 'Cutting Torch Products',
      subcategory: 'Torch Tips',
      description: 'Specialized tips for HVAC brazing applications.',
      sku: 'HVAC-TIP-001',
      inStock: true
    },
    {
      id: 'CTP017',
      name: 'Professional Hose Repair Kit',
      price: 39.99,
      category: 'Cutting Torch Products',
      subcategory: 'Hose Repair Kits',
      description: 'Complete kit for repairing torch hoses with ferrules and connectors.',
      sku: 'HOSE-REP-001',
      inStock: true
    },
    {
      id: 'CTP018',
      name: 'Heavy-Duty Weed Burner',
      price: 129.99,
      category: 'Cutting Torch Products',
      subcategory: 'Weed Burners',
      description: 'Professional-grade weed burner attachment with 36" handle.',
      sku: 'WEED-BURN-001',
      inStock: true
    },
    {
      id: 'SG001',
      name: 'Auto-Darkening Welding Helmet',
      price: 159.99,
      category: 'Safety Gear',
      subcategory: 'Welding Helmets',
      description: 'Advanced auto-darkening welding helmet with wide viewing area and multiple shade settings.',
      sku: 'HELM-AUTO-001',
      inStock: true
    },
    {
      id: 'SG002',
      name: 'Premium Leather Welding Gloves',
      price: 34.99,
      category: 'Safety Gear',
      subcategory: 'Gloves',
      description: 'Heat-resistant, durable leather welding gloves for maximum hand protection.',
      sku: 'GLOVE-LTHR-001',
      inStock: true
    },
    {
      id: 'SG003',
      name: 'Impact-Resistant Safety Glasses',
      price: 24.99,
      category: 'Safety Gear',
      subcategory: 'Safety Glasses',
      description: 'ANSI Z87.1 certified safety glasses with anti-fog coating.',
      sku: 'GLASS-SAF-001',
      inStock: true
    },
    {
      id: 'SG004',
      name: 'Professional PAPR System',
      price: 899.99,
      category: 'Safety Gear',
      subcategory: 'PAPR Units',
      description: 'Complete powered air-purifying respirator system with battery and filters.',
      sku: 'PAPR-SYS-001',
      inStock: true
    },
    {
      id: 'SG005',
      name: 'Helmet Headgear Replacement',
      price: 39.99,
      category: 'Safety Gear',
      subcategory: 'Welding Helmet Parts',
      description: 'Adjustable ratchet headgear for most welding helmets.',
      sku: 'HELM-PART-001',
      inStock: true
    },
    {
      id: 'SG006',
      name: 'Clear Cover Lens Pack',
      price: 19.99,
      category: 'Safety Gear',
      subcategory: 'Clear Lenses',
      description: 'Pack of 10 clear protective cover lenses for welding helmets.',
      sku: 'LENS-CLR-001',
      inStock: true
    },
    {
      id: 'SG007',
      name: 'Universal Hard Hat Adapter',
      price: 29.99,
      category: 'Safety Gear',
      subcategory: 'Hard Hat Adapters',
      description: 'Compatible adapter for mounting welding helmet to hard hat.',
      sku: 'HAT-ADPT-001',
      inStock: true
    },
    {
      id: 'SG008',
      name: 'Professional Welding Goggles',
      price: 44.99,
      category: 'Safety Gear',
      subcategory: 'Welding Goggles',
      description: 'Flip-up welding goggles with adjustable strap.',
      sku: 'GOGG-001',
      inStock: true
    },
    {
      id: 'SG009',
      name: 'Fixed Shade Passive Lens',
      price: 14.99,
      category: 'Safety Gear',
      subcategory: 'Passive Lenses',
      description: 'Shade 10 passive welding filter lens, standard size.',
      sku: 'LENS-PAS-001',
      inStock: true
    },
    {
      id: 'SG010',
      name: 'Premium MIG Welding Gloves',
      price: 29.99,
      category: 'Safety Gear',
      subcategory: 'Welding Gloves',
      description: 'Heat-resistant MIG welding gloves with reinforced palm.',
      sku: 'GLOVE-MIG-001',
      inStock: true
    },
    {
      id: 'SG011',
      name: 'TIG Welding Gloves',
      price: 34.99,
      category: 'Safety Gear',
      subcategory: 'Welding Gloves',
      description: 'Fine-grain leather TIG gloves for maximum dexterity.',
      sku: 'GLOVE-TIG-001',
      inStock: true
    },
    {
      id: 'SG012',
      name: 'Heavy-Duty Stick Welding Gloves',
      price: 27.99,
      category: 'Safety Gear',
      subcategory: 'Welding Gloves',
      description: 'Extra-thick leather gloves for stick welding protection.',
      sku: 'GLOVE-STK-001',
      inStock: true
    },
    {
      id: 'SG013',
      name: 'Leather Drivers Gloves',
      price: 19.99,
      category: 'Safety Gear',
      subcategory: 'Welding Gloves',
      description: 'General purpose leather drivers gloves for material handling.',
      sku: 'GLOVE-DRV-001',
      inStock: true
    },
    {
      id: 'SG014',
      name: 'Premium Leather Welding Sleeves',
      price: 34.99,
      category: 'Safety Gear',
      subcategory: 'Leather Body Protection',
      description: '21-inch split leather sleeves with elastic ends.',
      sku: 'SLVE-001',
      inStock: true
    },
    {
      id: 'SG015',
      name: 'Heavy-Duty Welding Jacket',
      price: 89.99,
      category: 'Safety Gear',
      subcategory: 'Leather Body Protection',
      description: 'Full leather welding jacket with flame-resistant stitching.',
      sku: 'JACK-001',
      inStock: true
    },
    {
      id: 'SG016',
      name: 'Leather Welding Bib',
      price: 44.99,
      category: 'Safety Gear',
      subcategory: 'Leather Body Protection',
      description: 'Split leather bib with chest protection and adjustable straps.',
      sku: 'BIB-001',
      inStock: true
    },
    {
      id: 'SG017',
      name: 'Full Coverage Welding Apron',
      price: 49.99,
      category: 'Safety Gear',
      subcategory: 'Leather Body Protection',
      description: '24x36 inch leather apron with cross-back straps.',
      sku: 'APRN-001',
      inStock: true
    },
    {
      id: 'SG018',
      name: 'Leather Welding Cape',
      price: 54.99,
      category: 'Safety Gear',
      subcategory: 'Leather Body Protection',
      description: 'Cape-style leather protection for overhead welding.',
      sku: 'CAPE-001',
      inStock: true
    },
    {
      id: 'SG019',
      name: 'Professional Respirator Kit',
      price: 79.99,
      category: 'Safety Gear',
      subcategory: 'Respirators',
      description: 'Half-mask respirator with P100 filters for welding fumes.',
      sku: 'RESP-001',
      inStock: true
    },
    {
      id: 'SG020',
      name: 'Type I Hard Hat',
      price: 29.99,
      category: 'Safety Gear',
      subcategory: 'Hard Hats',
      description: 'ANSI certified hard hat with ratchet suspension.',
      sku: 'HAT-001',
      inStock: true
    },
    {
      id: 'SG021',
      name: 'Heavy-Duty Welding Blanket',
      price: 69.99,
      category: 'Safety Gear',
      subcategory: 'Welding Blankets',
      description: '6x8 ft fiberglass welding blanket for spark protection.',
      sku: 'BLNK-001',
      inStock: true
    },
    {
      id: 'SG022',
      name: 'Portable Welding Screen',
      price: 159.99,
      category: 'Safety Gear',
      subcategory: 'Welding Screens',
      description: '6x6 ft welding screen with frame and flame-resistant curtain.',
      sku: 'SCRN-001',
      inStock: true
    },
    {
      id: 'WM001',
      name: 'Pro MIG Welder 250A',
      price: 1299.99,
      category: 'Welding Machines',
      subcategory: 'MIG Welders (GMAW)',
      description: 'Professional-grade 250A MIG welder with digital display and multi-process capabilities.',
      sku: 'MIG-250A-001',
      inStock: true
    },
    {
      id: 'WM002',
      name: 'Advanced TIG Welder 200A',
      price: 1599.99,
      category: 'Welding Machines',
      subcategory: 'TIG Welders (GTAW)',
      description: 'High-frequency TIG welder with pulse function and AC/DC capabilities.',
      sku: 'TIG-200A-001',
      inStock: true
    },
    {
      id: 'WM003',
      name: 'Industrial Stick Welder 300A',
      price: 899.99,
      category: 'Welding Machines',
      subcategory: 'Stick Welders (SMAW)',
      description: 'Heavy-duty stick welder with hot start and arc force control.',
      sku: 'STICK-300A-001',
      inStock: true
    },
    {
      id: 'WM004',
      name: 'Multi-Process Welder 350A',
      price: 2499.99,
      category: 'Welding Machines',
      subcategory: 'Multi-Process Welders',
      description: 'Professional multi-process welder capable of MIG, TIG, and Stick welding with digital controls.',
      sku: 'MULTI-350A-001',
      inStock: true
    },
    {
      id: 'WM005',
      name: 'Compact Multi-Process 200A',
      price: 1899.99,
      category: 'Welding Machines',
      subcategory: 'Multi-Process Welders',
      description: 'Portable multi-process welder ideal for shop or field use.',
      sku: 'MULTI-200A-001',
      inStock: true
    },
    {
      id: 'WM006',
      name: 'Professional Plasma Cutter 65A',
      price: 1299.99,
      category: 'Welding Machines',
      subcategory: 'Plasma Cutters',
      description: '65-amp plasma cutting system with built-in air compressor.',
      sku: 'PLASMA-65A-001',
      inStock: true
    },
    {
      id: 'WM007',
      name: 'Heavy-Duty Plasma Cutter 85A',
      price: 1799.99,
      category: 'Welding Machines',
      subcategory: 'Plasma Cutters',
      description: 'Industrial plasma cutter with CNC interface capability.',
      sku: 'PLASMA-85A-001',
      inStock: true
    },
    {
      id: 'WM008',
      name: 'Plasma Cutting Guide Kit',
      price: 199.99,
      category: 'Welding Machines',
      subcategory: 'Plasma Cutters & Accessories',
      description: 'Complete guide kit for precise plasma cutting operations.',
      sku: 'PLASMA-ACC-001',
      inStock: true
    },
    {
      id: 'WM009',
      name: 'Engine Driven Welder 400A',
      price: 4999.99,
      category: 'Welding Machines',
      subcategory: 'Engine Driven Welders',
      description: 'Diesel-powered welder generator with multi-process capabilities.',
      sku: 'ENGINE-400A-001',
      inStock: true
    },
    {
      id: 'WM010',
      name: 'Portable Engine Welder 250A',
      price: 3499.99,
      category: 'Welding Machines',
      subcategory: 'Engine Driven Welders',
      description: 'Gas-powered portable welder with 11kW generator power.',
      sku: 'ENGINE-250A-001',
      inStock: true
    },
    {
      id: 'WM011',
      name: 'Annual Service Kit - Engine Welder',
      price: 249.99,
      category: 'Welding Machines',
      subcategory: 'Welder Service Kits',
      description: 'Complete maintenance kit including filters, oil, and spark plug.',
      sku: 'SERVICE-KIT-001',
      inStock: true
    },
    {
      id: 'WM012',
      name: 'MIG Service Kit',
      price: 149.99,
      category: 'Welding Machines',
      subcategory: 'Welder Service Kits',
      description: 'Maintenance kit for MIG welders including drive rolls and contact tips.',
      sku: 'MIG-KIT-001',
      inStock: true
    },
    {
      id: 'WM013',
      name: 'Digital Sync Cartridge',
      price: 299.99,
      category: 'Welding Machines',
      subcategory: 'Sync Cartridges',
      description: 'Advanced synchronization cartridge for automated welding systems.',
      sku: 'SYNC-001',
      inStock: true
    },
    {
      id: 'WM014',
      name: 'Wireless Sync Module',
      price: 399.99,
      category: 'Welding Machines',
      subcategory: 'Sync Cartridges',
      description: 'Wireless synchronization module for remote welding control.',
      sku: 'SYNC-WIFI-001',
      inStock: true
    },
    {
      id: 'MC001',
      name: 'MIG Contact Tip Set',
      price: 19.99,
      category: 'MIG Consumables',
      subcategory: 'MIG Nozzles',
      description: 'Set of 10 copper MIG contact tips for precise wire feeding and arc stability.',
      sku:  'MIG-TIP-001',
      inStock: true
    },
    {
      id: 'MC002',
      name: 'MIG Gun Liner',
      price: 24.99,
      category: 'MIG Consumables',
      subcategory: 'MIG Gun Liners',
      description: '15ft MIG gun liner for smooth wire feeding in MIG welding guns.',
      sku: 'MIG-LINER-001',
      inStock: true
    },
    {
      id: 'MC003',
      name: 'Standard MIG Nozzle',
      price: 8.99,
      category: 'MIG Consumables',
      subcategory: 'MIG Nozzles',
      description: 'Conical nozzle for general purpose MIG welding applications.',
      sku: 'MIG-NOZ-001',
      inStock: true
    },
    {
      id: 'MC004',
      name: 'Heavy Duty MIG Nozzle',
      price: 12.99,
      category: 'MIG Consumables',
      subcategory: 'MIG Nozzles',
      description: 'Heavy-duty nozzle with spatter resistance coating.',
      sku: 'MIG-NOZ-002',
      inStock: true
    },
    {
      id: 'MC005',
      name: 'Spot Welding Nozzle',
      price: 14.99,
      category: 'MIG Consumables',
      subcategory: 'MIG Nozzles',
      description: 'Specialized nozzle for spot welding applications.',
      sku: 'MIG-NOZ-003',
      inStock: true
    },
    {
      id: 'MC006',
      name: '0.035" Contact Tips 10-Pack',
      price: 15.99,
      category: 'MIG Consumables',
      subcategory: 'Contact Tips',
      description: '10-pack of precision 0.035" contact tips for MIG welding.',
      sku: 'MIG-TIP-035',
      inStock: true
    },
    {
      id: 'MC007',
      name: '0.045" Contact Tips 10-Pack',
      price: 17.99,
      category: 'MIG Consumables',
      subcategory: 'Contact Tips',
      description: '10-pack of heavy-duty 0.045" contact tips.',
      sku: 'MIG-TIP-045',
      inStock: true
    },
    {
      id: 'MC008',
      name: 'Standard MIG Diffuser',
      price: 9.99,
      category: 'MIG Consumables',
      subcategory: 'MIG Diffusers',
      description: 'Gas diffuser for even shielding gas distribution.',
      sku: 'MIG-DIFF-001',
      inStock: true
    },
    {
      id: 'MC009',
      name: 'Heavy Duty MIG Diffuser',
      price: 12.99,
      category: 'MIG Consumables',
      subcategory: 'MIG Diffusers',
      description: 'Extended life gas diffuser with improved cooling.',
      sku: 'MIG-DIFF-002',
      inStock: true
    },
    {
      id: 'MC010',
      name: 'Steel Wire Liner 15ft',
      price: 22.99,
      category: 'MIG Consumables',
      subcategory: 'MIG Gun Liners',
      description: '15ft steel wire liner for .023"-.035" wire.',
      sku: 'MIG-LINER-002',
      inStock: true
    },
    {
      id: 'MC011',
      name: 'Teflon Wire Liner 15ft',
      price: 29.99,
      category: 'MIG Consumables',
      subcategory: 'MIG Gun Liners',
      description: '15ft teflon-lined conduit for aluminum wire.',
      sku: 'MIG-LINER-003',
      inStock: true
    },
    {
      id: 'MC012',
      name: 'Professional MIG Gun 300A',
      price: 249.99,
      category: 'MIG Consumables',
      subcategory: 'MIG Guns',
      description: '300A air-cooled MIG gun with 15ft cable.',
      sku: 'MIG-GUN-300',
      inStock: true
    },
    {
      id: 'MC013',
      name: 'Heavy Duty MIG Gun 400A',
      price: 329.99,
      category: 'MIG Consumables',
      subcategory: 'MIG Guns',
      description: '400A water-cooled MIG gun for industrial use.',
      sku: 'MIG-GUN-400',
      inStock: true
    },
    {
      id: 'MC014',
      name: 'Wire Lubricant Spray',
      price: 12.99,
      category: 'MIG Consumables',
      subcategory: 'Wire Lubricant & Pads',
      description: 'Non-silicone lubricant for improved wire feeding.',
      sku: 'MIG-LUB-001',
      inStock: true
    },
    {
      id: 'MC015',
      name: 'Lubricant Pad Set',
      price: 8.99,
      category: 'MIG Consumables',
      subcategory: 'Wire Lubricant & Pads',
      description: 'Replacement lubricant pads for wire feed systems.',
      sku: 'MIG-PAD-001',
      inStock: true
    },
    {
      id: 'MC016',
      name: 'V-Groove Drive Rolls 0.035"',
      price: 24.99,
      category: 'MIG Consumables',
      subcategory: 'Drive Rolls',
      description: 'V-groove drive rolls for solid wire 0.035".',
      sku: 'MIG-ROLL-035',
      inStock: true
    },
    {
      id: 'MC017',
      name: 'Knurled Drive Rolls 0.045"',
      price: 27.99,
      category: 'MIG Consumables',
      subcategory: 'Drive Rolls',
      description: 'Knurled drive rolls for flux-cored wire 0.045".',
      sku: 'MIG-ROLL-045',
      inStock: true
    },
    {
      id: 'MC018',
      name: 'U-Groove Drive Rolls',
      price: 29.99,
      category: 'MIG Consumables',
      subcategory: 'Drive Rolls',
      description: 'U-groove drive rolls for aluminum wire feeding.',
      sku: 'MIG-ROLL-U',
      inStock: true
    },
    {
      id: 'SWA001',
      name: 'Heavy-Duty Electrode Holder',
      price: 39.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Stingers',
      description: '500A rated electrode holder with insulated handle for comfortable stick welding.',
      sku: 'STICK-HOLD-001',
      inStock: true
    },
    {
      id: 'SWA002',
      name: 'Welding Cable Set',
      price: 89.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Welding Cable',
      description: '2/0 welding cable set, includes 15ft electrode cable and 10ft ground cable.',
      sku: 'WELD-CABLE-001',
      inStock: true
    },
    {
      id: 'SWA003',
      name: 'Professional Stinger 400A',
      price: 34.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Stingers',
      description: '400A electrode holder with spring-loaded jaws for quick electrode changes.',
      sku: 'STICK-HOLD-002',
      inStock: true
    },
    {
      id: 'SWA004',
      name: 'Premium Ground Clamp 500A',
      price: 29.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Ground Clamps',
      description: 'Heavy-duty 500A ground clamp with copper contacts for optimal conductivity.',
      sku: 'GROUND-CLAMP-001',
      inStock: true
    },
    {
      id: 'SWA005',
      name: 'C-Style Ground Clamp 300A',
      price: 24.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Ground Clamps',
      description: 'C-style 300A ground clamp for general purpose welding.',
      sku: 'GROUND-CLAMP-002',
      inStock: true
    },
    {
      id: 'SWA006',
      name: '2/0 Welding Cable (per foot)',
      price: 4.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Welding Cable',
      description: 'Premium 2/0 flexible welding cable, sold by the foot.',
      sku: 'WELD-CABLE-002',
      inStock: true
    },
    {
      id: 'SWA007',
      name: '4/0 Welding Cable (per foot)',
      price: 6.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Welding Cable',
      description: 'Heavy-duty 4/0 welding cable for high amperage applications.',
      sku: 'WELD-CABLE-003',
      inStock: true
    },
    {
      id: 'SWA008',
      name: 'Brass Machine Lug 2/0',
      price: 8.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Machine Lugs',
      description: '2/0 brass lug for secure cable connections.',
      sku: 'MACH-LUG-001',
      inStock: true
    },
    {
      id: 'SWA009',
      name: 'Copper Machine Lug 4/0',
      price: 12.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Machine Lugs',
      description: '4/0 copper lug for heavy-duty cable termination.',
      sku: 'MACH-LUG-002',
      inStock: true
    },
    {
      id: 'SWA010',
      name: 'Twist-Lock Cable Connector',
      price: 19.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Quick Connectors',
      description: 'Twist-lock quick connector for easy cable changes.',
      sku: 'QUICK-CONN-001',
      inStock: true
    },
    {
      id: 'SWA011',
      name: 'Cam-Lock Connector Set',
      price: 34.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Quick Connectors',
      description: 'Pair of cam-lock connectors for rapid cable connection.',
      sku: 'QUICK-CONN-002',
      inStock: true
    },
    {
      id: 'SWA012',
      name: 'Standard Cable Lug Set',
      price: 15.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Cable Lugs',
      description: 'Set of 5 standard cable lugs for 2/0 cable.',
      sku: 'CABLE-LUG-001',
      inStock: true
    },
    {
      id: 'SWA013',
      name: 'Heavy-Duty Cable Lug Kit',
      price: 24.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Cable Lugs',
      description: 'Complete kit with various size cable lugs and installation tool.',
      sku: 'CABLE-LUG-002',
      inStock: true
    },
    {
      id: 'SWA014',
      name: 'Cable Crimping Tool',
      price: 49.99,
      category: 'Stick Welding Accessories',
      subcategory: 'Cable Lugs',
      description: 'Professional cable lug crimping tool for secure connections.',
      sku: 'CRIMP-TOOL-001',
      inStock: true
    },
  ]

  const classes: Class[] = [
    {
      id: 'c1',
      name: '1 ON 1 TRAINING',
      duration: '4HR CLASS',
      description: [
        'SHARPEN ANY SKILL',
        'LIMITED SPOTS ONLY',
        'CALL FOR AVAILABILITY'
      ],
      ctaText: 'Learn More',
      slug: 'one-on-one'
    },
    {
      id: 'c2',
      name: 'PIPE WELDING',
      duration: '4-5HR CLASS',
      description: [
        'BEGINNER → INTERMEDIATE',
        'SATURDAY CLASS'
      ],
      ctaText: 'Learn More',
      slug: 'pipe-welding'
    },
    {
      id: 'c3',
      name: 'RESTRICTION',
      duration: '60HRS',
      description: [
        '4 WEEK COURSE',
        'DAY/NIGHT CLASS'
      ],
      ctaText: 'Learn More',
      slug: 'restriction'
    }
  ]

  const addToCart = async (product: Product) => {
    const buttonId = `add-to-cart-${product.id}`
    const button = document.getElementById(buttonId)
    if (!button) return

    // Create and add the spinner/checkmark container
    const iconContainer = document.createElement('div')
    iconContainer.style.position = 'absolute'
    iconContainer.style.left = '50%'
    iconContainer.style.top = '50%'
    iconContainer.style.transform = 'translate(-50%, -50%)'
    iconContainer.innerHTML = `
      <svg class="spinner" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" />
      </svg>
    `
    
    // Add styles for the spinning animation
    const style = document.createElement('style')
    style.textContent = `
      .spinner circle {
        stroke-dasharray: 64;
        stroke-dashoffset: 64;
        animation: spin 0.75s ease-in-out forwards;
        transform-origin: center;
      }
      @keyframes spin {
        100% {
          stroke-dashoffset: 0;
        }
      }
    `
    document.head.appendChild(style)
    
    // Hide the original button content
    const originalContent = button.innerHTML
    button.innerHTML = ''
    button.appendChild(iconContainer)
    
    // Simulate loading (you can replace this with actual async operation)
    await new Promise(resolve => setTimeout(resolve, 750))
    
    // Show checkmark
    iconContainer.innerHTML = `
      <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;">
        <path 
          d="M4.5 12.75l6 6 9-13.5" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="3"
          style="stroke-dasharray: 32; stroke-dashoffset: 32; animation: draw 0.3s ease-in-out forwards;"
        />
      </svg>
    `
    
    // Add style for checkmark animation
    style.textContent += `
      @keyframes draw {
        100% {
          stroke-dashoffset: 0;
        }
      }
    `
    
    // Update cart state
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        toast.success(`Added another ${product.name} to cart`)
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      toast.success(`Added ${product.name} to cart`)
      return [...prevCart, { ...product, quantity: 1 }]
    })
    
    // Reset button after animation
    setTimeout(() => {
      button.innerHTML = originalContent
      document.head.removeChild(style)
    }, 1000)
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const categories = Array.from(new Set(products.map(p => p.category)))
  const subcategories = Array.from(new Set(products.map(p => p.subcategory)))

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'all' || product.category === selectedCategory) &&
    (selectedSubcategory === 'all' || product.subcategory === selectedSubcategory) &&
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  ).slice(0, displayLimit)

  const handleViewMore = () => {
    setDisplayLimit(prev => prev + 6)
  }

  const handleLearnMore = (slug: string) => {
    router.push(`/courses/${slug}`)
  }

  const getProductImage = (product: Product) => {
    if (!product.image) return productImageConfig.placeholder
    return `${productImageConfig.folder}${product.image}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Dramatic Hero Section */}
      <header className="relative h-screen">
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/welding-background.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        
        <nav className="relative z-10 container mx-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600"
            >
              TAW Academy & Supply
            </motion.h1>
            
            <motion.ul 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-8"
            >
              <li>
                <Link 
                  href="#classes" 
                  className="hover:text-orange-500 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#classes')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Classes
                </Link>
              </li>
              <li>
                <Link 
                  href="#products" 
                  className="hover:text-orange-500 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="#cart" 
                  className="relative hover:text-orange-500 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#cart')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span id="cart-icon" className="relative inline-block">
                    <ShoppingCart className="h-6 w-6" />
                    <AnimatePresence>
                      {cart.length > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          {cart.length}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </Link>
              </li>
            </motion.ul>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="text-6xl font-bold mb-6 leading-tight">
              Forge Your Future in
              <span className="block text-orange-500">Professional Welding</span>
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Master the art of welding with industry-leading training and premium equipment
            </p>
            <Button 
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 
                       text-white px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all"
            >
              Start Your Journey
            </Button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </header>

      <main className="relative z-10">
        {/* Classes Section */}
        <section id="classes" className="py-24 container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 text-center"
          >
            Professional Welding Classes
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {classes.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="h-full"
              >
                <Card className="bg-zinc-800 border-2 border-zinc-700 hover:border-orange-500 transition-colors duration-300 h-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-orange-500">{course.name}</CardTitle>
                    <CardDescription className="text-lg text-zinc-300">{course.duration}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-4">
                      {course.description.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span className="text-zinc-200">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-6">
                    <Button 
                      onClick={() => handleLearnMore(course.slug)}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 
                               hover:from-orange-600 hover:to-red-700 text-white font-semibold
                               transform hover:scale-105 transition-all duration-200"
                    >
                      {course.ctaText}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="products" className="container mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Products</h2>
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-grow">
                <Label htmlFor="search" className="text-lg mb-2 text-zinc-400">Search Products</Label>
                <div className="relative">
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name, description, or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-orange-500 transition-colors"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-2/5">
                <div>
                  <Label htmlFor="category" className="text-lg mb-2 text-zinc-400">Category</Label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-900/50 border-zinc-800 focus:border-orange-500 transition-colors"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="subcategory" className="text-lg mb-2 text-zinc-400">Subcategory</Label>
                  <select
                    id="subcategory"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-900/50 border-zinc-800 focus:border-orange-500 transition-colors"
                  >
                    <option value="all">All Subcategories</option>
                    {subcategories.map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 border-zinc-800 hover:border-orange-500/50">
                  <ProductImage
                    src={getProductImage(product)}
                    alt={product.name}
                    priority={index < 6}
                  />
                  
                  <CardHeader className="relative z-10">
                    <div className="absolute top-0 right-0 bg-orange-500 text-orange px-3 py-1 text-sm rounded-bl-lg">
                      ${product.price.toFixed(2)}
                    </div>
                    <CardTitle className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      <span className="inline-flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        {product.subcategory}
                      </span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-4">
                    <p className="text-zinc-300">{product.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-zinc-400">
                      <span className="inline-flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        SKU: {product.sku}
                      </span>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        product.inStock 
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      )}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="relative z-10">
                    <Button 
                      id={`add-to-cart-${product.id}`}
                      onClick={() => addToCart(product)} 
                      disabled={!product.inStock}
                      className={cn(
                        "w-full transition-all duration-300 relative overflow-hidden",
                        product.inStock 
                          ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                          : "bg-zinc-800 text-zinc-400"
                      )}
                    >
                      <motion.div
                        className="flex items-center justify-center"
                        whileTap={{ scale: 0.95 }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </motion.div>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {displayLimit < products.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <Button
                onClick={handleViewMore}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 
                         rounded-full transform hover:scale-105 transition-all"
              >
                View More Products
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="ml-2"
                >
                  ↓
                </motion.span>
              </Button>
            </motion.div>
          )}
        </section>

        {/* Cart Section */}
        <section id="cart" className="py-24 bg-zinc-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16 text-center">Shopping Cart</h2>
            <Card>
              <CardHeader>
                <CardTitle>Your Cart</CardTitle>
                <CardDescription>Total: ${calculateTotal()}</CardDescription>
              </CardHeader>
              <CardContent>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full">Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Welding Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}