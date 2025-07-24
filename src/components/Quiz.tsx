import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuizData {
  skinType: string;
  concerns: string[];
  budget: string;
  texture: string;
  lifestyle: string[];
}

export const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({
    skinType: '',
    concerns: [],
    budget: '',
    texture: '',
    lifestyle: []
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('quizData', JSON.stringify(quizData));
      navigate('/photo');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const updateQuizData = (field: keyof QuizData, value: any) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: 'concerns' | 'lifestyle', value: string) => {
    const currentArray = quizData[field];
    if (currentArray.includes(value)) {
      updateQuizData(field, currentArray.filter(item => item !== value));
    } else {
      if (field === 'concerns' && currentArray.length >= 2) return;
      updateQuizData(field, [...currentArray, value]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', margin: '20px 0' }}>
              What's your skin type? 🤔
            </h2>
            <div className="options">
              {[
                { value: 'oily', emoji: '🛢️', label: 'Oily', desc: 'Shiny T-zone, large pores' },
                { value: 'dry', emoji: '🏜️', label: 'Dry', desc: 'Tight, flaky, rough texture' },
                { value: 'combination', emoji: '🌗', label: 'Combination', desc: 'Oily T-zone, dry cheeks' },
                { value: 'sensitive', emoji: '🌸', label: 'Sensitive', desc: 'Easily irritated, reactive' },
                { value: 'normal', emoji: '✨', label: 'Normal', desc: 'Balanced, few concerns' }
              ].map(option => (
                <div
                  key={option.value}
                  className={`option-card ${quizData.skinType === option.value ? 'selected' : ''}`}
                  onClick={() => updateQuizData('skinType', option.value)}
                  style={{
                    padding: '20px',
                    margin: '12px 0',
                    borderRadius: '16px',
                    border: quizData.skinType === option.value ? '2px solid #8b458b' : '2px solid #e8d5e8',
                    background: quizData.skinType === option.value ? 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '24px', marginRight: '16px' }}>{option.emoji}</span>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2d1b3d' }}>{option.label}</h3>
                      <p style={{ fontSize: '14px', color: '#666', margin: '4px 0' }}>{option.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', margin: '20px 0' }}>
              Top 2 skin concerns? 🎯
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
              Select up to 2 concerns
            </p>
            <div className="options">
              {[
                { value: 'acne', emoji: '🔴', label: 'Acne & Breakouts' },
                { value: 'dullness', emoji: '😴', label: 'Dullness & Uneven Tone' },
                { value: 'dryness', emoji: '🏜️', label: 'Dryness & Dehydration' },
                { value: 'aging', emoji: '⏰', label: 'Fine Lines & Aging' },
                { value: 'dark-spots', emoji: '🌑', label: 'Dark Spots & PIH' },
                { value: 'pores', emoji: '🕳️', label: 'Large Pores' },
                { value: 'sensitivity', emoji: '🌸', label: 'Sensitivity & Redness' }
              ].map(option => (
                <div
                  key={option.value}
                  className={`option-card ${quizData.concerns.includes(option.value) ? 'selected' : ''}`}
                  onClick={() => toggleArrayValue('concerns', option.value)}
                  style={{
                    padding: '16px',
                    margin: '8px 0',
                    borderRadius: '12px',
                    border: quizData.concerns.includes(option.value) ? '2px solid #8b458b' : '2px solid #e8d5e8',
                    background: quizData.concerns.includes(option.value) ? 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: quizData.concerns.length >= 2 && !quizData.concerns.includes(option.value) ? 0.5 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>{option.emoji}</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d' }}>{option.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', margin: '20px 0' }}>
              What's your budget? 💰
            </h2>
            <div className="options">
              {[
                { value: 'budget', emoji: '💸', label: 'Budget Babe', desc: 'Under ₹2,000', range: '₹500-2,000' },
                { value: 'mid', emoji: '💎', label: 'Mid-Range Maven', desc: '₹2,000-5,000', range: '₹2,000-5,000' },
                { value: 'premium', emoji: '👑', label: 'Premium Princess', desc: 'Above ₹5,000', range: '₹5,000+' }
              ].map(option => (
                <div
                  key={option.value}
                  className={`option-card ${quizData.budget === option.value ? 'selected' : ''}`}
                  onClick={() => updateQuizData('budget', option.value)}
                  style={{
                    padding: '20px',
                    margin: '12px 0',
                    borderRadius: '16px',
                    border: quizData.budget === option.value ? '2px solid #8b458b' : '2px solid #e8d5e8',
                    background: quizData.budget === option.value ? 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '24px', marginRight: '16px' }}>{option.emoji}</span>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2d1b3d' }}>{option.label}</h3>
                        <p style={{ fontSize: '14px', color: '#666' }}>{option.desc}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#8b458b' }}>{option.range}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', margin: '20px 0' }}>
              Preferred texture? 🧴
            </h2>
            <div className="options">
              {[
                { value: 'gel', emoji: '🌊', label: 'Gel', desc: 'Light, cooling, quick-absorbing' },
                { value: 'cream', emoji: '🥛', label: 'Cream', desc: 'Rich, nourishing, long-lasting' },
                { value: 'lotion', emoji: '🧴', label: 'Lotion', desc: 'Balanced, smooth, everyday' },
                { value: 'serum', emoji: '💧', label: 'Serum', desc: 'Lightweight, concentrated, fast' },
                { value: 'oil', emoji: '✨', label: 'Oil', desc: 'Luxurious, deeply moisturizing' }
              ].map(option => (
                <div
                  key={option.value}
                  className={`option-card ${quizData.texture === option.value ? 'selected' : ''}`}
                  onClick={() => updateQuizData('texture', option.value)}
                  style={{
                    padding: '18px',
                    margin: '10px 0',
                    borderRadius: '14px',
                    border: quizData.texture === option.value ? '2px solid #8b458b' : '2px solid #e8d5e8',
                    background: quizData.texture === option.value ? 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '22px', marginRight: '14px' }}>{option.emoji}</span>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#2d1b3d' }}>{option.label}</h3>
                      <p style={{ fontSize: '13px', color: '#666' }}>{option.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', margin: '20px 0' }}>
              Your lifestyle? 🌟
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
              Select all that apply
            </p>
            <div className="options">
              {[
                { value: 'busy', emoji: '⚡', label: 'Always Busy', desc: 'Need quick routines' },
                { value: 'outdoors', emoji: '☀️', label: 'Outdoors Often', desc: 'Sun exposure, pollution' },
                { value: 'screen-time', emoji: '📱', label: 'High Screen Time', desc: 'Blue light exposure' },
                { value: 'gym', emoji: '💪', label: 'Gym Regular', desc: 'Sweat, frequent washing' },
                { value: 'night-owl', emoji: '🦉', label: 'Night Owl', desc: 'Late nights, stress' },
                { value: 'travel', emoji: '✈️', label: 'Frequent Travel', desc: 'Climate changes' }
              ].map(option => (
                <div
                  key={option.value}
                  className={`option-card ${quizData.lifestyle.includes(option.value) ? 'selected' : ''}`}
                  onClick={() => toggleArrayValue('lifestyle', option.value)}
                  style={{
                    padding: '16px',
                    margin: '8px 0',
                    borderRadius: '12px',
                    border: quizData.lifestyle.includes(option.value) ? '2px solid #8b458b' : '2px solid #e8d5e8',
                    background: quizData.lifestyle.includes(option.value) ? 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>{option.emoji}</span>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d' }}>{option.label}</h3>
                      <p style={{ fontSize: '13px', color: '#666' }}>{option.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return quizData.skinType !== '';
      case 2: return quizData.concerns.length > 0;
      case 3: return quizData.budget !== '';
      case 4: return quizData.texture !== '';
      case 5: return quizData.lifestyle.length > 0;
      default: return false;
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button 
            onClick={handleBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <ArrowLeft size={24} color="#8b458b" />
          </button>
          <div style={{ textAlign: 'center' }}>
            <div className="logo" style={{ fontSize: '20px' }}>PlumSense</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Step {currentStep} of {totalSteps}</div>
          </div>
          <div style={{ width: '40px' }}></div>
        </div>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {renderStep()}

      <div style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', maxWidth: '390px', margin: '0 auto' }}>
        <button 
          className="btn-primary"
          onClick={handleNext}
          disabled={!canProceed()}
          style={{
            opacity: canProceed() ? 1 : 0.5,
            cursor: canProceed() ? 'pointer' : 'not-allowed'
          }}
        >
          {currentStep === totalSteps ? 'Continue to Photo 📸' : 'Next'}
          <ArrowRight size={20} style={{ marginLeft: '8px', display: 'inline' }} />
        </button>
      </div>
    </div>
  );
};