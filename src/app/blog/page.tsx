import { redirect } from 'next/navigation';

// Blog is not available — redirect to home rather than showing a dead page.
export default function BlogPage() {
  redirect('/');
}
