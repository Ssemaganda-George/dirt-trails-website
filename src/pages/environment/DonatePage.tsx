import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, DollarSign, Mail, Loader2, User } from "lucide-react";

const DonatePage = () => {
  const [project, setProject] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSending, setIsSending] = useState(false);
  const [emailError, setEmailError] = useState('');

  const projects = [
    { value: 'wildlife-protection', label: 'Wildlife Protection Fund' },
    { value: 'reforestation', label: 'Reforestation Initiatives' },
    { value: 'community-conservation', label: 'Community Conservation Programs' },
    { value: 'anti-poaching', label: 'Anti-Poaching Efforts' },
  ];

  const companyAccount = {
    bankName: 'Stanbic Bank',
    accountNumber: '9030019297828',
    routingNumber: '098765432',
    accountName: 'Ssemaganda George',
    accountHolder: 'Dirt Trails Safaris Conservation Fund',
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!project) newErrors.project = 'Please select a project.';
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'Please enter a valid amount greater than 0.';
    if (!isAnonymous) {
      if (!name.trim()) newErrors.name = 'Please enter your name.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequest = async () => {
    if (!validateForm()) return;
    setIsSending(true);
    setEmailError('');
    
    if (isAnonymous) {
      // For anonymous donations, show details immediately without sending
      toast({
        title: 'Thank You',
        description: 'Thank you for your anonymous donation. Use the details below to complete your donation. Note: No email confirmation will be sent.',
        duration: 20000,
      });
      setShowDetails(true);
      setIsSending(false);
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('user_name', name);
      formData.append('user_email', email);
      formData.append('project', projects.find(p => p.value === project)?.label || '');
      formData.append('amount', amount);
      formData.append('_subject', 'Donation Bank Details Request');

      const response = await fetch('https://formspree.io/f/xpwjoknq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: 'Thank You',
          description: 'Thank you for your interest in donating to conservation. Use the details below to complete your donation, and we will send you a notification upon receiving the donation.',
          duration: 20000,
        });
        setShowDetails(true);
      } else {
        throw new Error('Failed to send request');
      }
    } catch (error) {
      setEmailError('Failed to send request. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to send request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Offset Your Carbon Footprint</h1>
          <p className="text-muted-foreground">
            Donate to conservation projects that directly reduce carbon emissions and protect wildlife.
          </p>
        </div>

        <Card>
          <CardHeader className="bg-green-50 rounded-t-lg">
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5 text-green-600" />
              Make a Donation
            </CardTitle>
            <CardDescription>
              Fill in the details below to request bank transfer information for your donation. You can choose to donate anonymously.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="project">Conservation Project</Label>
                <Select value={project} onValueChange={setProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.project && <p className="text-red-600 text-sm">{errors.project}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Donation Amount (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="pl-10"
                    min="1"
                  />
                </div>
                {errors.amount && <p className="text-red-600 text-sm">{errors.amount}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(!!checked)}
                />
                <Label htmlFor="anonymous" className="text-sm">Donate Anonymously (no name or email required)</Label>
              </div>
              {!isAnonymous && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Donor's Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="pl-10"
                      />
                    </div>
                    {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="pl-10"
                      />
                    </div>
                    {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                  </div>
                </>
              )}
            </div>
            {showDetails && (
              <div className="grid gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Bank Transfer Details:</h4>
                  <p><strong>Bank Name:</strong> {companyAccount.bankName}</p>
                  <p><strong>Account Number:</strong> {companyAccount.accountNumber}</p>
                  <p><strong>Account Name:</strong> {companyAccount.accountName}</p>
                  <p><strong>Account Holder:</strong> {companyAccount.accountHolder}</p>
                </div>
                <p className="text-sm text-gray-600">
                  Please include your email ({email}) and project ({projects.find(p => p.value === project)?.label}) in the transfer notes for reference.
                </p>
                {isAnonymous && (
                  <p className="text-sm text-red-600">
                    Note: You have chosen to donate anonymously. No email confirmation will be sent.
                  </p>
                )}
              </div>
            )}
          </CardContent>
          <CardContent className="pt-0">
            <Button
              onClick={handleRequest}
              className="w-full"
              disabled={isSending || showDetails || !project || !amount}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Requesting Details...
                </>
              ) : showDetails ? 'Details Requested' : 'Request Details'}
            </Button>
          </CardContent>
          {emailError && <p className="text-red-600 text-sm mt-2">{emailError}</p>}
        </Card>
      </div>
    </div>
  );
};

export default DonatePage;
