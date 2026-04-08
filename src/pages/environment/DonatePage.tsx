import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DonatePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-400">Support Sustainability</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Donate to Support Travel Conservation and Community Impact</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Your contribution helps fund tree planting, community projects, and technology for sustainable tourism operations.
          </p>
        </div>

        <Card className="border border-slate-200 bg-white/90 shadow-lg">
          <CardHeader>
            <CardTitle>Help offset the impact of travel</CardTitle>
            <CardDescription>
              Choose a donation option that aligns with your sustainability goals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Tree Planting & Community Support</h2>
              <p className="mt-3 text-slate-600">
                Funding reforestation and local community programs helps preserve the destinations travelers love while supporting long-term conservation.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Small gift</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">$25</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Supports seedling planting and monitoring in one community.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Impact gift</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">$75</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Helps plant trees and support local ecotourism training programs.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')} className="w-full sm:w-auto">
                Contact Us to Donate
              </Button>
              <Button variant="secondary" onClick={() => navigate('/environment/tree-planting')} className="w-full sm:w-auto">
                Learn More About Tree Planting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonatePage;
