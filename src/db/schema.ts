import { pgTable, text, timestamp, uuid, jsonb, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// We define a custom vector column type if drizzle-orm doesn't export a vector function,
// or use custom sql fields to represent pgvector. In modern drizzle-orm, pgvector is supported via customType.
import { customType } from 'drizzle-orm/pg-core';

// custom pgvector type
const pgVector = customType<{ data: number[] }>({
  dataType() {
    return 'vector(1536)'; // 1536 dimensions for standard OpenAI embeddings
  },
  toDriver(value: number[]): string {
    return `[${value.join(',')}]`;
  },
  fromDriver(value: unknown): number[] {
    if (typeof value === 'string') {
      return value.slice(1, -1).split(',').map(Number);
    }
    return value as number[];
  }
});

export const recruiters = pgTable('recruiters', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  company: text('company'),
  email: text('email'),
  roleInterest: text('role_interest').notNull().default('default'), // 'mlops' | 'fullstack-ai' | 'research' | 'nlp'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const messages = pgTable('messages', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  recruiterId: uuid('recruiter_id').references(() => recruiters.id, { onDelete: 'cascade' }),
  role: text('role').notNull(), // 'user' | 'assistant'
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const documents = pgTable('documents', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  content: text('content').notNull(),
  metadata: jsonb('metadata').$type<{
    source: 'resume' | 'project' | 'blog' | 'personal';
    title: string;
    section?: string;
  }>(),
  embedding: pgVector('embedding'),
});

export const feedback = pgTable('feedback', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  rating: integer('rating').notNull(),
  message: text('message'),
  recruiterId: uuid('recruiter_id').references(() => recruiters.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
