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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

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

  // Navigation - Enhanced for Mobile
  const renderNavigation = () => (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-xl`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-pulse mr-2 sm:mr-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">EF</span>
              </div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} animate-bounce`}>
                ELITE<span className="text-red-500">FIT</span>
              </h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {['home', 'about', 'services', 'gallery', 'contact', 'join'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCurrentPage(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`capitalize font-semibold text-sm lg:text-base transition-all duration-300 transform hover:scale-110 hover:text-red-500 ${
                    currentPage === item 
                      ? 'text-red-500 border-b-2 border-red-500' 
                      : darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {item.replace('-', ' ')}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-800'} hover:scale-110 text-sm sm:text-base`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-2xl hover:text-red-500 transition-colors mobile-menu"
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-50 md:hidden mobile-menu">
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl mx-4 rounded-2xl overflow-hidden`}>
            <div className="py-4">
              {['home', 'about', 'services', 'gallery', 'contact', 'join'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCurrentPage(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-6 py-4 capitalize font-semibold transition-all duration-300 ${
                    currentPage === item 
                      ? 'bg-red-500 text-white' 
                      : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );

  // Cursor Followers - Hidden on Mobile
  const renderCursorFollowers = () => (
    currentPage === 'home' && window.innerWidth > 768 && cursorImages.map((img, index) => (
      <div
        key={index}
        className="fixed w-16 h-16 sm:w-20 sm:h-20 rounded-full pointer-events-none z-40 transition-all duration-75 shadow-2xl hidden md:block"
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

  // Home Page - Updated for Mobile
  const renderHomePage = () => (
    <div className="space-y-12 sm:space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 animate-fade-in-down tracking-tight leading-tight">
            TRANSFORM <span className="text-red-500">YOUR</span><br />BODY & MIND
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 animate-fade-in-up max-w-3xl mx-auto px-2">
            Join 5,000+ members at NYC's premier fitness destination. 24/7 access, expert trainers, and results that last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up">
            <button
              onClick={() => setCurrentPage('join')}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full text-base sm:text-lg md:text-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse hover:animate-none shadow-lg"
            >
              🚀 START FREE TRIAL
            </button>
            <button
              onClick={() => setCurrentPage('gallery')}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 border-2 border-white text-white font-bold rounded-full text-base sm:text-lg md:text-xl transform hover:scale-105 transition-all duration-300 hover:bg-white hover:text-black backdrop-blur-sm"
            >
              🎬 WATCH TOUR
            </button>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent py-4 sm:py-6 md:py-8">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[
                { number: '5,000+', label: 'Active Members', icon: '👥' },
                { number: '24/7', label: 'Access', icon: '⏰' },
                { number: '50+', label: 'Expert Trainers', icon: '🏆' },
                { number: '200+', label: 'Modern Machines', icon: '⚙️' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center animate-float" style={{ animationDelay: `${idx * 0.2}s` }}>
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">{stat.icon}</div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-xs sm:text-sm uppercase tracking-wider font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-white text-center">
            <div className="text-sm sm:text-lg mb-1 sm:mb-2">Scroll Down</div>
            <div className="text-xl sm:text-2xl">↓</div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Featured <span className="text-red-500">Programs</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Discover our most popular fitness programs designed for all levels
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
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
            <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg sm:shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 group border border-gray-100">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-125 transition-transform duration-300">
                {program.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{program.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{program.desc}</p>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1 sm:mr-2">⏱️</span>
                  <span className="font-semibold text-sm sm:text-base">{program.duration}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1 sm:mr-2">⚡</span>
                  <span className="font-semibold text-sm sm:text-base">{program.intensity}</span>
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {program.results.map((result, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 sm:mr-3"></span>
                    <span className="text-gray-700 text-sm sm:text-base">{result}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 sm:py-3 bg-gradient-to-r from-gray-900 to-black text-white font-bold rounded-lg sm:rounded-xl hover:from-red-600 hover:to-orange-500 transition-all duration-300 text-sm sm:text-base">
                Learn More
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => setCurrentPage('services')}
            className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-red-500 text-red-500 font-bold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            View All Programs →
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={el => animationRefs.current[0] = el} className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-12">
          <div className="lg:w-1/2 w-full animate-slide-in-left">
            <div className="relative group">
              <img
                src={gymImages.facility}
                alt="Modern Gym Facility"
                className="rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl transform group-hover:scale-105 transition-transform duration-700 w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-red-500 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">🏆 PREMIUM</span>
              </div>
            </div>
            
            {/* Mini Gallery */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
              {[gymImages.cardioArea, gymImages.weightRoom, gymImages.yogaClass].map((img, idx) => (
                <div key={idx} className="rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-20 sm:h-24 md:h-32 object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full animate-slide-in-right mt-6 sm:mt-0">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="bg-red-100 text-red-600 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">OUR MISSION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              More Than <span className="text-red-500">Just a Gym</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              We're a community-driven fitness sanctuary where technology meets tradition, 
              expert guidance meets personal commitment, and every workout brings you closer 
              to your best self.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
              {[
                { icon: '🏋️', title: '24/7 Smart Access', desc: 'Work out on your schedule' },
                { icon: '👥', title: 'Expert Community', desc: 'Train alongside enthusiasts' },
                { icon: '💪', title: 'Cutting-Edge Equipment', desc: 'Latest Technogym gear' },
                { icon: '📱', title: 'Smart Tracking', desc: 'AI-powered progress monitoring' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{item.icon}</div>
                  <h4 className="font-bold text-base sm:text-lg mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                Book Free Tour
              </button>
              <button className="flex items-center text-gray-700 hover:text-red-500 transition-colors text-sm sm:text-base">
                <span className="mr-2">📞</span>
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-gradient-to-r from-gray-50 to-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Real <span className="text-red-500">Success Stories</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              See how our members transformed their lives with EliteFit
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
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
              <div key={idx} className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 sm:hover:-translate-y-4 transition-all duration-500 group">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 sm:p-6">
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{member.name}</h3>
                      <p className="text-red-300 font-semibold text-sm sm:text-base">{member.beforeAfter}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8">
                  <p className="text-gray-700 italic mb-4 sm:mb-6 text-sm sm:text-base">"{member.story}"</p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {member.stats.map((stat, i) => (
                      <span key={i} className="px-2 sm:px-3 py-1 sm:py-2 bg-red-50 text-red-600 rounded-full text-xs sm:text-sm font-semibold">
                        {stat}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                    <div className="flex items-center text-yellow-400">
                      {'⭐'.repeat(5)}
                      <span className="ml-2 text-gray-600 text-sm sm:text-base">5.0 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-900 to-black text-white font-bold rounded-full hover:from-red-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
              Read More Stories
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={el => animationRefs.current[1] = el} className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-6 sm:gap-8 md:gap-12">
          <div className="lg:w-1/2 w-full animate-slide-in-right">
            <div className="relative group">
              <img
                src={gymImages.personalTraining}
                alt="Personal Training Session"
                className="rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl transform group-hover:scale-105 transition-transform duration-700 w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-blue-500 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">👤 1-ON-1</span>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-bold">98%</div>
                  <div className="text-xs sm:text-sm opacity-90">Satisfaction</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold">4.9/5</div>
                  <div className="text-xs sm:text-sm opacity-90">Rating</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold">100%</div>
                  <div className="text-xs sm:text-sm opacity-90">Results</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full animate-slide-in-left mt-6 sm:mt-0">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="bg-blue-100 text-blue-600 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">WHY CHOOSE US</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              The <span className="text-red-500">EliteFit</span> Difference
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
              We combine cutting-edge technology with personalized attention to deliver 
              results you can see and feel.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
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
                  className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group cursor-pointer"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="text-2xl sm:text-3xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{item.title}</h3>
                        <span className="text-red-500 group-hover:translate-x-2 transition-transform hidden sm:block">→</span>
                      </div>
                      <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{item.desc}</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {item.features.map((feature, i) => (
                          <span key={i} className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm">
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
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Popular <span className="text-red-500">Classes</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-2">
              Join our most-booked group classes with expert instructors
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
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
              <div key={idx} className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 hover:bg-gray-700 group">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold">{cls.name}</h3>
                  <span className="text-red-400 font-bold text-sm sm:text-base">{cls.intensity}</span>
                </div>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-center text-gray-300 text-sm sm:text-base">
                    <span className="mr-2 sm:mr-3">⏰</span>
                    <span>{cls.time}</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm sm:text-base">
                    <span className="mr-2 sm:mr-3">👤</span>
                    <span>{cls.instructor}</span>
                  </div>
                </div>
                <div className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-center font-bold text-sm sm:text-base ${
                  cls.spots === 'Full' ? 'bg-gray-700 text-gray-400' : 'bg-red-500 text-white'
                }`}>
                  {cls.spots === 'Full' ? 'Waitlist' : cls.spots}
                </div>
                <button className="w-full mt-3 sm:mt-4 py-2 sm:py-3 bg-white text-gray-900 font-bold rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-1 sm:translate-y-2 text-sm sm:text-base">
                  Book Now
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setCurrentPage('services')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              View Full Schedule →
            </button>
          </div>
        </div>
      </section>

      {/* Trainer Highlights */}
      <section ref={el => animationRefs.current[2] = el} className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Meet Our <span className="text-red-500">Elite Trainers</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Get trained by industry professionals with proven track records
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {trainers.map((trainer, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer transform hover:-translate-y-2 sm:hover:-translate-y-4 transition-all duration-500 hover:shadow-xl sm:hover:shadow-2xl"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={trainer.img}
                  alt={trainer.name}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{trainer.name}</h3>
                    <p className="text-red-400 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{trainer.spec}</p>
                    <p className="text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2">{trainer.bio}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{trainer.instagram}</p>
                    <div className="flex space-x-2 sm:space-x-4 mt-2 sm:mt-4">
                      <button className="px-2 sm:px-4 py-1 sm:py-2 bg-red-500 text-white rounded-full text-xs sm:text-sm hover:bg-red-600">
                        Book Session
                      </button>
                      <button className="px-2 sm:px-4 py-1 sm:py-2 bg-white text-gray-900 rounded-full text-xs sm:text-sm hover:bg-gray-100">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full font-bold transform group-hover:scale-110 transition-transform duration-300 text-xs sm:text-sm">
                  PRO
                </div>
              </div>
              <div className="text-center mt-4 sm:mt-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{trainer.name}</h3>
                <p className="text-red-600 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{trainer.spec}</p>
                <div className="flex justify-center items-center space-x-1">
                  {'⭐'.repeat(5).split('').map((star, i) => (
                    <span key={i} className="text-yellow-400 text-base sm:text-xl">{star}</span>
                  ))}
                  <span className="text-gray-600 ml-1 sm:ml-2 text-sm sm:text-base">(4.9)</span>
                </div>
                <div className="mt-2 sm:mt-4 flex justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                  <span>NASM Certified</span>
                  <span>•</span>
                  <span>10+ Years</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-red-500 text-red-500 font-bold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
            Meet All Trainers →
          </button>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Smart <span className="text-red-500">Fitness</span> Technology
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Experience the future of fitness with our cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
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
              <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 group">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{tech.title}</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{tech.desc}</p>
                <ul className="space-y-1 sm:space-y-2">
                  {tech.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-xs sm:text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1 sm:mr-2"></span>
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
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center text-white shadow-xl sm:shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Start Your <span className="text-gray-900">Transformation</span>?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands who have transformed their lives with EliteFit. 
            Your journey to a healthier, stronger you starts today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-6 sm:mb-8 md:mb-10">
            <button
              onClick={() => setCurrentPage('join')}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-gray-900 font-bold rounded-full text-sm sm:text-base md:text-lg lg:text-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              🎯 START FREE TRIAL
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 border-2 border-white text-white font-bold rounded-full text-sm sm:text-base md:text-lg lg:text-xl transform hover:scale-105 transition-all duration-300 hover:bg-white hover:text-red-600"
            >
              📞 BOOK CONSULTATION
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">7 Days</div>
              <div className="text-xs sm:text-sm opacity-90">Free Trial</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">$0</div>
              <div className="text-xs sm:text-sm opacity-90">Enrollment Fee</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">24/7</div>
              <div className="text-xs sm:text-sm opacity-90">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Get answers to common questions about joining EliteFit
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
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
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-start justify-between">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{faq.question}</h3>
                <span className="text-red-500 text-xl sm:text-2xl">+</span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:border-red-500 hover:text-red-500 transition-all duration-300 text-sm sm:text-base">
            View All FAQs →
          </button>
        </div>
      </section>
    </div>
  );

  // About Page - Updated for Mobile
  const renderAboutPage = () => (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in-down">
          Our <span className="text-red-500">Story</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
          From a single location in 2010 to a nationwide fitness revolution, we've been transforming lives through innovation, community, and excellence.
        </p>
      </div>

      {/* Mission Statement Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center mb-8 sm:mb-12 md:mb-16 shadow-xl sm:shadow-2xl transform hover:scale-105 transition-all duration-500">
        <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">💪</div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 max-w-4xl mx-auto">
          Empowering Every Individual to Achieve Their Peak Potential
        </h2>
        <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
          We believe fitness is not just about physical transformation, but about building confidence, community, and a better quality of life.
        </p>
      </div>

      {/* Leadership Team */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Meet Our <span className="text-red-500">Leadership</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            The visionary minds behind EliteFit's success story
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              name: 'Marcus Johnson',
              role: 'Founder & CEO',
              img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
              bio: 'Former professional athlete turned fitness entrepreneur',
              quote: 'Fitness changed my life, and I wanted to create a place where it could change yours too.',
              experience: '15+ years'
            },
            {
              name: 'Dr. Sarah Mitchell',
              role: 'Head of Wellness',
              img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
              bio: 'PhD in Sports Science, specializes in holistic health',
              quote: 'True fitness combines physical strength with mental wellness.',
              experience: 'PhD, 10+ years'
            },
            {
              name: 'Carlos Rodriguez',
              role: 'Operations Director',
              img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=400&h=400&fit=crop&crop=face',
              bio: 'Former Marine, brings discipline and excellence to operations',
              quote: 'Excellence in the details creates extraordinary results.',
              experience: '20+ years'
            }
          ].map((leader, idx) => (
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 sm:hover:-translate-y-4 transition-all duration-500 group">
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={leader.img}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{leader.name}</h3>
                    <p className="text-red-600 font-semibold text-sm sm:text-base">{leader.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Experience</div>
                    <div className="font-bold text-sm sm:text-base">{leader.experience}</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{leader.bio}</p>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                  <p className="italic text-gray-700 text-sm sm:text-base">"{leader.quote}"</p>
                </div>
                <div className="mt-4 sm:mt-6 flex space-x-2 sm:space-x-4">
                  <button className="px-3 sm:px-4 py-1 sm:py-2 bg-red-500 text-white rounded-full text-xs sm:text-sm hover:bg-red-600 transition-colors">
                    View Bio
                  </button>
                  <button className="px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 text-gray-700 rounded-full text-xs sm:text-sm hover:border-red-500 hover:text-red-500 transition-colors">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Our <span className="text-red-500">Core Values</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            The principles that guide everything we do
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
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
            <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 group border border-gray-100">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{value.title}</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{value.description}</p>
              <ul className="space-y-1 sm:space-y-2">
                {value.principles.map((principle, i) => (
                  <li key={i} className="flex items-center text-xs sm:text-sm text-gray-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2 sm:mr-3"></span>
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Image with Quote */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=600&fit=crop"
            alt="EliteFit Gym Interior"
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="text-white max-w-2xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">More Than Just a Gym</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-6">A community where fitness meets lifestyle, technology meets tradition, and every member becomes family.</p>
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-red-500 flex items-center justify-center mr-2 sm:mr-3 md:mr-4">
                  <span className="text-white font-bold text-sm sm:text-base">MJ</span>
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base">Marcus Johnson</p>
                  <p className="text-gray-300 text-xs sm:text-sm">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Timeline */}
      <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Our <span className="text-red-500">Journey</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Milestones that shaped our evolution from a single gym to a fitness leader
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line - Hidden on mobile, visible on md+ */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500"></div>
          
          <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-24">
            {[
              { 
                year: '2010', 
                event: 'Humble Beginnings', 
                desc: 'Opened first EliteFit location in downtown Manhattan',
                achievement: '500 founding members',
                icon: '🚀',
                side: 'left'
              },
              { 
                year: '2012', 
                event: 'First Expansion', 
                desc: 'Opened second location in Brooklyn',
                achievement: 'Named "Best New Gym"',
                icon: '🏆',
                side: 'right'
              },
              { 
                year: '2015', 
                event: 'Technology Revolution', 
                desc: 'Launched mobile app with workout tracking',
                achievement: '5,000 active members',
                icon: '📱',
                side: 'left'
              },
              { 
                year: '2018', 
                event: 'Holistic Approach', 
                desc: 'Introduced nutrition counseling and wellness programs',
                achievement: 'Best Overall Gym Experience award',
                icon: '🧠',
                side: 'right'
              },
              { 
                year: '2020', 
                event: 'Pandemic Adaptation', 
                desc: 'Launched virtual training and safe protocols',
                achievement: '95% retention rate',
                icon: '💪',
                side: 'left'
              },
              { 
                year: '2023', 
                event: 'Future-Ready Facilities', 
                desc: 'Complete renovation with AI-powered equipment',
                achievement: '10,000+ members, 5 locations',
                icon: '🤖',
                side: 'right'
              }
            ].map((item, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center ${item.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-1/2 ${item.side === 'left' ? 'md:pr-6 lg:pr-12 md:text-right' : 'md:pl-6 lg:pl-12'} mb-4 md:mb-0`}>
                  <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="text-2xl sm:text-3xl mr-3 sm:mr-4">{item.icon}</div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-500">Year</div>
                        <div className="text-xl sm:text-2xl font-bold text-red-600">{item.year}</div>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{item.event}</h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{item.desc}</p>
                    <div className="bg-red-50 px-3 sm:px-4 py-1 sm:py-2 rounded-lg inline-block">
                      <span className="text-red-600 font-semibold text-sm sm:text-base">{item.achievement}</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl z-10 border-4 border-white shadow-lg my-4 md:my-0">
                  {item.year}
                </div>
                
                <div className="w-full md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Impact */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Community <span className="text-red-500">Impact</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-2">
            Giving back and making a difference beyond our gym walls
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            {
              title: 'Youth Fitness Programs',
              desc: 'Free fitness classes for underprivileged youth in NYC',
              impact: '2,500+ kids trained',
              icon: '👦'
            },
            {
              title: 'Senior Wellness',
              desc: 'Specialized programs for seniors focusing on mobility',
              impact: '1,200+ senior members',
              icon: '👵'
            },
            {
              title: 'Charity Events',
              desc: 'Annual charity runs supporting local causes',
              impact: '$250,000+ raised',
              icon: '❤️'
            }
          ].map((impact, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 group">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-125 transition-transform duration-300">
                {impact.icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{impact.title}</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">{impact.desc}</p>
              <div className="bg-red-900/30 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl">
                <p className="font-bold text-red-300 text-sm sm:text-base">{impact.impact}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6 sm:mt-8 md:mt-12">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
            Get Involved
          </button>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Awards & <span className="text-red-500">Recognition</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Industry recognition for our commitment to excellence
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl transform group-hover:scale-110 transition-transform duration-300">
                  {award.icon}
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Year</div>
                  <div className="font-bold text-red-600 text-sm sm:text-base">{award.year}</div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{award.award}</h3>
              <p className="text-gray-600 text-xs sm:text-sm">{award.organization}</p>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <button className="text-red-500 text-xs sm:text-sm font-semibold hover:text-red-600">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facility Features */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            World-Class <span className="text-red-500">Facilities</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Experience fitness in spaces designed for optimal performance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {[
            {
              title: 'Strength Training Arena',
              features: ['200+ equipment pieces', 'Olympic lifting platforms', 'Power racks', 'Competition bars'],
              img: gymImages.weightRoom
            },
            {
              title: 'Cardio & Functional Zone',
              features: ['Latest treadmills & bikes', 'Rowing machines', 'Assault bikes', 'Training rig'],
              img: gymImages.cardioArea
            }
          ].map((facility, idx) => (
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 group">
              <div className="h-40 sm:h-48 md:h-56 overflow-hidden">
                <img
                  src={facility.img}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{facility.title}</h3>
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {facility.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 sm:mr-3"></span>
                      <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white rounded-lg sm:rounded-xl hover:bg-red-600 transition-colors text-sm sm:text-base">
                  View Photos
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Testimonials */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Member <span className="text-red-500">Stories</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Hear from members whose lives have been transformed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {[
            { 
              name: 'James Wilson', 
              quote: 'Lost 40lbs in 3 months with EliteFit trainers! The personalized attention made all the difference.', 
              role: 'Member since 2019',
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
              result: '40lbs lost',
              journey: 'Office worker to marathon runner'
            },
            { 
              name: 'Lisa Park', 
              quote: 'The trainers changed my life completely. Not just physically, but mentally.', 
              role: 'Member since 2021',
              img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
              result: 'Marathon finisher',
              journey: 'Overcame anxiety through fitness'
            },
            { 
              name: 'Carlos Mendez', 
              quote: 'Best community and facilities. I look forward to every workout!', 
              role: 'Member since 2020',
              img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
              result: 'Strength 2x',
              journey: 'Found work-life balance'
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 group border border-gray-100">
              <div className="flex items-center mb-4 sm:mb-6">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-4 border-red-100 group-hover:border-red-300 transition-colors"
                />
                <div className="ml-3 sm:ml-4">
                  <h4 className="font-bold text-base sm:text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="text-4xl sm:text-5xl text-red-400 mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform">"</div>
              <p className="text-base sm:text-lg italic mb-4 sm:mb-6 text-gray-700 leading-relaxed">"{testimonial.quote}"</p>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-red-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Achievement</div>
                  <div className="text-red-600 font-bold text-sm sm:text-base">{testimonial.result}</div>
                </div>
                <div className="bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Journey</div>
                  <div className="text-gray-800 text-sm sm:text-base">{testimonial.journey}</div>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-400">
                    {'⭐'.repeat(5)}
                  </div>
                  <button className="text-red-500 text-xs sm:text-sm font-semibold hover:text-red-600">
                    Read Story →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
            Read More Stories
          </button>
        </div>
      </div>

      {/* Future Vision */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Our <span className="text-red-500">Future</span> Vision
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Where we're heading in the next chapter of fitness innovation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            {
              year: '2024',
              goal: 'National Expansion',
              description: 'Opening new locations across major US cities',
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
              description: 'Connecting members worldwide',
              icon: '🌍'
            }
          ].map((vision, idx) => (
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="text-3xl sm:text-4xl transform group-hover:scale-125 transition-transform duration-300">
                  {vision.icon}
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-gray-500">Target</div>
                  <div className="text-xl sm:text-2xl font-bold text-red-600">{vision.year}</div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{vision.goal}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{vision.description}</p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                <div className="text-xs sm:text-sm text-gray-500">Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1 sm:mt-2">
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
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Be Part of Our <span className="text-red-500">Story</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto opacity-90">
            Join thousands of members who are writing their fitness success stories with us. 
            Your transformation could be our next chapter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <button
              onClick={() => setCurrentPage('join')}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full text-sm sm:text-base md:text-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 border-2 border-white text-white font-bold rounded-full text-sm sm:text-base md:text-lg transform hover:scale-105 transition-all duration-300 hover:bg-white hover:text-gray-900"
            >
              Schedule Tour
            </button>
          </div>
          <div className="mt-6 sm:mt-8 md:mt-12 grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">13+</div>
              <div className="text-xs sm:text-sm opacity-90">Years Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">10K+</div>
              <div className="text-xs sm:text-sm opacity-90">Members</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">50+</div>
              <div className="text-xs sm:text-sm opacity-90">Awards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Continue with other pages (Services, Gallery, Contact, Join) with similar mobile adjustments...

  // Services Page - Partial for demonstration (continue similarly for other sections)
  const renderServicesPage = () => (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          Our <span className="text-red-500">Services</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
          Comprehensive fitness solutions for every goal, level, and lifestyle.
        </p>
      </div>

      {/* Service Categories Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
        {[
          { name: 'Strength', count: '8 Programs', icon: '💪', color: 'bg-red-500' },
          { name: 'Cardio', count: '6 Classes', icon: '🏃', color: 'bg-blue-500' },
          { name: 'Mind-Body', count: '5 Disciplines', icon: '🧘', color: 'bg-green-500' },
          { name: 'Specialized', count: '7 Services', icon: '⭐', color: 'bg-purple-500' }
        ].map((category, idx) => (
          <div key={idx} className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg text-center transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 group">
            <div className={`${category.color} w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
              {category.icon}
            </div>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2">{category.name}</h3>
            <p className="text-gray-600 text-xs sm:text-sm">{category.count}</p>
          </div>
        ))}
      </div>

      {/* Main Services Grid - Continue with similar adjustments... */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
        {/* Similar responsive adjustments for service cards */}
      </div>

      {/* Continue with similar responsive patterns for all sections... */}
    </div>
  );

  // Continue with Gallery, Contact, and Join pages with similar responsive adjustments...

  // Gallery Page
  const renderGalleryPage = () => (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          Image <span className="text-red-500">Gallery</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
          Explore our world-class facilities through these images
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
        {['All', 'Cardio', 'Strength', 'Yoga', 'Pool', 'CrossFit'].map((filter, idx) => (
          <button
            key={idx}
            className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {galleryImages.map((image, idx) => (
          <div 
            key={image.id} 
            className="group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 md:p-6">
              <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">{image.title}</h3>
              <div className="flex items-center justify-between">
                <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                  {image.category}
                </span>
                <button className="text-white hover:text-red-300 transition-colors">
                  <span className="text-lg sm:text-xl">🔍</span>
                </button>
              </div>
            </div>
            <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-white text-gray-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold transform group-hover:scale-110 transition-transform duration-300">
              {image.category}
            </div>
          </div>
        ))}
      </div>

      {/* Virtual Tour */}
      <div className="mt-12 sm:mt-16 md:mt-20 bg-gradient-to-r from-gray-900 to-black rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 text-white">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
              Take a <span className="text-red-500">Virtual Tour</span>
            </h2>
            <p className="text-gray-300 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg">
              Can't visit in person? Explore our facilities with our 360° virtual tour.
            </p>
            <button className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full text-sm sm:text-base md:text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              START VIRTUAL TOUR
            </button>
          </div>
          <div className="relative mt-6 lg:mt-0">
            <div className="bg-gradient-to-br from-red-900/30 to-blue-900/30 rounded-lg sm:rounded-xl md:rounded-2xl p-2">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop"
                alt="Virtual Tour Preview"
                className="rounded-lg sm:rounded-xl w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-xl sm:text-2xl md:text-3xl">▶</span>
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
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          Contact <span className="text-red-500">Us</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
          Get in touch with our team. We're here to help you start your fitness journey.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 md:mb-8">Contact <span className="text-red-500">Information</span></h3>
            <div className="space-y-4 sm:space-y-6">
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
                  className="flex items-start p-3 sm:p-4 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-red-100"
                >
                  <div className="text-xl sm:text-2xl mr-3 sm:mr-4 group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                  <div>
                    <p className="font-bold text-base sm:text-lg mb-1">{item.label}</p>
                    <p className="text-gray-900 font-semibold text-sm sm:text-base mb-1">{item.value}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
            <div className="p-4 sm:p-6 md:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Our <span className="text-red-500">Location</span></h3>
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 rounded-lg sm:rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop"
                  alt="Gym Location Map"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-4 sm:p-6 md:p-8">
                  <div>
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 animate-bounce">📍</div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold">Find Us Here</p>
                    <p className="text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">Easy access via subway</p>
                    <button className="mt-2 sm:mt-3 md:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors text-sm sm:text-base">
                      GET DIRECTIONS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-gray-100">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Send us a <span className="text-red-500">Message</span>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-700 mb-1 sm:mb-2 font-semibold text-sm sm:text-base">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-sm sm:text-base"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 sm:mb-2 font-semibold text-sm sm:text-base">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-sm sm:text-base"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 sm:mb-2 font-semibold text-sm sm:text-base">Subject</label>
                <select className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-sm sm:text-base">
                  <option>General Inquiry</option>
                  <option>Membership Questions</option>
                  <option>Personal Training</option>
                  <option>Group Classes</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 sm:mb-2 font-semibold text-sm sm:text-base">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white resize-none text-sm sm:text-base"
                  placeholder="Tell us how we can help you..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg sm:rounded-xl text-base sm:text-lg md:text-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:from-red-700 hover:to-orange-600"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
          <div className="mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-center text-sm sm:text-base">
              <span className="font-bold">Quick Response:</span> We typically reply within 2 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Join Now Page
  const renderJoinPage = () => (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          Join <span className="text-red-500">Today</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
          Start your fitness journey with our flexible membership plans
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
        {/* Membership Plans */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
            Membership <span className="text-red-500">Plans</span>
          </h3>
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
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
                className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl ${plan.color} bg-white shadow-xl transform hover:scale-105 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-2 sm:py-3 font-bold transform -translate-y-1 sm:-translate-y-2 group-hover:translate-y-0 transition-transform text-xs sm:text-sm">
                    MOST POPULAR
                  </div>
                )}
                <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
                  <div className="lg:w-1/3 w-full">
                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="lg:w-2/3 w-full">
                    <h4 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{plan.name}</h4>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                      {plan.price}<span className="text-sm sm:text-base md:text-lg text-gray-600">/month</span>
                    </div>
                    <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      {plan.desc.map((item, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 sm:mr-3"></div>
                          <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setFormData({...formData, plan: plan.name.toLowerCase()})}
                      className={`w-full py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 text-sm sm:text-base ${
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
        <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-gray-100 sticky top-24">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Sign Up <span className="text-red-500">Now</span>
          </h3>
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg sm:rounded-xl border border-red-100">
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl mr-2 sm:mr-3 md:mr-4">🎁</span>
              <div>
                <p className="font-bold text-base sm:text-lg">Special Offer!</p>
                <p className="text-gray-600 text-sm sm:text-base">Get first month FREE with annual commitment</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div>
                  <label className="block text-gray-700 mb-1 sm:mb-2 font-semibold text-sm sm:text-base">First Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 sm:mb-2 font-semibold text-sm sm:text-base">Last Name *</label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 sm:mb-2 font-semibold text-sm sm:text-base">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 sm:mb-2 font-semibold text-sm sm:text-base">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 sm:mb-2 font-semibold text-sm sm:text-base">Select Plan *</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-sm sm:text-base"
                >
                  <option value="basic">Basic - $29/month</option>
                  <option value="pro">Pro - $49/month (Most Popular)</option>
                  <option value="elite">Elite - $79/month</option>
                  <option value="annual">Annual Pro - $49/month (Save 20%)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 sm:mb-2 font-semibold text-sm sm:text-base">Preferred Start Date *</label>
                <input
                  type="date"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-sm sm:text-base"
                  required
                />
              </div>
              <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                <input type="checkbox" id="terms" className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" required />
                <label htmlFor="terms" className="text-gray-700 text-xs sm:text-sm">
                  I agree to the terms and conditions and privacy policy
                </label>
              </div>
              <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                <input type="checkbox" id="newsletter" className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" defaultChecked />
                <label htmlFor="newsletter" className="text-gray-700 text-xs sm:text-sm">
                  Subscribe to fitness tips and special offers
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg sm:rounded-xl text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:from-red-700 hover:to-orange-600"
              >
                COMPLETE SIGN UP
              </button>
            </div>
          </form>
          <div className="mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200 text-center text-gray-600 text-xs sm:text-sm">
            <p>🔒 Secure signup · No credit card required for trial · Cancel anytime</p>
          </div>
        </div>
      </div>

      {/* Why Join Section */}
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Why Join <span className="text-red-500">EliteFit</span></h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            { icon: '💰', title: 'No Hidden Fees', desc: 'Transparent pricing with no surprises' },
            { icon: '🔄', title: 'Freeze Option', desc: 'Pause membership when you travel' },
            { icon: '👥', title: 'Bring a Friend', desc: 'Free guest passes every month' },
            { icon: '🎯', title: 'Goal Tracking', desc: 'Personalized progress tracking app' },
            { icon: '🏆', title: 'Challenges', desc: 'Monthly fitness challenges with prizes' },
            { icon: '🎁', title: 'Member Perks', desc: 'Discounts on supplements & apparel' }
          ].map((item, idx) => (
            <div key={idx} className="text-center p-3 sm:p-4 md:p-6">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 animate-bounce-slow" style={{ animationDelay: `${idx * 0.1}s` }}>
                {item.icon}
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{item.title}</h4>
              <p className="text-gray-300 text-sm sm:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Footer
  const renderFooter = () => (
    <footer className={`${darkMode ? 'bg-gray-900' : 'bg-gray-900'} text-white pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-red-500 rounded-full -translate-x-16 sm:-translate-x-24 md:-translate-x-32 -translate-y-16 sm:-translate-y-24 md:-translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-orange-500 rounded-full translate-x-24 sm:translate-x-32 md:translate-x-48 translate-y-24 sm:translate-y-32 md:translate-y-48"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
          <div>
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-pulse mr-3 sm:mr-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">EF</span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">ELITE<span className="text-red-500">FIT</span></h2>
                <p className="text-gray-400 text-xs sm:text-sm">Since 2010</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Transforming lives through premium fitness experiences. Join our community.
            </p>
            <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
              <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-all duration-300 transform hover:scale-110">
                <span className="text-sm sm:text-base md:text-lg">📘</span>
              </button>
              <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all duration-300 transform hover:scale-110">
                <span className="text-sm sm:text-base md:text-lg">📷</span>
              </button>
              <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-all duration-300 transform hover:scale-110">
                <span className="text-sm sm:text-base md:text-lg">🐦</span>
              </button>
              <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 transform hover:scale-110">
                <span className="text-sm sm:text-base md:text-lg">📺</span>
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-800">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {['home', 'about', 'services', 'gallery', 'contact', 'join'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setCurrentPage(item)}
                    className="text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center group text-sm sm:text-base"
                  >
                    <span className="w-2 h-2 bg-gray-700 rounded-full mr-2 sm:mr-3 group-hover:bg-red-500"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 capitalize">
                      {item.replace('-', ' ')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-800">Contact Info</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 sm:mr-3 md:mr-4">📍</span>
                <div>
                  <p className="font-semibold text-sm sm:text-base">123 Fitness Street</p>
                  <p className="text-gray-400 text-xs sm:text-sm">New York, NY 10001</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 sm:mr-3 md:mr-4">📞</span>
                <div>
                  <p className="font-semibold text-sm sm:text-base">(555) 123-4567</p>
                  <p className="text-gray-400 text-xs sm:text-sm">24/7 Support</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 sm:mr-3 md:mr-4">✉️</span>
                <div>
                  <p className="font-semibold text-sm sm:text-base">info@elitefit.com</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Response within 2 hours</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-800">Newsletter</h3>
            <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Subscribe for fitness tips and offers</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
              />
              <button className="px-3 sm:px-4 md:px-6 bg-gradient-to-r from-red-600 to-orange-500 rounded-r-lg font-bold hover:opacity-90 transition-opacity text-sm sm:text-base">
                Join
              </button>
            </div>
            <div className="mt-4 sm:mt-6">
              <p className="text-gray-400 mb-2 sm:mb-3 text-sm">#EliteFitCommunity</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <span className="px-2 sm:px-3 py-1 bg-gray-800 rounded-full text-xs">#Fitness</span>
                <span className="px-2 sm:px-3 py-1 bg-gray-800 rounded-full text-xs">#GymLife</span>
                <span className="px-2 sm:px-3 py-1 bg-gray-800 rounded-full text-xs">#Results</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-4 sm:pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-400 mb-3 sm:mb-0 text-xs sm:text-sm">
            <p>© {new Date().getFullYear()} EliteFit Gym. All rights reserved.</p>
          </div>
          <div className="flex space-x-3 sm:space-x-4 md:space-x-6 text-gray-400 text-xs sm:text-sm">
            <button className="hover:text-red-500 transition-colors">Privacy</button>
            <button className="hover:text-red-500 transition-colors">Terms</button>
            <button className="hover:text-red-500 transition-colors">Cookies</button>
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
          <main className="pt-16 sm:pt-20">
            {renderPageContent()}
          </main>
          {renderFooter()}
        </div>
      </div>
    </div>
  );
};

export default GymWebsite;