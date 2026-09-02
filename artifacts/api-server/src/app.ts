import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
const allowedOrigins = new Set(
  (
    process.env.ALLOWED_ORIGINS ||
    "https://airavotogaming.com,https://www.airavotogaming.com"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);
const buckets = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 120;

function clientKey(req: Request): string {
  return (
    req.ip || req.header("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
  );
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const now = Date.now();
  const key = clientKey(req);
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return next();
  }
  if (current.count >= RATE_LIMIT) {
    res.setHeader(
      "Retry-After",
      String(Math.ceil((current.resetAt - now) / 1000)),
    );
    return res
      .status(429)
      .json({ success: false, message: "Too many requests.", data: [] });
  }
  current.count += 1;
  return next();
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return { id: req.id, method: req.method, url: req.url?.split("?")[0] };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }),
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error("Origin not allowed"));
    },
    methods: ["GET", "HEAD", "OPTIONS"],
    credentials: false,
  }),
);
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));

app.use("/api", router);

export default app;
