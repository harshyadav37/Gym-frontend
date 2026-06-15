
import React from 'react'
import Footer from './Footer'

const Workoutsession = () => {
  return (
    <section>
    <div className='flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100 mx-4 lg:mx-16 my-8 lg:my-16 p-6 lg:p-12 rounded-3xl shadow-2xl border border-gray-200'>
      
      {/* Left Section */}
      <div className='w-full lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0'>
      
        <div className='mb-8'>
          <h1 className='text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-wider'>
            TOP WORKOUT 
            <span className='text-red-600 block'>SESSION'S</span>
          </h1>
          <p className='text-lg text-gray-700 leading-relaxed mb-8 w-full lg:w-4/5'>
            Transform your fitness journey with our expertly designed workout sessions. Experience the perfect blend of strength training, cardio, and flexibility exercises tailored to help you achieve your fitness goals faster than ever before.
          </p>
        </div>
        
        <div className='relative group overflow-hidden rounded-2xl shadow-xl'>
          <img 
            src='/jym22.jpg' 
            alt="Workout session"
            className='w-full lg:w-[85%]   object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl lg:w-[85%]'></div>
          <div className='absolute bottom-4 left-4 text-white'>
            <span className='bg-red-600 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide'>
              Premium Training
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className='w-full lg:w-1/2 pl-0 lg:pl-8'>
        <div className='mb-8'>
          <h1 className='text-2xl lg:text-4xl font-black text-gray-900 mb-4 uppercase tracking-wide'>
            Featured 
            <span className='text-red-600'>Workouts</span>
          </h1>
          <p className='text-lg text-gray-700 leading-relaxed'>
            Discover our most popular and effective workout routines designed by professional trainers.
          </p>
        </div>

        <div className='space-y-4'>
          <section className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-red-600'>
            <div className='flex items-start space-x-4'>
              <div className='w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0'>
                <span className='text-white font-bold text-lg'>💪</span>
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide'>
                  Strength Training
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Build muscle mass and increase overall strength with our comprehensive weight training programs designed for all fitness levels.
                </p>
              </div>
            </div>
          </section>

          <section className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-600'>
            <div className='flex items-start space-x-4'>
              <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0'>
                <span className='text-white font-bold text-lg'>🏃</span>
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide'>
                  Cardio Blast
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Boost your cardiovascular health and burn calories with high-intensity interval training and dynamic cardio routines.
                </p>
              </div>
            </div>
          </section>

          <section className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-green-600'>
            <div className='flex items-start space-x-4'>
              <div className='w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0'>
                <span className='text-white font-bold text-lg'>🧘</span>
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide'>
                  Flexibility Flow
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Improve mobility and prevent injuries with guided stretching sessions and yoga-inspired flexibility workouts.
                </p>
              </div>
            </div>
          </section>

          <section className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-purple-600'>
            <div className='flex items-start space-x-4'>
              <div className='w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0'>
                <span className='text-white font-bold text-lg'>⚡</span>
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide'>
                  HIIT Power
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Maximize your workout efficiency with high-intensity interval training that delivers results in minimal time.
                </p>
              </div>
            </div>
          </section>

          <section className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-orange-600'>
            <div className='flex items-start space-x-4'>
              <div className='w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0'>
                <span className='text-white font-bold text-lg'>🎯</span>
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide'>
                  Core Focus
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Strengthen your core and improve stability with targeted exercises that build a solid foundation for all movements.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      
    </div>
    <Footer/>
    </section>
  )
}

export default Workoutsession



























