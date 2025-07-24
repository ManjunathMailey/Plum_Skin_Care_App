import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Calendar, MapPin, Star } from 'lucide-react';

export const SkinPassport: React.FC = () => {
  const navigate = useNavigate();
  const [passportData, setPassportData] = useState<any>(null);
  const [quizData, setQuizData] = useState<any>(null);

  useEffect(() => {
    const passport = localStorage.getItem('skinPassport');
    const quiz = localStorage.getItem('quizData');
    
    if (passport) {
      setPassportData(JSON.parse(passport));
    }
    if (quiz) {
      setQuizData(JSON.parse(quiz));
    }
  }, []);

  const generateQRCode = () => {
    // In a real app, this would generate an actual QR code
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzhmNDU4YiIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+";
  };

  const getSkinTypeEmoji = (skinType: string) => {
    const emojiMap: { [key: string]: string } = {
      'oily': '🛢️',
      'dry': '🏜️',
      'combination': '🌗',
      'sensitive': '🌸',
      'normal': '✨'
    };
    return emojiMap[skinType] || '✨';
  };

  const getBudgetEmoji = (budget: string) => {
    const emojiMap: { [key: string]: string } = {
      'budget': '💸',
      'mid': '💎',
      'premium': '👑'
    };
    return emojiMap[budget] || '💎';
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert('Passport downloaded! 📱 (Feature coming soon)');
  };

  const handleShare = () => {
    navigate('/share');
  };

  if (!passportData || !quizData) {
    return (
      <div className="container">
        <div className="header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <button 
              onClick={() => navigate('/')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            >
              <ArrowLeft size={24} color="#8b458b" />
            </button>
            <div style={{ textAlign: 'center' }}>
              <div className="logo" style={{ fontSize: '20px' }}>PlumSense</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Skin Passport</div>
            </div>
            <div style={{ width: '40px' }}></div>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div className="emoji-large">📋</div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '16px 0', color: '#2d1b3d' }}>
            No Skin Passport Found
          </h2>
          <p style={{ color: '#666', fontSize: '16px', margin: '16px 0' }}>
            Complete your skincare quiz and get your routine to create your Skin Passport!
          </p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/quiz')}
            style={{ marginTop: '20px' }}
          >
            Take Quiz Now ✨
          </button>
        </div>
      </div>
    );
  }

  const createdDate = new Date(passportData.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="container">
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <ArrowLeft size={24} color="#8b458b" />
          </button>
          <div style={{ textAlign: 'center' }}>
            <div className="logo" style={{ fontSize: '20px' }}>PlumSense</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Skin Passport</div>
          </div>
          <div style={{ width: '40px' }}></div>
        </div>
      </div>

      {/* Passport Header */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #8b458b 0%, #b565a7 100%)', 
        color: 'white', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.1', fontSize: '120px' }}>
          🌸
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '48px', margin: '16px 0' }}>{passportData.skinEmoji}</div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '12px 0' }}>
            My Skin Passport
          </h1>
          <p style={{ fontSize: '14px', opacity: '0.9', margin: '8px 0' }}>
            Personalized Skincare Journey
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}>
            <Calendar size={16} style={{ marginRight: '6px' }} />
            <span style={{ fontSize: '14px' }}>Created: {createdDate}</span>
          </div>
        </div>
      </div>

      {/* Skin Profile */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#2d1b3d' }}>
          🎯 My Skin Profile
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div style={{ textAlign: 'center', padding: '16px', background: '#f8f4ff', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>
              {getSkinTypeEmoji(quizData.skinType)}
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#2d1b3d', textTransform: 'capitalize' }}>
              {quizData.skinType} Skin
            </div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '16px', background: '#f8f4ff', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>
              {getBudgetEmoji(quizData.budget)}
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#2d1b3d', textTransform: 'capitalize' }}>
              {quizData.budget === 'mid' ? 'Mid-Range' : quizData.budget} Budget
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#8b458b', marginBottom: '8px' }}>
            Top Concerns:
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {quizData.concerns.map((concern: string, index: number) => (
              <span key={index} style={{
                background: '#e8d5e8',
                color: '#8b458b',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {concern.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#8b458b', marginBottom: '8px' }}>
            Lifestyle:
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {quizData.lifestyle.map((habit: string, index: number) => (
              <span key={index} style={{
                background: '#ffe8f0',
                color: '#ff6b9d',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {habit.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* My Routine */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#2d1b3d' }}>
          🧴 My Plum Routine
        </h3>
        
        {passportData.routine.map((product: any, index: number) => (
          <div key={product.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '12px', 
            background: '#f8f4ff', 
            borderRadius: '12px', 
            margin: '8px 0' 
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: `url(${product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              marginRight: '12px'
            }}></div>
            
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#2d1b3d' }}>
                Step {index + 1}: {product.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                <Star size={12} color="#ffd700" fill="#ffd700" />
                <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px', marginRight: '12px' }}>
                  {product.rating}
                </span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#8b458b' }}>
                  ₹{product.price}
                </span>
              </div>
            </div>
          </div>
        ))}

        {passportData.upgrades.length > 0 && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e8d5e8' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#ff6b9d', marginBottom: '8px' }}>
              ⚡ Optional Upgrades:
            </h4>
            {passportData.upgrades.map((product: any) => (
              <div key={product.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '12px', 
                background: '#ffe8f0', 
                borderRadius: '12px', 
                margin: '8px 0' 
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: `url(${product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  marginRight: '12px'
                }}></div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#2d1b3d' }}>
                    {product.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                    <Star size={12} color="#ffd700" fill="#ffd700" />
                    <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px', marginRight: '12px' }}>
                      {product.rating}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#ff6b9d' }}>
                      ₹{product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Investment Summary */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: '#2d1b3d' }}>
          💰 My Glow Investment
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '16px', color: '#666' }}>Total Routine Value:</span>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#8b458b' }}>
            ₹{passportData.totalPrice}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
          <MapPin size={16} color="#8b458b" style={{ marginRight: '6px' }} />
          <span style={{ fontSize: '14px', color: '#666' }}>
            Optimized for {passportData.location} climate
          </span>
        </div>
      </div>

      {/* QR Code */}
      <div className="card" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#2d1b3d' }}>
          📱 Share Your Passport
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <img 
            src={generateQRCode()} 
            alt="QR Code" 
            style={{ width: '100px', height: '100px', borderRadius: '12px' }}
          />
        </div>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
          Scan to view your skincare routine or share with friends!
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', margin: '24px 0' }}>
        <button 
          className="btn-secondary"
          onClick={handleDownload}
          style={{ flex: 1 }}
        >
          <Download size={18} style={{ marginRight: '8px' }} />
          Download PDF
        </button>
        
        <button 
          className="btn-primary"
          onClick={handleShare}
          style={{ flex: 1 }}
        >
          <Share2 size={18} style={{ marginRight: '8px' }} />
          Share Profile
        </button>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: '12px', margin: '20px 0' }}>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/tracker')}
          style={{ flex: 1 }}
        >
          Track Progress 📊
        </button>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/results')}
          style={{ flex: 1 }}
        >
          View Routine 🧴
        </button>
      </div>
    </div>
  );
};