
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Sparkles } from 'lucide-react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      toast({
        title: "Yay! You're subscribed! ✨",
        description: "Thank you for joining our creative community!",
        duration: 5000,
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 sm:flex max-w-md mx-auto">
      <div className="min-w-0 flex-1">
        <label htmlFor="email" className="sr-only">Email address</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-full border-2 border-cartePink/30 px-5 py-3 text-gray-900 focus:border-cartePink focus:ring-cartePink placeholder:text-gray-400 sm:text-sm sm:leading-6 kawaii-shadow"
          placeholder="Enter your email"
        />
      </div>
      <div className="mt-3 sm:mt-0 sm:ml-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="block w-full rounded-full bg-cartePink kawaii-shadow px-5 py-3 text-sm font-bold text-white hover:bg-cartePink-600 focus:ring-2 focus:ring-cartePink focus:ring-offset-2 focus:outline-none transition-all duration-300 disabled:opacity-70 hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Sparkles size={16} className="mr-1.5" />
              Subscribe
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default NewsletterForm;
