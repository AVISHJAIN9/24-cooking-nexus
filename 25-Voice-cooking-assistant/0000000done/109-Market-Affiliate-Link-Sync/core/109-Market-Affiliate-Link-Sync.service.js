class AffiliateService {
    static async process(data) {
        return { status: 'TRACKING_ACTIVE', ref: data.ref || 'NEXUS_DIRECT' };
    }
}
module.exports = AffiliateService;
