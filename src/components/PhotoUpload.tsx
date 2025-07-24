import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, ArrowLeft, ArrowRight, X } from 'lucide-react';

export const PhotoUpload: React.FC = () => {
  const navigate = useNavigate();
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string);
        analyzePhoto();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePhoto = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        acneDetected: Math.random() > 0.5,
        dullnessLevel: Math.floor(Math.random() * 5) + 1,
        skinTone: ['fair', 'medium', 'deep'][Math.floor(Math.random() * 3)],
        concerns: ['mild acne', 'slight dullness', 'dehydration']
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleSkip = () => {
    navigate('/results');
  };

  const handleContinue = () => {
    if (analysisResult) {
      localStorage.setItem('photoAnalysis', JSON.stringify(analysisResult));
    }
    navigate('/results');
  };

  const removePhoto = () => {
    setUploadedPhoto(null);
    setAnalysisResult(null);
  };

  return (
    <div className="container">
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button 
            onClick={() => navigate('/quiz')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <ArrowLeft size={24} color="#8b458b" />
          </button>
          <div style={{ textAlign: 'center' }}>
            <div className="logo" style={{ fontSize: '20px' }}>PlumSense</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Photo Analysis</div>
          </div>
          <button 
            onClick={handleSkip}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#8b458b', fontWeight: '600' }}
          >
            Skip
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <div className="emoji-large">📸</div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '16px 0', color: '#2d1b3d' }}>
          Snap for Better Results
        </h2>
        <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.5', margin: '16px 0' }}>
          Upload a selfie for AI-powered skin analysis. We'll detect acne, dullness, and more! ✨
        </p>
      </div>

      {!uploadedPhoto ? (
        <div>
          <div className="upload-area" style={{
            border: '2px dashed #e8d5e8',
            borderRadius: '20px',
            padding: '40px 20px',
            textAlign: 'center',
            margin: '20px 0',
            background: 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)'
          }}>
            <Camera size={48} color="#8b458b" style={{ margin: '16px 0' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2d1b3d', margin: '16px 0' }}>
              Take or Upload Photo
            </h3>
            <p style={{ fontSize: '14px', color: '#666', margin: '12px 0' }}>
              For best results, use natural lighting and face the camera directly
            </p>
            
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
              id="photo-upload"
            />
            
            <label htmlFor="photo-upload">
              <button 
                className="btn-primary"
                style={{ margin: '16px 8px 8px 8px', width: 'auto', padding: '12px 24px' }}
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <Camera size={20} style={{ marginRight: '8px' }} />
                Take Photo
              </button>
            </label>
            
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
              id="file-upload"
            />
            
            <label htmlFor="file-upload">
              <button 
                className="btn-secondary"
                style={{ margin: '8px', width: 'auto', padding: '12px 24px' }}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload size={20} style={{ marginRight: '8px' }} />
                Upload from Gallery
              </button>
            </label>
          </div>

          <div className="tips" style={{ margin: '30px 0' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d', margin: '16px 0' }}>
              📝 Photo Tips:
            </h4>
            <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', paddingLeft: '20px' }}>
              <li>Use natural daylight (avoid harsh shadows)</li>
              <li>Face the camera directly</li>
              <li>Remove makeup for accurate analysis</li>
              <li>Keep hair away from face</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div className="photo-preview" style={{ position: 'relative', margin: '20px 0' }}>
            <img 
              src={uploadedPhoto} 
              alt="Uploaded selfie" 
              style={{ 
                width: '100%', 
                maxHeight: '300px', 
                objectFit: 'cover', 
                borderRadius: '16px',
                border: '2px solid #e8d5e8'
              }} 
            />
            <button
              onClick={removePhoto}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} color="white" />
            </button>
          </div>

          {isAnalyzing ? (
            <div className="analysis-loading" style={{ textAlign: 'center', margin: '30px 0' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                border: '4px solid #e8d5e8', 
                borderTop: '4px solid #8b458b', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px'
              }}></div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2d1b3d' }}>
                Analyzing your skin... 🔍
              </h3>
              <p style={{ fontSize: '14px', color: '#666', margin: '8px 0' }}>
                Our AI is detecting skin concerns and tone
              </p>
            </div>
          ) : analysisResult ? (
            <div className="analysis-results">
              <div className="card">
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2d1b3d', marginBottom: '16px' }}>
                  🎯 Analysis Results
                </h3>
                
                <div style={{ margin: '12px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>
                      {analysisResult.acneDetected ? '🔴' : '✅'}
                    </span>
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      {analysisResult.acneDetected ? 'Mild acne detected' : 'No major acne concerns'}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>😴</span>
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      Dullness level: {analysisResult.dullnessLevel}/5
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>🎨</span>
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      Skin tone: {analysisResult.skinTone}
                    </span>
                  </div>
                </div>

                <div style={{ 
                  background: 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  margin: '16px 0' 
                }}>
                  <p style={{ fontSize: '14px', color: '#8b458b', fontWeight: '600' }}>
                    💡 We'll use this analysis to customize your routine!
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      <div style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', maxWidth: '390px', margin: '0 auto' }}>
        {uploadedPhoto && analysisResult && (
          <button 
            className="btn-primary"
            onClick={handleContinue}
          >
            Get My Routine ✨
            <ArrowRight size={20} style={{ marginLeft: '8px', display: 'inline' }} />
          </button>
        )}
        
        {!uploadedPhoto && (
          <button 
            className="btn-secondary"
            onClick={handleSkip}
          >
            Skip Photo & Continue
          </button>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};