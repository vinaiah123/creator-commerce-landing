
import { useIntersectionObserver } from '@/lib/animations';
import { Award, Check, X, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const FeatureRow = ({ 
  feature, 
  freemium, 
  starter, 
  growth, 
  pro, 
  tooltip 
}: { 
  feature: string; 
  freemium: React.ReactNode; 
  starter: React.ReactNode; 
  growth: React.ReactNode; 
  pro: React.ReactNode; 
  tooltip?: string 
}) => (
  <tr className="border-b border-gray-100">
    <td className="py-4 px-4 text-sm md:text-base text-gray-700 font-medium">
      <div className="flex items-center">
        {feature}
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle size={16} className="ml-2 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </td>
    <td className="py-4 px-4 text-center">{freemium}</td>
    <td className="py-4 px-4 text-center">{starter}</td>
    <td className="py-4 px-4 text-center">{growth}</td>
    <td className="py-4 px-4 text-center">{pro}</td>
  </tr>
);

const PricingComparison = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-20 bg-carteBackground" ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
            Compare Pricing Plans
          </h2>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
            Transparent pricing with all features clearly outlined. Choose the plan that best fits your business needs.
          </p>
        </div>

        <div className={`overflow-x-auto backdrop-blur-xl bg-white/50 rounded-3xl border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${isVisible ? 'animate-fade-in animation-delay-300' : 'opacity-0'}`}>
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-carteBackground-dark">
                <th className="py-6 px-4 text-left text-gray-700 font-bold">Feature</th>
                <th className="py-6 px-4 text-center text-gray-700 font-bold">
                  Freemium <br />
                  <span className="text-carteYellow font-medium">(5% fee)</span>
                </th>
                <th className="py-6 px-4 text-center text-gray-700 font-bold">
                  Starter <br />
                  <span className="text-carteYellow font-medium">($12/mo, 2.5% fee)</span>
                </th>
                <th className="py-6 px-4 text-center text-gray-700 font-bold">
                  Growth <br />
                  <span className="text-carteYellow font-medium">($29/mo, 1% fee)</span>
                </th>
                <th className="py-6 px-4 text-center text-gray-700 font-bold">
                  Pro <br />
                  <span className="text-carteYellow font-medium">($199/mo, 0% fee)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <FeatureRow 
                feature="Transaction-Free Sales" 
                freemium="$100 (one-time)" 
                starter="$200/month" 
                growth="$2,000/month" 
                pro={<span className="font-bold text-carteYellow">No % fees</span>}
                tooltip="The amount of sales you can process without paying transaction fees beyond your monthly subscription."
              />
              <FeatureRow 
                feature="Transaction Fee Beyond Free Limit" 
                freemium="5%" 
                starter="2.5%" 
                growth="1%" 
                pro="0%"
                tooltip="The percentage fee charged on sales exceeding your free transaction limit."
              />
              <FeatureRow 
                feature="Unlimited Products" 
                freemium={<Check size={20} className="mx-auto text-green-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Link in Bio Storefront" 
                freemium={<Check size={20} className="mx-auto text-green-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Basic Theming" 
                freemium={<Check size={20} className="mx-auto text-green-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Advanced Storefront Theming" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
                tooltip="Customize your storefront with advanced theming options, including CSS customization and premium themes."
              />
              <FeatureRow 
                feature="Coupons & Discounts" 
                freemium={<Check size={20} className="mx-auto text-green-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Multiple Payment Gateways" 
                freemium={<Check size={20} className="mx-auto text-green-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
                tooltip="Accept payments via PayPal, Stripe, Bank Transfer. Cash on Delivery available for subscription plans only."
              />
              <FeatureRow 
                feature="Self-Collection & Delivery Options" 
                freemium={<Check size={20} className="mx-auto text-green-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Delivery Scheduling" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Custom Order Forms (Per Product)" 
                freemium={<Check size={20} className="mx-auto text-green-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Product Categories, Attributes, & Tags" 
                freemium={<Check size={20} className="mx-auto text-green-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Inventory Management" 
                freemium={<Check size={20} className="mx-auto text-green-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Webhooks & Basic API Access" 
                freemium={<Check size={20} className="mx-auto text-green-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Scheduled Product Releases" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Product FAQ Plugin" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Digital Products (Coming Soon)" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Affiliate Module (Coming Soon)" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<X size={20} className="mx-auto text-red-500" />} 
                growth={<span className="text-sm">✅ (5% affiliate fee)</span>} 
                pro={<span className="text-sm">✅ (5% affiliate fee)</span>} 
                tooltip="Enable affiliates to promote your products and earn commissions."
              />
              <FeatureRow 
                feature="Priority Payout Processing" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<X size={20} className="mx-auto text-red-500" />} 
                growth={<span className="text-sm">✅ (2 days)</span>} 
                pro={<span className="text-sm">✅ (2 days)</span>} 
                tooltip="Receive your funds in 2 days instead of the standard 5 days."
              />
              <FeatureRow 
                feature="Advanced Inventory & Product Filters" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<X size={20} className="mx-auto text-red-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Duplicate Orders & Automation Tools" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<X size={20} className="mx-auto text-red-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Team Members" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<X size={20} className="mx-auto text-red-500" />} 
                growth={<span className="font-medium">3</span>} 
                pro={<span className="font-medium">15</span>} 
              />
              <FeatureRow 
                feature="Multi-Store Functionality" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<X size={20} className="mx-auto text-red-500" />} 
                growth={<X size={20} className="mx-auto text-red-500" />} 
                pro={<span className="text-sm">Up to 5 Stores<br />(+$50/store)</span>} 
              />
              <FeatureRow 
                feature="Advanced Analytics & Reporting" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<X size={20} className="mx-auto text-red-500" />} 
                growth={<X size={20} className="mx-auto text-red-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Full API Access & Custom Integrations" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<X size={20} className="mx-auto text-red-500" />} 
                growth={<X size={20} className="mx-auto text-red-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Premium Support (Priority Chat & Email)" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<X size={20} className="mx-auto text-red-500" />} 
                growth={<X size={20} className="mx-auto text-red-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />} 
              />
              <FeatureRow 
                feature="Add Tips to Orders" 
                freemium={<X size={20} className="mx-auto text-red-500" />} 
                starter={<Check size={20} className="mx-auto text-green-500" />} 
                growth={<Check size={20} className="mx-auto text-green-500" />} 
                pro={<Check size={20} className="mx-auto text-green-500" />}
                tooltip="Allow customers to add tips to their orders."
              />
            </tbody>
            <tfoot>
              <tr className="bg-carteYellow/10">
                <td className="py-6 px-4 text-left text-gray-900 font-bold">Recommended For:</td>
                <td className="py-6 px-4 text-center text-gray-700">Just starting out</td>
                <td className="py-6 px-4 text-center text-gray-700">Growing businesses</td>
                <td className="py-6 px-4 text-center text-gray-700">Established sellers</td>
                <td className="py-6 px-4 text-center text-gray-700">Power sellers</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className={`mt-8 text-center text-gray-500 italic ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
          *All plans include standard payment processing fees from Stripe/PayPal (typically 2.9% + $0.30 per transaction)
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
