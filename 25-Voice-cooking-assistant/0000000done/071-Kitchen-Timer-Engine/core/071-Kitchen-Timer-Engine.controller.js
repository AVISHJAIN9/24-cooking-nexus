const TimerEngine = require('./071-Kitchen-Timer-Engine.service');

const getUniversalTime = async (req, res) => {
    try {
        const { baseTime, scaleFactor, materialType } = req.body;

        // The "Blast" logic call
        const finalTime = TimerEngine.calculate(baseTime, scaleFactor, materialType);

        res.status(200).json({
            status: "NEXUS_TIME_SYNCED",
            physicsModel: materialType,
            original: baseTime,
            projected: finalTime,
            instructions: scaleFactor > 10 ? "Large batch detected: ensure frequent stirring to offset Viscosity Drag." : "Standard batch."
        });
    } catch (e) {
        res.status(500).json({ status: "PHYSICS_ENGINE_ERROR", error: e.message });
    }
};