import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart, Mail, User, Phone } from "lucide-react";
import { toast } from "sonner";

/**
 * DESIGN PHILOSOPHY: Cinematic Minimalism with Golden Accents
 * - Form fields use dark backgrounds with golden accents for consistency
 * - Clean, minimal design with generous spacing
 * - Smooth animations on focus and submission
 */

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  travelDates: {
    startDate: string;
    endDate: string;
  };
  groupSize: number;
  interests: string[];
  message: string;
}

const interestOptions = [
  "Cultural Heritage",
  "Nature & Wildlife",
  "Beach & Relaxation",
  "Adventure & Hiking",
  "Photography",
  "Local Cuisine",
  "Spiritual Sites",
  "Tea Plantations",
];

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    travelDates: {
      startDate: "",
      endDate: "",
    },
    groupSize: 1,
    interests: [],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "startDate" || name === "endDate") {
      setFormData((prev) => ({
        ...prev,
        travelDates: {
          ...prev.travelDates,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleGroupSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setFormData((prev) => ({
      ...prev,
      groupSize: value,
    }));
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.travelDates.startDate) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission (in production, this would send to a backend)
    try {
      // Create a formatted message for display
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      // Log the data (in production, send to backend)
      console.log("Booking form submitted:", submissionData);

      // Show success message
      toast.success("Booking inquiry submitted! We'll contact you within 24 hours.");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        travelDates: {
          startDate: "",
          endDate: "",
        },
        groupSize: 1,
        interests: [],
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-8"
    >
      {/* Personal Information Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xl font-semibold text-accent">Your Information</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Full Name */}
          <motion.div variants={itemVariants} className="relative">
            <label className="block text-sm font-medium text-muted mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-accent/50" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 bg-secondary border border-border text-foreground placeholder-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                required
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants} className="relative">
            <label className="block text-sm font-medium text-muted mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-accent/50" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full pl-12 pr-4 py-3 bg-secondary border border-border text-foreground placeholder-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                required
              />
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div variants={itemVariants} className="relative">
            <label className="block text-sm font-medium text-muted mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 w-5 h-5 text-accent/50" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="w-full pl-12 pr-4 py-3 bg-secondary border border-border text-foreground placeholder-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
          </motion.div>

          {/* Group Size */}
          <motion.div variants={itemVariants} className="relative">
            <label className="block text-sm font-medium text-muted mb-2">
              Group Size
            </label>
            <div className="relative">
              <Users className="absolute left-4 top-3.5 w-5 h-5 text-accent/50" />
              <input
                type="number"
                name="groupSize"
                value={formData.groupSize}
                onChange={handleGroupSizeChange}
                min="1"
                max="50"
                className="w-full pl-12 pr-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Travel Dates Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xl font-semibold text-accent">Travel Dates</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Start Date */}
          <motion.div variants={itemVariants} className="relative">
            <label className="block text-sm font-medium text-muted mb-2">
              Start Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-accent/50" />
              <input
                type="date"
                name="startDate"
                value={formData.travelDates.startDate}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                required
              />
            </div>
          </motion.div>

          {/* End Date */}
          <motion.div variants={itemVariants} className="relative">
            <label className="block text-sm font-medium text-muted mb-2">
              End Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-accent/50" />
              <input
                type="date"
                name="endDate"
                value={formData.travelDates.endDate}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Interests Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xl font-semibold text-accent">Your Interests</h3>
        <p className="text-sm text-muted">Select all that apply</p>

        <div className="grid md:grid-cols-2 gap-3">
          {interestOptions.map((interest) => (
            <motion.button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 text-left border transition-all ${
                formData.interests.includes(interest)
                  ? "bg-accent border-accent text-accent-foreground"
                  : "bg-secondary border-border text-foreground hover:border-accent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart
                  className={`w-4 h-4 ${
                    formData.interests.includes(interest) ? "fill-current" : ""
                  }`}
                />
                <span className="text-sm font-medium">{interest}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Message Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xl font-semibold text-accent">Additional Message</h3>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Tell us about your dream itinerary, special requests, or any questions..."
          rows={5}
          className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Booking Inquiry"}
        </Button>
        <p className="text-sm text-muted self-center">
          We'll respond within 24 hours
        </p>
      </motion.div>
    </motion.form>
  );
}
