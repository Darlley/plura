import { authMiddleware  } from "@clerk/nextjs";


export default authMiddleware({
  publicRoutes: ['/site', '/api/uploadthing'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};