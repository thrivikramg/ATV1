import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Room from './pages/Room';

const generateRoomId = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const Home = () => {
    const navigate = useNavigate();
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [roomInput, setRoomInput] = useState('');
    
    const createNewRoom = () => {
      navigate(`/${generateRoomId()}`);
    };
    
    const joinRoom = () => {
      if (roomInput.trim()) {
        navigate(`/${roomInput.trim().toUpperCase()}`);
      }
    };

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem 1rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Hero Section */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '4rem',
          maxWidth: '700px'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 800,
            marginBottom: '1.5rem',
            background: darkMode 
              ? 'linear-gradient(90deg, #a78bfa, #60a5fa)' 
              : 'linear-gradient(90deg, #7e22ce, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}>
            Secure Team Communication
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: darkMode ? '#d1d5db' : '#4b5563',
            lineHeight: 1.6
          }}>
            Real-time encrypted chat rooms for teams. No accounts required.
          </p>
        </div>

        {/* 1x3 Feature Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '1000px',
          marginBottom: '4rem'
        }}>
          {[
            { 
              icon: '🔒', 
              title: 'End-to-End Encryption', 
              desc: 'Military-grade encryption for all messages' 
            },
            { 
              icon: '⚡', 
              title: 'Instant Messaging', 
              desc: 'Real-time delivery with no delays' 
            },
            { 
              icon: '🌐', 
              title: 'Cross-Platform', 
              desc: 'Works on all devices and browsers' 
            }
          ].map((feature, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '2rem 1.5rem',
              background: darkMode 
                ? 'rgba(30, 41, 59, 0.5)' 
                : 'rgba(249, 250, 251, 0.8)',
              borderRadius: '16px',
              border: darkMode 
                ? '1px solid rgba(255, 255, 255, 0.05)' 
                : '1px solid rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1.5rem',
                width: '70px',
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: darkMode 
                  ? 'rgba(96, 165, 250, 0.1)' 
                  : 'rgba(59, 130, 246, 0.1)',
                color: darkMode ? '#60a5fa' : '#3b82f6'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
                color: darkMode ? '#f3f4f6' : '#1f2937'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: darkMode ? '#9ca3af' : '#6b7280',
                lineHeight: 1.5
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            onClick={createNewRoom}
            style={{
              padding: '1rem 2.5rem',
              background: darkMode 
                ? 'linear-gradient(90deg, #7e22ce, #3b82f6)' 
                : 'linear-gradient(90deg, #6366f1, #3b82f6)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            Create New Room
          </button>
          <button
            onClick={() => setShowJoinModal(true)}
            style={{
              padding: '1rem 2.5rem',
              background: 'transparent',
              color: darkMode ? '#e5e7eb' : '#4b5563',
              border: darkMode 
                ? '1px solid rgba(255, 255, 255, 0.2)' 
                : '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              ':hover': {
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.03)'
              }
            }}
          >
            Join Existing Room
          </button>
        </div>

        {/* Join Modal */}
        {showJoinModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: darkMode ? '#1e293b' : '#ffffff',
              borderRadius: '16px',
              padding: '2.5rem',
              width: '90%',
              maxWidth: '450px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                marginBottom: '2rem',
                color: darkMode ? '#f3f4f6' : '#1f2937',
                textAlign: 'center'
              }}>
                Join a Room
              </h3>
              <div style={{ marginBottom: '2.5rem' }}>
                <input
                  type="text"
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value)}
                  placeholder="Enter room code"
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: darkMode 
                      ? '1px solid #334155' 
                      : '1px solid #e5e7eb',
                    background: darkMode 
                      ? 'rgba(15, 23, 42, 0.7)' 
                      : '#f9fafb',
                    color: darkMode ? '#f3f4f6' : '#1f2937',
                    fontSize: '1rem',
                    outline: 'none',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontWeight: 500
                  }}
                />
              </div>
              <div style={{
                display: 'flex',
                gap: '1.25rem',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => setShowJoinModal(false)}
                  style={{
                    padding: '0.9rem 1.75rem',
                    background: 'transparent',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    border: darkMode 
                      ? '1px solid #334155' 
                      : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                    ':hover': {
                      background: darkMode 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.03)'
                    }
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={joinRoom}
                  disabled={!roomInput.trim()}
                  style={{
                    padding: '0.9rem 1.75rem',
                    background: darkMode 
                      ? 'linear-gradient(90deg, #7e22ce, #3b82f6)' 
                      : 'linear-gradient(90deg, #6366f1, #3b82f6)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    opacity: roomInput.trim() ? 1 : 0.7,
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                    ':hover': roomInput.trim() ? {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'
                    } : {}
                  }}
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <BrowserRouter>
      <div style={{
        minHeight: '100vh',
        background: darkMode 
          ? 'linear-gradient(135deg, #0f172a, #1e293b)' 
          : 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
        color: darkMode ? '#e2e8f0' : '#1a202c',
        transition: 'background 0.5s ease'
      }}>
        <button 
          onClick={toggleTheme}
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            background: darkMode 
              ? 'rgba(30, 41, 59, 0.8)' 
              : 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            borderRadius: '12px',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            zIndex: 100,
            transition: 'all 0.3s ease',
            ':hover': {
              transform: 'scale(1.1)'
            }
          }}
          aria-label="Toggle theme"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:roomId" element={<Room darkMode={darkMode} />} />
        </Routes>

        <footer style={{
          textAlign: 'center',
          padding: '3rem 2rem 2rem',
          color: darkMode ? '#94a3b8' : '#6b7280',
          fontSize: '0.9rem',
          borderTop: darkMode 
            ? '1px solid rgba(255, 255, 255, 0.05)' 
            : '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          © {new Date().getFullYear()} T.A.S.K — Secure team communication
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;