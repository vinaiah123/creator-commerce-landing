
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useIntersectionObserver } from '@/lib/animations';
import { HelpCircle, MessageCircle, CreditCard, DollarSign, Calendar, BarChart, ArrowUpDown, RefreshCw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const PricingFAQ = () => {
  // Set a lower threshold to trigger visibility earlier
  const { elementRef, isVisible } = useIntersectionObserver({ 
    threshold: 0.05,
    rootMargin: '100px' 
  });
  const isMobile = useIsMobile();

  const faqItems = [
    {
      question: "What is the difference between the free plan and subscription plans?",
      answer: "The free plan charges a 5% transaction fee on each sale, with no monthly cost. Our subscription plans eliminate all transaction fees completely, instead charging a fixed monthly fee starting at $12/month. This is ideal for creators with consistent sales volume who want predictable costs.",
      icon: <ArrowUpDown className="mr-2 h-5 w-5 text-cartePink" />
    },
    {
      question: "Are there any payment processing fees in addition to Carte's fees?",
      answer: "Yes, payment processors (such as Stripe or PayPal) charge their own fees (typically 2.9% + $0.30 per transaction) separate from Carte's fees. These processing fees apply to all plans, including our subscription tiers, as they are charged by the payment processors directly and not by Carte.",
      icon: <CreditCard className="mr-2 h-5 w-5 text-cartePink" />
    },
    {
      question: "When are the 5% transaction fees collected?",
      answer: "For users on our free plan, the 5% transaction fees are calculated based on your monthly sales and billed at the end of each month. You must pay these fees to continue using the platform. We'll send you an invoice with all the details before processing the payment.",
      icon: <Calendar className="mr-2 h-5 w-5 text-cartePink" />
    },
    {
      question: "How do I switch between the free plan and a subscription?",
      answer: "You can switch between plans at any time from your account dashboard. If you upgrade mid-month to a subscription, we'll prorate your subscription fee and immediately stop charging transaction fees on new sales. If you downgrade to the free plan, changes will take effect at the start of your next billing cycle.",
      icon: <RefreshCw className="mr-2 h-5 w-5 text-cartePink" />
    },
    {
      question: "What happens if I don't pay my transaction fees at the end of the month?",
      answer: "If your transaction fees aren't paid within 7 days of the invoice date, your store functionalities may be limited until payment is completed. After 30 days of non-payment, your account may be suspended. We send multiple reminders before taking any action, and our support team is always available to discuss payment arrangements if needed.",
      icon: <DollarSign className="mr-2 h-5 w-5 text-cartePink" />
    },
    {
      question: "Can I get a refund for my subscription?",
      answer: "We offer a 14-day refund policy for new subscribers. If you're not satisfied with our service, contact our support team within 14 days of your first subscription payment. For ongoing subscriptions, we don't provide refunds for partial months if you cancel mid-cycle, but you'll maintain access until the end of your current billing period.",
      icon: <BarChart className="mr-2 h-5 w-5 text-cartePink" />
    },
  ];

  return (
    <section id="pricingFaq" className="py-16 bg-carteBackground/50 relative" ref={elementRef as React.RefObject<HTMLDivElement>}>
      {/* Creator images in creative positions */}
      <div className="absolute -top-10 left-[10%] z-10 hidden md:block">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-carteYellow/20 to-carteYellow/5 rounded-full blur-lg"></div>
          <img 
            src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=150&auto=format" 
            alt="Creator" 
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
          />
        </div>
      </div>
      
      <div className="absolute top-1/4 right-[5%] z-10 hidden md:block">
        <img 
          src="https://images.unsplash.com/photo-1589911057671-755493e5f1d5?q=80&w=150&auto=format" 
          alt="Creator" 
          className="w-20 h-20 rounded-[30%] object-cover border-2 border-white shadow-md"
        />
      </div>
      
      <div className="absolute bottom-20 left-[15%] z-10 hidden md:block">
        <img 
          src="https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=150&auto=format" 
          alt="Creator" 
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
        />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`text-center mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Pricing FAQs</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have questions about our pricing? Here are answers to commonly asked questions about plans, fees, and billing.
          </p>
        </div>

        {/* FAQ content will always be visible */}
        <div className="grid grid-cols-1 gap-8 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 -left-16 w-32 h-32 bg-carteYellow/10 rounded-full filter blur-xl animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-20 -right-16 w-40 h-40 bg-cartePink/10 rounded-full filter blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-0 w-24 h-24 bg-carteYellow/20 rounded-full filter blur-lg animate-float" style={{ animationDelay: '0.5s' }}></div>
          
          {/* FAQ Accordion - Always visible */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-carteYellow/20 overflow-hidden">
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              {faqItems.map((item, i) => (
                <AccordionItem value={`item-${i}`} key={i} className="border-b border-carteYellow/20 last:border-0">
                  <AccordionTrigger className="py-6 px-6 hover:bg-carteYellow/5 hover:no-underline text-left font-medium">
                    <div className="flex items-center text-gray-800">
                      {item.icon}
                      <span>{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2 text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Support CTA section with creator images */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-cartePink/90 to-carteYellow/90 rounded-2xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Creative blob shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-[10%] left-[5%] w-40 h-40 rounded-full bg-white"></div>
              <div className="absolute bottom-[20%] right-[15%] w-32 h-32 rounded-full bg-white"></div>
            </div>
            
            {/* Mini creator image collage */}
            <div className="absolute bottom-0 right-0 w-32 h-32 overflow-hidden md:flex hidden">
              <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1535468850893-d6e543fbd7f5?q=80&w=100&auto=format" alt="Creator" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-12 right-14 w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?q=80&w=100&auto=format" alt="Creator" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-20 right-10 w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=100&auto=format" alt="Creator" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="flex items-start space-x-4 max-w-xl">
              <HelpCircle className="h-8 w-8 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-bold text-xl mb-2">Still have questions about pricing?</h3>
                <p className="text-white/90">Our support team is ready to help you choose the right plan for your business and answer any billing questions you might have.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a 
                href="#" 
                className="kawaii-button bg-white text-cartePink hover:bg-gray-100 flex justify-center items-center gap-2 w-full md:w-auto"
              >
                <span>View Pricing Details</span>
              </a>
              <a 
                href="#" 
                className="kawaii-button bg-carteBlue text-white hover:bg-carteBlue/90 flex justify-center items-center gap-2 w-full md:w-auto"
              >
                <span>Contact Billing Support</span>
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
