
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BMICalculator = () => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState('')
  const [bmi, setBmi] = useState('')

  const calculatebmi = (e) => {
    e.preventDefault()

    if (!height || !weight || !gender) {
      toast.error('Please enter valid height, weight, and gender')
      return
    }

    const heightInMeter = height / 100
    const bmiValue = (weight / (heightInMeter * heightInMeter)).toFixed(2)

    setBmi(bmiValue)

    const bmiNumber = parseFloat(bmiValue)

    if (bmiNumber < 18.5) {
      toast.warning('You are underweight')
    } else if (bmiNumber >= 18.5 && bmiNumber < 24.9) {
      toast.success('You are fit')
    } else if (bmiNumber >= 25 && bmiNumber < 29.9) {
      toast.warning('You are overweight')
    } else {
      toast.error('You are in the obesity range')
    }
  }

  const getBMICategory = (bmiValue) => {
    const bmiNumber = parseFloat(bmiValue)
    if (bmiNumber < 18.5) return { category: 'Underweight', color: 'text-yellow-600' }
    if (bmiNumber >= 18.5 && bmiNumber < 24.9) return { category: 'Normal weight', color: 'text-green-600' }
    if (bmiNumber >= 25 && bmiNumber < 29.9) return { category: 'Overweight', color: 'text-orange-600' }
    return { category: 'Obesity', color: 'text-red-600' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 via-black to-gray-500  py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-200 mb-8">
          BMI Calculator
        </h1>
        <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
          Calculate your Body Mass Index (BMI) to assess your body weight relative to your height and maintain a healthy lifestyle.
        </p>

        <div className="bg-gray-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
          
       
            <div className="lg:w-1/2 p-8"> 
  <div className="max-w-md mx-auto"> 
    <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-green-500 to-blue-500 bg-clip-text text-transparent mb-8 text-center tracking-wide"> 
      Enter Your Details 
    </h2> 
    <div className="space-y-8"> 
      <div className="group"> 
        <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider"> 
          Height (cm) 
        </label> 
        <div className="relative">
          <input 
            type="number" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
            placeholder="Enter height in centimeters" 
            className="w-full text-gray-100 placeholder-gray-400 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/25 transition-all duration-300 outline-none hover:border-gray-500 group-hover:shadow-md transform hover:scale-[1.02] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]" 
            min="1" 
            max="300" 
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div> 
      <div className="group"> 
        <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider"> 
          Weight (kg) 
        </label> 
        <div className="relative">
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            placeholder="Enter weight in kilograms" 
            className="w-full text-gray-100 placeholder-gray-400 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl focus:border-pink-500 focus:shadow-lg focus:shadow-pink-500/25 transition-all duration-300 outline-none hover:border-gray-500 group-hover:shadow-md transform hover:scale-[1.02] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]" 
            min="1" 
            max="500" 
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div> 
      <div className="group"> 
        <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider"> 
          Gender 
        </label> 
        <div className="relative">
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            className="w-full text-gray-100 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/25 transition-all duration-300 outline-none hover:border-gray-500 group-hover:shadow-md transform hover:scale-[1.02] cursor-pointer" 
          > 
            <option value="" className="bg-gray-800 text-gray-300">Select Gender</option> 
            <option value="Male" className="bg-gray-800 text-gray-100">Male</option> 
            <option value="Female" className="bg-gray-800 text-gray-100">Female</option> 
          </select>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div> 
      <button 
        type="button" 
        onClick={calculatebmi} 
        className="w-full bg-gradient-to-r from-gray-900 via-red-600 to-gray-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-widest text-sm relative overflow-hidden group"
      > 
        <span className="relative z-10">Calculate BMI</span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </button> 
    </div> 
    {bmi && ( 
      <div className="mt-8 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-600/50 shadow-2xl animate-fadeIn"> 
        <div className="text-center"> 
          <p className="text-2xl font-bold text-gray-100 mb-3"> 
            Your BMI is: <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-3xl">{bmi}</span> 
          </p> 
          <p className={`text-lg font-semibold ${getBMICategory(bmi).color}`}> 
            Category: {getBMICategory(bmi).category} 
          </p> 
        </div> 
      </div> 
    )} 
  </div> 
</div>

            {/* Image Section */}
            <div className="lg:w-1/2 bg-gradient-to-br from-gray-600 via-black to-gray-500 flex items-center justify-center p-8">
              <div className="text-center text-white">
                <div className=" mx-auto mb-6 bg-white bg-opacity-20 rounded-full text-center flex items-center justify-center">
                  <img src='/bmi.jpg' className='rounded-[10px]'/>
                </div>
                <h3 className="text-2xl  font-semibold mb-4">Stay Healthy</h3>
                <p className="text-blue-100   text-center">
                  Monitor your BMI regularly to maintain a healthy lifestyle and prevent health complications.
                </p>
              </div>
            </div>
          </div>

          {/* BMI Categories Reference */}
          <div className="bg-gray-50 px-8 py-6 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              BMI Categories
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-semibold text-yellow-700">Underweight</p>
                <p className="text-sm text-yellow-600">Below 18.5</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="font-semibold text-green-700">Normal</p>
                <p className="text-sm text-green-600">18.5 - 24.9</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-semibold text-orange-700">Overweight</p>
                <p className="text-sm text-orange-600">25.0 - 29.9</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="font-semibold text-red-700">Obesity</p>
                <p className="text-sm text-red-600">30.0 and above</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default BMICalculator