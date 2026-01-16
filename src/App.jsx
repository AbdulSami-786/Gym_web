import React, { useState, useEffect, useRef } from 'react';

const GymWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorImages] = useState([
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&h=100&fit=crop&crop=center'
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    plan: 'basic'
  });
  const [darkMode, setDarkMode] = useState(false);
  const animationRefs = useRef([]);

  // Generate realistic gym images using Unsplash
  const gymImages = {
    facility: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    personalTraining: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    weightRoom: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=800&h=600&fit=crop',
    cardioArea: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=800&h=600&fit=crop&crop=right',
    yogaClass: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
    poolArea: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    crossfit: 'https://images.unsplash.com/photo-1596357395217-80de13130e92?w=800&h=600&fit=crop',
    boxing: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=600&fit=crop',
    lockerRoom: 'https://images.unsplash.com/photo-1590488358256-9f99db6c2a6c?w=800&h=600&fit=crop',
    sauna: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop',
    cafe: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    reception: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop'
  };

  // Gallery images array
  const galleryImages = Array.from({ length: 12 }).map((_, idx) => ({
    id: idx + 1,
    url: `https://images.unsplash.com/photo-${[
      '1534438327276-14e5300c3a48', '1531018650781-49c4487dffa9',
      '1534367507877-0edd93bd013b', '1571019613454-1cb2f99b2d8b',
      '1544367567-0f2fcb009e0b', '1558618666-fcd25c85cd64',
      '1596357395217-80de13130e92', '1549719386-74dfcbf7dbed',
      '1590488358256-9f99db6c2a6c', '1540555700478-4be289fbecef',
      '1556909114-f6e7ad7d3136', '1571902943202-507ec2618e8f'
    ][idx]}?w=600&h=400&fit=crop`,
    category: ['Cardio', 'Strength', 'Yoga', 'CrossFit', 'Boxing', 'Pool', 'HIIT', 'Spin', 'Sauna', 'Locker', 'Cafe', 'Reception'][idx],
    title: ['Modern Cardio Zone', 'Weightlifting Arena', 'Yoga Studio', 'CrossFit Box', 'Boxing Ring', 'Olympic Pool', 'HIIT Studio', 'Spin Class', 'Sauna Room', 'Locker Room', 'Protein Cafe', 'Main Reception'][idx]
  }));

  // Trainer images
  const trainers = [
    { 
      name: 'Mike Stone', 
      spec: 'Strength Coach', 
      img: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop&crop=face',
      bio: '10+ years experience, NASM certified',
      instagram: '@mikestonefit'
    },
    { 
      name: 'Sarah Chen', 
      spec: 'Yoga Expert', 
      img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face',
      bio: 'RYT 500, specializes in vinyasa flow',
      instagram: '@sarahchenyoga'
    },
    { 
      name: 'Alex Rivera', 
      spec: 'CrossFit Pro', 
      img: 'https://images.unsplash.com/photo-1563122870-6b0b48a0af09?w=400&h=400&fit=crop&crop=face',
      bio: 'CrossFit Level 3, 3x Regional champion',
      instagram: '@alexriveracf'
    }
  ];

  // Handle cursor follow
  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     setCursorPos({ x: e.clientX, y: e.clientY });
  //   };
  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => window.removeEventListener('mousemove', handleMouseMove);
  // }, []);

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      animationRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8;
          if (isVisible) {
            ref.classList.add('animate-in');
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully! We\'ll contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      plan: 'basic'
    });
  };

  // Navigation
  const renderNavigation = () => (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-md shadow-xl`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-pulse mr-3 flex items-center justify-center">
              <span className="text-white font-bold text-xl">EF</span>
            </div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} animate-bounce`}>
              ELITE<span className="text-red-500">FIT</span>
            </h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'services', 'gallery', 'contact', 'join'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`capitalize font-semibold transition-all duration-300 transform hover:scale-110 hover:text-red-500 ${
                  currentPage === item 
                    ? 'text-red-500 border-b-2 border-red-500' 
                    : darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {item.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-800'} hover:scale-110`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="md:hidden text-2xl hover:text-red-500 transition-colors">
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Cursor Followers
  const renderCursorFollowers = () => (
    currentPage === 'home' && cursorImages.map((img, index) => (
      <div
        key={index}
        className="fixed w-20 h-20 rounded-full pointer-events-none z-40 transition-all duration-75 shadow-2xl"
        style={{
          left: `${cursorPos.x + (index * 30 - 60)}px`,
          top: `${cursorPos.y + (index * 30 - 60)}px`,
          transform: `translate(-50%, -50%) rotate(${index * 45}deg)`,
          transition: 'left 0.075s, top 0.075s',
          filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))'
        }}
      >
        <img
          src={img}
          alt={`cursor-${index}`}
          className="w-full h-full rounded-full border-4 border-red-500 animate-spin-slow"
          style={{ animationDuration: `${5 + index * 2}s` }}
        />
      </div>
    ))
  );

  // Home Page
 // Home Page - Updated with More Content
const renderHomePage = () => (
  <div className="space-y-20">
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-red-900 animate-gradient-xy"
        style={{
          backgroundImage: `url(${gymImages.facility})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in-down tracking-tight leading-tight">
          TRANSFORM <span className="text-red-500">YOUR</span><br />BODY & MIND
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up max-w-3xl mx-auto">
          Join 5,000+ members at NYC's premier fitness destination. 24/7 access, expert trainers, and results that last.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center animate-fade-in-up">
          <button
            onClick={() => setCurrentPage('join')}
            className="px-10 py-5 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full text-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse hover:animate-none shadow-lg"
          >
            🚀 START 7-DAY FREE TRIAL
          </button>
          <button
            onClick={() => setCurrentPage('gallery')}
            className="px-10 py-5 border-2 border-white text-white font-bold rounded-full text-xl transform hover:scale-105 transition-all duration-300 hover:bg-white hover:text-black backdrop-blur-sm"
          >
            🎬 WATCH TOUR VIDEO
          </button>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '5,000+', label: 'Active Members', icon: '👥' },
              { number: '24/7', label: 'Access', icon: '⏰' },
              { number: '50+', label: 'Expert Trainers', icon: '🏆' },
              { number: '200+', label: 'Modern Machines', icon: '⚙️' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center animate-float" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-white text-center">
          <div className="text-lg mb-2">Scroll Down</div>
          <div className="text-2xl">↓</div>
        </div>
      </div>
    </section>

    {/* Featured Programs Section */}
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6">
          Featured <span className="text-red-500">Programs</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our most popular fitness programs designed for all levels
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          {
            title: '30-Day Transformation',
            desc: 'Lose 10-15lbs with our proven weight loss program',
            icon: '🔥',
            duration: '30 Days',
            intensity: 'High',
            results: ['Personalized meal plan', 'Daily workout routines', 'Progress tracking', 'Coach support']
          },
          {
            title: 'Strength Foundation',
            desc: 'Build lean muscle with proper form and technique',
            icon: '💪',
            duration: '8 Weeks',
            intensity: 'Medium',
            results: ['Strength assessment', 'Form correction', 'Progressive overload', 'Recovery guidance']
          },
          {
            title: 'Beginner to Beast',
            desc: 'Complete fitness journey for absolute beginners',
            icon: '🚀',
            duration: '12 Weeks',
            intensity: 'Low-Medium',
            results: ['Slow progression', 'Form mastery', 'Community support', 'Confidence building']
          }
        ].map((program, idx) => (
          <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl transform hover:-translate-y-2 transition-all duration-500 group border border-gray-100">
            <div className="text-5xl mb-6 transform group-hover:scale-125 transition-transform duration-300">
              {program.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
            <p className="text-gray-600 mb-6">{program.desc}</p>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">⏱️</span>
                <span className="font-semibold">{program.duration}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">⚡</span>
                <span className="font-semibold">{program.intensity}</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {program.results.map((result, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">{result}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-gradient-to-r from-gray-900 to-black text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-500 transition-all duration-300">
              Learn More
            </button>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <button 
          onClick={() => setCurrentPage('services')}
          className="px-8 py-4 border-2 border-red-500 text-red-500 font-bold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          View All Programs →
        </button>
      </div>
    </section>

    {/* Mission Section */}
    <section ref={el => animationRefs.current[0] = el} className="container mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 animate-slide-in-left">
          <div className="relative group">
            <img
              src={gymImages.facility}
              alt="Modern Gym Facility"
              className="rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-red-500 px-4 py-2 rounded-full text-sm font-bold">🏆 PREMIUM FACILITY</span>
            </div>
          </div>
          
          {/* Mini Gallery */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[gymImages.cardioArea, gymImages.weightRoom, gymImages.yogaClass].map((img, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg">
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-32 object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/2 animate-slide-in-right">
          <div className="inline-block mb-6">
            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold">OUR MISSION</span>
          </div>
          <h2 className="text-5xl font-bold mb-6">
            More Than <span className="text-red-500">Just a Gym</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We're a community-driven fitness sanctuary where technology meets tradition, 
            expert guidance meets personal commitment, and every workout brings you closer 
            to your best self. Our mission is to create an environment where fitness 
            becomes a lifestyle, not just a routine.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-10">
            {[
              { icon: '🏋️', title: '24/7 Smart Access', desc: 'Work out on your schedule with biometric entry' },
              { icon: '👥', title: 'Expert Community', desc: 'Train alongside fitness enthusiasts' },
              { icon: '💪', title: 'Cutting-Edge Equipment', desc: 'Latest Technogym & Hammer Strength' },
              { icon: '📱', title: 'Smart Tracking', desc: 'AI-powered progress monitoring' }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Book Free Tour
            </button>
            <button className="flex items-center text-gray-700 hover:text-red-500 transition-colors">
              <span className="mr-2">📞</span>
              Schedule Call
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Success Stories Section */}
    <section className="bg-gradient-to-r from-gray-50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Real <span className="text-red-500">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our members transformed their lives with EliteFit
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              name: 'Michael Chen',
              beforeAfter: 'Lost 42lbs in 90 Days',
              story: 'Went from never exercising to running a half marathon',
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
              stats: ['-42lbs', '+40% Energy', 'Half Marathon']
            },
            {
              name: 'Sarah Johnson',
              beforeAfter: 'Gained 15lbs Muscle',
              story: 'Transformed from skinny to strong with our strength program',
              img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
              stats: ['+15lbs Muscle', '2x Strength', 'Competition Ready']
            },
            {
              name: 'David Wilson',
              beforeAfter: 'Improved Health Markers',
              story: 'Reversed pre-diabetes and gained vitality at 52',
              img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
              stats: ['-30lbs', 'No Meds', 'Active Lifestyle']
            }
          ].map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-4 transition-all duration-500 group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-red-300 font-semibold">{member.beforeAfter}</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 italic mb-6">"{member.story}"</p>
                <div className="flex flex-wrap gap-3">
                  {member.stats.map((stat, i) => (
                    <span key={i} className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-semibold">
                      {stat}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-yellow-400">
                    {'⭐'.repeat(5)}
                    <span className="ml-2 text-gray-600">5.0 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white font-bold rounded-full hover:from-red-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-105">
            Read More Stories
          </button>
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section ref={el => animationRefs.current[1] = el} className="container mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
        <div className="lg:w-1/2 animate-slide-in-right">
          <div className="relative group">
            <img
              src={gymImages.personalTraining}
              alt="Personal Training Session"
              className="rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-blue-500 px-4 py-2 rounded-full text-sm font-bold">👤 1-ON-1 TRAINING</span>
            </div>
          </div>
          
          {/* Stats Card */}
          <div className="mt-8 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-90">Member Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm opacity-90">Average Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Results Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 animate-slide-in-left">
          <div className="inline-block mb-6">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold">WHY CHOOSE US</span>
          </div>
          <h2 className="text-5xl font-bold mb-6">
            The <span className="text-red-500">EliteFit</span> Difference
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We combine cutting-edge technology with personalized attention to deliver 
            results you can see and feel.
          </p>
          
          <div className="space-y-6">
            {[
              { 
                title: 'AI-Powered Training', 
                desc: 'Smart equipment tracks your progress and adjusts workouts automatically',
                icon: '🤖',
                features: ['Real-time form correction', 'Progress analytics', 'Auto-adjusting weights']
              },
              { 
                title: 'Holistic Wellness', 
                desc: 'Complete approach including nutrition, recovery, and mental health',
                icon: '🧘',
                features: ['Nutrition planning', 'Recovery protocols', 'Stress management']
              },
              { 
                title: 'Community Events', 
                desc: 'Regular challenges, workshops, and social events to keep you motivated',
                icon: '🎉',
                features: ['Monthly challenges', 'Expert workshops', 'Member socials']
              },
              { 
                title: 'Flexible Membership', 
                desc: 'No contracts, freeze options, and upgrade/downgrade anytime',
                icon: '📋',
                features: ['No long-term contracts', 'Freeze anytime', 'Easy upgrades']
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <span className="text-red-500 group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Class Schedule Preview */}
    <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6">
            Popular <span className="text-red-500">Classes</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our most-booked group classes with expert instructors
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              name: 'HIIT Blast',
              time: '6:00 AM, 6:00 PM',
              intensity: '🔥🔥🔥',
              spots: '3 spots left',
              instructor: 'Coach Mike'
            },
            {
              name: 'Power Yoga',
              time: '7:00 AM, 7:00 PM',
              intensity: '🔥🔥',
              spots: 'Full',
              instructor: 'Sarah'
            },
            {
              name: 'Spin & Burn',
              time: '8:00 AM, 8:00 PM',
              intensity: '🔥🔥🔥',
              spots: '5 spots left',
              instructor: 'Alex'
            },
            {
              name: 'Strength Camp',
              time: '5:00 PM',
              intensity: '🔥🔥🔥🔥',
              spots: '2 spots left',
              instructor: 'Coach Mike'
            }
          ].map((cls, idx) => (
            <div key={idx} className="bg-gray-800 rounded-2xl p-6 transform hover:-translate-y-2 transition-all duration-300 hover:bg-gray-700 group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{cls.name}</h3>
                <span className="text-red-400 font-bold">{cls.intensity}</span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300">
                  <span className="mr-3">⏰</span>
                  <span>{cls.time}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="mr-3">👤</span>
                  <span>{cls.instructor}</span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full text-center font-bold ${
                cls.spots === 'Full' ? 'bg-gray-700 text-gray-400' : 'bg-red-500 text-white'
              }`}>
                {cls.spots === 'Full' ? 'Waitlist Available' : cls.spots}
              </div>
              <button className="w-full mt-4 py-3 bg-white text-gray-900 font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                Book Now
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => setCurrentPage('services')}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            View Full Schedule →
          </button>
        </div>
      </div>
    </section>

    {/* Trainer Highlights */}
    <section ref={el => animationRefs.current[2] = el} className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">
          Meet Our <span className="text-red-500">Elite Trainers</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get trained by industry professionals with proven track records of success
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {trainers.map((trainer, idx) => (
          <div 
            key={idx} 
            className="group cursor-pointer transform hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={trainer.img}
                alt={trainer.name}
                className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{trainer.name}</h3>
                  <p className="text-red-400 font-semibold mb-3">{trainer.spec}</p>
                  <p className="text-gray-300 text-sm mb-2">{trainer.bio}</p>
                  <p className="text-gray-400 text-sm">{trainer.instagram}</p>
                  <div className="flex space-x-4 mt-4">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600">
                      Book Session
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm hover:bg-gray-100">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold transform group-hover:scale-110 transition-transform duration-300">
                PRO
              </div>
            </div>
            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold mb-2">{trainer.name}</h3>
              <p className="text-red-600 font-semibold mb-3">{trainer.spec}</p>
              <div className="flex justify-center items-center space-x-1">
                {'⭐'.repeat(5).split('').map((star, i) => (
                  <span key={i} className="text-yellow-400 text-xl">{star}</span>
                ))}
                <span className="text-gray-600 ml-2">(4.9)</span>
              </div>
              <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-500">
                <span>NASM Certified</span>
                <span>•</span>
                <span>10+ Years</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <button className="px-8 py-4 border-2 border-red-500 text-red-500 font-bold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105">
          Meet All Trainers →
        </button>
      </div>
    </section>

    {/* Technology & Innovation */}
    <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Smart <span className="text-red-500">Fitness</span> Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of fitness with our cutting-edge technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: '📱',
              title: 'Mobile App',
              desc: 'Track workouts, book classes, and connect with trainers',
              features: ['Workout logging', 'Class booking', 'Progress tracking']
            },
            {
              icon: '🤖',
              title: 'AI Coach',
              desc: 'Personalized workout recommendations based on your data',
              features: ['Form analysis', 'Smart adjustments', 'Goal optimization']
            },
            {
              icon: '⌚',
              title: 'Wearable Integration',
              desc: 'Sync with Apple Watch, Fitbit, and other wearables',
              features: ['Heart rate sync', 'Calorie tracking', 'Sleep analysis']
            },
            {
              icon: '📊',
              title: 'Progress Analytics',
              desc: 'Detailed insights and recommendations for improvement',
              features: ['Performance reports', 'Trend analysis', 'Custom plans']
            }
          ].map((tech, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg transform hover:-translate-y-2 transition-all duration-300 group">
              <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                {tech.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
              <p className="text-gray-600 mb-6">{tech.desc}</p>
              <ul className="space-y-2">
                {tech.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="container mx-auto px-6 py-20">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-12 text-center text-white shadow-2xl">
        <h2 className="text-5xl font-bold mb-6">
          Ready to Start Your <span className="text-gray-900">Transformation</span>?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
          Join thousands who have transformed their lives with EliteFit. 
          Your journey to a healthier, stronger you starts today.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-10">
          <button
            onClick={() => setCurrentPage('join')}
            className="px-10 py-5 bg-white text-gray-900 font-bold rounded-full text-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            🎯 START FREE TRIAL
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-10 py-5 border-2 border-white text-white font-bold rounded-full text-xl transform hover:scale-105 transition-all duration-300 hover:bg-white hover:text-red-600"
          >
            📞 BOOK CONSULTATION
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">7 Days</div>
            <div className="text-sm opacity-90">Free Trial</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">$0</div>
            <div className="text-sm opacity-90">Enrollment Fee</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">24/7</div>
            <div className="text-sm opacity-90">Support</div>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ Preview */}
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6">
          Frequently Asked <span className="text-red-500">Questions</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get answers to common questions about joining EliteFit
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-6">
        {[
          {
            question: 'Do I need to be in shape to join?',
            answer: 'Not at all! We welcome all fitness levels and provide personalized programs for beginners.'
          },
          {
            question: 'What if I want to cancel my membership?',
            answer: 'No contracts, no hassle. Cancel anytime with 30 days notice.'
          },
          {
            question: 'Are personal trainers included?',
            answer: 'All members get one free assessment. Personal training is available as an add-on service.'
          },
          {
            question: 'What amenities do you offer?',
            answer: 'Locker rooms with showers, towel service, protein cafe, sauna, and free WiFi.'
          }
        ].map((faq, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
              <span className="text-red-500 text-2xl">+</span>
            </div>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:border-red-500 hover:text-red-500 transition-all duration-300">
          View All FAQs →
        </button>
      </div>
    </section>
  </div>
);

  // About Page
// About Page - Updated with More Content
const renderAboutPage = () => (
  <div className="container mx-auto px-6 py-20">
    <div className="text-center mb-20">
      <h1 className="text-6xl font-bold mb-6 animate-fade-in-down">
        Our <span className="text-red-500">Story</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        From a single location in 2010 to a nationwide fitness revolution, we've been transforming lives through innovation, community, and relentless pursuit of excellence.
      </p>
    </div>

    {/* Mission Statement Banner */}
    <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-12 text-white text-center mb-20 shadow-2xl transform hover:scale-105 transition-all duration-500">
      <div className="text-5xl mb-6">💪</div>
      <h2 className="text-4xl font-bold mb-6 max-w-4xl mx-auto">
        Empowering Every Individual to Achieve Their Peak Potential
      </h2>
      <p className="text-xl opacity-90 max-w-3xl mx-auto">
        We believe fitness is not just about physical transformation, but about building confidence, community, and a better quality of life for everyone.
      </p>
    </div>

    {/* Leadership Team */}
    <div className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">
          Meet Our <span className="text-red-500">Leadership</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The visionary minds behind EliteFit's success story
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: 'Marcus Johnson',
            role: 'Founder & CEO',
            img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
            bio: 'Former professional athlete turned fitness entrepreneur',
            quote: 'Fitness changed my life, and I wanted to create a place where it could change yours too.',
            experience: '15+ years in fitness industry'
          },
          {
            name: 'Dr. Sarah Mitchell',
            role: 'Head of Wellness',
            img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
            bio: 'PhD in Sports Science, specializes in holistic health',
            quote: 'True fitness combines physical strength with mental wellness.',
            experience: 'PhD, 10+ years clinical experience'
          },
          {
            name: 'Carlos Rodriguez',
            role: 'Operations Director',
            img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=400&h=400&fit=crop&crop=face',
            bio: 'Former Marine, brings discipline and excellence to operations',
            quote: 'Excellence in the details creates extraordinary results.',
            experience: '20+ years operations management'
          }
        ].map((leader, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-4 transition-all duration-500 group">
            <div className="relative h-64 overflow-hidden">
              <img
                src={leader.img}
                alt={leader.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{leader.name}</h3>
                  <p className="text-red-600 font-semibold">{leader.role}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Experience</div>
                  <div className="font-bold">{leader.experience}</div>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{leader.bio}</p>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="italic text-gray-700">"{leader.quote}"</p>
              </div>
              <div className="mt-6 flex space-x-4">
                <button className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors">
                  View Bio
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full text-sm hover:border-red-500 hover:text-red-500 transition-colors">
                  Connect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Core Values */}
    <div className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">
          Our <span className="text-red-500">Core Values</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The principles that guide everything we do
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: 'Excellence',
            icon: '🏆',
            description: 'We strive for excellence in every detail, from equipment maintenance to member service.',
            principles: ['Attention to detail', 'Continuous improvement', 'Highest standards']
          },
          {
            title: 'Community',
            icon: '🤝',
            description: 'We believe fitness is better together, building supportive relationships that last.',
            principles: ['Inclusive environment', 'Mutual support', 'Shared success']
          },
          {
            title: 'Innovation',
            icon: '🚀',
            description: 'We embrace technology and new methods to enhance the fitness experience.',
            principles: ['Cutting-edge tech', 'Research-driven', 'Future-focused']
          },
          {
            title: 'Integrity',
            icon: '⚖️',
            description: 'We operate with transparency, honesty, and ethical practices in all we do.',
            principles: ['Transparent pricing', 'Honest guidance', 'Ethical leadership']
          }
        ].map((value, idx) => (
          <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100">
            <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
              {value.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
            <p className="text-gray-600 mb-6">{value.description}</p>
            <ul className="space-y-2">
              {value.principles.map((principle, i) => (
                <li key={i} className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Featured Image with Quote */}
    <div className="mb-20">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=600&fit=crop"
          alt="EliteFit Gym Interior"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-12">
          <div className="text-white max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">More Than Just a Gym</h2>
            <p className="text-xl mb-6">A community where fitness meets lifestyle, technology meets tradition, and every member becomes family.</p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mr-4">
                <span className="text-white font-bold">MJ</span>
              </div>
              <div>
                <p className="font-bold">Marcus Johnson</p>
                <p className="text-gray-300">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Detailed Timeline */}
    <div className="max-w-6xl mx-auto mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">
          Our <span className="text-red-500">Journey</span> Through the Years
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Milestones that shaped our evolution from a single gym to a fitness leader
        </p>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500"></div>
        
        <div className="space-y-24">
          {[
            { 
              year: '2010', 
              event: 'Humble Beginnings', 
              desc: 'Opened first EliteFit location in a 3,000 sq ft space in downtown Manhattan',
              achievement: '500 founding members in first year',
              icon: '🚀',
              side: 'left'
            },
            { 
              year: '2012', 
              event: 'First Expansion', 
              desc: 'Opened second location in Brooklyn, introducing 24/7 access',
              achievement: 'Named "Best New Gym" by NYC Fitness Magazine',
              icon: '🏆',
              side: 'right'
            },
            { 
              year: '2015', 
              event: 'Technology Revolution', 
              desc: 'Launched mobile app with workout tracking and class booking',
              achievement: 'Reached 5,000 active members across locations',
              icon: '📱',
              side: 'left'
            },
            { 
              year: '2018', 
              event: 'Holistic Approach', 
              desc: 'Introduced nutrition counseling and mental wellness programs',
              achievement: 'Won "Best Overall Gym Experience" award',
              icon: '🧠',
              side: 'right'
            },
            { 
              year: '2020', 
              event: 'Pandemic Adaptation', 
              desc: 'Launched virtual training and created safe workout protocols',
              achievement: 'Maintained 95% membership retention',
              icon: '💪',
              side: 'left'
            },
            { 
              year: '2023', 
              event: 'Future-Ready Facilities', 
              desc: 'Complete renovation with AI-powered equipment and VR studios',
              achievement: '10,000+ members, 5 locations, national recognition',
              icon: '🤖',
              side: 'right'
            }
          ].map((item, idx) => (
            <div key={idx} className={`flex items-center ${item.side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-1/2 ${item.side === 'left' ? 'pr-12 text-right' : 'pl-12'}`}>
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{item.icon}</div>
                    <div>
                      <div className="text-sm text-gray-500">Year</div>
                      <div className="text-2xl font-bold text-red-600">{item.year}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.event}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <div className="bg-red-50 px-4 py-2 rounded-lg inline-block">
                    <span className="text-red-600 font-semibold">{item.achievement}</span>
                  </div>
                </div>
              </div>
              
              <div className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 border-4 border-white shadow-lg">
                {item.year}
              </div>
              
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Community Impact */}
    <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl p-12 mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-6">
          Community <span className="text-red-500">Impact</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Giving back and making a difference beyond our gym walls
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: 'Youth Fitness Programs',
            desc: 'Free fitness classes for underprivileged youth in NYC',
            impact: '2,500+ kids trained since 2015',
            icon: '👦'
          },
          {
            title: 'Senior Wellness',
            desc: 'Specialized programs for seniors focusing on mobility and balance',
            impact: '1,200+ senior members active',
            icon: '👵'
          },
          {
            title: 'Charity Events',
            desc: 'Annual charity runs and fitness challenges supporting local causes',
            impact: '$250,000+ raised for charities',
            icon: '❤️'
          }
        ].map((impact, idx) => (
          <div key={idx} className="bg-gray-800 rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-300 group">
            <div className="text-5xl mb-6 transform group-hover:scale-125 transition-transform duration-300">
              {impact.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{impact.title}</h3>
            <p className="text-gray-300 mb-6">{impact.desc}</p>
            <div className="bg-red-900/30 px-4 py-3 rounded-xl">
              <p className="font-bold text-red-300">{impact.impact}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
          Get Involved
        </button>
      </div>
    </div>

    {/* Awards & Recognition */}
    <div className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">
          Awards & <span className="text-red-500">Recognition</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Industry recognition for our commitment to excellence
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            year: '2023',
            award: 'Best Premium Gym',
            organization: 'Fitness Industry Awards',
            icon: '🏅'
          },
          {
            year: '2022',
            award: 'Innovation Excellence',
            organization: 'Tech Fitness Summit',
            icon: '🚀'
          },
          {
            year: '2021',
            award: 'Customer Service Award',
            organization: 'Service Excellence Council',
            icon: '⭐'
          },
          {
            year: '2020',
            award: 'Community Impact',
            organization: 'NYC Business Awards',
            icon: '🤝'
          }
        ].map((award, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                {award.icon}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Year</div>
                <div className="font-bold text-red-600">{award.year}</div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{award.award}</h3>
            <p className="text-gray-600 text-sm">{award.organization}</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="text-red-500 text-sm font-semibold hover:text-red-600">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Facility Features */}
    <div className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">
          World-Class <span className="text-red-500">Facilities</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience fitness in spaces designed for optimal performance and comfort
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {[
          {
            title: 'Strength Training Arena',
            features: ['200+ pieces of equipment', 'Olympic lifting platforms', 'Dedicated power racks', 'Competition-grade bars'],
            img: gymImages.weightRoom
          },
          {
            title: 'Cardio & Functional Zone',
            features: ['Latest treadmills & bikes', 'Rowing machines', 'Assault bikes', 'Functional training rig'],
            img: gymImages.cardioArea
          }
        ].map((facility, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all duration-500 group">
            <div className="h-56 overflow-hidden">
              <img
                src={facility.img}
                alt={facility.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{facility.title}</h3>
              <ul className="space-y-3 mb-6">
                {facility.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-red-600 transition-colors">
                View Photos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Detailed Testimonials */}
    <div className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">
          Member <span className="text-red-500">Stories</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Hear from members whose lives have been transformed through EliteFit
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          { 
            name: 'James Wilson', 
            quote: 'Lost 40lbs in 3 months with EliteFit trainers! The personalized attention and community support made all the difference.', 
            role: 'Member since 2019',
            img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
            result: '40lbs lost',
            journey: 'From office worker to marathon runner'
          },
          { 
            name: 'Lisa Park', 
            quote: 'The trainers changed my life completely. Not just physically, but mentally. I found confidence I never knew I had.', 
            role: 'Member since 2021',
            img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
            result: 'Marathon finisher',
            journey: 'Overcame anxiety through fitness'
          },
          { 
            name: 'Carlos Mendez', 
            quote: 'Best community and facilities. I look forward to every workout! The energy here is contagious.', 
            role: 'Member since 2020',
            img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
            result: 'Strength 2x',
            journey: 'Business owner finds work-life balance'
          }
        ].map((testimonial, idx) => (
          <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 group border border-gray-100">
            <div className="flex items-center mb-6">
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-red-100 group-hover:border-red-300 transition-colors"
              />
              <div className="ml-4">
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <div className="text-5xl text-red-400 mb-4 transform group-hover:scale-110 transition-transform">"</div>
            <p className="text-xl italic mb-6 text-gray-700 leading-relaxed">"{testimonial.quote}"</p>
            <div className="space-y-4">
              <div className="bg-red-50 px-4 py-3 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Achievement</div>
                <div className="text-red-600 font-bold">{testimonial.result}</div>
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Journey</div>
                <div className="text-gray-800">{testimonial.journey}</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-yellow-400">
                  {'⭐'.repeat(5)}
                </div>
                <button className="text-red-500 text-sm font-semibold hover:text-red-600">
                  Read Full Story →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          Read More Member Stories
        </button>
      </div>
    </div>

    {/* Future Vision */}
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-12 mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-6">
          Our <span className="text-red-500">Future</span> Vision
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Where we're heading in the next chapter of fitness innovation
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            year: '2024',
            goal: 'National Expansion',
            description: 'Opening 5 new locations across major US cities',
            icon: '🗺️'
          },
          {
            year: '2025',
            goal: 'AI Personal Training',
            description: 'Launching fully AI-powered personalized coaching',
            icon: '🤖'
          },
          {
            year: '2026',
            goal: 'Global Community',
            description: 'Connecting 100,000+ members worldwide',
            icon: '🌍'
          }
        ].map((vision, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg transform hover:-translate-y-2 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-6">
              <div className="text-4xl transform group-hover:scale-125 transition-transform duration-300">
                {vision.icon}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Target</div>
                <div className="text-2xl font-bold text-red-600">{vision.year}</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">{vision.goal}</h3>
            <p className="text-gray-600">{vision.description}</p>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                  style={{ width: `${(idx + 1) * 25}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Join Our Story CTA */}
    <div className="text-center">
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-white">
        <h2 className="text-4xl font-bold mb-6">
          Be Part of Our <span className="text-red-500">Story</span>
        </h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
          Join thousands of members who are writing their fitness success stories with us. 
          Your transformation could be our next chapter.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button
            onClick={() => setCurrentPage('join')}
            className="px-10 py-5 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full text-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Start Your Journey
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-10 py-5 border-2 border-white text-white font-bold rounded-full text-xl transform hover:scale-105 transition-all duration-300 hover:bg-white hover:text-gray-900"
          >
            Schedule Tour
          </button>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">13+</div>
            <div className="text-sm opacity-90">Years of Excellence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">10K+</div>
            <div className="text-sm opacity-90">Members Transformed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-sm opacity-90">Industry Awards</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

  // Services Page
// Services Page - Updated with More Content
const renderServicesPage = () => (
  <div className="container mx-auto px-6 py-20">
    <div className="text-center mb-20">
      <h1 className="text-6xl font-bold mb-6">
        Our <span className="text-red-500">Services</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Comprehensive fitness solutions designed for every goal, level, and lifestyle. 
        From beginner basics to elite performance training.
      </p>
    </div>

    {/* Service Categories Banner */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {[
        { name: 'Strength', count: '8 Programs', icon: '💪', color: 'bg-red-500' },
        { name: 'Cardio', count: '6 Classes', icon: '🏃', color: 'bg-blue-500' },
        { name: 'Mind-Body', count: '5 Disciplines', icon: '🧘', color: 'bg-green-500' },
        { name: 'Specialized', count: '7 Services', icon: '⭐', color: 'bg-purple-500' }
      ].map((category, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 group">
          <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
            {category.icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
          <p className="text-gray-600">{category.count}</p>
        </div>
      ))}
    </div>

    {/* Main Services Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      {[
        { 
          title: 'Strength Training', 
          icon: '💪', 
          desc: 'Build muscle with expert guidance and premium equipment',
          color: 'from-red-500 to-orange-500',
          image: gymImages.weightRoom,
          features: ['Free Weights Area', 'Power Racks', 'Olympic Platforms', 'Cable Machines'],
          level: 'All Levels',
          duration: '60-90 min'
        },
        { 
          title: 'Cardio Fitness', 
          icon: '🏃', 
          desc: 'Burn fat with HIIT programs and endurance training',
          color: 'from-blue-500 to-cyan-400',
          image: gymImages.cardioArea,
          features: ['Treadmills', 'Spin Bikes', 'Rowers', 'Ellipticals'],
          level: 'All Levels',
          duration: '30-60 min'
        },
        { 
          title: 'Personal Training', 
          icon: '👤', 
          desc: '1-on-1 customized sessions with certified coaches',
          color: 'from-green-500 to-emerald-400',
          image: gymImages.personalTraining,
          features: ['Custom Plans', 'Form Correction', 'Progress Tracking', 'Nutrition Advice'],
          level: 'Personalized',
          duration: '45-60 min'
        },
        { 
          title: 'Nutrition Plans', 
          icon: '🥗', 
          desc: 'Custom diet plans and meal preparation guidance',
          color: 'from-purple-500 to-pink-500',
          image: gymImages.cafe,
          features: ['Meal Planning', 'Macro Tracking', 'Supplement Guide', 'Progress Photos'],
          level: 'All Levels',
          duration: 'Ongoing'
        }
      ].map((service, idx) => (
        <div 
          key={idx} 
          className="group relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-500 h-full"
        >
          <div className="absolute inset-0">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
          </div>
          <div className="relative p-8 text-white text-center h-full flex flex-col justify-between">
            <div>
              <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 inline-block">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="mb-6 opacity-90">{service.desc}</p>
              <div className="mb-6">
                <div className="flex justify-center space-x-4 text-sm mb-3">
                  <div className="bg-white/20 px-3 py-1 rounded-full">
                    <span className="opacity-90">Level:</span> <span className="font-bold">{service.level}</span>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full">
                    <span className="opacity-90">Duration:</span> <span className="font-bold">{service.duration}</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm opacity-90 mb-2">Includes:</p>
                  <ul className="space-y-1 text-sm">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-gray-900 font-bold rounded-full transform group-hover:scale-110 transition-transform duration-300 hover:shadow-lg">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Specialized Training Programs */}
    <div className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">
          Specialized <span className="text-red-500">Training Programs</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced programs for specific goals and sports performance
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: 'Athletic Performance',
            description: 'Sport-specific training for enhanced performance',
            icon: '⚽',
            duration: '8-12 weeks',
            intensity: 'High',
            includes: ['Speed & Agility', 'Power Development', 'Sport-Specific Drills', 'Recovery Protocols'],
            results: '20-30% performance improvement'
          },
          {
            title: 'Post-Rehab Training',
            description: 'Safe return to activity after injury or surgery',
            icon: '🏥',
            duration: 'Custom',
            intensity: 'Low-Medium',
            includes: ['Medical Collaboration', 'Gradual Progression', 'Mobility Work', 'Strengthening'],
            results: 'Pain-free movement restoration'
          },
          {
            title: 'Body Transformation',
            description: 'Complete physical transformation program',
            icon: '🔥',
            duration: '12 weeks',
            intensity: 'High',
            includes: ['Fat Loss Phase', 'Muscle Building', 'Nutrition Protocol', 'Accountability'],
            results: '10-20% body fat reduction'
          }
        ].map((program, idx) => (
          <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl transform hover:-translate-y-4 transition-all duration-500 group border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div className="text-5xl transform group-hover:scale-125 transition-transform duration-300">
                {program.icon}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-bold text-red-600">{program.duration}</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
            <p className="text-gray-600 mb-6">{program.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="text-gray-500 mr-2">⚡ Intensity:</span>
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full mx-1 ${i < (program.intensity === 'High' ? 3 : program.intensity === 'Medium' ? 2 : 1) ? 'bg-red-500' : 'bg-gray-300'}`}
                    ></div>
                  ))}
                  <span className="ml-2 font-semibold">{program.intensity}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <p className="text-sm text-gray-600">Program Includes:</p>
                <ul className="space-y-2">
                  {program.includes.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Expected Results</p>
                <p className="font-bold text-red-600">{program.results}</p>
              </div>
            </div>
            
            <button className="w-full py-3 bg-gradient-to-r from-gray-900 to-black text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-500 transition-all duration-300">
              Get Program Details
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Group Classes Section */}
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-12 mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">
          Group <span className="text-red-500">Fitness Classes</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          High-energy classes led by certified instructors in our state-of-the-art studios
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          {
            name: 'HIIT Blast',
            description: 'High-intensity interval training for maximum calorie burn',
            intensity: '🔥🔥🔥',
            duration: '45 min',
            calories: '500-700',
            equipment: 'Bodyweight, dumbbells, kettlebells',
            benefits: ['Fat loss', 'Endurance', 'Metabolic boost']
          },
          {
            name: 'Power Yoga',
            description: 'Dynamic yoga flow combining strength and flexibility',
            intensity: '🔥🔥',
            duration: '60 min',
            calories: '300-400',
            equipment: 'Mat, blocks, strap',
            benefits: ['Flexibility', 'Core strength', 'Stress relief']
          },
          {
            name: 'Spin Revolution',
            description: 'High-energy cycling with immersive audio-visual experience',
            intensity: '🔥🔥🔥',
            duration: '45 min',
            calories: '400-600',
            equipment: 'Spin bike, heart rate monitor',
            benefits: ['Cardio endurance', 'Leg strength', 'Mental focus']
          }
        ].map((cls, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 group">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{cls.name}</h3>
                  <p className="text-gray-600">{cls.description}</p>
                </div>
                <div className="text-red-500 font-bold text-xl">{cls.intensity}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="font-bold">{cls.duration}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600">Calories Burned</div>
                  <div className="font-bold">{cls.calories}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Equipment Needed:</p>
                <p className="font-semibold">{cls.equipment}</p>
              </div>
              
              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-2">Key Benefits:</p>
                <div className="flex flex-wrap gap-2">
                  {cls.benefits.map((benefit, i) => (
                    <span key={i} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                Book Class
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <button className="px-8 py-4 border-2 border-red-500 text-red-500 font-bold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105">
          View All 15+ Classes →
        </button>
      </div>
    </div>

    {/* Class Schedule */}
    <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl p-8 md:p-12 shadow-2xl mb-20">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">
          Weekly Class <span className="text-red-500">Schedule</span>
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Join our group classes led by expert instructors. All classes included with Pro and Elite memberships.
        </p>
      </div>
      
      {/* Schedule Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['All Classes', 'Morning', 'Afternoon', 'Evening', 'Weekend'].map((filter, idx) => (
          <button
            key={idx}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${idx === 0 ? 'bg-red-500' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-6 text-left pl-8 font-bold text-lg">Time</th>
              <th className="py-6 text-left font-bold text-lg">Monday</th>
              <th className="py-6 text-left font-bold text-lg">Tuesday</th>
              <th className="py-6 text-left font-bold text-lg">Wednesday</th>
              <th className="py-6 text-left font-bold text-lg">Thursday</th>
              <th className="py-6 text-left font-bold text-lg">Friday</th>
              <th className="py-6 text-left font-bold text-lg">Saturday</th>
              <th className="py-6 text-left font-bold text-lg">Sunday</th>
            </tr>
          </thead>
          <tbody>
            {[
              { time: '6:00 AM', classes: ['HIIT', 'Yoga', 'Spin', 'HIIT', 'Yoga', 'Boxing', 'Open Gym'] },
              { time: '8:00 AM', classes: ['Spin', 'Strength', 'Yoga', 'CrossFit', 'Zumba', 'Pilates', 'Yoga'] },
              { time: '12:00 PM', classes: ['HIIT', 'Boxing', 'Spin', 'Strength', 'Yoga', 'CrossFit', 'HIIT'] },
              { time: '4:00 PM', classes: ['Kids Fit', 'Teen Strength', 'Family Yoga', 'Kids Fit', 'Teen Cardio', 'Family Fit', 'Open Play'] },
              { time: '6:00 PM', classes: ['CrossFit', 'Yoga', 'Boxing', 'Spin', 'Strength', 'Zumba', 'Pilates'] },
              { time: '8:00 PM', classes: ['Yoga', 'Spin', 'Strength', 'HIIT', 'Boxing', 'Open Gym', 'Spin'] }
            ].map((row, idx) => (
              <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                <td className="py-6 pl-8 font-bold text-lg">{row.time}</td>
                {row.classes.map((cls, cIdx) => (
                  <td key={cIdx} className="py-6">
                    <div className="flex items-center group cursor-pointer">
                      <span className={`w-3 h-3 rounded-full mr-3 ${
                        cls === 'HIIT' ? 'bg-red-500' :
                        cls === 'Yoga' ? 'bg-green-500' :
                        cls === 'Spin' ? 'bg-blue-500' :
                        cls === 'Strength' ? 'bg-orange-500' :
                        cls === 'CrossFit' ? 'bg-purple-500' :
                        cls === 'Boxing' ? 'bg-pink-500' :
                        cls === 'Zumba' ? 'bg-yellow-500' :
                        cls === 'Pilates' ? 'bg-indigo-500' :
                        'bg-gray-500'
                      } group-hover:scale-125 transition-transform`}></span>
                      <span className="group-hover:text-red-300 transition-colors">{cls}</span>
                      {['HIIT', 'CrossFit'].includes(cls) && (
                        <span className="ml-2 bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full">Popular</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 text-sm mb-4 md:mb-0">
          <p>⭐ Most popular classes: HIIT, CrossFit, Spin</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-6 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors">
            Download Schedule
          </button>
          <button className="px-6 py-3 border border-gray-700 text-white rounded-full hover:border-red-500 hover:text-red-300 transition-colors">
            Set Reminders
          </button>
        </div>
      </div>
    </div>

    {/* Additional Services */}
    <div className="mb-20">
      <h3 className="text-3xl font-bold mb-8 text-center">
        Additional <span className="text-red-500">Amenities & Services</span>
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { 
            title: 'Locker Rooms & Showers', 
            desc: 'Premium facilities with digital locks, luxury amenities, and towel service',
            icon: '🚿',
            image: gymImages.lockerRoom,
            features: ['Digital Lockers', 'Luxury Showers', 'Towel Service', 'Grooming Stations']
          },
          { 
            title: 'Recovery Zone', 
            desc: 'Specialized area for post-workout recovery and muscle relaxation',
            icon: '🧖',
            image: gymImages.sauna,
            features: ['Infrared Sauna', 'Cold Plunge', 'Massage Chairs', 'Stretching Area']
          },
          { 
            title: 'Nutrition Bar', 
            desc: 'Post-workout nutrition shakes, healthy snacks, and supplements',
            icon: '🍹',
            image: gymImages.cafe,
            features: ['Protein Shakes', 'Healthy Snacks', 'Supplement Bar', 'Smoothies']
          }
        ].map((service, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
            <div className="h-56 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-8">
              <div className="flex items-start mb-6">
                <div className="text-3xl mr-4 transform group-hover:scale-125 transition-transform duration-300">
                  {service.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2">{service.title}</h4>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Personal Training Packages */}
    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-12 mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">
          Personal Training <span className="text-red-500">Packages</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Customized one-on-one training with our certified professionals
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: 'Starter Package',
            sessions: '4 Sessions',
            price: '$299',
            perSession: '$75/session',
            includes: ['Initial Assessment', 'Custom Workout Plan', 'Basic Nutrition Guide', 'Progress Tracking'],
            bestFor: 'New to training'
          },
          {
            name: 'Transformation Package',
            sessions: '12 Sessions',
            price: '$799',
            perSession: '$67/session',
            includes: ['All Starter features', 'Advanced Nutrition Plan', 'Weekly Check-ins', 'Form Video Analysis', 'Recovery Guidance'],
            bestFor: 'Serious results',
            popular: true
          },
          {
            name: 'Elite Package',
            sessions: '24 Sessions',
            price: '$1,399',
            perSession: '$58/session',
            includes: ['All Transformation features', 'Unlimited Check-ins', 'Sport-Specific Training', 'Competition Prep', 'Priority Scheduling'],
            bestFor: 'Athletes & competitors'
          }
        ].map((packageItem, idx) => (
          <div key={idx} className={`bg-white rounded-2xl p-8 shadow-xl transform hover:-translate-y-4 transition-all duration-500 relative ${packageItem.popular ? 'border-2 border-red-500' : 'border border-gray-100'}`}>
            {packageItem.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-6 py-2 rounded-full font-bold">
                MOST POPULAR
              </div>
            )}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{packageItem.name}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">{packageItem.price}</div>
              <div className="text-gray-600">{packageItem.sessions} • {packageItem.perSession}</div>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-600 mb-4">Includes:</p>
              <ul className="space-y-3">
                {packageItem.includes.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Best For</p>
              <p className="font-bold text-red-600">{packageItem.bestFor}</p>
            </div>
            
            <button className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300">
              Select Package
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Service Comparison */}
    <div className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">
          Service <span className="text-red-500">Comparison</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find the perfect service match for your fitness goals
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl shadow-xl">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-6 text-left pl-8 font-bold text-lg">Service</th>
              <th className="py-6 text-center font-bold text-lg">Best For</th>
              <th className="py-6 text-center font-bold text-lg">Time Commitment</th>
              <th className="py-6 text-center font-bold text-lg">Results Timeline</th>
              <th className="py-6 text-center font-bold text-lg">Included With</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                service: 'Group Classes',
                bestFor: 'Community, motivation, variety',
                time: '45-60 min/session',
                results: '4-8 weeks',
                included: 'Pro & Elite Memberships'
              },
              {
                service: 'Personal Training',
                bestFor: 'Customized goals, form correction',
                time: '45-60 min/session',
                results: '2-4 weeks',
                included: 'Additional Purchase'
              },
              {
                service: 'Nutrition Planning',
                bestFor: 'Weight management, performance',
                time: 'Ongoing guidance',
                results: '2-3 weeks',
                included: 'Elite Membership'
              },
              {
                service: 'Strength Training',
                bestFor: 'Muscle building, strength gains',
                time: '60-90 min/session',
                results: '6-8 weeks',
                included: 'All Memberships'
              },
              {
                service: 'Cardio Fitness',
                bestFor: 'Endurance, fat loss, heart health',
                time: '30-60 min/session',
                results: '2-4 weeks',
                included: 'All Memberships'
              }
            ].map((item, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-6 pl-8 font-bold">{item.service}</td>
                <td className="py-6 text-center">{item.bestFor}</td>
                <td className="py-6 text-center">
                  <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                    {item.time}
                  </div>
                </td>
                <td className="py-6 text-center">
                  <div className="inline-block px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-semibold">
                    {item.results}
                  </div>
                </td>
                <td className="py-6 text-center">
                  <div className="inline-block px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-semibold">
                    {item.included}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Service Booking CTA */}
    <div className="text-center">
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Find Your <span className="text-red-500">Perfect Service</span>?
        </h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
          Take our 2-minute service match quiz to discover the perfect programs for your goals, 
          schedule, and fitness level.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-10 py-5 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full text-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Take Service Quiz
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-10 py-5 border-2 border-white text-white font-bold rounded-full text-xl transform hover:scale-105 transition-all duration-300 hover:bg-white hover:text-gray-900"
          >
            Schedule Free Consultation
          </button>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">25+</div>
            <div className="text-sm opacity-90">Services Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="text-sm opacity-90">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-sm opacity-90">Expert Trainers</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

  // Gallery Page
  const renderGalleryPage = () => (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-6">
          Image <span className="text-red-500">Gallery</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our world-class facilities through these images
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['All', 'Cardio', 'Strength', 'Yoga', 'Pool', 'CrossFit'].map((filter, idx) => (
          <button
            key={idx}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, idx) => (
          <div 
            key={image.id} 
            className="group relative overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
              <div className="flex items-center justify-between">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {image.category}
                </span>
                <button className="text-white hover:text-red-300 transition-colors">
                  <span className="text-xl">🔍</span>
                </button>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-bold transform group-hover:scale-110 transition-transform duration-300">
              {image.category}
            </div>
          </div>
        ))}
      </div>

      {/* Virtual Tour */}
      <div className="mt-20 bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 md:p-12 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Take a <span className="text-red-500">Virtual Tour</span>
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Can't visit in person? Explore our facilities with our 360° virtual tour.
              See every corner of our premium gym from the comfort of your home.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              START VIRTUAL TOUR
            </button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-red-900/30 to-blue-900/30 rounded-2xl p-2">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop"
                alt="Virtual Tour Preview"
                className="rounded-xl w-full h-64 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-3xl">▶</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Page
  const renderContactPage = () => (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-6">
          Contact <span className="text-red-500">Us</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get in touch with our team. We're here to help you start your fitness journey.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-8">Contact <span className="text-red-500">Information</span></h3>
            <div className="space-y-6">
              {[
                { 
                  icon: '📍', 
                  label: 'Address', 
                  value: '123 Fitness Street, New York, NY 10001',
                  details: 'Between 5th & 6th Avenue'
                },
                { 
                  icon: '📞', 
                  label: 'Phone', 
                  value: '(555) 123-4567',
                  details: 'Mon-Fri: 6AM-10PM, Sat-Sun: 7AM-8PM'
                },
                { 
                  icon: '✉️', 
                  label: 'Email', 
                  value: 'info@elitefit.com',
                  details: 'Response within 24 hours'
                },
                { 
                  icon: '🕒', 
                  label: 'Hours', 
                  value: '24/7 Member Access',
                  details: 'Staffed: 5AM-11PM Daily'
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start p-4 hover:bg-red-50 rounded-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-red-100"
                >
                  <div className="text-2xl mr-4 group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                  <div>
                    <p className="font-bold text-lg mb-1">{item.label}</p>
                    <p className="text-gray-900 font-semibold mb-1">{item.value}</p>
                    <p className="text-gray-600 text-sm">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our <span className="text-red-500">Location</span></h3>
              <div className="relative h-80 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop"
                  alt="Gym Location Map"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-8">
                  <div>
                    <div className="text-4xl mb-4 animate-bounce">📍</div>
                    <p className="text-2xl font-bold">Find Us Here</p>
                    <p className="text-gray-300 mt-2">Easy access via subway: A, C, E trains at 8th Ave</p>
                    <button className="mt-4 px-6 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors">
                      GET DIRECTIONS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-2xl border border-gray-100">
          <h3 className="text-3xl font-bold mb-6">
            Send us a <span className="text-red-500">Message</span>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Subject</label>
                <select className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white">
                  <option>General Inquiry</option>
                  <option>Membership Questions</option>
                  <option>Personal Training</option>
                  <option>Group Classes</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white resize-none"
                  placeholder="Tell us how we can help you..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:from-red-700 hover:to-orange-600"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-center">
              <span className="font-bold">Quick Response:</span> We typically reply within 2 hours during business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Join Now Page
  const renderJoinPage = () => (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-6">
          Join <span className="text-red-500">Today</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Start your fitness journey with our flexible membership plans
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Membership Plans */}
        <div>
          <h3 className="text-3xl font-bold mb-8">
            Membership <span className="text-red-500">Plans</span>
          </h3>
          <div className="space-y-8">
            {[
              { 
                name: 'Basic', 
                price: '$29', 
                desc: ['24/7 Gym Access', 'Locker Room', 'Free Weights Area', 'Basic Equipment'],
                color: 'border-gray-300',
                popular: false,
                image: gymImages.weightRoom
              },
              { 
                name: 'Pro', 
                price: '$49', 
                desc: ['All Basic features', 'All Group Classes', 'Sauna & Steam Room', 'Guest Pass (2/month)'],
                color: 'border-red-500 border-2',
                popular: true,
                image: gymImages.personalTraining
              },
              { 
                name: 'Elite', 
                price: '$79', 
                desc: ['All Pro features', 'Personal Trainer (4 sessions)', 'Nutrition Plan', 'Towel Service', 'Priority Booking'],
                color: 'border-gray-900',
                popular: false,
                image: gymImages.reception
              }
            ].map((plan, idx) => (
              <div 
                key={idx} 
                className={`p-8 rounded-2xl ${plan.color} bg-white shadow-xl transform hover:scale-105 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-3 font-bold transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                    MOST POPULAR
                  </div>
                )}
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="lg:w-1/3">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
                    <div className="text-4xl font-bold text-gray-900 mb-4">
                      {plan.price}<span className="text-lg text-gray-600">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.desc.map((item, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setFormData({...formData, plan: plan.name.toLowerCase()})}
                      className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white hover:shadow-xl hover:from-red-700 hover:to-orange-600'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:text-black'
                      }`}
                    >
                      {plan.popular ? 'GET STARTED NOW' : 'SELECT PLAN'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-2xl border border-gray-100 sticky top-24">
          <h3 className="text-3xl font-bold mb-6">
            Sign Up <span className="text-red-500">Now</span>
          </h3>
          <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
            <div className="flex items-center">
              <span className="text-2xl mr-4">🎁</span>
              <div>
                <p className="font-bold text-lg">Special Offer!</p>
                <p className="text-gray-600">Get first month FREE with annual commitment</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">First Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">Last Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Select Plan *</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="basic">Basic - $29/month</option>
                  <option value="pro">Pro - $49/month (Most Popular)</option>
                  <option value="elite">Elite - $79/month</option>
                  <option value="annual">Annual Pro - $49/month (Save 20%)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Preferred Start Date *</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                  required
                />
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <input type="checkbox" id="terms" className="mr-3 w-5 h-5" required />
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the terms and conditions and privacy policy
                </label>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <input type="checkbox" id="newsletter" className="mr-3 w-5 h-5" defaultChecked />
                <label htmlFor="newsletter" className="text-gray-700">
                  Subscribe to fitness tips and special offers
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:from-red-700 hover:to-orange-600"
              >
                COMPLETE SIGN UP
              </button>
            </div>
          </form>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>🔒 Secure signup · No credit card required for trial · Cancel anytime</p>
          </div>
        </div>
      </div>

      {/* Why Join Section */}
      <div className="mt-20 bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl p-12">
        <h3 className="text-3xl font-bold mb-8 text-center">Why Join <span className="text-red-500">EliteFit</span></h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '💰', title: 'No Hidden Fees', desc: 'Transparent pricing with no surprises' },
            { icon: '🔄', title: 'Freeze Option', desc: 'Pause membership when you travel' },
            { icon: '👥', title: 'Bring a Friend', desc: 'Free guest passes every month' },
            { icon: '🎯', title: 'Goal Tracking', desc: 'Personalized progress tracking app' },
            { icon: '🏆', title: 'Challenges', desc: 'Monthly fitness challenges with prizes' },
            { icon: '🎁', title: 'Member Perks', desc: 'Discounts on supplements & apparel' }
          ].map((item, idx) => (
            <div key={idx} className="text-center p-6">
              <div className="text-4xl mb-4 animate-bounce-slow" style={{ animationDelay: `${idx * 0.1}s` }}>
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Footer
  const renderFooter = () => (
    <footer className={`${darkMode ? 'bg-gray-900' : 'bg-gray-900'} text-white pt-20 pb-8 relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-500 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-pulse mr-4 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">EF</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold">ELITE<span className="text-red-500">FIT</span></h2>
                <p className="text-gray-400 text-sm">Since 2010</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming lives through premium fitness experiences. Join our community of 10,000+ members achieving their goals.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-all duration-300 transform hover:scale-110">
                <span className="text-xl">📘</span>
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all duration-300 transform hover:scale-110">
                <span className="text-xl">📷</span>
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-all duration-300 transform hover:scale-110">
                <span className="text-xl">🐦</span>
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 transform hover:scale-110">
                <span className="text-xl">📺</span>
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-8 pb-4 border-b border-gray-800">Quick Links</h3>
            <ul className="space-y-4">
              {['home', 'about', 'services', 'gallery', 'contact', 'join'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setCurrentPage(item)}
                    className="text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-700 rounded-full mr-3 group-hover:bg-red-500"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 capitalize">
                      {item.replace('-', ' ')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-8 pb-4 border-b border-gray-800">Contact Info</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <span className="text-red-500 mr-4">📍</span>
                <div>
                  <p className="font-semibold">123 Fitness Street</p>
                  <p className="text-gray-400">New York, NY 10001</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-4">📞</span>
                <div>
                  <p className="font-semibold">(555) 123-4567</p>
                  <p className="text-gray-400">24/7 Support</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-4">✉️</span>
                <div>
                  <p className="font-semibold">info@elitefit.com</p>
                  <p className="text-gray-400">Response within 2 hours</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-8 pb-4 border-b border-gray-800">Newsletter</h3>
            <p className="text-gray-400 mb-6">Subscribe for fitness tips and exclusive offers</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="px-6 bg-gradient-to-r from-red-600 to-orange-500 rounded-r-lg font-bold hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
            <div className="mt-8">
              <p className="text-gray-400 mb-4">#EliteFitCommunity</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">#Fitness</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">#GymLife</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">#Results</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} EliteFit Gym. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <button className="hover:text-red-500 transition-colors">Privacy Policy</button>
            <button className="hover:text-red-500 transition-colors">Terms of Service</button>
            <button className="hover:text-red-500 transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );

  // Page Content
  const renderPageContent = () => {
    switch(currentPage) {
      case 'about': return renderAboutPage();
      case 'services': return renderServicesPage();
      case 'gallery': return renderGalleryPage();
      case 'contact': return renderContactPage();
      case 'join': return renderJoinPage();
      default: return renderHomePage();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      <div className={`${darkMode ? 'dark' : ''}`}>
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'text-gray-900'}`}>
          {renderNavigation()}
          {renderCursorFollowers()}
          <main className="pt-20">
            {renderPageContent()}
          </main>
          {renderFooter()}
        </div>
      </div>
    </div>
  );
};

export default GymWebsite;