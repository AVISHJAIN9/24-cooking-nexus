/**
 * Supported Language Configuration
 */
export const SUPPORTED_LANGUAGES = {
  EN: { code: 'en-US', label: 'English', wakeWord: 'hey chef' },
  HI: { code: 'hi-IN', label: 'Hindi', wakeWord: 'नमस्ते शेफ' },
  ES: { code: 'es-ES', label: 'Spanish', wakeWord: 'hola chef' },
  FR: { code: 'fr-FR', label: 'French', wakeWord: 'salut chef' }
};

export const getLangConfig = (langKey) => {
  return SUPPORTED_LANGUAGES[langKey.toUpperCase()] || SUPPORTED_LANGUAGES.EN;
};
