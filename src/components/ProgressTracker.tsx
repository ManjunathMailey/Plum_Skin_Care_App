import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, TrendingUp, Award } from 'lucide-react';

interface DayProgress {
  date: string;
  morning: {
    cleanser: boolean;
    moisturizer: boolean;
    spf: boolean;
  };
  evening: {
    cleanser: boolean;
    moisturizer: boolean;
    serum?: boolean;
  };
  notes: string;
  skinFeeling: string;
}

export const ProgressTracker: React.FC = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [progress, setProgress] = useState<DayProgress[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');

  useEffect(() => {
    loadProgress();
    setSelectedDay(new Date().toISOString().split('T')[0]);
  }, []);

  const loadProgress = () => {
    const saved = localStorage.getItem('skinProgress');
    if (saved) {
      setProgress(JSON.parse(saved));
    } else {
      // Initialize with current week
      const weekProgress = generateWeekDates().map(date => ({
        date,
        morning: { cleanser: false, moisturizer: false, spf: false },
        evening: { cleanser: false, moisturizer: false },
        notes: '',
        skinFeeling: ''
      }));
      setProgress(weekProgress);
    }
  };

  const generateWeekDates = () => {
    const dates = [];
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const saveProgress = (updatedProgress: DayProgress[]) => {
    setProgress(updatedProgress);
    localStorage.setItem('skinProgress', JSON.stringify(updatedProgress));
  };

  const updateDayProgress = (date: string, field: string, value: any) => {
    const updatedProgress = progress.map(day => {
      if (day.date === date) {
        const keys = field.split('.');
        const updated = { ...day };
        if (keys.length === 2) {
          (updated as any)[keys[0]][keys[1]] = value;
        } else {
          (updated as any)[field] = value;
        }
        return updated;
      }
      return day;
    });
    saveProgress(updatedProgress);
  };

  const getDayProgress = (date: string) => {
    return progress.find(day => day.date === date) || {
      date,
      morning: { cleanser: false, moisturizer: false, spf: false },
      evening: { cleanser: false, moisturizer: false },
      notes: '',
      skinFeeling: ''
    };
  };

  const getWeeklyStats = () => {
    const weekDays = generateWeekDates();
    const weekProgress = progress.filter(day => weekDays.includes(day.date));
    
    const totalSteps = weekProgress.length * 5; // 5 steps per day (3 morning + 2 evening)
    const completedSteps = weekProgress.reduce((total, day) => {
      return total + 
        (day.morning.cleanser ? 1 : 0) +
        (day.morning.moisturizer ? 1 : 0) +
        (day.morning.spf ? 1 : 0) +
        (day.evening.cleanser ? 1 : 0) +
        (day.evening.moisturizer ? 1 : 0);
    }, 0);
    
    return {
      completion: Math.round((completedSteps / totalSteps) * 100),
      streak: calculateStreak(),
      totalDays: weekProgress.length
    };
  };

  const calculateStreak = () => {
    let streak = 0;
    const sortedProgress = [...progress].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (const day of sortedProgress) {
      const dailyComplete = day.morning.cleanser && day.morning.moisturizer && day.morning.spf && 
                           day.evening.cleanser && day.evening.moisturizer;
      if (dailyComplete) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getDayName = (date: string) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(date).getDay()];
  };

  const getDateNumber = (date: string) => {
    return new Date(date).getDate();
  };

  const isToday = (date: string) => {
    return date === new Date().toISOString().split('T')[0];
  };

  const selectedDayData = getDayProgress(selectedDay);
  const stats = getWeeklyStats();

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
            <div style={{ fontSize: '14px', color: '#666' }}>Progress Tracker</div>
          </div>
          <div style={{ width: '40px' }}></div>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #8b458b 0%, #b565a7 100%)', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '12px 0' }}>
          This Week's Progress 📊
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800' }}>{stats.completion}%</div>
            <div style={{ fontSize: '12px', opacity: '0.9' }}>Completion</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800' }}>{stats.streak}</div>
            <div style={{ fontSize: '12px', opacity: '0.9' }}>Day Streak</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800' }}>{stats.totalDays}</div>
            <div style={{ fontSize: '12px', opacity: '0.9' }}>Days Tracked</div>
          </div>
        </div>
        
        {stats.streak >= 7 && (
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '12px', margin: '16px 0' }}>
            <Award size={20} style={{ marginRight: '8px' }} />
            <span style={{ fontSize: '14px', fontWeight: '600' }}>
              🎉 Amazing! 7-day streak achieved!
            </span>
          </div>
        )}
      </div>

      {/* Week Calendar */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#2d1b3d' }}>
          <Calendar size={20} style={{ marginRight: '8px', display: 'inline' }} />
          Weekly View
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          {generateWeekDates().map(date => {
            const dayData = getDayProgress(date);
            const isComplete = dayData.morning.cleanser && dayData.morning.moisturizer && 
                              dayData.morning.spf && dayData.evening.cleanser && dayData.evening.moisturizer;
            
            return (
              <div
                key={date}
                onClick={() => setSelectedDay(date)}
                style={{
                  textAlign: 'center',
                  padding: '12px 8px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: selectedDay === date ? 'linear-gradient(135deg, #8b458b 0%, #b565a7 100%)' : 
                             isComplete ? 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)' : 'transparent',
                  color: selectedDay === date ? 'white' : '#2d1b3d',
                  border: isToday(date) ? '2px solid #ff6b9d' : '1px solid #e8d5e8',
                  transition: 'all 0.3s ease',
                  minWidth: '45px'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                  {getDayName(date)}
                </div>
                <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>
                  {getDateNumber(date)}
                </div>
                <div style={{ fontSize: '16px' }}>
                  {isComplete ? '✅' : isToday(date) ? '📅' : '⭕'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Routine Tracker */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#2d1b3d' }}>
          {isToday(selectedDay) ? "Today's Routine" : `Routine for ${getDayName(selectedDay)} ${getDateNumber(selectedDay)}`}
        </h3>
        
        {/* Morning Routine */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#8b458b', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            ☀️ Morning Routine
          </h4>
          
          {[
            { key: 'cleanser', label: 'Gentle Cleanser', emoji: '🧼' },
            { key: 'moisturizer', label: 'Moisturizer', emoji: '💧' },
            { key: 'spf', label: 'SPF Protection', emoji: '☀️' }
          ].map(step => (
            <div key={step.key} style={{ display: 'flex', alignItems: 'center', margin: '12px 0', padding: '12px', background: '#f8f4ff', borderRadius: '12px' }}>
              <button
                onClick={() => updateDayProgress(selectedDay, `morning.${step.key}`, !selectedDayData.morning[step.key as keyof typeof selectedDayData.morning])}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  background: selectedDayData.morning[step.key as keyof typeof selectedDayData.morning] ? '#8b458b' : '#e8d5e8',
                  color: 'white',
                  cursor: 'pointer',
                  marginRight: '12px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease'
                }}
              >
                {selectedDayData.morning[step.key as keyof typeof selectedDayData.morning] ? '✓' : ''}
              </button>
              <span style={{ fontSize: '16px', marginRight: '8px' }}>{step.emoji}</span>
              <span style={{ fontSize: '15px', fontWeight: '500', color: '#2d1b3d' }}>{step.label}</span>
            </div>
          ))}
        </div>

        {/* Evening Routine */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#8b458b', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            🌙 Evening Routine
          </h4>
          
          {[
            { key: 'cleanser', label: 'Double Cleanse', emoji: '🧼' },
            { key: 'moisturizer', label: 'Night Moisturizer', emoji: '🌙' }
          ].map(step => (
            <div key={step.key} style={{ display: 'flex', alignItems: 'center', margin: '12px 0', padding: '12px', background: '#f8f4ff', borderRadius: '12px' }}>
              <button
                onClick={() => updateDayProgress(selectedDay, `evening.${step.key}`, !selectedDayData.evening[step.key as keyof typeof selectedDayData.evening])}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  background: selectedDayData.evening[step.key as keyof typeof selectedDayData.evening] ? '#8b458b' : '#e8d5e8',
                  color: 'white',
                  cursor: 'pointer',
                  marginRight: '12px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease'
                }}
              >
                {selectedDayData.evening[step.key as keyof typeof selectedDayData.evening] ? '✓' : ''}
              </button>
              <span style={{ fontSize: '16px', marginRight: '8px' }}>{step.emoji}</span>
              <span style={{ fontSize: '15px', fontWeight: '500', color: '#2d1b3d' }}>{step.label}</span>
            </div>
          ))}
        </div>

        {/* Skin Feeling */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d', marginBottom: '12px' }}>
            How's your skin feeling? 😊
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            {[
              { emoji: '😍', label: 'Amazing', value: 'amazing' },
              { emoji: '😊', label: 'Good', value: 'good' },
              { emoji: '😐', label: 'Okay', value: 'okay' },
              { emoji: '😔', label: 'Not Great', value: 'bad' }
            ].map(feeling => (
              <button
                key={feeling.value}
                onClick={() => updateDayProgress(selectedDay, 'skinFeeling', feeling.value)}
                style={{
                  flex: 1,
                  padding: '12px 8px',
                  border: selectedDayData.skinFeeling === feeling.value ? '2px solid #8b458b' : '1px solid #e8d5e8',
                  borderRadius: '12px',
                  background: selectedDayData.skinFeeling === feeling.value ? 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)' : 'white',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{feeling.emoji}</div>
                <div style={{ fontSize: '12px', fontWeight: '500', color: '#666' }}>{feeling.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d', marginBottom: '8px' }}>
            Daily Notes 📝
          </h4>
          <textarea
            value={selectedDayData.notes}
            onChange={(e) => updateDayProgress(selectedDay, 'notes', e.target.value)}
            placeholder="Any observations about your skin today?"
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '12px',
              border: '1px solid #e8d5e8',
              borderRadius: '12px',
              fontSize: '14px',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {/* Motivational Section */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #f8f4ff 0%, #fff5f8 100%)', textAlign: 'center' }}>
        <div className="emoji-medium">🎯</div>
        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2d1b3d', margin: '8px 0' }}>
          {stats.completion >= 80 ? 'You\'re crushing it! 🔥' : 'Keep going, you\'ve got this! 💪'}
        </h4>
        <p style={{ fontSize: '14px', color: '#666', margin: '8px 0' }}>
          {stats.completion >= 80 
            ? 'Your consistency is paying off. Glowing skin is just around the corner!'
            : 'Small steps lead to big changes. Your future self will thank you!'
          }
        </p>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: '12px', margin: '20px 0' }}>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/passport')}
          style={{ flex: 1 }}
        >
          View Skin Passport 📋
        </button>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/results')}
          style={{ flex: 1 }}
        >
          My Routine 🧴
        </button>
      </div>
    </div>
  );
};