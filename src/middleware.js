import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { url, locals } = context;
  const { pathname } = url;

  if (pathname === "/" || pathname.startsWith("/en/")) {
    return next();
  }

  const lang = pathname.split("/")[1];
  if (["fr", "it"].includes(lang)) {
    locals.lang = lang;
    return next();
  }

  // Redirect to default language (English)
  return context.redirect(`/en${pathname}`);
});
