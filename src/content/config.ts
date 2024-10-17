import { z, defineCollection } from 'astro:content';

const roomsSchema = (image) => z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(z.object({
    imageUrl: z.union([image(), z.string()]),
  })),
  amenities: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  })),
  price: z.string(),
  allDayPrice: z.string(),
  plusPrice: z.string(),
  calendarId: z.string(),
  googleAdress: z.string(),
  googleMapsLink: z.string(),
  relatedRooms: z.array(z.object({
    id: z.string(),
    title: z.string(),
    imageUrl: z.string(),
    price: z.string(),
    link: z.string(),
  })).optional(),
});


const roomsCollection = defineCollection({
  schema: ({image}) => roomsSchema(image),
});

export const collections = {
  rooms: roomsCollection,
}