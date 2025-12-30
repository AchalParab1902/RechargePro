const Plan = require('../models/Plan');

class PlanRepository {
  async createPlan(data, companyId) {
    return await Plan.create({
      ...data,
      company: companyId
    });
  }

  async getByCompany(companyId) {
    console.log(`[DEBUG] PlanRepository: Fetching plans for companyId ${companyId}`);
    return await Plan.find({ company: companyId }).sort({ createdAt: -1 });
  }

  async updatePlan(id, data, companyId) {
    const plan = await Plan.findOne({ _id: id, company: companyId });
    if (!plan) throw new Error('Plan not found or unauthorized');
    
    Object.assign(plan, data);
    return await plan.save();
  }

  async toggleStatus(id, companyId) {
    const plan = await Plan.findOne({ _id: id, company: companyId });
    if (!plan) throw new Error('Plan not found or unauthorized');
    
    plan.status = plan.status === 'Active' ? 'Inactive' : 'Active';
    return await plan.save();
  }
  
  async deletePlan(id, companyId) {
    const result = await Plan.deleteOne({ _id: id, company: companyId });
    if (result.deletedCount === 0) throw new Error('Plan not found or unauthorized');
    return true;
  }
}

module.exports = new PlanRepository();
