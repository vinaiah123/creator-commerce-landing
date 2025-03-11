import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Sparkles } from 'lucide-react';
const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
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
        duration: 5000
      });
    }, 1000);
  };
  return <form onSubmit={handleSubmit} className="mt-6 sm:flex max-w-md mx-auto">
      <div className="min-w-0 flex-1">
        <label htmlFor="email" className="sr-only">Email address</label>
        
      </div>
      <div className="mt-3 sm:mt-0 sm:ml-3">
        
      </div>
    </form>;
};
export default NewsletterForm;