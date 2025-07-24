import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Bookmark, Share2, MapPin, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  type: 'cleanser' | 'moisturizer' | 'spf' | 'serum' | 'exfoliator';
  price: number;
  image: string;
  description: string;
  benefits: string[];
  rating: number;
}

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const [routine, setRoutine] = useState<Product[]>([]);
  const [upgrades, setUpgrades] = useState<Product[]>([]);
  const [location, setLocation] = useState('Mumbai');
  const [skinEmoji, setSkinEmoji] = useState('✨');

  useEffect(() => {
    const quizData = JSON.parse(localStorage.getItem('quizData') || '{}');
    const photoAnalysis = JSON.parse(localStorage.getItem('photoAnalysis') || '{}');
    
    generateRoutine(quizData, photoAnalysis);
    detectLocation();
  }, []);

  const detectLocation = () => {
    // Simulate location detection
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setLocation(randomCity);
  };

  const generateRoutine = (quizData: any, photoAnalysis: any) => {
    // Generate skin emoji based on analysis
    if (photoAnalysis.acneDetected) {
      setSkinEmoji('🔴');
    } else if (photoAnalysis.dullnessLevel > 3) {
      setSkinEmoji('😴');
    } else {
      setSkinEmoji('✨');
    }

    // Mock product database
    const products: Product[] = [
      {
        id: 'cleanser-1',
        name: 'Plum Green Tea Gentle Cleanser',
        type: 'cleanser',
        price: 399,
        image: 'https://images.pexels.com/photos/7755226/pexels-photo-7755226.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Gentle daily cleanser with green tea extract',
        benefits: ['Removes impurities', 'Antioxidant protection', 'Suitable for all skin types'],
        rating: 4.5
      },
      {
        id: 'moisturizer-1',
        name: 'Plum Hyaluronic Acid Moisturizer',
        type: 'moisturizer',
        price: 599,
        image: 'https://images.pexels.com/photos/7755226/pexels-photo-7755226.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Lightweight gel moisturizer with hyaluronic acid',
        benefits: ['24hr hydration', 'Plumps skin', 'Non-greasy formula'],
        rating: 4.7
      },
      {
        id: 'spf-1',
        name: 'Plum Mineral SPF 50',
        type: 'spf',
        price: 699,
        image: 'https://images.pexels.com/photos/7755226/pexels-photo-7755226.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Broad spectrum mineral sunscreen',
        benefits: ['SPF 50 protection', 'No white cast', 'Water resistant'],
        rating: 4.6
      },
      {
        id: 'serum-1',
        name: 'Plum Niacinamide Serum',
        type: 'serum',
        price: 799,
        image: 'https://images.pexels.com/photos/7755226/pexels-photo-7755226.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: '10% Niacinamide + Zinc serum for acne control',
        benefits: ['Controls oil', 'Minimizes pores', 'Reduces blemishes'],
        rating: 4.8
      },
      {
        id: 'exfoliator-1',
        name: 'Plum AHA BHA Exfoliator',
        type: 'exfoliator',
        price: 649,
        image: 'https://images.pexels.com/photos/7755226/pexels-photo-7755226.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Gentle chemical exfoliator with AHA & BHA',
        benefits: ['Unclogs pores', 'Brightens skin', 'Smooth texture'],
        rating: 4.4
      }
    ];

    // Basic 3-step routine
    const basicRoutine = [
      products.find(p => p.type === 'cleanser')!,
      products.find(p => p.type === 'moisturizer')!,
      products.find(p => p.type === 'spf')!
    ];

    // Upgrades based on concerns
    const routineUpgrades = [];
    if (quizData.concerns?.includes('acne') || photoAnalysis.acneDetected) {
      routineUpgrades.push(products.find(p => p.type === 'serum')!);
    }
    if (quizData.concerns?.includes('dullness') || photoAnalysis.dullnessLevel > 2) {
      routineUpgrades.push(products.find(p => p.type === 'exfoliator')!);
    }

    setRoutine(basicRoutine);
    setUpgrades(routineUpgrades);
  };

  const getTotalPrice = () => {
    return routine.reduce((total, product) => total + product.price, 0);
  };

  const getLocationRecommendation = () => {
    const humid = ['Mumbai', 'Chennai', 'Kolkata'];
    const dry = ['Delhi', 'Jaipur'];
    
    if (humid.includes(location)) {
      return {
        emoji: '💧',
        text: `Perfect for ${location}'s humidity! Gel-based products will keep you fresh.`
      };
    } else if (dry.includes(location)) {
      return {
        emoji: '🏜️',
        text: `Great for ${location}'s dry climate! Extra hydration for your skin.`
      };
    } else {
      return {
        emoji: '🌤️',
        text: `Customized for ${location}'s climate conditions.`
      };
    }
  };

  const handleSavePassport = () => {
    const routineData = {
      routine,
      upgrades,
      totalPrice: getTotalPrice(),
      date: new Date().toISOString(),
      skinEmoji,
      location
    };
    localStorage.setItem('skinPassport', JSON.stringify(routineData));
    navigate('/passport');
  };

  const handleShare = () => {
    navigate('/share');
  };

  const locationRec = getLocationRecommendation();

  return (
    <div className="container">
      <div className="header">
        <div className="logo">PlumSense ✨</div>
        <div className="subtitle">Your Personalized Routine</div>
      </div>

      {/* Skin State */}
      <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #8b458b 0%, #b565a7 100%)', color: 'white' }}>
        <div style={{ fontSize: '48px', margin: '16px 0' }}>{skinEmoji}</div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '12px 0' }}>
          Your Skin Journey Starts Here!
        </h2>
        <p style={{ fontSize: '14px', opacity: '0.9' }}>
          Based on your quiz and photo analysis
        </p>
      </div>

      {/* Location-based Recommendation */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <MapPin size={20} color="#8b458b" style={{ marginRight: '8px' }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#8b458b' }}>Location-Based Tip</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', marginRight: '12px' }}>{locationRec.emoji}</span>
          <p style={{ fontSize: '14px', color: '#666' }}>{locationRec.text}</p>
        </div>
      </div>

      {/* Core Routine */}
      <div className="routine-section">
        <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '24px 0 16px', color: '#2d1b3d' }}>
          🌟 Your 3-Step Routine
        </h3>
        
        {routine.map((product, index) => (
          <div key={product.id} className="card" style={{ margin: '12px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '12px', 
                background: `url(${product.image})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginRight: '16px'
              }}></div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ 
                    background: '#8b458b', 
                    color: 'white', 
                    fontSize: '12px', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    marginRight: '8px',
                    fontWeight: '600'
                  }}>
                    Step {index + 1}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Star size={14} color="#ffd700" fill="#ffd700" />
                    <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>
                      {product.rating}
                    </span>
                  </div>
                </div>
                
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d', margin: '4px 0' }}>
                  {product.name}
                </h4>
                <p style={{ fontSize: '13px', color: '#666', margin: '4px 0' }}>
                  {product.description}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#8b458b' }}>
                    ₹{product.price}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {product.benefits.slice(0, 2).map((benefit, i) => (
                      <span key={i} style={{ 
                        fontSize: '10px', 
                        background: '#e8d5e8', 
                        color: '#8b458b', 
                        padding: '2px 6px', 
                        borderRadius: '8px',
                        fontWeight: '500'
                      }}>
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Upgrades */}
      {upgrades.length > 0 && (
        <div className="upgrades-section">
          <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '24px 0 16px', color: '#2d1b3d' }}>
            ⚡ Recommended Upgrades
          </h3>
          
          {upgrades.map((product) => (
            <div key={product.id} className="card" style={{ margin: '12px 0', border: '2px solid #ff6b9d' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '12px', 
                  background: `url(${product.image})`, 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  marginRight: '16px'
                }}></div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ 
                      background: '#ff6b9d', 
                      color: 'white', 
                      fontSize: '12px', 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      marginRight: '8px',
                      fontWeight: '600'
                    }}>
                      UPGRADE
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Star size={14} color="#ffd700" fill="#ffd700" />
                      <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d', margin: '4px 0' }}>
                    {product.name}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#666', margin: '4px 0' }}>
                    {product.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#ff6b9d' }}>
                      ₹{product.price}
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {product.benefits.slice(0, 2).map((benefit, i) => (
                        <span key={i} style={{ 
                          fontSize: '10px', 
                          background: '#ffe8f0', 
                          color: '#ff6b9d', 
                          padding: '2px 6px', 
                          borderRadius: '8px',
                          fontWeight: '500'
                        }}>
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                background: 'linear-gradient(135deg, #ffe8f0 0%, #fff0f5 100%)', 
                padding: '12px', 
                borderRadius: '12px', 
                margin: '12px 0 0 0' 
              }}>
                <p style={{ fontSize: '13px', color: '#ff6b9d', fontWeight: '600' }}>
                  💡 Why this upgrade? Perfect for your {product.type === 'serum' ? 'acne concerns' : 'dullness issues'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Routine Summary */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #8b458b 0%, #b565a7 100%)', color: 'white', margin: '24px 0' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
          💜 Routine Summary
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '16px' }}>Core Routine (3 products)</span>
          <span style={{ fontSize: '18px', fontWeight: '700' }}>₹{getTotalPrice()}</span>
        </div>
        
        {upgrades.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', opacity: '0.8' }}>
            <span style={{ fontSize: '14px' }}>+ Optional upgrades</span>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              ₹{upgrades.reduce((total, product) => total + product.price, 0)}
            </span>
          </div>
        )}
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Your Investment in Glow</span>
            <span style={{ fontSize: '20px', fontWeight: '800' }}>
              ₹{getTotalPrice() + upgrades.reduce((total, product) => total + product.price, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ margin: '24px 0' }}>
        <button className="btn-primary" style={{ marginBottom: '12px' }}>
          <ShoppingCart size={20} style={{ marginRight: '8px' }} />
          Add to Cart - ₹{getTotalPrice()}
        </button>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn-secondary" 
            style={{ flex: 1 }}
            onClick={handleSavePassport}
          >
            <Bookmark size={18} style={{ marginRight: '8px' }} />
            Save as Skin Passport
          </button>
          
          <button 
            className="btn-secondary" 
            style={{ flex: 1 }}
            onClick={handleShare}
          >
            <Share2 size={18} style={{ marginRight: '8px' }} />
            Share Profile
          </button>
        </div>
      </div>

      {/* Next Steps */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)', textAlign: 'center' }}>
        <div className="emoji-medium">🎯</div>
        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d', margin: '8px 0' }}>
          Ready to Start Your Glow Journey?
        </h4>
        <p style={{ fontSize: '14px', color: '#666', margin: '8px 0' }}>
          Track your progress daily and see amazing results in 4-6 weeks!
        </p>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/tracker')}
          style={{ marginTop: '12px', width: 'auto', padding: '8px 16px' }}
        >
          Start Progress Tracking 📊
        </button>
      </div>
    </div>
  );
};