const roleProtect = (...roles) => {
  return (req, res, next) => {
    // Ultimate high-resilience check: trim and uppercase both sides
    const userRole = String(req.user?.role || '').trim().toUpperCase();
    const allowedRoles = roles.map(r => String(r).trim().toUpperCase());

    if (!req.user || !allowedRoles.includes(userRole)) {
      console.log('--- ACL Violation ---');
      console.log('Provided:', userRole, '| Required:', allowedRoles);
      
      return res.status(403).json({
        message: `Restricted Access: Your role '${userRole}' is not permitted here.`,
        required: allowedRoles,
        debug: {
          id: req.user?._id,
          rawDbRole: req.user?.role,
          normRole: userRole,
          allowed: allowedRoles
        }
      });
    }
    next();
  };
};

module.exports = { roleProtect };
