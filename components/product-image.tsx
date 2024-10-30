import Image from 'next/image'
import { productImageConfig } from '@/config/images'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductImageProps {
  src?: string
  alt: string
  priority?: boolean
}

export function ProductImage({ src, alt, priority = false }: ProductImageProps) {
  const imageSrc = src || productImageConfig.placeholder

  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-lg bg-zinc-900">
      <div className={cn(
        "absolute inset-0 bg-zinc-800 animate-pulse",
        !isLoading && "hidden"
      )} />
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          "object-cover transition-all duration-300",
          isLoading ? "scale-110 blur-sm" : "scale-100 blur-0",
          "group-hover:scale-110"
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
        onLoadingComplete={() => setIsLoading(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
    </div>
  )
} 