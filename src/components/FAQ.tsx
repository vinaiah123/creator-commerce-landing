
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useIntersectionObserver } from '@/lib/animations';
import { HelpCircle, MessageCircle, CreditCard, Package, ShoppingBag, BarChart, Heart, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const FAQ = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const isMobile = useIsMobile();

  const faqItems = [
    {
      question: "How do I set up my Carte store?",
      answer: "Setting up your Carte store is easy! Sign up for an account, choose a template, customize your branding, add your products, connect your payment methods, and launch. Our guided setup process takes less than 15 minutes to complete.",
      icon: <ShoppingBag className="mr-2 h-5 w-5 text-cartePink" />
    },
    {
      question: "What fees does Carte charge?",
      answer: "Carte offers tiered pricing plans starting from free. Our standard plan is just 5% per transaction plus a small processing fee. We don't charge any monthly fees on our starter plan, so you only pay when you make sales. View our pricing page for detailed information on features included in each plan.",
      icon: <CreditCard className="mr-2 h-5 w-5 text-cartePink" />
    },
    {
      question: "How do I process payments and handle shipping?",
      answer: "Carte integrates with popular payment processors like Stripe and PayPal. For shipping, you can set your own rates or use our integrated shipping calculator. We automatically generate shipping labels and provide order tracking for you and your customers.",
      icon: <Package className="mr-2 h-5 w-5 text-cartePink" />
    },
    {
      question: "Can I customize the look of my store?",
      answer: "Absolutely! Carte offers customizable templates, allowing you to match your store's look to your brand. You can customize colors, fonts, layouts, and more without any coding knowledge. For more advanced customizations, we also offer CSS and HTML editing capabilities.",
      icon: <Heart className="mr-2 h-5 w-5 text-cartePink" />
    },
    {
      question: "How does Carte help me market my products?",
      answer: "Carte includes built-in SEO tools, social media integration, and email marketing features. We also provide analytics to track visitor behavior and sales performance, helping you optimize your marketing strategy to reach more customers.",
      icon: <BarChart className="mr-2 h-5 w-5 text-cartePink" />
    },
    {
      question: "What kind of support does Carte offer?",
      answer: "We provide 24/7 customer support through chat, email, and our comprehensive knowledge base. Our Premium and Business plans include dedicated support representatives to help you grow your business. We also have an active community forum where you can connect with other sellers.",
      icon: <MessageCircle className="mr-2 h-5 w-5 text-cartePink" />
    },
  ];

  return (
    <section id="faq" className="py-16 bg-carteBackground/50" ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`text-center mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Got questions about Carte? We've got answers! Here are some common questions our creators ask.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 -left-16 w-32 h-32 bg-carteYellow/10 rounded-full filter blur-xl animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-20 -right-16 w-40 h-40 bg-cartePink/10 rounded-full filter blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-0 w-24 h-24 bg-carteYellow/20 rounded-full filter blur-lg animate-float" style={{ animationDelay: '0.5s' }}></div>
          
          {/* FAQ Accordion */}
          <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-carteYellow/20 overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Accordion type="single" collapsible className="w-full">
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

        {/* Redesigned CTA section - replaces the floating help bubble */}
        <div className={`mt-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-cartePink/90 to-carteYellow/90 rounded-2xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start space-x-4 max-w-xl">
              <HelpCircle className="h-8 w-8 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-bold text-xl mb-2">Still have questions?</h3>
                <p className="text-white/90">Our help center has comprehensive documentation and guides to help you get started and make the most of Carte.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a 
                href="#" 
                className="kawaii-button bg-white text-cartePink hover:bg-gray-100 flex justify-center items-center gap-2 w-full md:w-auto"
              >
                <span>Browse Help Docs</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="kawaii-button bg-carteBlue text-white hover:bg-carteBlue/90 flex justify-center items-center gap-2 w-full md:w-auto"
              >
                <span>Contact Support</span>
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
