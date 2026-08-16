'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2 } from 'lucide-react';
import { Input as CustomInput } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// ─────────────────────────────────────────────────────────────────────────────
// Zod schema
// ─────────────────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Must be a valid email address.' }),
  company: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success("Message sent successfully. I'll get back to you soon.");
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.devInfo) {
          // Show descriptive developer notification toast
          toast.error(
            `Developer Notice: ${data.devInfo}`,
            { duration: 8000 }
          );
        }
        toast.error("Unable to send your message right now. Please email me directly at biradarkishore07@gmail.com.");
      }
    } catch (err) {
      console.error('Failed to submit contact form:', err);
      toast.error("Unable to send your message right now. Please email me directly at biradarkishore07@gmail.com.");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
        <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 w-fit mx-auto border border-emerald-500/20">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-3 text-left sm:text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Message Sent
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Message sent successfully. I&apos;ll get back to you soon.
          </p>
        </div>
        <Button
          onClick={() => {
            setSubmitted(false);
            reset();
          }}
          variant="outline"
          className="border-border rounded-lg cursor-pointer h-9 px-4 text-xs font-semibold"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-12 w-full">
      <section className="space-y-4 text-left">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
            Send a Message
          </h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Submit an inquiry, feedback, or collaboration request below.
        </p>
      </section>

      <div className="pt-8 border-t border-border w-full">
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

          <div className="space-y-1">
            <label htmlFor="message-input" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Message / Details
            </label>
            <Textarea
              id="message-input"
              rows={5}
              placeholder="Type your message here..."
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
            className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-lg cursor-pointer h-10 text-xs font-bold shadow-[0_0_15px_rgba(124,58,237,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </Button>
        </form>
      </div>
    </div>
  );
}
