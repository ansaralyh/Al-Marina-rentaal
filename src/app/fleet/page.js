"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import {
  Car,
  Trophy,
  Zap,
  Truck,
  Gem,
  Car as CarIcon,
  Search,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

export default function Fleet() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMake, setSelectedMake] = useState("all");
  const [selectedModel, setSelectedModel] = useState("all");
  const [selectedFuelType, setSelectedFuelType] = useState("all");
  const [priceRange, setPriceRange] = useState([140, 9500]);
  const [selectedBodyType, setSelectedBodyType] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(6);

  const vehicleMakes = [
    { id: "all", name: "All Make" },
    { id: "lamborghini", name: "Lamborghini" },
    { id: "ferrari", name: "Ferrari" },
    { id: "porsche", name: "Porsche" },
    { id: "bmw", name: "BMW" },
    { id: "mercedes", name: "Mercedes" },
    { id: "audi", name: "Audi" },
    { id: "tesla", name: "Tesla" },
    { id: "rolls-royce", name: "Rolls Royce" },
    { id: "range-rover", name: "Range Rover" },
    { id: "min", name: "Mini" },
    { id: "bentley", name: "Bentley" },
    { id: "cadillac", name: "Cadillac" },
    { id: "chevrolet", name: "Chevrolet" },
    { id: "mg", name: "MG" },
  ];

  const vehicleModels = [
    { id: "all", name: "All Model" },
    { id: "urus", name: "Urus" },
    { id: "purosangue", name: "Purosangue" },
    { id: "f8-spider", name: "F8 Spider" },
    { id: "911-turbo", name: "911 Turbo S" },
    { id: "x7", name: "X7" },
    { id: "s-class", name: "S-Class" },
    { id: "q3", name: "Q3" },
    { id: "a3", name: "A3" },
    { id: "model-s", name: "Model S" },
    { id: "ghost", name: "Ghost" },
    { id: "cooper-s", name: "Cooper S" },
    { id: "r8-spyder", name: "R8 Spyder" },
    { id: "rs3", name: "RS3" },
    { id: "rsq3", name: "RSQ3" },
    { id: "bentayga", name: "Bentayga" },
    { id: "flying-spur", name: "Flying Spur" },
    { id: "gt-spyder", name: "GT Spyder" },
    { id: "330", name: "330" },
    { id: "420i-convertible", name: "420i Convertible" },
    { id: "5-series", name: "5 Series" },
    { id: "7-series", name: "7 Series" },
    { id: "m4-cabriolet", name: "M4 Cabriolet" },
    { id: "x6-m50i", name: "X6 M50i V8" },
    { id: "x7-m50", name: "X7 M50" },
    { id: "escalade", name: "Escalade" },
    { id: "tahoe", name: "Tahoe" },
    { id: "corvette-stingray", name: "Corvette Stingray" },
    { id: "812-gts", name: "812 GTS" },
    { id: "zs", name: "ZS" },
  ];

  const fuelTypes = [
    { id: "all", name: "All Fuel Type" },
    { id: "petrol", name: "Petrol" },
    { id: "electric", name: "Electric" },
    { id: "hybrid", name: "Hybrid" },
  ];

  const bodyTypes = [
    { id: "all", name: "All Body Types" },
    { id: "convertible", name: "Convertible", icon: "🚗" },
    { id: "coupe", name: "Coupe", icon: "🚗" },
    { id: "mini", name: "Mini Car", icon: "🚗" },
    { id: "sedan", name: "Sedan", icon: "🚗" },
    { id: "supercar", name: "Super Car", icon: "🏎️" },
    { id: "suv", name: "SUV", icon: "🚙" },
  ];

  const fleetVehicles = [
    {
      id: 1,
      name: "Lamborghini Urus Mansory",
      make: "lamborghini",
      model: "urus",
      category: "exotic",
      type: "SUV",
      bodyType: "suv",
      fuelType: "petrol",
      price: 3500,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/Lamborghini-Urus-Mansory-For-Rent-In-Dubai-750x430-1.webp",
      specifications: {
        engine: "4.0L V8 Twin Turbo",
        power: "641 HP",
        acceleration: "3.6s 0-100km/h",
        topSpeed: "305 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "AWD",
        "Sport Mode",
        "Premium Audio",
        "Leather Seats",
        "Navigation",
        "Bluetooth",
      ],
      description:
        "The ultimate luxury SUV that combines supercar performance with everyday practicality.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 2,
      name: "Ferrari Purosangue",
      make: "ferrari",
      model: "purosangue",
      category: "exotic",
      type: "SUV",
      bodyType: "suv",
      fuelType: "petrol",
      price: 9500,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/12/ejHq490uEX.jpg",
      specifications: {
        engine: "6.5L V12",
        power: "715 HP",
        acceleration: "3.3s 0-100km/h",
        topSpeed: "310 km/h",
        seats: "4",
        transmission: "Automatic",
      },
      features: [
        "V12 Engine",
        "Carbon Fiber",
        "Premium Interior",
        "Sport Suspension",
        "Brembo Brakes",
        "Launch Control",
      ],
      description:
        "Ferrari's first SUV - a masterpiece of Italian engineering and luxury.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 3,
      name: "Ferrari F8 Spider",
      make: "ferrari",
      model: "f8-spider",
      category: "sports",
      type: "Convertible",
      bodyType: "convertible",
      fuelType: "petrol",
      price: 3700,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/12/Ferrari-F8-Spider-2022.webp",
      specifications: {
        engine: "3.9L V8 Twin Turbo",
        power: "710 HP",
        acceleration: "2.9s 0-100km/h",
        topSpeed: "340 km/h",
        seats: "2",
        transmission: "Automatic",
      },
      features: [
        "Retractable Roof",
        "Carbon Fiber",
        "Sport Exhaust",
        "Racing Seats",
        "Track Mode",
        "Launch Control",
      ],
      description:
        "Experience the thrill of open-top driving with Ferrari's most advanced V8 engine.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 4,
      name: "Porsche 911 Turbo S",
      category: "sports",
      type: "Coupe",
      price: 3200,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/1200x900-1.webp",
      specifications: {
        engine: "3.8L Flat-6 Twin Turbo",
        power: "640 HP",
        acceleration: "2.7s 0-100km/h",
        topSpeed: "330 km/h",
        seats: "4",
        transmission: "PDK Automatic",
      },
      features: [
        "AWD",
        "Sport Chrono",
        "Carbon Ceramic Brakes",
        "Sport Exhaust",
        "Track Mode",
        "Launch Control",
      ],
      description:
        "The ultimate 911 - combining everyday usability with track-ready performance.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 5,
      name: "Range Rover Vogue",
      category: "luxury",
      type: "SUV",
      price: 2400,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/Range-Rover-Vogue-Autobiography-Rental-Dubai-2.jpg",
      specifications: {
        engine: "5.0L V8 Supercharged",
        power: "525 HP",
        acceleration: "5.4s 0-100km/h",
        topSpeed: "225 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "Terrain Response",
        "Air Suspension",
        "Premium Audio",
        "Leather Interior",
        "Navigation",
        "Climate Control",
      ],
      description:
        "The pinnacle of luxury SUVs with unmatched comfort and capability.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 6,
      name: "Audi Q3 Sportsback",
      category: "luxury",
      type: "SUV",
      price: 550,
      currency: "د.إ",
      period: "per day",
      image:
        "https://rentanycar.ae/wp-content/uploads/2024/11/2020-audi-q3-sportback-40-tfsi-quattro-s-line-suv-white-justin-hilliard-1001x565-1.webp",
      specifications: {
        engine: "2.0L TFSI",
        power: "230 HP",
        acceleration: "6.8s 0-100km/h",
        topSpeed: "230 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "Quattro AWD",
        "Sport Package",
        "Premium Audio",
        "Leather Seats",
        "Navigation",
        "Bluetooth",
      ],
      description:
        "Sporty and elegant compact SUV perfect for city driving and weekend getaways.",
      availability: "Available",
      rating: 4,
    },
    {
      id: 7,
      name: "Mini Cooper S",
      make: "min",
      model: "cooper-s",
      category: "luxury",
      type: "Mini Car",
      bodyType: "mini",
      fuelType: "petrol",
      price: 349,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/Xu0pcH9pgCZfTGDxnyCnXYP4v4-1920.jpg",
      specifications: {
        engine: "2.0L Turbo I4",
        power: "189 HP",
        acceleration: "6.3s 0-100km/h",
        topSpeed: "235 km/h",
        seats: "4",
        transmission: "Manual/Auto",
      },
      features: [
        "Sport Mode",
        "Premium Audio",
        "Leather Seats",
        "Navigation",
        "Bluetooth",
        "Sunroof",
      ],
      description:
        "Fun and agile compact car perfect for city driving with sporty performance.",
      availability: "Available",
      rating: 4,
    },
    {
      id: 8,
      name: "Mini Cooper",
      make: "min",
      model: "cooper-s",
      category: "luxury",
      type: "Mini Car",
      bodyType: "mini",
      fuelType: "petrol",
      price: 399,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/Mini-Cooper-Rental-Dubai-3-e1663185718824.jpg",
      specifications: {
        engine: "2.0L Turbo I4",
        power: "189 HP",
        acceleration: "6.3s 0-100km/h",
        topSpeed: "235 km/h",
        seats: "4",
        transmission: "Manual/Auto",
      },
      features: [
        "Sport Mode",
        "Premium Audio",
        "Leather Seats",
        "Navigation",
        "Bluetooth",
        "Sunroof",
      ],
      description:
        "Fun and agile compact car perfect for city driving with sporty performance.",
      availability: "Available",
      rating: 4,
    },
    {
      id: 9,
      name: "BMW X7",
      category: "luxury",
      type: "SUV",
      price: 1500,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/2019-bmw-x7-first-drive.jpg",
      specifications: {
        engine: "4.4L V8 Twin Turbo",
        power: "523 HP",
        acceleration: "4.7s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "7",
        transmission: "Automatic",
      },
      features: [
        "xDrive AWD",
        "Air Suspension",
        "Premium Audio",
        "Leather Interior",
        "Navigation",
        "Third Row Seats",
      ],
      description:
        "The ultimate luxury SUV with seven seats and uncompromising performance.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 10,
      name: "Tesla Model S",
      category: "luxury",
      type: "Sedan",
      price: 799,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/Tesla-Model-Y-Rental-Dubai-4-2048x1536.jpg",
      specifications: {
        engine: "Dual Motor Electric",
        power: "670 HP",
        acceleration: "3.1s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "5",
        transmission: "Single Speed",
      },
      features: [
        "Autopilot",
        "Supercharging",
        "Premium Audio",
        "Glass Roof",
        "Navigation",
        "Over-the-Air Updates",
      ],
      description:
        "Experience the future of driving with Tesla's most advanced electric sedan.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 11,
      name: "Rolls Royce Ghost",
      category: "luxury",
      type: "Sedan",
      price: 4600,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/Rolls-Royce-Ghost-Rental-Dubai-3.jpg",
      specifications: {
        engine: "6.75L V12",
        power: "563 HP",
        acceleration: "4.8s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "Handcrafted Interior",
        "Premium Audio",
        "Massage Seats",
        "Navigation",
        "Climate Control",
        "Chauffeur Package",
      ],
      description:
        "The epitome of luxury with handcrafted details and unmatched refinement.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 12,
      name: "Audi R8 Spyder",
      make: "audi",
      model: "r8-spyder",
      category: "sports",
      type: "Convertible",
      bodyType: "convertible",
      fuelType: "petrol",
      price: 2200,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/7f3c34cf66585ed6a2b52750e983fbc6.jpg",
      specifications: {
        engine: "5.2L V10",
        power: "610 HP",
        acceleration: "3.2s 0-100km/h",
        topSpeed: "330 km/h",
        seats: "2",
        transmission: "Automatic",
      },
      features: [
        "V10 Engine",
        "Retractable Roof",
        "Quattro AWD",
        "Carbon Fiber",
        "Racing Seats",
        "Track Mode",
        "Launch Control",
      ],
      description:
        "Audi's convertible supercar with naturally aspirated V10 power and open-top driving experience.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 13,
      name: "Audi RS3",
      make: "audi",
      model: "rs3",
      category: "sports",
      type: "Sedan",
      bodyType: "sedan",
      fuelType: "petrol",
      price: 900,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/IMG_2914.jpeg",
      specifications: {
        engine: "2.5L I5 Turbo",
        power: "400 HP",
        acceleration: "3.8s 0-100km/h",
        topSpeed: "290 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "I5 Turbo Engine",
        "Quattro AWD",
        "Sport Suspension",
        "Racing Seats",
        "Track Mode",
        "Launch Control",
        "Sport Exhaust",
      ],
      description:
        "Audi's compact performance sedan with incredible power and all-wheel drive traction.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 14,
      name: "Audi RSQ3",
      make: "audi",
      model: "rsq3",
      category: "sports",
      type: "SUV",
      bodyType: "suv",
      fuelType: "petrol",
      price: 900,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/IMG_2917.jpeg",
      specifications: {
        engine: "2.5L I5 Turbo",
        power: "400 HP",
        acceleration: "4.5s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "I5 Turbo Engine",
        "Quattro AWD",
        "Sport Suspension",
        "Racing Seats",
        "Track Mode",
        "Launch Control",
        "Sport Exhaust",
      ],
      description:
        "Audi's high-performance compact SUV with incredible power and all-wheel drive capability.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 15,
      name: "Bentley Bentayga",
      make: "bentley",
      model: "bentayga",
      category: "luxury",
      type: "SUV",
      bodyType: "suv",
      fuelType: "petrol",
      price: 1900,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/bentley-bentayga-tuning-wheelsandmore-0.jpg",
      specifications: {
        engine: "6.0L W12 Twin Turbo",
        power: "626 HP",
        acceleration: "4.0s 0-100km/h",
        topSpeed: "290 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "W12 Engine",
        "Premium Interior",
        "Air Suspension",
        "Massage Seats",
        "Navigation",
        "Climate Control",
        "Leather Seats",
      ],
      description:
        "Bentley's luxury SUV with handcrafted details and powerful performance.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 16,
      name: "Bentley Flying Spur",
      make: "bentley",
      model: "flying-spur",
      category: "luxury",
      type: "Sedan",
      bodyType: "sedan",
      fuelType: "petrol",
      price: 2900,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/New-2021-Bentley-Continental-GT-V8-Convertible-1610572596.jpg",
      specifications: {
        engine: "6.0L W12 Twin Turbo",
        power: "626 HP",
        acceleration: "3.8s 0-100km/h",
        topSpeed: "333 km/h",
        seats: "4",
        transmission: "Automatic",
      },
      features: [
        "W12 Engine",
        "Premium Interior",
        "Air Suspension",
        "Massage Seats",
        "Navigation",
        "Climate Control",
        "Leather Seats",
      ],
      description:
        "Bentley's flagship luxury sedan with handcrafted details and powerful performance.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 17,
      name: "Bentley GT Spyder",
      make: "bentley",
      model: "gt-spyder",
      category: "luxury",
      type: "Convertible",
      bodyType: "convertible",
      fuelType: "petrol",
      price: 3200,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/New-2021-Bentley-Continental-GT-V8-Convertible-1610572596.jpg",
      specifications: {
        engine: "4.0L V8 Twin Turbo",
        power: "542 HP",
        acceleration: "3.9s 0-100km/h",
        topSpeed: "318 km/h",
        seats: "4",
        transmission: "Automatic",
      },
      features: [
        "Retractable Roof",
        "Premium Interior",
        "Air Suspension",
        "Massage Seats",
        "Navigation",
        "Climate Control",
        "Leather Seats",
      ],
      description:
        "Bentley's GT convertible with exquisite craftsmanship and effortless V8 performance.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 18,
      name: "BMW 330",
      make: "bmw",
      model: "330",
      category: "luxury",
      type: "Sedan",
      bodyType: "sedan",
      fuelType: "petrol",
      price: 500,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/maxresdefault-1.jpg",
      specifications: {
        engine: "2.0L I4 Turbo",
        power: "255 HP",
        acceleration: "5.8s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "Sport Suspension",
        "Premium Audio",
        "Leather Seats",
        "Navigation",
        "Bluetooth",
        "Cruise Control",
      ],
      description:
        "Sporty executive sedan blending comfort, efficiency, and engaging dynamics.",
      availability: "Available",
      rating: 4,
    },
    {
      id: 19,
      name: "BMW 420i Convertible",
      make: "bmw",
      model: "420i-convertible",
      category: "luxury",
      type: "Convertible",
      bodyType: "convertible",
      fuelType: "petrol",
      price: 550,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/BMW-420i-Convertible-Rental-Dubai-3-750x430-1.jpg",
      specifications: {
        engine: "2.0L I4 Turbo",
        power: "184 HP",
        acceleration: "8.2s 0-100km/h",
        topSpeed: "236 km/h",
        seats: "4",
        transmission: "Automatic",
      },
      features: [
        "Retractable Roof",
        "Premium Audio",
        "Leather Seats",
        "Navigation",
        "Bluetooth",
        "Cruise Control",
      ],
      description:
        "Open-top driving with BMW refinement, comfort, and efficient turbo performance.",
      availability: "Available",
      rating: 4,
    },
    {
      id: 20,
      name: "BMW 5 Series",
      make: "bmw",
      model: "5-series",
      category: "luxury",
      type: "Sedan",
      bodyType: "sedan",
      fuelType: "petrol",
      price: 500,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/BMW-5-series-Rental-Dubai-e1671548953943-1-e1735930020237.jpeg",
      specifications: {
        engine: "2.0L I4 Turbo",
        power: "248 HP",
        acceleration: "6.1s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "Premium Audio",
        "Leather Seats",
        "Navigation",
        "Bluetooth",
        "Cruise Control",
        "Driver Assistance",
      ],
      description:
        "Executive sedan offering comfort, technology, and confident performance.",
      availability: "Available",
      rating: 4,
    },
    {
      id: 21,
      name: "BMW 7 Series",
      make: "bmw",
      model: "7-series",
      category: "luxury",
      type: "Sedan",
      bodyType: "sedan",
      fuelType: "petrol",
      price: 1400,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/BMW-735i-Rental-Dubai-750x430-1.jpg",
      specifications: {
        engine: "3.0L I6 Turbo",
        power: "375 HP",
        acceleration: "5.0s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "Executive Lounge",
        "Premium Audio",
        "Leather Seats",
        "Massage Seats",
        "Navigation",
        "Driver Assistance",
      ],
      description:
        "Flagship luxury sedan with advanced tech, comfort, and refined performance.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 22,
      name: "BMW M4 Cabriolet",
      make: "bmw",
      model: "m4-cabriolet",
      category: "sports",
      type: "Convertible",
      bodyType: "convertible",
      fuelType: "petrol",
      price: 1200,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2025/01/b3bb2747-4063-4f40-bcbe-a77488a87d10-e1735929769408.jpeg",
      specifications: {
        engine: "3.0L I6 Twin Turbo",
        power: "503 HP",
        acceleration: "3.7s 0-100km/h",
        topSpeed: "280 km/h",
        seats: "4",
        transmission: "Automatic",
      },
      features: [
        "Retractable Roof",
        "Premium Audio",
        "Leather Seats",
        "Navigation",
        "Bluetooth",
        "Sport Exhaust",
      ],
      description:
        "High-performance open-top M car blending luxury with exhilarating dynamics.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 23,
      name: "BMW X6 M50i V8",
      make: "bmw",
      model: "x6-m50i",
      category: "sports",
      type: "SUV",
      bodyType: "suv",
      fuelType: "petrol",
      price: 1100,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/BMW-X6-M50i-V8-Rental-Dubai.jpg",
      specifications: {
        engine: "4.4L V8 Twin Turbo",
        power: "523 HP",
        acceleration: "4.3s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "V8 Engine",
        "xDrive AWD",
        "Sport Suspension",
        "Premium Audio",
        "Leather Seats",
        "Navigation",
      ],
      description:
        "High-performance coupe-SUV with powerful V8 and dynamic handling.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 24,
      name: "BMW X7 M50",
      make: "bmw",
      model: "x7-m50",
      category: "luxury",
      type: "SUV",
      bodyType: "suv",
      fuelType: "petrol",
      price: 1500,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/2019-bmw-x7-first-drive.jpg",
      specifications: {
        engine: "4.4L V8 Twin Turbo",
        power: "523 HP",
        acceleration: "4.5s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "7",
        transmission: "Automatic",
      },
      features: [
        "V8 Engine",
        "xDrive AWD",
        "Air Suspension",
        "Premium Audio",
        "Leather Interior",
        "Third Row Seats",
      ],
      description:
        "Performance luxury SUV with seven seats and commanding presence.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 25,
      name: "Cadillac Escalade",
      make: "cadillac",
      model: "escalade",
      category: "luxury",
      type: "SUV",
      bodyType: "suv",
      fuelType: "petrol",
      price: 1100,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/16446802112.jpg",
      specifications: {
        engine: "6.2L V8",
        power: "420 HP",
        acceleration: "5.9s 0-100km/h",
        topSpeed: "180 km/h",
        seats: "7",
        transmission: "Automatic",
      },
      features: [
        "V8 Engine",
        "Premium Audio",
        "Leather Interior",
        "Navigation",
        "Climate Control",
        "Third Row Seats",
      ],
      description:
        "American luxury SUV with commanding presence and premium comfort.",
      availability: "Available",
      rating: 4,
    },
    {
      id: 26,
      name: "Chevrolet Tahoe",
      make: "chevrolet",
      model: "tahoe",
      category: "luxury",
      type: "SUV",
      bodyType: "suv",
      fuelType: "petrol",
      price: 550,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/IMG_2340.jpeg",
      specifications: {
        engine: "5.3L V8",
        power: "355 HP",
        acceleration: "7.5s 0-100km/h",
        topSpeed: "200 km/h",
        seats: "7",
        transmission: "Automatic",
      },
      features: [
        "V8 Engine",
        "Premium Audio",
        "Leather Seats",
        "Navigation",
        "Bluetooth",
        "Third Row Seats",
      ],
      description:
        "Full-size SUV with roomy three-row comfort and dependable V8 power.",
      availability: "Available",
      rating: 4,
    },
    {
      id: 27,
      name: "Corvette Stingray",
      make: "chevrolet",
      model: "corvette-stingray",
      category: "sports",
      type: "Coupe",
      bodyType: "coupe",
      fuelType: "petrol",
      price: 1600,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/2020-Chevrolet-Corvette-C8-front-three-quarter-5.jpg",
      specifications: {
        engine: "6.2L V8",
        power: "495 HP",
        acceleration: "3.0s 0-100km/h",
        topSpeed: "312 km/h",
        seats: "2",
        transmission: "Automatic",
      },
      features: [
        "V8 Engine",
        "Performance Exhaust",
        "Premium Audio",
        "Sport Seats",
        "Navigation",
        "Launch Control",
      ],
      description:
        "American mid‑engine sports car delivering thrilling performance and style.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 28,
      name: "Ferrari 812 GTS",
      make: "ferrari",
      model: "812-gts",
      category: "exotic",
      type: "Convertible",
      bodyType: "convertible",
      fuelType: "petrol",
      price: 7500,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/12/SfYtMG32VG.jpg",
      specifications: {
        engine: "6.5L V12",
        power: "789 HP",
        acceleration: "3.0s 0-100km/h",
        topSpeed: "340 km/h",
        seats: "2",
        transmission: "Automatic",
      },
      features: [
        "V12 Engine",
        "Retractable Roof",
        "Carbon Fiber",
        "Racing Seats",
        "Track Mode",
        "Launch Control",
      ],
      description:
        "Open-top V12 Ferrari delivering breathtaking performance and grand‑touring drama.",
      availability: "Available",
      rating: 5,
    },
    {
      id: 29,
      name: "Audi A3",
      make: "audi",
      model: "a3",
      category: "luxury",
      type: "Sedan",
      bodyType: "sedan",
      fuelType: "petrol",
      price: 275,
      currency: "د.إ",
      period: "per day",
      image: "https://rentanycar.ae/wp-content/uploads/2024/11/Audi-A3-Rental-Dubai-10-750x430-1.jpg",
      specifications: {
        engine: "2.0L TFSI",
        power: "190 HP",
        acceleration: "7.3s 0-100km/h",
        topSpeed: "250 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "Quattro AWD",
        "Premium Audio",
        "Leather Seats",
        "Navigation",
        "Bluetooth",
        "Sport Mode",
      ],
      description:
        "A compact luxury sedan that combines sophisticated design with impressive performance.",
      availability: "Available",
      rating: 4,
    },
    {
      id: 30,
      name: "MG ZS",
      make: "mg",
      model: "zs",
      category: "economy",
      type: "SUV",
      bodyType: "suv",
      fuelType: "petrol",
      price: 160,
      currency: "د.إ",
      period: "per day",
      image: "/cars/mgzs.jpg",
      specifications: {
        engine: "1.5L Turbo",
        power: "160 HP",
        acceleration: "10.4s 0-100km/h",
        topSpeed: "180 km/h",
        seats: "5",
        transmission: "Automatic",
      },
      features: [
        "Touchscreen Display",
        "Premium Audio",
        "Leather Seats",
        "Navigation",
        "Bluetooth",
        "Rear Camera",
      ],
      description:
        "A modern and affordable SUV that offers great value with contemporary features and reliable performance.",
      availability: "Available",
      rating: 4,
    },
  ];

  const filteredVehicles = fleetVehicles.filter((vehicle) => {
    const categoryMatch =
      selectedCategory === "all" || vehicle.category === selectedCategory;
    const makeMatch = selectedMake === "all" || vehicle.make === selectedMake;
    const modelMatch =
      selectedModel === "all" || vehicle.model === selectedModel;
    const fuelMatch =
      selectedFuelType === "all" || vehicle.fuelType === selectedFuelType;
    const bodyMatch =
      selectedBodyType === "all" || vehicle.bodyType === selectedBodyType;
    const priceMatch =
      vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    const searchMatch =
      searchQuery === "" ||
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      categoryMatch &&
      makeMatch &&
      modelMatch &&
      fuelMatch &&
      bodyMatch &&
      priceMatch &&
      searchMatch
    );
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const displayedVehicles = sortedVehicles.slice(0, displayCount);
  const hasMoreVehicles = displayCount < sortedVehicles.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  const handleResetDisplay = () => {
    setDisplayCount(6);
  };

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(6);
  }, [
    selectedCategory,
    selectedMake,
    selectedModel,
    selectedFuelType,
    selectedBodyType,
    priceRange,
    searchQuery,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 text-white relative overflow-hidden" style={{
        backgroundImage: "url(/cars/3.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-70"></div>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Fleet
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover our premium collection of luxury vehicles. From exotic
              supercars to elegant sedans, find the perfect ride for your
              journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 bg-white rounded-lg shadow-md p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Filters
            </h3>

            {/* BY MAKE */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                BY MAKE
              </h4>
              <div className="space-y-2">
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  {vehicleMakes.map((make) => (
                    <option key={make.id} value={make.id}>
                      {make.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  {vehicleModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedFuelType}
                  onChange={(e) => setSelectedFuelType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  {fuelTypes.map((fuel) => (
                    <option key={fuel.id} value={fuel.id}>
                      {fuel.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* PRICE RANGE */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                PRICE RANGE
              </h4>
              <div className="px-2">
                <input
                  type="range"
                  min="140"
                  max="9500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{priceRange[0]} د.إ</span>
                  <span>{priceRange[1]} د.إ</span>
                </div>
              </div>
            </div>

            {/* VEHICLE BODY TYPE */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                VEHICLE BODY TYPE
              </h4>
              <div className="space-y-2">
                {bodyTypes.map((bodyType) => (
                  <button
                    key={bodyType.id}
                    onClick={() => setSelectedBodyType(bodyType.id)}
                    className={`items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedBodyType === bodyType.id
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}>
                    <span className="text-lg">{bodyType.icon}</span>
                    <span>{bodyType.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search By Car Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {displayedVehicles.length} of {sortedVehicles.length}{" "}
                vehicles
              </p>
              {displayedVehicles.length < sortedVehicles.length && (
                <button
                  onClick={handleResetDisplay}
                  className="text-sm text-blue-600 hover:text-blue-800 underline">
                  Reset View
                </button>
              )}
            </div>

            {/* Fleet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Vehicle Image */}
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center">
                      <CarIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="p-4">
                    <h3 className="text-md font-bold text-gray-900 mb-2">
                      {vehicle.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="text-xl font-bold text-blue-600">
                        {vehicle.price} {vehicle.currency}
                      </div>
                      <div className="text-sm text-gray-600">
                        {vehicle.period}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 justify-between">
                      <Link href="/contactus" className="inline-block">
                        <span className="inline-block bg-yellow-500 text-white py-2 px-6 rounded-md text-sm font-semibold hover:bg-yellow-600 transition-colors">
                          Inquire Now
                        </span>
                      </Link>
                      <button className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                        <a
                          href="https://wa.me/971502093966"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center">
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreVehicles && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Load More Vehicles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fleet Stats */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Fleet Statistics</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our impressive fleet numbers speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                {fleetVehicles.length}+
              </div>
              <div className="text-lg font-semibold text-blue-100">
                Total Vehicles
              </div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                5
              </div>
              <div className="text-lg font-semibold text-blue-100">
                Vehicle Categories
              </div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-lg font-semibold text-blue-100">
                Availability
              </div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-lg font-semibold text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us for special requests, custom packages, or to discuss your
            specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              <a
                href="https://wa.me/971502093966"
                target="_blank"
                rel="noopener noreferrer">
                Contact Us
              </a>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Get Custom Quote
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom CSS for range slider */}
      <style jsx>{`
        .slider {
          -webkit-appearance: none;
          appearance: none;
          background: #e5e7eb;
          outline: none;
          border-radius: 0.5rem;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #3b82f6;
          cursor: pointer;
          border-radius: 50%;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #3b82f6;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}</style>
    </div>
  );
}
