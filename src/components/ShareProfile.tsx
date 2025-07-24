import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Instagram, Twitter, MessageCircle, Download } from 'lucide-react';

export const ShareProfile: React.FC = () => {
  const navigate = useNavigate();
  const [passportData, setPassportData] = useState<any>(null);
  const [quizData, setQuizData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

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

  const generateShareText = () => {
    if (!passportData || !quizData) return '';
    
    const concerns = quizData.concerns.join(' & ');
    return `Just discovered my perfect skincare routine with PlumSense! ✨\n\n🎯 My skin: ${quizData.skinType}\n💜 Top concerns: ${concerns}\n🧴 My Plum routine: ${passportData.routine.length} products\n💰 Investment: ₹${passportData.totalPrice}\n\nReady to glow up? Try PlumSense! #PlumSense #SkincareRoutine #GlowUp`;
  };

  const generateInstagramCaption = () => {
    if (!passportData || !quizData) return '';
    
    return `Found my perfect skincare match! 💜✨\n\n${passportData.skinEmoji} My skin type: ${quizData.skinType}\n🎯 Targeting: ${quizData.concerns.join(' & ')}\n🧴 My @plumgoodness routine is ready!\n\nSwipe to see my skin passport 📱\n\n#PlumSense #SkincareRoutine #PersonalizedSkincare #PlumGoodness #GlowUp #SkincareJourney #GenZSkincare`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToSocial = (platform: string) => {
    const text = encodeURIComponent(generateShareText());
    const url = encodeURIComponent('https://plumsense.app'); // Placeholder URL
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so we copy the caption
        copyToClipboard(generateInstagramCaption());
        alert('Caption copied! Open Instagram and paste it with your skin passport screenshot 📸');
        return;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  const downloadShareableImage = () => {
    // In a real app, this would generate a shareable image
    alert('Shareable image downloaded! 📱 (Feature coming soon)');
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
              <div style={{ fontSize: '14px', color: '#666' }}>Share Profile</div>
            </div>
            <div style={{ width: '40px' }}></div>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div className="emoji-large">📱</div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '16px 0', color: '#2d1b3d' }}>
            No Profile to Share
          </h2>
          <p style={{ color: '#666', fontSize: '16px', margin: '16px 0' }}>
            Complete your skincare routine first to create a shareable profile!
          </p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/quiz')}
            style={{ marginTop: '20px' }}
          >
            Start Quiz ✨
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button 
            onClick={() => navigate('/results')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <ArrowLeft size={24} color="#8b458b" />
          </button>
          <div style={{ textAlign: 'center' }}>
            <div className="logo" style={{ fontSize: '20px' }}>PlumSense</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Share Your Glow</div>
          </div>
          <div style={{ width: '40px' }}></div>
        </div>
      </div>

      {/* Share Preview */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #8b458b 0%, #b565a7 100%)', 
        color: 'white', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.1', fontSize: '120px' }}>
          📱
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '48px', margin: '16px 0' }}>{passportData.skinEmoji}</div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', margin: '12px 0' }}>
            My PlumSense Journey
          </h1>
          <div style={{ fontSize: '14px', opacity: '0.9', margin: '8px 0' }}>
            {quizData.skinType} skin • {quizData.concerns.join(' & ')}
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600', margin: '12px 0' }}>
            ₹{passportData.totalPrice} routine • {passportData.routine.length} products
          </div>
        </div>
      </div>

      {/* Share Text Preview */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#2d1b3d' }}>
          📝 Share Text Preview
        </h3>
        
        <div style={{ 
          background: '#f8f4ff', 
          padding: '16px', 
          borderRadius: '12px', 
          marginBottom: '16px',
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#2d1b3d',
          whiteSpace: 'pre-line'
        }}>
          {generateShareText()}
        </div>
        
        <button 
          onClick={() => copyToClipboard(generateShareText())}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '12px',
            background: copied ? '#4ade80' : '#e8d5e8',
            color: copied ? 'white' : '#8b458b',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <Copy size={16} style={{ marginRight: '8px' }} />
          {copied ? 'Copied! ✓' : 'Copy Text'}
        </button>
      </div>

      {/* Social Media Sharing */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#2d1b3d' }}>
          📱 Share on Social Media
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <button 
            onClick={() => shareToSocial('instagram')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Instagram size={24} style={{ marginBottom: '8px' }} />
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Instagram</span>
            <span style={{ fontSize: '12px', opacity: '0.9' }}>Story & Post</span>
          </button>
          
          <button 
            onClick={() => shareToSocial('twitter')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              background: 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Twitter size={24} style={{ marginBottom: '8px' }} />
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Twitter</span>
            <span style={{ fontSize: '12px', opacity: '0.9' }}>Tweet</span>
          </button>
        </div>
        
        <button 
          onClick={() => shareToSocial('whatsapp')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageCircle size={20} style={{ marginRight: '8px' }} />
          Share on WhatsApp
        </button>
      </div>

      {/* Instagram-specific Caption */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#2d1b3d' }}>
          📸 Instagram Caption
        </h3>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
          padding: '16px', 
          borderRadius: '12px', 
          marginBottom: '16px',
          fontSize: '14px',
          lineHeight: '1.5',
          color: 'white',
          whiteSpace: 'pre-line'
        }}>
          {generateInstagramCaption()}
        </div>
        
        <button 
          onClick={() => copyToClipboard(generateInstagramCaption())}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '12px',
            background: '#e8d5e8',
            color: '#8b458b',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <Copy size={16} style={{ marginRight: '8px' }} />
          Copy Instagram Caption
        </button>
      </div>

      {/* Download Shareable Image */}
      <div className="card" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#2d1b3d' }}>
          🎨 Shareable Graphics
        </h3>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)', 
          padding: '24px', 
          borderRadius: '16px', 
          marginBottom: '16px' 
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎨</div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d', marginBottom: '8px' }}>
            Custom Graphics Coming Soon!
          </h4>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Beautiful, branded graphics for your social media posts
          </p>
        </div>
        
        <button 
          onClick={downloadShareableImage}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #8b458b 0%, #b565a7 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <Download size={20} style={{ marginRight: '8px' }} />
          Download Shareable Image
        </button>
      </div>

      {/* Tips for Sharing */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d', marginBottom: '12px' }}>
          💡 Sharing Tips:
        </h4>
        <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
          <li>Tag @plumgoodness for a chance to be featured!</li>
          <li>Use #PlumSense and #SkincareRoutine hashtags</li>
          <li>Share your before/after progress photos</li>
          <li>Help friends discover their perfect routine too!</li>
        </ul>
      </div>

      {/* Back to Results */}
      <div style={{ margin: '24px 0' }}>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/results')}
        >
          Back to My Routine 🧴
        </button>
      </div>
    </div>
  );
};