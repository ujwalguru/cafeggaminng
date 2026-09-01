import { Router, type IRouter } from "express";

const router: IRouter = Router();

const AIRAVOTO_API_URL = (process.env.AIRAVOTO_API_URL || "").replace(/\/$/, "");

router.get("/live-cafes", async (_req, res) => {
  if (!AIRAVOTO_API_URL) {
    res.status(503).json({
      success: false,
      message: "Live café data is not configured.",
      data: [],
    });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(`${AIRAVOTO_API_URL}/api/directory`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      res.status(502).json({
        success: false,
        message: `Airavoto returned HTTP ${response.status}.`,
        data: [],
      });
      return;
    }

    const payload = (await response.json()) as { data?: unknown };
    res.json({
      success: true,
      data: Array.isArray(payload?.data) ? payload.data : [],
      source: "airavoto",
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown upstream error";
    res.status(502).json({
      success: false,
      message: `Unable to reach Airavoto: ${message}`,
      data: [],
    });
  } finally {
    clearTimeout(timeout);
  }
});

export default router;
