
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

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
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
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
          className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          placeholder="Enter your email"
        />
      </div>
      <div className="mt-3 sm:mt-0 sm:ml-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="block w-full rounded-md bg-carte-300 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-carte-400 focus:ring-2 focus:ring-carte-300 focus:ring-offset-2 focus:outline-none transition-colors duration-300 disabled:opacity-70"
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
            'Subscribe'
          )}
        </button>
      </div>
    </form>
  );
};

export default NewsletterForm;
