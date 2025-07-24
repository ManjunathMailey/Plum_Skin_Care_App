import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Camera, Target } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="header">
        <div className="logo">PlumSense ✨</div>
        <div className="subtitle">Your AI Skincare Bestie</div>
      </div>

      <div className="hero-section" style={{ textAlign: 'center', margin: '40px 0' }}>
        <div className="emoji-large">🌸</div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '16px 0', color: '#2d1b3d' }}>
          Get Your Perfect Plum Routine
        </h2>
        <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.5', margin: '16px 0' }}>
          Take our fun 5-step quiz and discover your personalized skincare routine in under 2 minutes! 💜
        </p>
      </div>

      <div className="features">
        <div className="feature-card" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '20px', 
          background: 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)', 
          borderRadius: '16px', 
          margin: '12px 0' 
        }}>
          <Sparkles size={24} color="#8b458b" style={{ marginRight: '16px' }} />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d' }}>Smart Quiz</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>5 fun questions about your skin</p>
          </div>
        </div>

        <div className="feature-card" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '20px', 
          background: 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)', 
          borderRadius: '16px', 
          margin: '12px 0' 
        }}>
          <Camera size={24} color="#8b458b" style={{ marginRight: '16px' }} />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d' }}>Skin Analysis</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>Optional photo upload for better results</p>
          </div>
        </div>

        <div className="feature-card" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '20px', 
          background: 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)', 
          borderRadius: '16px', 
          margin: '12px 0' 
        }}>
          <Target size={24} color="#8b458b" style={{ marginRight: '16px' }} />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d' }}>Personalized Routine</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>3-step routine + optional upgrades</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <button 
          className="btn-primary"
          onClick={() => navigate('/quiz')}
        >
          Start Your Skin Journey 🚀
        </button>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Already have a routine? 
            <span 
              style={{ color: '#8b458b', fontWeight: '600', cursor: 'pointer', marginLeft: '4px' }}
              onClick={() => navigate('/tracker')}
            >
              Track Progress
            </span>
          </p>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        background: 'linear-gradient(135deg, #8b458b 0%, #b565a7 100%)', 
        borderRadius: '16px', 
        color: 'white', 
        margin: '20px 0' 
      }}>
        <div className="emoji-medium">🎯</div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '8px 0' }}>
          Trusted by 50K+ Gen Z
        </h3>
        <p style={{ fontSize: '14px', opacity: '0.9' }}>
          Join the PlumSense community and glow up! ✨
        </p>
      </div>
    </div>
  );
};