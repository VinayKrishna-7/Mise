// In-memory sliding window rate limiter
const createLimiter = (options = {}) => {
  const windowMs = options.windowMs || 10 * 60 * 1000; // default 10 minutes
  const max = options.max || 20; // default 20 requests
  const message = options.message || 'Too many requests from this IP, please try again later.';
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    
    let clientData = requests.get(ip);
    if (!clientData) {
      clientData = [];
      requests.set(ip, clientData);
    }

    // Filter out requests outside the time window
    clientData = clientData.filter(time => now - time < windowMs);
    requests.set(ip, clientData);

    if (clientData.length >= max) {
      return res.status(429).json({
        success: false,
        message
      });
    }

    clientData.push(now);
    next();
  };
};

exports.recipeMutationLimiter = createLimiter({
  windowMs: 10 * 60 * 1000,
  max: 30,
  message: 'Recipe creation or modification limit reached. Please wait a few minutes before trying again.'
});

exports.commentLimiter = createLimiter({
  windowMs: 5 * 60 * 1000,
  max: 15,
  message: 'Comment limit reached. Please wait a moment before posting another comment.'
});

exports.ratingLimiter = createLimiter({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: 'Rating limit reached. Please wait a moment before rating again.'
});
