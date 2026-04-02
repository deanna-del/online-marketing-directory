import { defineCollection, z } from 'astro:content';

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    logo: z.string().optional(),
    domain: z.string().optional(),
    affiliateUrl: z.string().url(),
    tagline: z.string(),
    description: z.string(),
    category: z.enum([
      'Business Foundation',
      'Marketing & Lead Generation',
      'Content Creation',
      'AI Tools by Use Case',
      'Operations & Productivity',
    ]),
    subcategory: z.string(),
    startingPrice: z.string(),
    freePlan: z.enum(['Yes', 'No', 'Free Trial Only']),
    pricingUrl: z.string().url().optional(),
    bestFor: z.string(),
    notIdealFor: z.string(),
    deannasPick: z.boolean().default(false),
    keyFeatures: z.array(z.string()).max(5).optional(),
    integrations: z.string().optional(),
    screenshot: z.string().optional(),
    affiliateRelationship: z.boolean().default(false),
    pubDate: z.date().optional(),
  }),
});

const training = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    creator: z.string(),
    image: z.string(),
    affiliateUrl: z.string().url(),
    tagline: z.string(),
    description: z.string(),
    category: z.enum([
      'Marketing & Business Growth',
      'Tech & Tools Training',
      'Mindset & Coaching Skills',
      'Community Building',
    ]),
    format: z.enum(['Course', 'Membership', 'Mastermind', 'Coaching Program', 'Live Workshop']),
    pricePoint: z.string(),
    timeCommitment: z.string(),
    bestFor: z.string(),
    notIdealFor: z.string(),
    deannasPick: z.boolean().default(false),
    deannasNote: z.string().optional(),
    affiliateRelationship: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    featuredImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const homepage = defineCollection({
  type: 'content',
  schema: z.object({
    heroHeadline: z.string(),
    heroSubheadline: z.string(),
    heroPrimaryButtonLabel: z.string(),
    heroSecondaryButtonLabel: z.string(),
    featuredSectionTitle: z.string(),
    featuredSectionDescription: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
});

export const collections = { tools, training, blog, homepage };
