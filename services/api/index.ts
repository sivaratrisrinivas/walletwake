const port = Number(process.env.PORT ?? 3001);

Bun.serve({
  port,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true, service: "walletwake-api" });
    }

    return Response.json(
      { error: { code: "NOT_FOUND", message: "Route not found" } },
      { status: 404 }
    );
  },
});

console.log(`walletwake-api listening on http://localhost:${port}`);
