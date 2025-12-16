import xss from "xss";

export default function xssMiddleware(req, res, next) {
  if (req.path.startsWith("/api/admin/blogs")) return next();

  const sanitize = obj => {
    if (!obj || typeof obj !== "object") return;
    for (const key in obj) {
      if (typeof obj[key] === "string") obj[key] = xss(obj[key]);
      else sanitize(obj[key]);
    }
  };

  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);
  next();
}