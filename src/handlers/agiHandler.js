const { routeCall } = require('../routes/routeHandler');

const agiHandler = (context) => {
    let callId = "";
    try {
        context
            .onEvent("variables")
            .then(async function (vars) {
                
                const { agi_calleridname, agi_extension, agi_context } = vars;

                const callParams = {
                    srcNumber: agi_calleridname,
                    dstNumber: agi_extension,
                    trunkName: agi_context,
                };

                console.log(`Nova chamada: Origem ${callParams.srcNumber}, Destino ${callParams.dstNumber}`);

                const novoDestino = await routeCall(callParams);

                await context.setVariable("EXTTOCALL", novoDestino);
                console.log(`${callId} - Chamada roteada para ${novoDestino}`);
            })
            .then(function () {
                return context.end();
            });

        context
            .onEvent("hangup")
            .then(function () {
                console.log(`${callId} - Chamada desconectada pela outra parte`);
                return context.end();
            });

    } catch (error) {
        console.error(error);
    }
};

module.exports = agiHandler;
