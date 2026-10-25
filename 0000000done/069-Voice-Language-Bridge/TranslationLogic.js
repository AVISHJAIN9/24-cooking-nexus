/**
 * Maps localized words to internal system Actions.
 */
const INTENT_BRIDGE = {
  'en-US': { pause: 'VIDEO_PAUSE', next: 'STEP_NEXT' },
  'hi-IN': { 'रुकिए': 'VIDEO_PAUSE', 'अगला': 'STEP_NEXT' },
  'es-ES': { pausa: 'VIDEO_PAUSE', siguiente: 'STEP_NEXT' }
};

export const translateToIntent = (transcript, langCode) => {
  const dictionary = INTENT_BRIDGE  const dictionary = INTENT_BRIDGS'  const dictionary = INTENT_BRIDGE  const dictionary = INTENT_BRIDGS'  const dictionary = INTENT_BRIDGE  const dictionary = INTENT_BRIDGS'  const dictionary = INTENT_BRIDGE  const dictionary = INTENT_BRIDGS'  const dictionary = INTENT_BRIDGE  const dictionary = INTENT_BRIDGS'  const dictionary = INTENT_BRIDGE  const dictionary = INTENT_BRIDGS'  const dictionary = INTENT_BRIDGE  const dictionary = INTENT_BRIDGS'  const dictionary = INTENT_BRIDGE  const dictionary = INTENT_BRIDGS'  const dictionary = INTENT_BRIDGE  const dictionary = INTENT_BRIe': 'application/json' },
      body: JSON.stringify({ language: langKey })
    });
    const data = await response.json();
    
    // Reload the Speech Engine with the new language code
    window.location.reload(); 
    return data;
  } catch (err) {
    console.error("Language Sync Failed:", err);
  }
};
