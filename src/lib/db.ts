// @ts-nocheck
import data from '../../dump.json';

export type TarotCard = { id: string; cardId: string; name: string; imageUrl: string; description: string; updatedAt: string | Date; };
export type BlogPost = { id: string; title: string; slug: string; excerpt: string; content: string; imageUrl: string | null; published: boolean; createdAt: string | Date; updatedAt: string | Date; };


let mockData: any = data;

function uuid() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Deep clone to prevent mutations affecting the base state accidentally, 
// though we're mutating the mockData object itself in memory.
function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export const prisma = {
  settings: {
    findUnique: async (...args: any[]) => clone(mockData.settings[0] || null),
    create: async ({ data: newData }: any) => {
      const stg = { id: "global", ...newData, updatedAt: new Date().toISOString() };
      mockData.settings = [stg];
      return clone(stg);
    },
    update: async ({ data: newStgs }: any) => {
      mockData.settings[0] = { ...mockData.settings[0], ...newStgs };
      return clone(mockData.settings[0]);
    },
    upsert: async ({ create, update }: any) => {
      if (mockData.settings.length > 0) {
         mockData.settings[0] = { ...mockData.settings[0], ...update };
      } else {
         mockData.settings.push({ id: "global", ...create });
      }
      return clone(mockData.settings[0]);
    }
  },
  consultationCategory: {
    findMany: async ({ include, orderBy }: any = {}) => {
      let cats = clone(mockData.categories);
      if (orderBy?.order) {
        cats.sort((a, b) => orderBy.order === 'asc' ? a.order - b.order : b.order - a.order);
      }
      if (include?.services) {
        cats = cats.map(cat => ({
          ...cat,
          services: mockData.services
               .filter(s => s.categoryId === cat.id)
               .sort((a, b) => include.services.orderBy?.order === 'asc' ? a.order - b.order : 0)
        }));
      }
      return cats;
    },
    findUnique: async ({ where }: any) => {
       const cat = clone(mockData.categories.find(c => c.id === where.id));
       return cat || null;
    },
    create: async ({ data: newData }: any) => {
      const cat = { id: uuid(), ...newData, updatedAt: new Date().toISOString() };
      mockData.categories.push(cat);
      return clone(cat);
    },
    update: async ({ where, data: newData }: any) => {
      const idx = mockData.categories.findIndex(c => c.id === where.id);
      if(idx > -1) {
         mockData.categories[idx] = { ...mockData.categories[idx], ...newData, updatedAt: new Date().toISOString() };
         return clone(mockData.categories[idx]);
      }
      throw new Error("Not found");
    },
    delete: async ({ where }: any) => {
      const idx = mockData.categories.findIndex(c => c.id === where.id);
      if(idx > -1) {
         const deleted = mockData.categories.splice(idx, 1)[0];
         // Cascade delete services manually stringing mock
         mockData.services = mockData.services.filter(s => s.categoryId !== where.id);
         return clone(deleted);
      }
      throw new Error("Not found");
    }
  },
  service: {
    findMany: async ({ include, orderBy }: any = {}) => {
      let srvs: any[] = clone(mockData.services);
      if (orderBy?.order) {
        srvs.sort((a, b) => orderBy.order === 'asc' ? a.order - b.order : b.order - a.order);
      }
      if (include?.category) {
        srvs = srvs.map(s => ({
          ...s,
          category: mockData.categories.find(c => c.id === s.categoryId)
        }));
      }
      return srvs;
    },
    findUnique: async ({ where }: any) => {
       const srv = clone(mockData.services.find(s => s.id === where.id));
       return srv || null;
    },
    create: async ({ data: newData }: any) => {
      const s = { id: uuid(), ...newData, updatedAt: new Date().toISOString() };
      mockData.services.push(s);
      return clone(s);
    },
    update: async ({ where, data: newData }: any) => {
      const idx = mockData.services.findIndex(s => s.id === where.id);
      if(idx > -1) {
         mockData.services[idx] = { ...mockData.services[idx], ...newData, updatedAt: new Date().toISOString() };
         return clone(mockData.services[idx]);
      }
      throw new Error("Not found");
    },
    delete: async ({ where }: any) => {
      const idx = mockData.services.findIndex(s => s.id === where.id);
      if(idx > -1) {
         const deleted = mockData.services.splice(idx, 1)[0];
         return clone(deleted);
      }
      throw new Error("Not found");
    }
  },
  tarotCard: {
    findMany: async (...args: any[]) => clone(mockData.tarotCards),
    findUnique: async ({ where }: any) => {
       const tc = clone(mockData.tarotCards.find(t => t.id === where.id || t.cardId === where.cardId));
       return tc || null;
    },
    create: async ({ data: newData }: any) => {
      const tc = { id: uuid(), ...newData, updatedAt: new Date().toISOString() };
      mockData.tarotCards.push(tc);
      return clone(tc);
    },
    update: async ({ where, data: newData }: any) => {
      const idx = mockData.tarotCards.findIndex(t => t.id === where.id);
      if(idx > -1) {
         mockData.tarotCards[idx] = { ...mockData.tarotCards[idx], ...newData, updatedAt: new Date().toISOString() };
         return clone(mockData.tarotCards[idx]);
      }
      throw new Error("Not found");
    },
    delete: async ({ where }: any) => {
      const idx = mockData.tarotCards.findIndex(t => t.id === where.id);
      if(idx > -1) {
         const deleted = mockData.tarotCards.splice(idx, 1)[0];
         return clone(deleted);
      }
      throw new Error("Not found");
    }
  },
  blogPost: {
    findMany: async ({ where, orderBy }: any = {}) => {
      let posts = clone(mockData.blogPosts);
      if (where?.published !== undefined) {
         posts = posts.filter(p => p.published === where.published);
      }
      if (orderBy?.createdAt) {
        posts.sort((a, b) => {
          const m1 = new Date(a.createdAt).getTime();
          const m2 = new Date(b.createdAt).getTime();
          return orderBy.createdAt === 'desc' ? m2 - m1 : m1 - m2;
        });
      }
      return posts;
    },
    findUnique: async ({ where }: any) => {
       const post = clone(mockData.blogPosts.find(p => p.id === where.id || p.slug === where.slug));
       return post || null;
    },
    create: async ({ data: newData }: any) => {
      const post = { id: uuid(), createdAt: new Date().toISOString(), ...newData, updatedAt: new Date().toISOString() };
      mockData.blogPosts.push(post);
      return clone(post);
    },
    update: async ({ where, data: newData }: any) => {
      const idx = mockData.blogPosts.findIndex(p => p.id === where.id);
      if(idx > -1) {
         mockData.blogPosts[idx] = { ...mockData.blogPosts[idx], ...newData, updatedAt: new Date().toISOString() };
         return clone(mockData.blogPosts[idx]);
      }
      throw new Error("Not found");
    },
    delete: async ({ where }: any) => {
      const idx = mockData.blogPosts.findIndex(p => p.id === where.id);
      if(idx > -1) {
         const deleted = mockData.blogPosts.splice(idx, 1)[0];
         return clone(deleted);
      }
      throw new Error("Not found");
    }
  }
};
