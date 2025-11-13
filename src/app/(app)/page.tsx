'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import messages from '@/message.json'
import Autoplay from 'embla-carousel-autoplay'

const home = () => {
  return (
    <>
      <main className='grow flex flex-col items-center justify-center px-4 md:px-24 py-1 text-black'>
        <section>
          <h1 className='text-center text-3xl md:text-5xl font-bold mt-8'>Dive into the World of Anonymous Feedback</h1>
          <p className='text-center mt-3 md:mt-5 text-base md:text-lg'>True Feedback - Where your identity remains a secret.</p>
        </section>
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-xs mt-4">
          <CarouselContent>
            {
              messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader>
                        {message.title}
                      </CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-lg font-semibold">{message.content}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2025 SilentQ. All rights reserved.
      </footer>
    </>
  )
}

export default home
