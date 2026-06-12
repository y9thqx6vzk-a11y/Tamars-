import { useState } from 'react';
import { PartyPopper, CheckCircle2, Utensils, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MenuOption {
  id: string;
  title: string;
  description: string;
}

const MENU_OPTIONS: MenuOption[] = [
  {
    id: 'burger',
    title: 'המבורגרים',
    description: 'קציצת בקר איכותית בלחמניית בריוש, בצל מקורמל, מיונז ביתי, מוגש עם פלחי תפוחי אדמה אפויים או טבעות בצל.',
  },
  {
    id: 'schnitzel',
    title: 'שניצל ופירה',
    description: 'שניצל עוף דק ופריך בציפוי פנקו ושומשום, פירה קטיפתי, וסלט ירקות ישראלי קצוץ דק עם הרבה לימון.',
  },
  {
    id: 'pasta',
    title: 'פסטה שמנת פטריות',
    description: 'פסטה ברוטב שמנת עשיר עם פטריות שמפיניון ופורטובלו, מוגש עם לחם שום פריך וסלט ירוק עם תפוחי עץ ופקאנים.',
  },
  {
    id: 'ravioli',
    title: 'רביולי בשר',
    description: 'רביולי במילוי בשר ברוטב ראגו עשיר, מוגש עם פוקאצ\'ה חמה וסלט רוקט עם עגבניות שרי, צנוברים ובלסמי.',
  },
];

function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isWelcomeLeaving, setIsWelcomeLeaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleEnter = () => {
    setIsWelcomeLeaving(true);
    
    // Trigger fireworks immediately as the welcome screen starts to slide down
    setTimeout(() => {
      triggerFireworks();
    }, 200);

    // Remove welcome screen from DOM after transition finishes
    setTimeout(() => {
      setShowWelcome(false);
    }, 1000);
  };

  const triggerFireworks = () => {
    const duration = 6 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      // Launch confetti from the left and right sides
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 }
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 }
      });

      // Launch random firework-like bursts
      if (Math.random() < 0.25) {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.4 + 0.1 }
        });
      }

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true);
    }
  };

  const imgSrc = imgError 
    ? 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop' 
    : '/welcome.jpg';

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-rose-400/20 rounded-full blur-3xl"></div>
        
        <div className="bg-surface/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full transform transition-all duration-500 border border-white/20">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">הבחירה נשמרה!</h2>
          <p className="text-xl text-text-light flex items-center justify-center gap-2">
            מחכים לחגוג איתך <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      {/* Welcome Screen Overlay */}
      {showWelcome && (
        <div 
          className={`
            fixed inset-0 z-50 bg-neutral-950 flex flex-col items-center justify-center p-6
            transition-transform duration-1000 ease-in-out
            ${isWelcomeLeaving ? 'translate-y-full' : 'translate-y-0'}
          `}
        >
          {/* Backdrop decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 opacity-80 pointer-events-none"></div>
          
          <div className="flex flex-col items-center max-w-md w-full relative z-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8 leading-tight">
              מזל טוב על השחרור! 🪖✨
            </h1>
            
            {/* Polaroid Photo Frame */}
            <div className="bg-white p-4 pb-12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm w-full border border-gray-100">
              <div className="aspect-[4/5] bg-gray-950 overflow-hidden rounded-lg mb-4 relative shadow-inner">
                <img 
                  src={imgSrc} 
                  onError={() => setImgError(true)} 
                  alt="Welcome Release Celebration" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center font-medium text-2xl text-neutral-800 mt-2 select-none tracking-wide">
                אזרחית מודל 2026! 🎉
              </div>
            </div>

            <button
              onClick={handleEnter}
              className="mt-10 bg-primary hover:bg-primary-dark text-white text-xl font-bold py-4 px-12 rounded-full shadow-[0_8px_30px_rgb(244,63,94,0.4)] hover:shadow-[0_8px_40px_rgb(244,63,94,0.6)] transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              בואי נתחיל! 🥂
            </button>
          </div>
        </div>
      )}

      {/* Main App Content */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-4 pt-16 md:pt-24 relative z-10 max-w-5xl">
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-3xl mb-6 text-primary shadow-sm border border-primary/20">
            <PartyPopper className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text mb-6 tracking-tight leading-tight">
            מזל טוב על השחרור! <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">הגיע הזמן לחגוג</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-light flex items-center justify-center gap-3 font-medium">
            <Utensils className="w-6 h-6 text-primary/70" />
            בחרי את התפריט לארוחת השחרור שלנו:
          </p>
          <p className="text-sm md:text-base text-rose-500/80 font-medium mt-3 italic select-none">
            * אין האחראים אחראים על התוצאה שנבחרה והכל באחריות הבוחרת 😉
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {MENU_OPTIONS.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`
                group relative bg-surface p-6 md:p-8 rounded-3xl cursor-pointer transition-all duration-300
                border-2 overflow-hidden
                ${selectedOption === option.id 
                  ? 'border-primary shadow-xl shadow-primary/10 scale-[1.02]' 
                  : 'border-transparent shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-primary/30'
                }
              `}
            >
              {selectedOption === option.id && (
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              )}
              
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-3 transition-colors ${selectedOption === option.id ? 'text-primary' : 'text-text group-hover:text-primary/80'}`}>
                    {option.title}
                  </h3>
                  <p className="text-text-light leading-relaxed text-lg">
                    {option.description}
                  </p>
                </div>
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all mt-1
                  ${selectedOption === option.id 
                    ? 'border-primary bg-primary' 
                    : 'border-gray-300 bg-transparent group-hover:border-primary/50'
                  }
                `}>
                  {selectedOption === option.id && <CheckCircle2 className="w-5 h-5 text-white" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center sticky bottom-8 z-20">
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`
              inline-flex items-center justify-center px-8 py-4 text-xl font-bold rounded-full
              transition-all duration-300 
              ${selectedOption 
                ? 'bg-primary text-white hover:bg-primary-dark shadow-[0_8px_30px_rgb(244,63,94,0.3)] hover:shadow-[0_8px_40px_rgb(244,63,94,0.4)] hover:-translate-y-1 cursor-pointer scale-100' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none scale-95 opacity-80'
              }
            `}
          >
            זה התפריט שאני רוצה!
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
