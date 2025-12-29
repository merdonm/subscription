import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });
    console.log({ decision });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit) {
        res.status(429).json({
          success: false,
          message: "Too Many Requests - Rate limit exceeded",
        });
      }
      if (decision.reason.isBot) {
        res.status(403).json({
          success: false,
          message: "Forbidden - Bot traffic detected",
        });
      }
      return res.status(403).json({
        success: false,
        message: "Forbidden - Request denied by Arcjet",
      });
    }
    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error}`);
    next(error);
  }
};

export default arcjetMiddleware;
