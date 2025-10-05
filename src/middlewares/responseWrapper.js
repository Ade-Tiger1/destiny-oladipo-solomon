module.exports = function responseWrapper(req, res, next) {
  res.ok = (data, meta) => res.json({ success: true, data, meta: meta || null });
  res.error = (message, status = 400, details) => {
    if (typeof message === 'string') return res.status(status).json({ success: false, error: { message, details: details || null }});
    // if message is an object/stateless error
    return res.status(status).json({ success: false, error: message });
  };
  next();
};