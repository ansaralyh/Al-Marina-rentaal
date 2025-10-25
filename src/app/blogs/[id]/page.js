'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function SingleBlog() {
  const params = useParams();
  const router = useRouter();
  const [blogPost, setBlogPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Blog posts data (same as in blogs page)
  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Luxury Car Rental in Dubai",
      excerpt: "Discover everything you need to know about renting luxury cars in Dubai, from the best vehicles to insider tips for an unforgettable experience.",
      content: `Dubai is synonymous with luxury, and what better way to experience the city's opulence than behind the wheel of a premium vehicle? From the iconic Burj Khalifa to the pristine beaches of Jumeirah, Dubai offers countless opportunities to showcase your style with the perfect luxury car rental.

## Why Choose Luxury Car Rental in Dubai?

Dubai's reputation as a luxury destination is well-deserved. The city's infrastructure, world-class attractions, and vibrant lifestyle make it the perfect backdrop for luxury car experiences. Whether you're here for business or pleasure, a luxury car rental elevates your entire Dubai experience.

### Top Luxury Car Categories

**Supercars**: For the ultimate adrenaline rush, nothing beats a Ferrari or Lamborghini. These Italian masterpieces offer unparalleled performance and head-turning style.

**Luxury SUVs**: Perfect for families or groups, luxury SUVs like the Range Rover Vogue provide comfort and prestige in equal measure.

**Convertibles**: Experience Dubai's perfect weather with a convertible. The wind in your hair and the city's skyline as your backdrop create unforgettable memories.

## Insider Tips for Luxury Car Rental

1. **Book in Advance**: Popular models get booked quickly, especially during peak seasons.

2. **Understand Insurance**: Comprehensive insurance is crucial for peace of mind.

3. **Know the Rules**: Familiarize yourself with Dubai's driving regulations and speed limits.

4. **Plan Your Route**: Dubai's attractions are spread out, so plan your itinerary to maximize your rental experience.

## Best Routes for Luxury Car Tours

- **Palm Jumeirah**: Cruise along the iconic palm-shaped island
- **Dubai Marina**: Experience the city's modern skyline
- **Jumeirah Beach Road**: Coastal drive with stunning views
- **Sheikh Zayed Road**: The city's main artery with impressive architecture

## Making the Most of Your Experience

A luxury car rental in Dubai isn't just about transportation—it's about creating memories that last a lifetime. Whether you're celebrating a special occasion or simply want to experience the city in style, the right luxury car can transform your Dubai adventure.`,
      category: "luxury",
      author: "Ahmed Al-Rashid",
      date: "2025-01-15",
      readTime: "5 min read",
      image: "🚗",
      featured: true,
      tags: ["Luxury Cars", "Dubai", "Rental Guide"]
    },
    {
      id: 2,
      title: "Top 10 Exotic Cars to Rent for Special Occasions",
      excerpt: "Explore our curated list of the most sought-after exotic cars available for rent, perfect for making any special occasion truly memorable.",
      content: `When it comes to special occasions, nothing makes a statement quite like an exotic car. Whether it's a wedding, anniversary, or milestone celebration, the right exotic car can transform your event into an unforgettable experience.

## The Ultimate Exotic Car Collection

### 1. Ferrari F8 Spider
The perfect blend of Italian passion and engineering excellence. This convertible supercar delivers an exhilarating driving experience with its 720-horsepower V8 engine.

### 2. Lamborghini Urus
The world's first Super Sport Utility Vehicle, combining the soul of a supercar with the functionality of an SUV. Perfect for those who want performance without compromising on practicality.

### 3. Porsche 911 Turbo S
A timeless icon that continues to set benchmarks in the sports car world. The 911 Turbo S offers blistering performance with everyday usability.

### 4. McLaren 720S
British engineering at its finest, delivering mind-bending performance with cutting-edge aerodynamics and lightweight construction.

### 5. Aston Martin DB11
Elegance meets performance in this grand tourer. Perfect for those who appreciate both style and substance.

## Choosing the Right Exotic Car

Consider these factors when selecting your exotic car rental:

- **Occasion Type**: Formal events may call for elegant grand tourers, while casual celebrations might suit flashy supercars
- **Group Size**: Some exotic cars are strictly two-seaters, while others offer more space
- **Driving Experience**: Consider your comfort level with high-performance vehicles
- **Budget**: Exotic car rentals vary significantly in price

## Special Occasion Ideas

- **Wedding Processions**: Make your grand entrance unforgettable
- **Anniversary Celebrations**: Recreate your first date or celebrate milestones
- **Birthday Surprises**: Give the gift of an exotic driving experience
- **Corporate Events**: Impress clients and partners with luxury transportation
- **Graduation Celebrations**: Reward academic achievements in style

## Booking Tips for Special Occasions

1. **Plan Ahead**: Exotic cars are in high demand for special occasions
2. **Consider the Weather**: Convertibles are great, but have a backup plan
3. **Coordinate with Venues**: Ensure your chosen car fits the venue's requirements
4. **Photography**: Exotic cars make for stunning photo opportunities
5. **Insurance**: Ensure comprehensive coverage for peace of mind

## Making Memories That Last

An exotic car rental for a special occasion isn't just about the car—it's about creating moments that will be talked about for years to come. The right exotic car can turn any special day into an extraordinary experience that you and your guests will never forget.`,
      category: "luxury",
      author: "Sarah Johnson",
      date: "2025-01-12",
      readTime: "7 min read",
      image: "🏎️",
      featured: false,
      tags: ["Exotic Cars", "Special Events", "Luxury"]
    },
    {
      id: 3,
      title: "Driving Tips for First-Time Luxury Car Renters",
      excerpt: "Essential tips and advice for those new to luxury car rentals, ensuring a safe and enjoyable driving experience.",
      content: `Renting a luxury car for the first time can be both exciting and intimidating. These high-performance vehicles require a different approach to driving, and understanding the basics can make your experience much more enjoyable.

## Pre-Rental Preparation

### Understanding the Vehicle
Before you even get behind the wheel, take time to familiarize yourself with the car's features and controls. Luxury vehicles often have advanced systems that differ from standard cars.

### Documentation Requirements
- Valid driver's license (international license if required)
- Credit card for security deposit
- Proof of insurance (if not purchasing rental insurance)
- Age verification (most luxury rentals require drivers to be 25+)

## Essential Driving Tips

### 1. Start Slowly
Luxury cars often have significantly more power than standard vehicles. Take time to get accustomed to the acceleration, braking, and handling characteristics.

### 2. Understand the Controls
Modern luxury cars come with advanced features like:
- Adaptive cruise control
- Lane departure warning
- Blind spot monitoring
- Performance driving modes

### 3. Respect the Power
High-performance vehicles can accelerate quickly. Be mindful of speed limits and traffic conditions, especially in urban areas.

### 4. Braking Distance
Luxury cars often have larger, more powerful brakes, but they also weigh more. Allow extra stopping distance until you're comfortable with the vehicle's braking characteristics.

## Safety Considerations

### Weather Conditions
- Avoid driving high-performance cars in adverse weather
- Wet roads can be particularly challenging for rear-wheel-drive supercars
- Consider the season and typical weather patterns

### Traffic Awareness
- Luxury cars attract attention—be prepared for stares and photo requests
- Park in well-lit, secure areas
- Be aware of your surroundings at all times

### Insurance and Coverage
- Understand your rental agreement thoroughly
- Consider additional coverage for high-value vehicles
- Know what's covered and what isn't

## Common Mistakes to Avoid

1. **Overconfidence**: Don't let the excitement override good judgment
2. **Ignoring Warning Lights**: Luxury cars have sophisticated systems—pay attention to alerts
3. **Skipping the Walkthrough**: Always take the time to understand the vehicle's features
4. **Neglecting Maintenance Checks**: Perform basic checks before driving
5. **Underestimating Costs**: Luxury car rentals come with premium pricing

## Maximizing Your Experience

### Planning Your Route
- Choose roads that showcase the car's capabilities
- Avoid heavy traffic areas during peak times
- Plan stops for photos and breaks

### Photography Tips
- Luxury cars make excellent photo subjects
- Consider the lighting and background
- Capture both the car and the experience

### Enjoying the Moment
- Take time to appreciate the engineering and craftsmanship
- Listen to the engine note and feel the performance
- Create memories that will last a lifetime

## Building Confidence

Start with less powerful luxury cars if you're new to high-performance driving. Many rental companies offer a range of vehicles, allowing you to work your way up to more exotic models as you gain experience.

Remember, the goal is to have a safe, enjoyable experience that creates lasting memories. Take your time, be patient with yourself, and don't hesitate to ask questions or request additional guidance from the rental company.`,
      category: "tips",
      author: "Michael Chen",
      date: "2025-01-10",
      readTime: "6 min read",
      image: "🚙",
      featured: false,
      tags: ["Driving Tips", "Luxury Cars", "Safety"]
    },
    {
      id: 4,
      title: "Dubai's Most Instagram-Worthy Car Rental Spots",
      excerpt: "Discover the most photogenic locations in Dubai for your luxury car rental photoshoot, from iconic landmarks to hidden gems.",
      content: `Dubai offers countless opportunities for stunning car photography, with its unique architecture, pristine beaches, and dramatic landscapes providing the perfect backdrop for luxury vehicles.

## Iconic Landmark Locations

### Burj Khalifa & Downtown Dubai
The world's tallest building provides an impressive backdrop for any luxury car. The surrounding Downtown area offers multiple angles and perspectives.

**Best Times**: Early morning or golden hour for dramatic lighting
**Photography Tips**: Use wide-angle lenses to capture both the car and the building's full height

### Palm Jumeirah
The iconic palm-shaped island offers unique aerial perspectives and beachfront locations perfect for luxury car photography.

**Best Spots**: 
- The Palm's crescent
- Beachfront villas
- Aerial viewpoints

### Dubai Marina
The modern skyline and waterfront location create a sophisticated backdrop for luxury car photos.

**Photography Angles**:
- Marina Walk
- Pier 7
- Waterfront promenades

## Hidden Gem Locations

### Al Qudra Lakes
A serene desert oasis that provides a unique contrast to luxury vehicles, creating striking visual compositions.

### Hatta Mountains
Mountain roads and scenic overlooks offer dramatic backdrops for performance car photography.

### Dubai Design District
Modern architecture and artistic installations provide contemporary settings for luxury car photos.

## Photography Tips for Car Rentals

### Lighting Considerations
- **Golden Hour**: The hour after sunrise and before sunset provides the best natural lighting
- **Blue Hour**: The period just after sunset offers dramatic city lighting
- **Avoid Midday**: Harsh sunlight can create unflattering shadows

### Composition Techniques
- **Rule of Thirds**: Position the car off-center for more dynamic compositions
- **Leading Lines**: Use roads, buildings, or natural features to guide the viewer's eye
- **Depth of Field**: Use shallow depth of field to separate the car from the background

### Camera Settings
- **Aperture**: f/2.8 to f/5.6 for good subject separation
- **Shutter Speed**: 1/125s or faster to avoid motion blur
- **ISO**: Keep as low as possible for best image quality

## Seasonal Considerations

### Winter (November - March)
- Perfect weather for outdoor photography
- Clear skies and comfortable temperatures
- Best time for desert and outdoor locations

### Summer (April - October)
- Early morning or late evening shoots recommended
- Indoor locations or air-conditioned venues
- Consider the heat's impact on both photographer and equipment

## Safety and Legal Considerations

### Photography Permits
- Some locations may require permits for commercial photography
- Check with venue management before shooting
- Respect private property and security guidelines

### Traffic and Safety
- Never compromise safety for a photo
- Use designated parking areas
- Be aware of traffic regulations and restrictions

## Creating a Cohesive Portfolio

### Planning Your Shoots
- Research locations in advance
- Consider the car's color and style when choosing backgrounds
- Plan multiple locations for variety

### Post-Processing
- Maintain consistent editing style
- Enhance colors to match the luxury aesthetic
- Consider the brand's visual identity

## Social Media Optimization

### Instagram-Worthy Shots
- Vertical format for Instagram stories
- Square format for feed posts
- Consider the platform's visual requirements

### Hashtag Strategy
- Use relevant Dubai and luxury car hashtags
- Include location-specific tags
- Research trending automotive hashtags

## Professional Photography Services

For the best results, consider hiring a professional automotive photographer who understands:
- Luxury car aesthetics
- Dubai's unique lighting conditions
- Optimal shooting locations
- Post-processing techniques

## Making the Most of Your Rental

### Planning Your Route
- Map out multiple locations in advance
- Consider travel time between locations
- Plan for different times of day

### Multiple Angles
- Capture the car from various perspectives
- Include both detail shots and wide compositions
- Consider interior photography as well

## Building Your Brand

### Consistent Visual Style
- Develop a signature editing style
- Use consistent color grading
- Maintain professional quality standards

### Content Strategy
- Plan your content calendar
- Mix different types of shots
- Engage with your audience

## Conclusion

Dubai's unique landscape and architecture provide endless opportunities for stunning luxury car photography. With proper planning, the right locations, and attention to detail, you can create a portfolio of images that truly showcase both the beauty of your rental vehicle and the magnificence of Dubai itself.`,
      category: "tips",
      author: "Emma Rodriguez",
      date: "2025-01-08",
      readTime: "8 min read",
      image: "📸",
      featured: true,
      tags: ["Photography", "Dubai", "Luxury Cars"]
    },
    {
      id: 5,
      title: "Luxury Car Rental vs. Buying: A Complete Comparison",
      excerpt: "An in-depth analysis of the costs, benefits, and considerations when choosing between luxury car rental and ownership.",
      content: `The decision between renting and buying a luxury car involves multiple factors beyond just the financial investment. This comprehensive comparison will help you make an informed choice that aligns with your lifestyle and goals.

## Financial Analysis

### Rental Costs
- **Daily Rates**: $200-$2,000+ depending on the vehicle
- **Weekly Rates**: Often 20-30% discount from daily rates
- **Monthly Rates**: Significant savings for extended rentals
- **Additional Costs**: Insurance, fuel, delivery fees

### Ownership Costs
- **Purchase Price**: $50,000-$500,000+ for luxury vehicles
- **Depreciation**: 15-25% in the first year
- **Insurance**: $2,000-$10,000+ annually
- **Maintenance**: $1,000-$5,000+ annually
- **Storage**: Garage or storage facility costs

## Cost Comparison Scenarios

### Scenario 1: Occasional Use (10 days/year)
**Rental**: $2,000-$20,000 annually
**Ownership**: $15,000-$50,000+ annually
**Winner**: Rental

### Scenario 2: Regular Use (50 days/year)
**Rental**: $10,000-$100,000 annually
**Ownership**: $15,000-$50,000+ annually
**Winner**: Depends on vehicle choice

### Scenario 3: Frequent Use (150+ days/year)
**Rental**: $30,000-$300,000+ annually
**Ownership**: $15,000-$50,000+ annually
**Winner**: Ownership

## Lifestyle Considerations

### Flexibility Benefits of Rental
- **Variety**: Drive different luxury cars
- **No Long-term Commitment**: Perfect for changing preferences
- **No Maintenance Worries**: Always drive a well-maintained vehicle
- **Latest Models**: Access to newest releases
- **Seasonal Choices**: Convertibles in summer, SUVs in winter

### Ownership Benefits
- **Convenience**: Always available
- **Personalization**: Customize to your preferences
- **Status Symbol**: Permanent addition to your collection
- **Investment Potential**: Some vehicles appreciate in value
- **Emotional Connection**: True ownership experience

## Practical Considerations

### Storage and Security
**Rental**: No storage concerns
**Ownership**: Requires secure, climate-controlled storage

### Maintenance and Repairs
**Rental**: Handled by rental company
**Ownership**: Your responsibility and cost

### Insurance Complexity
**Rental**: Simple, included in rental cost
**Ownership**: Complex policies, higher premiums

## Market Trends and Depreciation

### Luxury Car Depreciation Rates
- **Supercars**: 20-30% in first year
- **Luxury SUVs**: 15-25% in first year
- **Classic Cars**: May appreciate over time
- **Limited Editions**: Often hold value better

### Rental Market Trends
- **Peak Seasons**: Higher rates during events and holidays
- **Demand Fluctuations**: Prices vary based on availability
- **New Model Premiums**: Latest releases command higher rates

## Tax Implications

### Rental Deductions
- **Business Use**: May be deductible
- **Event Expenses**: Often tax-deductible
- **Simple Tracking**: Easy to document expenses

### Ownership Tax Benefits
- **Depreciation**: May be deductible for business use
- **Interest Deductions**: If financed
- **Sales Tax**: One-time cost vs. ongoing rental taxes

## Risk Assessment

### Rental Risks
- **Availability**: Popular models may not be available
- **Rate Fluctuations**: Prices can increase significantly
- **Damage Liability**: Potential for additional charges
- **Limited Customization**: Must work with available options

### Ownership Risks
- **Depreciation**: Significant value loss over time
- **Maintenance Costs**: Unexpected repair expenses
- **Market Changes**: Vehicle values can fluctuate
- **Storage Costs**: Ongoing facility expenses

## Decision Framework

### Choose Rental If:
- You use luxury cars infrequently
- You enjoy variety and trying different models
- You prefer not to deal with maintenance
- You want access to the latest models
- You have limited storage space
- You're unsure about long-term commitment

### Choose Ownership If:
- You use luxury cars frequently
- You want a specific, customized vehicle
- You see it as an investment
- You have secure storage
- You want the convenience of always having access
- You have the financial capacity for the full investment

## Hybrid Approach

### Lease Options
- **Long-term Rental**: 6-12 month commitments
- **Lease-to-Own**: Option to purchase at lease end
- **Seasonal Rentals**: Different vehicles for different seasons

### Fractional Ownership
- **Shared Ownership**: Split costs with other owners
- **Time-sharing**: Rotate usage among owners
- **Investment Groups**: Pool resources for luxury car investments

## Making Your Decision

### Key Questions to Ask:
1. How often will you actually use the vehicle?
2. Do you prefer variety or consistency?
3. What's your budget for ongoing costs?
4. Do you have secure storage available?
5. Are you comfortable with maintenance responsibilities?
6. Is this a status symbol or practical transportation?

### Financial Planning
- **Calculate Total Cost of Ownership**: Include all expenses over your intended use period
- **Compare to Rental Costs**: For the same usage pattern
- **Consider Opportunity Cost**: What else could you do with the money?
- **Factor in Resale Value**: How much will you recover?

## Conclusion

The choice between luxury car rental and ownership ultimately depends on your individual circumstances, usage patterns, and financial situation. For most people, rental offers the best value and flexibility, while ownership makes sense for those with frequent usage and specific requirements.

Consider starting with rentals to understand your preferences and usage patterns before making a significant ownership investment. This approach allows you to experience different vehicles and determine what truly fits your lifestyle and needs.`,
      category: "tips",
      author: "David Thompson",
      date: "2025-01-05",
      readTime: "10 min read",
      image: "💰",
      featured: false,
      tags: ["Financial Planning", "Luxury Cars", "Investment"]
    }
  ];

  useEffect(() => {
    const postId = parseInt(params.id);
    const post = blogPosts.find(p => p.id === postId);
    
    if (post) {
      setBlogPost(post);
      // Get related posts (same category, excluding current post)
      const related = blogPosts
        .filter(p => p.category === post.category && p.id !== postId)
        .slice(0, 3);
      setRelatedPosts(related);
    }
    
    setIsLoading(false);
  }, [params.id]);

  const handleBackToBlogs = () => {
    router.push('/blogs');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <button
              onClick={handleBackToBlogs}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Blogs
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <button
              onClick={handleBackToBlogs}
              className="inline-flex items-center text-blue-200 hover:text-white transition-colors mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blogs
            </button>
            
            <div className="text-6xl mb-6">{blogPost.image}</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {blogPost.excerpt}
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-blue-200">
              <div className="flex items-center">
                <span className="text-2xl mr-2">👤</span>
                <span className="font-medium">{blogPost.author}</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">📅</span>
                <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">⏱️</span>
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {blogPost.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  } else if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h4 key={index} className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                        {paragraph.replace(/\*\*/g, '')}
                      </h4>
                    );
                  } else if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={index} className="list-disc list-inside mb-4 text-gray-700">
                        <li>{paragraph.replace('- ', '')}</li>
                      </ul>
                    );
                  } else if (paragraph.startsWith('1. ')) {
                    return (
                      <ol key={index} className="list-decimal list-inside mb-4 text-gray-700">
                        <li>{paragraph.replace('1. ', '')}</li>
                      </ol>
                    );
                  } else {
                    return (
                      <p key={index} className="text-gray-700 mb-6 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  }
                })}
              </div>
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="p-6">
                    <div className="text-4xl mb-4">{post.image}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <button
                      onClick={() => router.push(`/blogs/${post.id}`)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Luxury?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Browse our premium collection of luxury vehicles and find the perfect car for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/fleet')}
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              View Our Fleet
            </button>
            <button
              onClick={() => router.push('/contactus')}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
