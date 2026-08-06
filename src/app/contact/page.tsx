'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Clock, Star, Mail, CheckCircle2 } from 'lucide-react';
import { Input as CustomInput } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Must be a valid email address.' }),
  company: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  rating: z.number().min(1).max(5),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const schedulerDays = [
  { id: '10', label: 'Mon, Aug 10', date: 'Aug 10, 2026' },
  { id: '11', label: 'Tue, Aug 11', date: 'Aug 11, 2026' },
  { id: '12', label: 'Wed, Aug 12', date: 'Aug 12, 2026' },
];

const schedulerTimes = ['10:00 AM', '2:00 PM', '4:30 PM'];

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState('');
  const [hoverRating, setHoverRating] = React.useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const ratingVal = watch('rating');

  // Pre-fill message field if a meeting is booked
  React.useEffect(() => {
    if (selectedDay && selectedTime) {
      const selectedDayObj = schedulerDays.find((d) => d.id === selectedDay);
      if (selectedDayObj) {
        setValue(
          'message',
          `Hi, I'd like to schedule a call on ${selectedDayObj.date} at ${selectedTime}. Let's chat!`
        );
      }
    }
  }, [selectedDay, selectedTime, setValue]);

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success('Inquiry logged successfully! Telemetry parsed and database updated.');
      } else {
        toast.error('Submission failed. Please check input requirements and try again.');
      }
    } catch (err) {
      console.error('Failed to submit contact form', err);
      toast.error('Network latency or timeout detected. Check database client connection.');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
        <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 w-fit mx-auto border border-emerald-500/20">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Message Dispatched</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your telemetry has been successfully parsed and saved into the database. I will get back to you shortly!
          </p>
        </div>
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="border-border rounded-lg cursor-pointer h-9 px-4 text-xs font-semibold"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 w-full">
      <section className="max-w-3xl space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
            Initiate Engagement
          </h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Submit an inquiry, book a meeting, or rate your experience with this recruiter customized portfolio.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-border">
        {/* Contact Form (col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Contact & Feedback Log
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="name-input" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Your Name
                </label>
                <CustomInput
                  id="name-input"
                  placeholder="e.g. Jane Doe"
                  {...register('name')}
                  className="bg-card border-border h-10 text-sm"
                />
                {errors.name && (
                  <p className="text-[10px] text-rose-400 font-semibold">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label htmlFor="email-input" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Your Email
                </label>
                <CustomInput
                  id="email-input"
                  type="email"
                  placeholder="name@company.com"
                  {...register('email')}
                  className="bg-card border-border h-10 text-sm"
                />
                {errors.email && (
                  <p className="text-[10px] text-rose-400 font-semibold">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="company-input" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                Company (Optional)
              </label>
              <CustomInput
                id="company-input"
                placeholder="e.g. Stripe, Linear"
                {...register('company')}
                className="bg-card border-border h-10 text-sm"
              />
            </div>

            {/* Recruiter feedback star rating */}
            <div className="space-y-2 py-2">
              <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                Rate Portfolio Experience
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue('rating', star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 rounded-md hover:bg-muted text-yellow-500 cursor-pointer"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        star <= (hoverRating || ratingVal) ? 'fill-yellow-500' : 'text-muted-foreground'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="message-input" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                Message / Details
              </label>
              <Textarea
                id="message-input"
                rows={5}
                placeholder="Type your message or select a calendar slot to book a call..."
                {...register('message')}
                className="bg-card border-border text-sm"
              />
              {errors.message && (
                <p className="text-[10px] text-rose-400 font-semibold">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-lg cursor-pointer h-10 text-xs font-bold shadow-[0_0_15px_rgba(124,58,237,0.15)]"
            >
              {isSubmitting ? 'Sending telemetry...' : 'Submit Inquiry'}
            </Button>
          </form>
        </div>

        {/* Scheduler Dashboard (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Calendar Scheduler
          </h3>
          <Card className="p-5 border border-border bg-card space-y-6 rounded-xl">
            {/* Day selector */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-violet-400" />
                <span>Select Available Date</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {schedulerDays.map((day) => (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => setSelectedDay(day.id)}
                    className={`py-2 px-3 border rounded-lg text-center cursor-pointer transition-all text-xs font-semibold ${
                      selectedDay === day.id
                        ? 'border-violet-500 bg-violet-500/5 text-violet-400 font-bold'
                        : 'border-border bg-transparent text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time selector */}
            {selectedDay && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-violet-400" />
                  <span>Select Time Window (EST)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {schedulerTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 border rounded-lg text-center cursor-pointer transition-all text-xs font-semibold ${
                        selectedTime === time
                          ? 'border-violet-500 bg-violet-500/5 text-violet-400 font-bold'
                          : 'border-border bg-transparent text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!selectedDay && (
              <p className="text-[10px] text-muted-foreground text-center py-6 leading-relaxed">
                Choose a date above to view available interview openings.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
