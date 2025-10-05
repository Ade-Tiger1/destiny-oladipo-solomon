// A simple strategy factory. Could be extended.
function getRetryQueues() {
  // TTLs milliseconds for retry tiers
  return [1000, 5000, 20000];
}

module.exports = { getRetryQueues };