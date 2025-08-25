import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Calendar, User, MapPin, Mail, Phone, Clock, Download, Share2, Printer, AlertTriangle, CreditCard, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserData { 
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelers: string;
  travelDate: string;
  specialRequests: string;
}

interface Tour {
  name: string;
  duration: number;
  price: number;
  location?: string;
}

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<{
    userData: UserData;
    tour: Tour;
    totalPrice: number;
    paidAmount: number;
    paymentType: 'deposit' | 'full';
    remainingBalance: number;
    paymentMethod: string;
  } | null>(null);

  // Generate booking reference
  const bookingReference = `DT${Math.floor(Math.random() * 9000) + 1000}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  
  useEffect(() => {
    // Get the real user data from navigation state
    const stateData = location.state;
    
    if (stateData && stateData.userData && stateData.tour) {
      // Calculate proper values based on payment type
      const totalPrice = stateData.totalPrice || stateData.tour.price;
      const paymentType = stateData.paymentType || 'deposit';
      
      // Fix the remaining balance calculation
      let paidAmount: number;
      let remainingBalance: number;
      
      if (paymentType === 'full') {
        paidAmount = totalPrice;
        remainingBalance = 0;
      } else {
        // For deposit payments, calculate 20% of total price
        paidAmount = stateData.paidAmount || Math.round(totalPrice * 0.2);
        remainingBalance = totalPrice - paidAmount;
      }
      
      setBookingData({
        userData: stateData.userData,
        tour: stateData.tour,
        totalPrice: totalPrice,
        paidAmount: paidAmount,
        paymentType: paymentType,
        remainingBalance: remainingBalance,
        paymentMethod: stateData.paymentMethod || 'card'
      });
    } else {
      // Fallback - if no data available, redirect back to home or show error
      console.warn('No booking data found in navigation state');
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [location.state, navigate]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Calculate end date based on duration
  const getEndDate = (startDate: string, duration: number) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + duration - 1);
    return end.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Download confirmation as PDF
  const handleDownloadConfirmation = async () => {
    if (!bookingData) return;

    try {
      // Dynamically import jsPDF
      const { jsPDF } = await import('jspdf');
      
      const { userData, tour, totalPrice, paidAmount, paymentType, remainingBalance } = bookingData;

      const doc = new jsPDF();
      
      // Set up colors and fonts
      const primaryColor = [22, 163, 74] as [number, number, number]; // Green
      const secondaryColor = [234, 88, 12] as [number, number, number]; // Orange
      const textColor = [51, 51, 51] as [number, number, number]; // Dark gray
      
      let yPosition = 20;
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      // Header
      doc.setFontSize(24);
      doc.setTextColor(...primaryColor);
      doc.text('DIRT TRAILS', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 10;
      doc.setFontSize(18);
      doc.text('Booking Confirmation', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;
      doc.setFontSize(12);
      doc.setTextColor(...textColor);
      doc.text(`Booking Reference: ${bookingReference}`, pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 8;
      doc.text('Status: CONFIRMED', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 8;
      doc.text(`Date Booked: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });

      // Add line separator
      yPosition += 15;
      doc.setDrawColor(...primaryColor);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 15;

      // Tour Information Section
      doc.setFontSize(14);
      doc.setTextColor(...secondaryColor);
      doc.text('TOUR INFORMATION', margin, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setTextColor(...textColor);
      const tourInfo = [
        `Tour Name: ${tour.name}`,
        `Location: ${tour.location || 'East Africa'}`,
        `Duration: ${tour.duration} days`,
        `Travel Dates: ${formatDate(userData.travelDate)} - ${getEndDate(userData.travelDate, tour.duration)}`,
        `Number of Travelers: ${userData.travelers} ${userData.travelers === '1' ? 'person' : 'people'}`
      ];

      tourInfo.forEach(info => {
        doc.text(info, margin, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Contact Information Section
      doc.setFontSize(14);
      doc.setTextColor(...secondaryColor);
      doc.text('CONTACT INFORMATION', margin, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setTextColor(...textColor);
      const contactInfo = [
        `Name: ${userData.firstName} ${userData.lastName}`,
        `Email: ${userData.email}`,
        `Phone: ${userData.phone}`
      ];

      if (userData.specialRequests) {
        contactInfo.push(`Special Requests: ${userData.specialRequests}`);
      }

      contactInfo.forEach(info => {
        // Handle long text wrapping
        const lines = doc.splitTextToSize(info, contentWidth);
        lines.forEach((line: string) => {
          doc.text(line, margin, yPosition);
          yPosition += 6;
        });
      });

      yPosition += 10;

      // Payment Summary Section
      doc.setFontSize(14);
      doc.setTextColor(...secondaryColor);
      doc.text('PAYMENT SUMMARY', margin, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setTextColor(...textColor);
      
      // Payment details with right alignment for amounts
      const paymentDetails = [
        { label: 'Total Trip Cost:', amount: `$${totalPrice.toLocaleString()}` },
        { 
          label: paymentType === 'full' ? 'Full Payment:' : 'Deposit Paid:', 
          amount: `$${paidAmount.toLocaleString()}`, 
          bold: true 
        },
        ...(paymentType === 'deposit' ? [{ 
          label: 'Remaining Balance:', 
          amount: `$${remainingBalance.toLocaleString()}` 
        }] : [])
      ];

      paymentDetails.forEach(detail => {
        if (detail.bold) {
          doc.setFont(undefined, 'bold');
        }
        doc.text(detail.label, margin, yPosition);
        doc.text(detail.amount, pageWidth - margin, yPosition, { align: 'right' });
        if (detail.bold) {
          doc.setFont(undefined, 'normal');
        }
        yPosition += 6;
      });

      if (paymentType === 'deposit') {
        yPosition += 5;
        doc.setFontSize(8);
        doc.text('Remaining balance is due 30 days before departure date.', margin, yPosition);
      } else {
        yPosition += 5;
        doc.setFontSize(8);
        doc.text('Full payment completed - no additional charges required.', margin, yPosition);
      }
      yPosition += 15;

      // Important Information Section
      doc.setFontSize(14);
      doc.setTextColor(...secondaryColor);
      doc.text('IMPORTANT INFORMATION', margin, yPosition);
      yPosition += 10;

      doc.setFontSize(9);
      doc.setTextColor(...textColor);
      const importantInfo = [
        '• Passport must be valid for at least 6 months from travel date',
        '• Visa may be required depending on nationality',
        '• Travel insurance highly recommended',
        ...(paymentType === 'deposit' ? ['• Final balance due 30 days before departure'] : []),
        '• Free cancellation up to 30 days before trip'
      ];

      importantInfo.forEach(info => {
        const lines = doc.splitTextToSize(info, contentWidth);
        lines.forEach((line: string) => {
          doc.text(line, margin, yPosition);
          yPosition += 5;
        });
      });

      yPosition += 10;

      // Next Steps Section
      doc.setFontSize(14);
      doc.setTextColor(...secondaryColor);
      doc.text('NEXT STEPS', margin, yPosition);
      yPosition += 10;

      doc.setFontSize(9);
      doc.setTextColor(...textColor);
      const nextSteps = [
        '1. Confirmation email will arrive within 15 minutes',
        '2. Our team will contact you within 48 hours for travel documents',
        ...(paymentType === 'deposit' ? ['3. Payment reminder 35 days before departure'] : []),
        `${paymentType === 'deposit' ? '4' : '3'}. Pre-trip briefing 7 days before departure`
      ];

      nextSteps.forEach(step => {
        doc.text(step, margin, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Contact Support Section
      doc.setFontSize(14);
      doc.setTextColor(...secondaryColor);
      doc.text('CONTACT SUPPORT', margin, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setTextColor(...textColor);
      doc.text('Email: support@dirttrails.com', margin, yPosition);
      yPosition += 6;
      doc.text('Phone: +256 567-8900', margin, yPosition);

      // Footer
      yPosition = doc.internal.pageSize.height - 30;
      doc.setFontSize(12);
      doc.setTextColor(...primaryColor);
      doc.text('Thank you for choosing DIRT TRAILS!', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 8;
      doc.setFontSize(8);
      doc.setTextColor(...textColor);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: 'center' });

      // Save the PDF
      doc.save(`Booking-Confirmation-${bookingReference}.pdf`);

      // Show success message
      alert('Booking confirmation PDF downloaded successfully!');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again or contact support.');
    }
  };

  if (!bookingData) {
    return (
      <div className="py-12 text-center">
        <div className="container max-w-2xl mx-auto">
          <AlertTriangle className="mx-auto mb-4 text-orange-500" size={48} />
          <h1 className="text-2xl font-bold mb-4">Booking Data Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find your booking information. This might happen if you navigated directly to this page.
          </p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { userData, tour, totalPrice, paidAmount, paymentType, remainingBalance } = bookingData;

  return (
    <div className="py-12">
      <div className="container max-w-4xl mx-auto">
        {/* Confirmation Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {paymentType === 'full' ? 'Booking Confirmed!' : 'Booking Secured!'}
          </h1>
          <p className="text-lg text-gray-600">
            {paymentType === 'full' 
              ? 'Your East African safari adventure is fully paid and confirmed.'
              : 'Your East African safari adventure is secured with deposit payment.'
            }
          </p>
        </div>
        
        {/* Payment Status Banner */}
        <div className={`rounded-lg p-6 mb-8 ${
          paymentType === 'full' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {paymentType === 'full' ? (
                <CheckCircle className="text-green-600" size={24} />
              ) : (
                <CreditCard className="text-blue-600" size={24} />
              )}
              <div>
                <h3 className={`font-semibold ${
                  paymentType === 'full' ? 'text-green-800' : 'text-blue-800'
                }`}>
                  {paymentType === 'full' ? 'Payment Complete' : 'Deposit Paid'}
                </h3>
                <p className={`text-sm ${
                  paymentType === 'full' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {paymentType === 'full' 
                    ? 'No additional payments required'
                    : `Remaining balance: $${remainingBalance.toLocaleString()}`
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                ${paidAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                {paymentType === 'full' ? 'Total Paid' : 'Deposit Paid'}
              </p>
            </div>
          </div>
          
          {paymentType === 'deposit' && (
            <div className="mt-4 pt-4 border-t border-blue-200">
              <div className="flex items-center gap-2">
                <Clock className="text-blue-600" size={16} />
                <span className="text-sm text-blue-700">
                  Remaining balance of ${remainingBalance.toLocaleString()} due 30 days before departure
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-green-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Booking Details</h2>
              <span className="text-sm bg-white text-green-600 px-3 py-1 rounded-full">Confirmed</span>
            </div>
            <p className="mt-2">Booking Reference: <span className="font-mono font-bold">{bookingReference}</span></p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-orange-600 mb-4">Tour Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{tour.name}</p>
                      <p className="text-sm text-gray-600">{tour.location || 'East Africa'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Travel Dates</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(userData.travelDate)} - {getEndDate(userData.travelDate, tour.duration)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-gray-600">{tour.duration} days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="w-5 h-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Travelers</p>
                      <p className="text-sm text-gray-600">{userData.travelers} {userData.travelers === '1' ? 'person' : 'people'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-orange-600 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <User className="w-5 h-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-sm text-gray-600">{userData.firstName} {userData.lastName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-gray-600">{userData.phone}</p>
                    </div>
                  </div>
                  
                  {userData.specialRequests && (
                    <div className="mt-4">
                      <p className="font-medium text-gray-900 mb-1">Special Requests</p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                        {userData.specialRequests}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Summary */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gray-50 p-4 border-b">
            <h3 className="text-lg font-semibold">Payment Summary</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="font-medium">Total Trip Cost:</span>
                <span className="font-bold">${totalPrice.toLocaleString()}</span>
              </div>
              
              <div className={`p-4 rounded-lg ${
                paymentType === 'full' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-blue-50 border border-blue-200'
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    {paymentType === 'full' ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <DollarSign className="text-blue-600" size={20} />
                    )}
                    <span className="font-semibold">
                      {paymentType === 'full' ? 'Full Payment:' : 'Deposit Paid:'}
                    </span>
                  </div>
                  <span className={`font-bold text-xl ${
                    paymentType === 'full' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    ${paidAmount.toLocaleString()}
                  </span>
                </div>
                
                {paymentType === 'deposit' && (
                  <>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-blue-200">
                      <span className="font-medium">Remaining Balance:</span>
                      <span className="font-bold text-lg">${remainingBalance.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-2">
                      Due 30 days before departure date. We'll send payment reminders.
                    </p>
                  </>
                )}
                
                {paymentType === 'full' && (
                  <p className="text-sm text-green-700 mt-2">
                    ✓ Payment complete - no additional charges required
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-blue-50 p-4 border-b">
            <h3 className="text-lg font-semibold">What Happens Next?</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-medium">Confirmation Email</p>
                  <p className="text-sm text-gray-600">You'll receive a detailed confirmation email within 15 minutes with your booking details and important information.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <div>
                  <p className="font-medium">Travel Documents</p>
                  <p className="text-sm text-gray-600">Our team will contact you within 48 hours to assist with visa requirements, travel insurance, and packing lists.</p>
                </div>
              </div>
              
              {paymentType === 'deposit' && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Payment Reminder</p>
                    <p className="text-sm text-gray-600">35 days before departure, you'll receive payment instructions for the remaining balance of ${remainingBalance.toLocaleString()}.</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-blue-600">{paymentType === 'deposit' ? '4' : '3'}</span>
                </div>
                <div>
                  <p className="font-medium">Pre-Trip Briefing</p>
                  <p className="text-sm text-gray-600">7 days before departure, you'll receive final details including local contact information and day-by-day itinerary.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Important Information */}
        <div className={`border rounded-lg p-6 mb-8 ${
          paymentType === 'deposit' ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'
        }`}>
          <h3 className={`font-semibold mb-3 ${
            paymentType === 'deposit' ? 'text-amber-800' : 'text-green-800'
          }`}>
            Important Information
          </h3>
          <ul className={`space-y-2 text-sm ${
            paymentType === 'deposit' ? 'text-amber-700' : 'text-green-700'
          }`}>
            <li>• Please ensure your passport is valid for at least 6 months from your travel date</li>
            <li>• A visa may be required depending on your nationality - we'll help you with this process</li>
            <li>• Travel insurance is highly recommended and can be arranged through our partners</li>
            {paymentType === 'deposit' && (
              <li>• Final balance payment of ${remainingBalance.toLocaleString()} is due 30 days before departure</li>
            )}
            <li>• Free cancellation available up to 30 days before your trip</li>
          </ul>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleDownloadConfirmation}
          >
            <Download size={18} />
            Download PDF
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 size={18} />
            Share Booking
          </Button>
          
          <Button className="bg-green-600 hover:bg-green-700">
            View My Bookings
          </Button>
        </div>
        
        {/* Contact Support */}
        <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our travel experts are here to assist you with any questions about your booking.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:support@dirttrails.com" className="text-green-600 hover:underline">
              Email: support@dirttrails.com
            </a>
            <a href="tel:+25656789000" className="text-green-600 hover:underline">
              Phone: +256 567-8900
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;