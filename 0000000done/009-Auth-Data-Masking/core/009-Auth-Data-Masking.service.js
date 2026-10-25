const Config = require('../data/009-Auth-Data-Masking.nexus.data');

class MaskingService {
    /**
     * Transforms 'avish@gmail.com' into 'a***h@gmail.com'
     */
    static maskEmail(email) {
        if (!email || !email.includes('@')) return "********";
        const [username, domain] = email.split('@');
        if (username.length <= 2) return `*@${domain}`;
        
        return `${username[0]}***${username[username.length - 1]}@${domain}`;
    }

    /**
     * Transforms '9876543210' into '******3210'
     */
    static maskPhone(phone) {
        if (!phone) return "****";
        return phone.toString().replace(/.(?=.{4})/g, Config.DEFAULT_MASK_CHAR);
    }

    /**
     * Complete wipe for passwords or secrets
     */
    static totalObfuscation(text) {
        return Config.DEFAULT_MASK_CHAR.repeat(10);
    }

    /**
     * Deep mask an entire user object
     */
    static maskUserObject(user) {
        const masked = { ...user };
        if (masked.email) masked.email = this.maskEmail(masked.email);
        if (masked.phone) masked.phone = this.maskPhone(masked.phone);
        
        // Remove critical fields entirely
        Config.SENSITIVE_FIELDS.forEach(field => delete masked[field]);
        
        return masked;
    }
}

module.exports = MaskingService;