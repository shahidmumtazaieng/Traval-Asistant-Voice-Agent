import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '/resources/review-1.jpg',
      rating: 5,
      content: 'VoyageAI made planning our honeymoon effortless! I just told the voice assistant what we wanted, and it created the perfect itinerary for Bali. The AI even suggested hidden gems we never would have found ourselves.',
      location: 'Bali, Indonesia - March 2024'
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: '/resources/review-2.jpg',
      rating: 5,
      content: 'As a busy executive, I don\'t have time to research trips. The voice assistant planned my entire European business trip in minutes, finding the best flights and hotels within my budget. Incredible technology!',
      location: 'European Business Tour - May 2024'
    },
    {
      id: 3,
      name: 'Linda Roberts',
      avatar: '/resources/review-3.jpg',
      rating: 5,
      content: 'The AI assistant understood my accessibility needs perfectly and found wheelchair-friendly accommodations throughout Japan. The voice interface was so intuitive - like talking to a knowledgeable travel agent!',
      location: 'Japan Accessibility Tour - April 2024'
    }
  ]

  const splideOptions = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    gap: '2rem',
    autoplay: true,
    interval: 5000,
    pauseOnHover: true,
    arrows: false,
    pagination: true,
    breakpoints: {
      768: {
        perPage: 1,
        gap: '1rem'
      }
    }
  }

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">What Our Travelers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real travelers who experienced the magic of AI-powered travel planning.
          </p>
        </div>
        
        <Splide options={splideOptions}>
          {reviews.map((review) => (
            <SplideSlide key={review.id}>
              <div className="review-card rounded-2xl p-8 mx-4">
                <div className="flex items-center mb-6">
                  <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                  <div>
                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                    <div className="star-rating text-xl">
                      {'★'.repeat(review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  {review.content}
                </p>
                <div className="text-sm text-gray-500">
                  {review.location}
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  )
}

export default ReviewsSection