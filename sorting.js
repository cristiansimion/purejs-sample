exports.organizationASC = (a, b) => {
  const companyA = a.organization.toLowerCase();
  const companyB = b.organization.toLowerCase();

  // This is shorter, but I recommend always using {} to wrap if statements
  if (companyA < companyB) return -1;
  if (companyA > companyB) return 1;
  return 0;
};
